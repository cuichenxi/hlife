import React from 'react'
import {StyleSheet, View,} from 'react-native'

import {BaseComponent} from "../../components/base/BaseComponent";
import ItemArrow from "../../components/ItemArrow";
import * as WeChat from "react-native-wechat";
import AliPay from '../../utils/AilPay';
import DeviceInfo from "react-native-device-info/deviceinfo";
import Request from "../../utils/Request";
import {PAY_FROM_CREATE_ORDER} from "../../constants/ActionTypes";
import NavigationUtil from "../../utils/NavigationUtil";

/**
 * 微信支付文档
 * https://www.jianshu.com/p/3f424cccb888
 */
export default class PayPage extends BaseComponent {
    navigationBarProps() {
        return ({
            title: '选择支付方式',
            gesturesEnabled: false,
            leftTitle: (
                '稍后付款'
            ),
            leftIcon: null,
        })
    }

    canBack() {
        return false;
    }

    onLeftPress() {
        switch (this.state.from) {
            case PAY_FROM_CREATE_ORDER:
                // NavigationUtil.reset(this.props.navigation, 'Home');
                this.navigate('OrderDetail',{id: this.state.id})
                break;
            case 1:
                    break
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            orderno: 0,
            totalPrice: 0,
            from: PAY_FROM_CREATE_ORDER
        }
        this.config = [
            {icon: "ios-pin", name: "微信支付", onPress: this.goPage.bind(this, "wx_pay")},
            {icon: "ios-heart", name: "微信分享", color: "#fc7b53", onPress: this.goPage.bind(this, "wx_share")},
            {icon: "md-images", name: "微信登录", subName: this.state.xiaoqu, onPress: this.goPage.bind(this, "wx_login")},
            {icon: "md-images", name: "支付宝支付", subName: this.state.xiaoqu, onPress: this.goPage.bind(this, "ail_pay")},
        ]
    }

    onReady(e) {
        this.setState({
            id: e.id,
            orderno: e.orderno,
            totalPrice: e.totalPrice
        })
        WeChat.addListener(
            'SendMessageToWX.Resp',
            (response) => {
                if (parseInt(response.errCode) === 0) {
                    this.showShort('分享成功');
                } else {
                    this.showShort('分享失败');
                }
            }
        );
        WeChat.addListener(
            'SendMessageToWX.Resp',
            (response) => {
                if (parseInt(response.errCode) === 0) {
                    this.showShort('分享成功');
                } else {
                    this.showShort('分享失败');
                }
            }
        );
        WeChat.addListener(
            'PayReq.Resp',
            (response) => {
                if (parseInt(response.errCode) === 0) {
                    this.showShort('分享成功');
                } else {
                    this.showShort('支付失败');
                }
            }
        );
        WeChat.addListener(
            'SendAuth.Resp',
            (response) => {
                if (parseInt(response.errCode) === 0) {
                    this.showShort('登录成功');
                } else {
                    this.showShort('登录失败');
                }
            }
        );
    }

    /**
     * request.appId = "wxd930ea5d5a258f4f";
     request.partnerId = "1900000109";
     request.prepayId= "1101000000140415649af9fc314aa427",;
     request.packageValue = "Sign=WXPay";
     request.nonceStr= "1101000000140429eb40476f8896f4c9";
     request.timeStamp= "1398746574";
     request.sign= "7FFECB600D7157C5AA49810D2D8F28BC2811827B";
     * @param data
     * {"content":null,"
     * nonceStr":"kWhilP0jQuyQLa0o"
     * ,"packageContent":"Sign=WXPay",
     * "partnerId":"1489236942",
     * "prepayId":"wx0211184920905470bacad7dc1405003800",
     * "sign":"6728C3BF1328EF1F9C24205971ED317E","timeStamp":"1562037529"}
     */
    goPage(data = {}) {
        if (data === 'wx_pay') {
            this.showLoading('支付中...');
            Request.post('/api/pay/createPay', {payType: 2, orderId: this.state.id}).then(rep => {
                if (rep.code == 0) {
                    WeChat.isWXAppInstalled().then((isInstalled) => {
                        if (isInstalled) {
                            WeChat.pay({
                                partnerId: rep.data.partnerId,  // 商家向财付通申请的商家id
                                prepayId: rep.data.prepayId,   // 预支付订单
                                nonceStr: rep.data.nonceStr,   // 随机串，防重发
                                timeStamp: rep.data.timeStamp,  // 时间戳，防重发
                                package: rep.data.packageContent,   // 商家根据财付通文档填写的数据和签名
                                sign: rep.data.sign        // 商家根据微信开放平台文档对数据做的签名
                            }).catch((error) => {
                                this.showShort(error.message);
                            });
                        } else {
                            this.showShort('没有安装微信软件，请您安装微信之后再试');
                        }
                    });
                    this.showShort(rep.message)
                }
            }).catch(err => {
            }).done(() => {
                this.hideLoading();
            })

        } else if (data === 'wx_share') {
            WeChat.isWXAppInstalled().then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({
                        title: 'test',
                        description: '分享自:' + DeviceInfo.getApplicationName(),
                        thumbImage: '',
                        type: 'news',
                        webpageUrl: 'https://www.jianshu.com/p/3f424cccb888'

                    }).catch((error) => {
                        this.showShort(error.message);
                    });
                } else {
                    this.showShort('没有安装微信软件，请您安装微信之后再试');
                }
            });
        } else if (data === 'wx_login') {
            let scope = 'snsapi_userinfo';
            let state = 'wechat_sdk_demo';
            //判断微信是否安装
            WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                    if (isInstalled) {
                        //发送授权请求
                        WeChat.sendAuthRequest(scope, state)
                            .then(responseCode => {
                                //返回code码，通过code获取access_token
                                // this.getAccessToken(responseCode.code);
                            })
                            .catch(err => {
                                this.showShort('登录授权发生错误' + err.message);
                            });
                    } else {
                        this.showShort('没有安装微信软件，请您安装微信之后再试');
                    }
                })

        } else if (data === 'ail_pay') {
            this.showLoading('支付中...');
            Request.post('/api/pay/createPay', {payType: 1, orderId: this.state.id}).then(rep => {
                if (rep.code == 0) {
                    AliPay.pay(rep.data.content).then(function (data) {
                        console.log(data);
                    }, function (err) {
                        console.log(err);
                    });
                }
            }).catch(err => {
            }).done(() => {
                this.hideLoading();
            })
            let partner = 'app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%22%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.02%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22314VYGIAGG7ZOYY%22%7D&charset=utf-8&method=alipay.trade.app.pay&sign_type=RSA2&timestamp=2016-08-15%2012%3A12%3A15&version=1.0&sign=MsbylYkCzlfYLy9PeRwUUIg9nZPeN9SfXPNavUCroGKR5Kqvx0nEnd3eRmKxJuthNUx4ERCXe552EV9PfwexqW%2B1wbKOdYtDIb4%2B7PL3Pc94RZL0zKaWcaY3tSL89%2FuAVUsQuFqEJdhIukuKygrXucvejOUgTCfoUdwTi7z%2BZzQ%3D';

        }

    }

    _renderListItem() {
        return this.config.map((item, i) => {
            return (<ItemArrow key={i} {...item}/>)
        })
    }

    _render() {
        return (
            <View style={styles.container}>
                <View style={{marginTop: 10}}>
                    {this._renderListItem()}
                </View>
            </View>
        );

    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
