import store from 'react-native-simple-store';

const user_info_key = 'user_info_key';
// avatar: null
// balance: 0
// birthday: null
// gender: 2
// integralCount: 0
// isAuth: 0
// nickName: "15811508404"
// phone: "15811508404"
// redCount: 0
// sign: null
// token: "113af41a72b9449a938d08fc786ea209"
// userName: "15811508404"
let userInfo = {
    isAuth: 0,
    phone: '',
    userName: '',
    token: '',
    avatar: '',
    sign: '',
    gender: 0,
    birthday: '',
    redCount: 0,
    integralCount: 0,
    balance: 0,
    messages:0,
    tenementPhone:'',
};

export default  UserStore = {

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
        // return true;
    },
    save(data = {}) {
        userInfo = Object.assign(userInfo, data);
        store.save(user_info_key, userInfo);
        console.debug('user=' + JSON.stringify(userInfo, null, 2));
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

