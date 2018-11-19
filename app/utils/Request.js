/**
 * @param url
 * @param params
 * @returns {Promise}
 */
import aes from './AesUtil';
import dInfo from 'react-native-device-info';
import {Platform} from 'react-native';

const post = (url, params = {}, options = {}) => {
    let isMock = false;
    if (options) {
        if (options.mock) {
            isMock = true;
            url = 'http://rap2api.taobao.org/app/mock/data/' + options.mockId;
        }
    }
    if (url.indexOf('http') == -1) {
        url = getHost() + url;
    }
    console.log("url=" + url);
    let cParam = {
        deviceId: dInfo.getUniqueID(),
        versionCode: dInfo.getBuildNumber(),
        versionName: dInfo.getVersion(),
        bundleId: dInfo.getBundleId(),
        platform: Platform.OS,
        token: ""
    }
    let paramJson = {cParam, ...params};
    let paramString = JSON.stringify(paramJson);
    console.log("request=" + paramString);
    let encodeParam = aes.Encrypt(paramString);
    // console.log("request:encodeParam=" + encodeParam);
    let isOk;
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encodeParam
    };
    if (isMock) {
        fetchOptions = {
            method: 'GET',
        }
    }
    return new Promise((resolve, reject) => {
        fetch(url, fetchOptions).then((response) => {
            if (response.ok) {
                isOk = true;
            } else {
                isOk = false;
            }
            return response.text();
        }).then((responseData) => {
            if (isMock) {
                console.log("response=" + responseData);
                resolve(JSON.parse(responseData));
                return;
            }
            let decryptData = aes.Decrypt(responseData);
            console.log("response解密=" + decryptData);
            responseData = JSON.parse(decryptData);
            if (isOk) {
                resolve(responseData);
            } else {
                reject(responseData);
            }

        }).catch((error) => {
            console.log("error=" + error);
            reject(error);
        });
    });
};

export default {
    post
};

/**
 * protocol -
 *            dev
 *            beta
 *            release
 * @returns {string}
 */
export function getHost() {
    const protocol = 'dev';
    let host = 'http://172.17.100.16:7780/mockjsdata/4';
    if (protocol === 'dev') {
        host = 'http://47.96.183.3:8080/yjwy/customer/';
    } else if (protocol === 'beta') {
        host = 'https://api-stage.gaojihealth.cn';
    } else if (protocol === 'release') {
        host = 'https://api.gaojihealth.cn';
    }
    return host;
}

