import React from 'react'
import {Dimensions, Image, Alert,Text, View} from 'react-native'
import {BaseComponent} from "../../components/base/BaseComponent";
import * as WeChat from "react-native-wechat";
import AliPay from '../../utils/AilPay';
import Request from "../../utils/Request";
import {
    BACK_FROM_PAY,
    JUMP_TO_ORDER_DETAIL,
    PAY_FROM_CREATE_ORDER,
    PAY_FROM_ORDER_DETAIL, PAY_FROM_ORDER_ORDER_LIST
} from "../../constants/ActionTypes";
import NavigationUtil from "../../utils/NavigationUtil";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import util from "../../utils/util";
import UserStore from "../../store/UserStore";
import {Modal} from 'antd-mobile-rn';
var {width} = Dimensions.get('window');
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
            rightTitle: (
                '支付成功'
            ),
            leftIcon: null,
        })
    }

    canBack() {
        return false;
    }

    onRightPress(){
        Alert.alert(
            '提示',
            '支付成功',
            [
                {text: '查看订单', onPress: () => {
                        this.goBack( {id: this.state.id});
                    }},
            ], { cancelable: false }
        )
    }

    onLeftPress() {
        switch (this.state.from) {
            case PAY_FROM_CREATE_ORDER:
                Modal.alert('确定稍后支付', '下单后15分钟内未支付成功,订单将被关闭,请尽快完成支付',
                    [{
                        text: '稍后支付', onPress: () => {
                                 }, style: 'cancel'
                    }, {
                        text: '继续支付', onPress: () => {
                            this.showShort('')
                            // NavigationUtil.reset(this.props.navigation, 'Home');

                        }
                    }])
                // this.navigate('OrderDetail',{id: this.state.id})
                break;
            case PAY_FROM_ORDER_ORDER_LIST:
            case PAY_FROM_ORDER_DETAIL:
                Modal.alert('确定稍后支付', '下单后15分钟内未支付成功,订单将被关闭,请尽快完成支付',
                    [{
                        text: '稍后支付', onPress: () => {
                            this.goBack();
                        },
                    }, {
                        text: '继续支付', onPress: () => {

                        }
                    }])
                break
            default:
                Modal.alert('确定稍后支付', '下单后15分钟内未支付成功,订单将被关闭,请尽快完成支付',
                    [{
                        text: '稍后支付', onPress: () => {
                        }, style: 'cancel'
                    }, {
                        text: '继续支付', onPress: () => {
                            this.showShort('继续支付')
                            // NavigationUtil.reset(this.props.navigation, 'Home');

                        }
                    }])
                break
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            select: 1,
            id: 0,
            orderno: 0,
            totalPrice: 0,
            balance: 0,
            from: PAY_FROM_CREATE_ORDER
        }
    }

    onReady(e) {
        let userInfo = UserStore.get();
        this.setState({
            id: e.id,
            orderno: e.orderno,
            totalPrice: e.totalPrice,
            from: e.from,
            balance: userInfo.balance,
        })
        WeChat.addListener(
            'PayReq.Resp',
            (response) => {
                if (parseInt(response.errCode) === 0) {
                    this.showShort('支付成功');
                } else {
                    this.showShort('取消支付');
                }
            }
        );
    }
    paySuccess(){
        switch (this.state.from) {
            case PAY_FROM_CREATE_ORDER:
                Modal.alert('支付成功',
                    [{
                        text: '查看订单', onPress: () => {
                            NavigationUtil.resetGo(this.props.navigation, ['Home', 'OrderDetail'], {id: this.state.id});
                        }
                    }])
                break;
            case PAY_FROM_ORDER_DETAIL:
                Modal.alert('支付成功',
                    [{
                        text: '查看订单', onPress: () => {
                            this.goBack( {id: this.state.id});
                        }
                    }])
                break
            case PAY_FROM_ORDER_ORDER_LIST:
                Modal.alert('支付成功',
                    [{
                        text: '查看订单', onPress: () => {
                            NavigationUtil.resetGo(this.props.navigation, ['Home', 'OrderList','OrderDetail'], {id: this.state.id});
                        }
                    }])
                break
            default:
                Modal.alert('支付成功',
                    [{
                        text: '查看订单', onPress: () => {
                            NavigationUtil.reset(this.props.navigation, 1,'OrderDetail', { id: this.state.id});
                        }
                    }])
                break
        }

    }

    onPay() {
        if (this.state.select === 1) {//支付宝
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

        } else if (this.state.select === 2) {//微信
            this.showLoading('支付中...');
            Request.post('/api/pay/createPay', {payType: 1, orderId: this.state.id}).then(rep => {
                if (rep.code == 0) {
                    AliPay.pay(rep.data.content).then(function (data) {
                        this.paySuccess()
                    }, function (err) {
                        console.log('取消支付');
                    });
                } else {
                    this.showShort(rep.message);
                }
            }).catch(err => {

            }).done(() => {
                this.hideLoading();
            })
        } else if (this.state.select === 2) {//余额支付
            this.showLoading('支付中...');
            Request.post('/api/pay/createPay', {payType: 1, orderId: this.state.id}).then(rep => {
                if (rep.code == 0) {
                    AliPay.pay(rep.data.content).then(function (data) {
                        console.log(data);
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    this.showShort(rep.message);
                }
            }).catch(err => {

            }).done(() => {
                this.hideLoading();
            })
        }
    }

    _render() {
        return (
            <View>
                <View style={{height: 120, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                    <Text style={{fontSize: 14, color: '#333'}}>应付金额</Text>
                    <Text style={{
                        fontSize: 28,
                        color: CommonStyle.themeColor,
                        marginTop: 15
                    }}>￥{util.isEmpty(this.state.totalPrice) ? '0.0' : this.state.totalPrice}</Text>
                </View>
                <View style={{
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    marginTop: 15,
                    borderBottomWidth: 0.5,
                    borderColor: CommonStyle.lightGray,
                    backgroundColor: '#fff'
                }}>
                    <Text style={{
                        fontSize: 14, color: '#333',
                    }}>支付方式</Text>
                </View>

                <View style={{backgroundColor: '#fff',}}>
                    <TouchableView style={{
                        marginHorizontal: 15,
                        paddingVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        borderColor: CommonStyle.lightGray
                    }} onPress={() => {
                        this.setState(
                            {
                                select: 1
                            }
                        )
                    }}>
                        <Image style={{height: 35, width: 35}} source={require('../../img/icon_ari_pay.png')}/>
                        <Text style={{fontSize: 14, color: '#333', marginLeft: 15, flex: 1}}>支付宝</Text>
                        <View>
                            <Image style={{height: 20, width: 20}}
                                   source={this.state.select === 1 ? require('../../img/icon_ck_select.png') : require('../../img/icon_ck.png')}/>
                        </View>
                    </TouchableView>
                    <TouchableView style={{
                        marginHorizontal: 15,
                        paddingVertical: 10,
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        borderColor: CommonStyle.lightGray
                    }} onPress={() => {
                        this.setState(
                            {
                                select: 2
                            }
                        )
                    }}>
                        <Image style={{height: 35, width: 35}} source={require('../../img/icon_wechat_pay.png')}/>
                        <Text style={{fontSize: 14, color: '#333', marginLeft: 15, flex: 1}}>微信</Text>
                        <View>
                            <Image style={{height: 20, width: 20}}
                                   source={this.state.select === 2 ? require('../../img/icon_ck_select.png') : require('../../img/icon_ck.png')}/>
                        </View>
                    </TouchableView>
                    <TouchableView style={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        borderColor: CommonStyle.lightGray
                    }} onPress={() => {
                        if (util.isEmpty(this.state.balance) || this.state.balance < this.state.totalPrice) {
                            this.showShort('余额不足')
                            return;
                        }
                        this.setState(
                            {
                                select: 3
                            }
                        );
                    }}>
                        <Image style={{height: 35, width: 35}} source={require('../../img/icon_pay_ye.png')}/>
                        <Text style={{fontSize: 14, color: '333', marginLeft: 15, flex: 1}}>余额支付</Text>
                        <Text style={{
                            fontSize: 14,
                            color: CommonStyle.themeColor,
                            marginRight: 10
                        }}>￥{util.isEmpty(this.state.balance) ? '0.0' : this.state.balance}</Text>
                        <View>
                            <Image style={{height: 20, width: 20}}
                                   source={this.state.select === 3 ? require('../../img/icon_ck_select.png') : require('../../img/icon_ck.png')}/>
                        </View>
                    </TouchableView>
                </View>
                <Text style={{fontSize: 14, color: '#666', marginTop: 15, marginLeft: 15,}}>提示:请15分钟内支付订单</Text>
                <TouchableView style={{
                    alignSelf: 'center',
                    width: width - 30,
                    marginTop: 20,
                    height: 48,
                    borderRadius: 10,
                    backgroundColor: CommonStyle.themeColor
                    ,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={() => {
                    this.onPay()
                }}>
                    <Text style={{fontSize: 16, color: '#fff'}}>确认支付</Text>
                </TouchableView>
            </View>
        );

    }
};
