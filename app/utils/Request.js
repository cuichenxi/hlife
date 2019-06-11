/**
 * @param url
 * @param params
 * @returns {Promise}
 */
import aes from './AesUtil';
import dInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import store from 'react-native-simple-store';
import UserStore from "../store/UserStore";

const post = (url, params = {}, options = {}, cacheCallback) => {
    var isMock = false;
    var isCache = false;
    var cache_key = url;
    if (options) {
        if (options.mock) {
            isMock = true;
            url = 'http://rap2api.taobao.org/app/mock/data/' + options.mockId;
        }
        isCache = (options.cache != 0);
        if (isCache && cacheCallback) {
            store.get(cache_key).then(data => {
                if (data) {
                    cacheCallback(data);
                }
                console.log('cacheData:' + JSON.stringify(data));
            });
        }
    }

    if (url.indexOf('http') == -1) {
        url = getHost() + url;
    }
    console.log("url=" + url);
    var {token} = UserStore.get();
    let cParam = {
        deviceId: dInfo.getUniqueID(),
        versionCode: dInfo.getBuildNumber(),
        versionName: dInfo.getVersion(),
        bundleId: dInfo.getBundleId(),
        platform: Platform.OS,
        token: token
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
                var rep = JSON.parse(responseData)
                if (isCache) {
                    store.save(cache_key, rep);
                }
                resolve(rep);
                return;
            }
            let decryptData = aes.Decrypt(responseData);
            console.log("response解密=" + decryptData);
            responseData = JSON.parse(decryptData);
            if (isOk) {
                if (isCache) {
                    store.save(cache_key, responseData);
                }
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
/**
 * params:[{
 *   filePath,
 *   fileType,
 * }
 * ]
 * @param url
 * @param files
 * @param options
 * @returns {Promise}
 */
const uploadFile = (url, files = [], options = {}) => {
    console.log('files', files);
    let formData = new FormData();       //因为需要上传多张图片,所以需要遍历数组,把图片的路径数组放入formData中
    for (var i = 0; i < files.length; i++) {
//截取获取文件名
        var a = files[i].filePath;
        var arr = a.split('/');
// 获取文件名end
//      判断文件的类型(视频-图片等)end
        let file = {
            uri: files[i].filePath,
            type: files[i].fileType ? files[i].fileType : 'image/jpeg',
            name: arr[arr.length - 1]
        };   //这里的key(uri和type和name)不能改变,
        formData.append("file", file);   //这里的files就是后台需要的key
        //这里的files就是后台需要的key
    }

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
    let paramJson = {cParam, ...files};
    let paramString = JSON.stringify(paramJson);
    console.log("request=" + paramString);
    let encodeParam = aes.Encrypt(paramString);
    // console.log("request:encodeParam=" + encodeParam);
    let isOk;
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData
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
    post,
    uploadFile,
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

