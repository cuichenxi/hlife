/**
 * public String imei;
 public int versionCode;
 public String versionName;
 public Integer userId;
 public String token;
 public String platform;
 public String roomId;
 public String cid;
 public String districtid;
 * @param url
 * @param body
 * @returns {Promise}
 */
import {Encrypt, Decrypt} from './aes';

const post = (url, body) => {

    if (url.indexOf('http') == -1) {
        url = getHost() + url;
    }
    console.log("net:url=" + url);
    let paramsJson = {...body};
    // body = Encrypt(body);
    let paramString = JSON.stringify(paramsJson);
    console.log("net:request=" + paramString);
    let isOk;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: paramString
        }).then((response) => {
            if (response.ok) {
                isOk = true;
            } else {
                isOk = false;
            }
            return response.text();
        }).then((responseData) => {
            console.log("net:response=" + responseData);
            responseData = JSON.parse(responseData);
            if (isOk) {
                resolve(responseData);
            } else {
                reject(responseData);
            }
        })
            .catch((error) => {
                console.log("net:error=" + error);
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
        host = 'https://api-test.gaojihealth.cn';
    } else if (protocol === 'beta') {
        host = 'https://api-stage.gaojihealth.cn';
    } else if (protocol === 'release') {
        host = 'https://api.gaojihealth.cn';
    }
    return host;
}

