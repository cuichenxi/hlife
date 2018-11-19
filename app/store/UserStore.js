import store from 'react-native-simple-store';

const user_info_key = 'user_info_key';

let userInfo = {
    token: null,
    phone: null,
    userName: null
};

export default UserStore = {

    initData() {
        store.get(user_info_key).then(data => {
            userInfo = Object.assign(userInfo, data);
            console.log('user:' + JSON.stringify(userInfo));
        })
    },
    get() {
        return userInfo;
    },
    isLogin() {
        return userInfo.token;
    },
    save(data = {}) {
        userInfo = Object.assign(userInfo, data);
        store.save(user_info_key, userInfo);
        console.log('user:' + JSON.stringify(userInfo));
    },

    remove(key = {}) {
        userInfo = Object.assign(userInfo, {key: null});
        store.save(user_info_key, userInfo);
        console.log('user:' + JSON.stringify(userInfo));
    },

    clear() {
        userInfo = {};
        store.save(user_info_key, userInfo);
    },
}

