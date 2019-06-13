import store from 'react-native-simple-store';

const user_info_key = 'user_info_key';
// "isAuth": 1,
//     "token": "1231412421",
//     "avatar": "xxx",
//     "userName": "张三",
//     "nickName": "串串",
//     "phone": "13701252212",
//     "gender": 0,
//     "birthday": "2019-03-01"
let userInfo = {
    isAuth: 0,
    phone: null,
    userName: null,
    token: null,
    avatar: null,
    gender: null,
    birthday: null
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
        // return userInfo.token;
        return true;
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

