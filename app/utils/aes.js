const CryptoJS = require('crypto-js');  //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("6FFF3A197191CB02");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('1234567876543210');   //十六位十六进制数作为密钥偏移量
//解密方法
function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Base64.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//加密方法
function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    // return encrypted.ciphertext.toString().toUpperCase();
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
    // return encrypted.ciphertext.toString();
}

export default {
    Decrypt,
    Encrypt
}