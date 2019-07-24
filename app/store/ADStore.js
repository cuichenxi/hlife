import store from 'react-native-simple-store';
import util from "../utils/util";

const ad_info_key = 'ad_info_key';
//imageUrl: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1544009388067/ad_t1.gif',
//                 active: 'https://reactnative.cn/docs/image/'
let adInfo = {
    imageUrl: null,
    active: null,
    times: 0
};

export default ADStore = {

    initData() {
        store.get(ad_info_key).then(data => {
            adInfo = Object.assign(adInfo, data);
            console.log('adInfo:' + JSON.stringify(adInfo));
        })
    },
    get() {
        return adInfo;
    },
    isAD() {
        return !util.isEmpty(adInfo.imageUrl);
        // return false;
    },
    save(data = {}) {
        adInfo = Object.assign(adInfo, data);
        store.save(ad_info_key, adInfo);
        console.log('imageUrl:' + JSON.stringify(adInfo));
    },

    remove(key = {}) {
        adInfo = Object.assign(adInfo, {key: null});
        store.save(ad_info_key, adInfo);
        console.log('imageUrl:' + JSON.stringify(adInfo));
    },

    clear() {
        adInfo = {};
        store.save(ad_info_key, adInfo);
    },
}

