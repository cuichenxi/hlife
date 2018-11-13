import 'whatwg-fetch';
// import fetch from 'dva/fetch';
import { getCookie } from './Utils';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限，请重新登陆',
  403: '用户得到授权，但是访问是被禁止的',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  405: '发出的请求不被允许',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '当前页面出现错误，请您稍后再试',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  url = getHost() + url;
  const XSRF_TOKEN = getCookie('XSRF-TOKEN');
  const defaultOptions = {
    credentials: 'include',
  };
  let newOptions = { ...defaultOptions, ...options };
  if (url.indexOf('172.17.100.16') != -1) {
    newOptions = {};
  } else {
    // token下有个type表示用户来源 用户类型：0-未知来源、1-CRM用户、2-微信用户、3-支付宝用户、4-微博用户、6-未关注微信用户
    const tokenInfo = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : {};
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
      if (!(newOptions.body instanceof FormData)) {
        newOptions.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          ...newOptions.headers,
        };
        if (url.indexOf('/getToken') == -1) {
          newOptions.headers = Object.assign(newOptions.headers, {
            Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
            'X-XSRF-TOKEN': XSRF_TOKEN
          });
        }
        newOptions.body = JSON.stringify(newOptions.body);
      } else {
        newOptions.headers = {
          Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
          'X-XSRF-TOKEN': XSRF_TOKEN,
          ...newOptions.headers
        };
      }
    } else {
      newOptions.headers = {
        Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
        'X-XSRF-TOKEN': XSRF_TOKEN,
        ...newOptions.headers
      };
    }
  }

  let total;// 分页列表请求总条数

  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      // 返回的参数有一部分信息是放在header里返回回来的
      const headers = response.headers;
      total = headers.get('X-Total-Count');
      return response.text();
      // return pump(response.body.getReader());
    }).then((data) => {
      const tempData = data ? JSON.parse(data) : {};
      const responseData = handleData(url, tempData, total);
      return responseData;
    })
    .catch((e) => {
      const status = e.name;
      const result = { errorKey: status, message: codeMessage[status] };
      if (status === 401) {
        sessionStorage.clear();
        WebViewJavascriptBridge.callHandler('loginoutJSBridge', {}, () => {});
      }
      if (status == 400) {
        const headers = e.response.headers;
        const errorCode = headers.get('error-Code');
        const errorMessage = headers.get('error-Message');
        console.log('400错误', headers, errorMessage, decodeURIComponent(errorMessage));
        return { errorKey: errorCode, message: decodeURIComponent(errorMessage) };
      } else if (!result.message) {
        return { errorKey: 408, message: '网络异常' };
      }
      return result;
    });
}

function handleData(url, data, total) {
  let responseData;
  // mock数据
  if (url.indexOf('172.17.100.16') != -1) {
    // 兼容mock数据时，rap填写的数据不规范
    if (data.status && data.success && data.message) {
      responseData = { errorKey: 0, result: data.result };
    } else {
      responseData = { errorKey: 0, result: data };
    }
  } else if (data && data.errorKey && data.errorKey != 0) {
    responseData = data;
  } else {
    responseData = { errorKey: 0, result: data, total: parseInt(total) || 0 };
  }
  return responseData;
}

/**
 * 根据location.href加载不同环境的接口
 * @returns {string}
 */
export function getHost() {
  const url = location.href;
  const protocol = location.protocol;
  let host = 'http://172.17.100.16:7780/mockjsdata/4';
  // let host = 'http://172.17.100.16:7780/mockjsdata/39';
  if (url.indexOf('mobile-local.gaojihealth.cn') != -1) {
    host = 'http://api-test.gaojihealth.cn';
    // host =  'http://dev.gaojihealth.cn:8080';
    // host = 'http://api-local.gaojihealth.cn:8080/scrm-hx';
  } else if (url.indexOf('mobile-test.gaojihealth.cn') != -1) {
    host = protocol == 'https:' ? 'https://api-test.gaojihealth.cn' : 'http://api-test.gaojihealth.cn';
  } else if (url.indexOf('mobile-stage.gaojihealth.cn') != -1) {
    host = protocol == 'https:' ? 'https://api-stage.gaojihealth.cn' : 'http://api-stage.gaojihealth.cn';
  } else if (url.indexOf('mobile.gaojihealth.cn') != -1) {
    host = protocol == 'https:' ? 'https://api.gaojihealth.cn' : 'http://api.gaojihealth.cn';
  }
  return host;
}
