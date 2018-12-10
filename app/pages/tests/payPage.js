import React from 'react'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'

import {BaseComponent} from "../../components/base/BaseComponent";
import {CommonStyle} from "../../common/CommonStyle";
import ItemArrow from "../../components/ItemArrow";
import {ActionSheet, Modal} from "antd-mobile-rn/lib/index.native";
import Request from "../../utils/Request";
import UserStore from "../../store/UserStore";
import {formatStringWithHtml} from "../../utils/FormatUtil";
import * as WeChat from "react-native-wechat";
import DeviceInfo from "react-native-device-info/deviceinfo";

/**
 * 微信支付文档
 * https://www.jianshu.com/p/3f424cccb888
 */
export default class PayPage extends BaseComponent {
    navigationBarProps() {
        return ({
            title: '支付'
        })
    }


    constructor(props) {
        super(props)
        this.config = [
            {icon: "ios-pin", name: "微信支付", onPress: this.goPage.bind(this, "wx_pay")},
            {icon: "ios-heart", name: "微信分享", color: "#fc7b53", onPress: this.goPage.bind(this, "wx_share")},
            {icon: "md-images", name: "微信登录", subName: this.state.xiaoqu, onPress: this.goPage.bind(this, "wx_login")},
            {icon: "md-images", name: "支付宝支付", subName: this.state.xiaoqu, onPress: this.goPage.bind(this, "ail_pay")},
        ]
    }

    actived(p) {
        WeChat.addListener(
            'SendMessageToWX.Resp',
            (response) => {
                if (parseInt(response.errCode) === 0) {
                    toastShort('分享成功');
                } else {
                    toastShort('分享失败');
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
     */
    goPage(data = {}) {
        if (data === 'wx_pay') {
            WeChat.isWXAppInstalled().then((isInstalled) => {
                if (isInstalled) {
                    WeChat.pay({
                        partnerId: '1900000109',  // 商家向财付通申请的商家id
                        prepayId: '1101000000140415649af9fc314aa427',   // 预支付订单
                        nonceStr: '1101000000140429eb40476f8896f4c9',   // 随机串，防重发
                        timeStamp: '1398746574',  // 时间戳，防重发
                        package: 'Sign=WXPay',    // 商家根据财付通文档填写的数据和签名
                        sign: '7FFECB600D7157C5AA49810D2D8F28BC2811827B'        // 商家根据微信开放平台文档对数据做的签名
                    }).catch((error) => {
                        this.showShort(error.message);
                    });
                } else {
                    this.showShort('没有安装微信软件，请您安装微信之后再试');
                }
            });
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
