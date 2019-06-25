import moment from 'moment'

/** *公共方法类库 */
const util = {

    type: {
        'string': '[object String]',
        'number': '[object Number]',
        'boolean': '[object Boolean]',
        'function': '[object Function]',
        'array': '[object Array]',
        'object': '[object Object]',
        'date': '[object Date]',
        'null': '[object Null]',
        'undefined': '[object Undefined]'
    },
    isNumber(obj) {
        return !isNaN(parseInt(obj));
    },
    isString(obj) {
        return this.typeOf(obj, 'string')
    },
    isArray(obj) {
        return this.typeOf(obj, 'array')
    },
    isDate(obj) {
        return this.typeOf(obj, 'date')
    },
    isObj(obj) {
        return this.typeOf(obj, 'object')
    },
    typeOf(obj, type) {
        return Object.prototype.toString.call(obj) === this.type[type]
    },
    isEmpty  (obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    },
    stringValue (obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return '';
        } else {
            return obj;
        }
    },
    isMobile,
    isEmail,
    isChinese,
    isIDCard,
    timeStampToStr,
    strToTimeStamp,
    generateMixed,
    generateNumber,
    inArray,
    toThousands,
    removeHTMLTag,
    getRequestParam,
    copyObj,
    strLimit,
    exchangeSpec,
    randInt,
    nextInt,
    cryptXOR,
    timeStampToFriendlyTime,
    formatSimilar,
    getFuncName,
    getGender,
    generateSerialNumArray,
    getMonthDate,
    formatBirth,
    numberToTenThousand,
}
export default util

/** *校验手机号 * @param tel * @returns {boolean} * @constructor */
function isMobile(tel) {
    let reg = new RegExp(/^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$/);
    return tel.match(reg);
}

/** *校验邮箱 * @param email * @constructor */
function isEmail(email) {
    //let reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    let reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    return email.match(reg);
}

/** *校验中文 * @param lang * @constructor */
function isChinese(lang) {
    let reg = /[^\u0000-\u00FF]/;
    return lang.match(reg);
}

/** *校验身份证 * @param idCard * @constructor */
function isIDCard(idCard) {
    let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return idCard.match(reg);
}

/** *时间戳转字符串 * @param str * @param time * @param addZero * @returns {string|*} * @constructor */
function timeStampToStr(time, str, addZero = true) {
    str = str ? str.toLowerCase() : 'y-m-d h:i:s';
    let weeks = ['日', '一', '二', '三', '四', '五', '六'];
    let t = new Date(time);
    let year = t.getFullYear();
    let month, day, hour, minute, second;
    if (addZero) {
        month = (t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1);
        day = t.getDate() < 10 ? '0' + t.getDate() : t.getDate();
        hour = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
        minute = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
        second = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds();
    } else {
        month = (t.getMonth() + 1);
        day = t.getDate();
        hour = t.getHours();
        minute = t.getMinutes();
        second = t.getSeconds();
    }
    let week = weeks[t.getDay()];
    return str.replace('y', year).replace('m', month).replace('d', day).replace('h', hour).replace('i', minute).replace('s', second).replace('w', week);
}

/** *字符串转时间戳 * @param str * @returns {number} */
function strToTimeStamp(str) {
    if (util.isString(str)) {
        str = str.replace(/\-/g, ',').replace(/ /g, ',').replace(/:/g, ',').split(',')
        for (let key in str) {
            str[key] = parseInt(str[key])
        }
        return new Date(str[0], str[1] - 1, str[2], str[3], str[4], str[5]).getTime()
    }
    return str;
}

/** *生成随机字符串，大小写加数字 * @param n * @returns {string} */
function generateMixed(n) {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ02345789';
    let res = "";
    for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * (chars.length - 1));
        res += chars.charAt(id);
    }
    return res;
}

/** *判断给定的元素是否在数组里， * @param value * @param arr * @param accurate是否严格匹配，默认否 * @returns {boolean} */
function inArray(arr, value, accurate = false) {
    if (accurate !== false) {
        for (let key of arr
            ) {
            if (arr[key] === value) {
                return true;
            }
        }
    } else {
        for (let key of arr
            ) {
            if (arr[key].indexOf(value) !== -1 || arr[key] == value) {
                return true;
            }
        }
    }
    return false;
}

/** *数字格式化加逗号 * @param num * @returns {string} */function toThousands(num) {
    num = (num || 0).toString();
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}

/** *移除HTML标签 * @param str * @returns {string | *} */
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g, '')//去除HTML tag		.replace(/[|]*\n/g,'\n')//去除行尾空白		.replace(/\n[\s| |]*\r/g,'\n')//去除多余空行		.replace(/ /ig,'');	returnstr;}
}

/** *获取请求参数 * @param url * @returns {*} */
function getRequestParam(url) {
    if (url.indexOf("?") === -1) return null;
    let urlString = url.substring(url.indexOf("?") + 1);
    let urlArray = urlString.split("&");
    let urlObject = []
    for (let i = 0, len = urlArray.length; i < len; i++) {
        let urlItem = urlArray[i];
        let item = urlItem.split("=");
        urlObject[item[0]] = item[1];
    }
    return urlObject;
}

/** *复制一个对象 * @param source * @returns {{} & any} */
function copyObj(source) {
    return Object.assign({}, source)
}

/** *超过限制的字符串以省略号形式显示 * @param content * @param limit * @param ellipsis * @returns {*} */
function strLimit(content, limit = 50, ellipsis = '……') {
    if (content.length <= limit)
        return content;
    return content.substring(0, limit) + ellipsis
}

/** *生成多种规格 * @param doubleArrays必须为二维数组 * @returns {*} */
function exchangeSpec(doubleArrays = [[]]) {
    if (!util.isArray(doubleArrays)) {
        console.warn('params must be doubleArrays')
        return
    }
    for (let item of doubleArrays
        ) {
        if (!util.isArray(item)) {
            console.warn('params must be doubleArrays')
            return
        }
    }
    let len = doubleArrays.length;
    if (len >= 2) {
        let len1 = doubleArrays[0].length;
        let len2 = doubleArrays[1].length;
        let newLen = len1 * len2;
        let temp = new Array(newLen);
        let index = 0;
        for (let i = 0; i < len1; i++) {
            for (let j = 0; j < len2; j++) {
                temp[index] = doubleArrays[0][i] + '|' + doubleArrays[1][j];
                index++;
            }
        }
        let newArray = new Array(len - 1);
        for (let i = 2; i < len; i++) {
            newArray[i - 1] = doubleArrays[i];
        }
        newArray[0] = temp;
        return exchangeSpec(newArray);
    } else {
        return doubleArrays[0];
    }
}

// /** *生成长度为length的随机数字 * @returns {string} */
function generateNumber(length = 1) {
    const min = 1
    const max = 21
    if (length <= min) length = 1
    if (length >= max) length = max
    let n = '1';
    for (let i = 0; i < length; i++) {
        n += '0'
    }
    return Math.round(Math.random() * parseInt(n));
}

/** *随机生成start - end之间的数字 * @param start * @param end * @returns {*} */
function randInt(start, end) {
    if (arguments.length <= 1) {
        return nextInt(start)
    }
    if (start > end) {
        console.warn("Start value must be smaller end value.")
        return
    }
    if (start < 0) {
        console.warn("Both range values must be non-negative.")
        return
    }
    return start === end ? start : start + nextInt(end - start + 1)
}

/** *随机生成0 - bound之前的数字 * @param bound * @return */
function nextInt(bound = 10) {
    return Math.round(Math.random() * bound);
}

/** * XOR加解密 * @param str待加解密的字符串 * @param key密钥 * @returns {string} */
function cryptXOR(str, key = 1234567890) {
    let text = '';
    for (let i = 0; i < str.length; i++) {
        text += String.fromCharCode(str.charCodeAt(i) ^ key)
    }
    return text;
}

function timeStampToFriendlyTime(unixTime) {
    if (unixTime instanceof Date
)
    {
        unixTime = new Date(unixTime)
    }
    unixTime = (unixTime / 1000).toFixed(0)
    const now = (+newDate() / 1000).toFixed(0)
    const second = now - unixTime
    if (second <= 60) {
        return '刚刚'
    } else if (Math.floor(second / 60) < 60) {
        return Math.floor(second / 60) + '分钟前'
    } else if (Math.floor(second / 3600) < 24) {
        return Math.floor(second / 3600) + '小时前'
    } else if (Math.floor(second / (3600 * 24)) < 3) {
        return Math.floor(second / (3600 * 24)) + '天前'
    } else {
        unixTime = unixTime * 1000
        const year = new Date(unixTime).getFullYear()
        if (year < new Date().getFullYear()) {
            return timeStampToStr(unixTime, 'y-m-d')
        }
        return timeStampToStr(unixTime, 'm月d日', false)
    }
}

/** *保留两位小数 * @param similar * @returns {any} */
function formatSimilar(similar = 0) {
    if (!similar || similar <= 0) {
        return 0
    }
    return (similar * 100) === 100 ? 100 : (similar * 100).toFixed(2)
}

/** *获取函数名称 * @param func * @returns {any[]} */
function getFuncName(func) {
    return func.toString().match(/function\s*(\w*)/i)[1];
}

/** *获取性别 * @param sex * @returns {string} */
function getGender(sex) {
    if (Number(sex) === 1) {
        return '男'
    } else if (Number(sex) === 2) {
        return '女'
    }
    return '未知';
}

/** *生成start - end之间的有序数组 * @param start * @param end * @returns {Array} */
function generateSerialNumArray(start, end) {
    const len = end - start + 1
    let arr = []
    for (let i = 0; i < len; i++) {
        arr[i] = start + i
    }
    return arr
}

/** *获取当年月份的天数 * @param year * @param month * @returns {number} */
function getMonthDate(year, month) {
    return new Date(year, month, 0).getDate();
}

/** *格式化出生日期 */
function formatBirth(birth = [1990, 1, 1], formatStr = 'y-m-d') {
    let y = parseInt(birth[0]);
    let m = parseInt(birth[1]) >= 10 ? parseInt(birth[1]) : '0' + parseInt(birth[1]);
    let d = parseInt(birth[2]) >= 10 ? parseInt(birth[2]) : '0' + parseInt(birth[2]);
    return formatStr.replace('y', y).replace('m', m).replace('d', d)
}

/** *数字超过后1万转换单位 */
function numberToTenThousand(num, unit = '万') {
    return num > 10000 ? (num / 10000).toFixed(0) + unit : num || 0
}

