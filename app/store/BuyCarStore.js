import store from 'react-native-simple-store';
import util from "../utils/util";

const buy_car_key = 'buy_car_key';
let buyCar = [
    // {
        // "categoryId":"10",
        // "categoryName":"日用百货",
        // "evaluationCount":0,
        // "goodsBody":null,
        // "goodsName":"牙膏",
        // "goodsPrice":8.0,
        // "goodsState":1,
        //marketPrice
        // "id":1,
        // "imageList":["http://115.28.21.13/images/2019/06/11/6f98a275379fb2a9b325be60da1c5c46.png"]
    // }
];

export default BuyCarStore = {

    initData() {
        store.get(buy_car_key).then(data => {
            buyCar = util.isArray(data) ? data : [];
            console.log('buyCar:' + JSON.stringify(buyCar));
        })
    },
    get() {
        console.log('get buyCar:' + JSON.stringify(buyCar));
        return buyCar;
    },
    save(data = []) {
        buyCar = util.isArray(buyCar) ? buyCar : [];
        buyCar = buyCar.concat(data)
        store.save(buy_car_key, buyCar);
        console.log('save buyCar:' + JSON.stringify(buyCar));
    },

    remove(id) {
        if (buyCar) {
            var length = buyCar.length;
            for (var i = 0; i < length; i++) {
                if (buyCar[i].id === id) {
                    if (i == 0) {
                        buyCar.shift(); //删除并返回数组的第一个元素
                    }
                    else if (i == length - 1) {
                        buyCar.pop();  //删除并返回数组的最后一个元素
                    } else {
                        buyCar.splice(i, 1); //删除下标为i的元素
                    }
                }
            }
        }
        store.save(buy_car_key, buyCar);
        console.log('buyCar:' + JSON.stringify(buyCar));
    },

    clear() {
        buyCar = [];
        store.save(buy_car_key, buyCar);
    },
}

