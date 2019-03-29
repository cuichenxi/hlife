import store from 'react-native-simple-store';

const user_cookie_key = 'user_cookie_key';

//XSRF-TOKEN=
//access_token=
//refresh_token=

let cookieInfo = {cookies: '', xsrfToken: '', accessToken: '', sessionToken: ''};

export default CookieStore = {

    initData() {
        store.get(user_cookie_key).then(data => {
            cookieInfo = Object.assign(cookieInfo, data);
            console.log('cookie:' + JSON.stringify(cookieInfo));
        })
    },
    get() {
        return cookieInfo;
    },
    isLogin() {
        return cookieInfo.token;
    },
    save(data = {}) {
        cookieInfo = Object.assign(cookieInfo, data);
        store.save(user_cookie_key, cookieInfo);
        console.log('cookie:' + JSON.stringify(cookieInfo));
    },

    remove(key = {}) {
        cookieInfo = Object.assign(cookieInfo, {key: null});
        store.save(user_cookie_key, cookieInfo);
        console.log('cookie:' + JSON.stringify(cookieInfo));
    },

    clear() {
        cookieInfo = {};
        store.save(user_cookie_key, cookieInfo);
    },
}

