import store from 'react-native-simple-store';

const user_info_key = 'user_info_key';
// "avatar": "asdf",
//     "userName": "张三",
//     "nickName": "串串",
//     "phone": "13712345678",
//     "gender": 0,
//     "birthday": "2010-10-10",
//     "sign": "你好啊",
//     "redCount": 999,
//     "integralCount": 111111,
//     "balance": 999
let userInfo = {
    isAuth: 0,
    phone: null,
    userName: null,
    token: null,
    avatar: null,
    gender: null,
    birthday: null,
    redCount: null,
    integralCount: null,
    balance: null
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
        console.log('save user:' + JSON.stringify(userInfo));
        console.log('save user data:' + JSON.stringify(data));
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

