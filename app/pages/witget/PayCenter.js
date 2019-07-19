import React from 'react'
import {Alert, Dimensions, Image, Text, View} from 'react-native'
import {BaseComponent} from "../../components/base/BaseComponent";
import * as WeChat from "react-native-wechat";
import AliPay from '../../utils/AilPay';
import Request from "../../utils/Request";
import {
    PAY_FROM_CREATE_ORDER,
    PAY_FROM_ORDER_DETAIL,
    PAY_FROM_ORDER_ORDER_LIST,
    PAY_FROM_WALLET
} from "../../constants/ActionTypes";
import NavigationUtil from "../../utils/NavigationUtil";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import util from "../../utils/util";
import UserStore from "../../store/UserStore";
import BuyCarStore from "../../store/BuyCarStore";
import {Modal} from "antd-mobile-rn/lib/index.native";

var {width} = Dimensions.get('window');
/**
 * 微信支付文档
 * https://www.jianshu.com/p/3f424cccb888
 */
export default class PayCenter extends BaseComponent {
    navigationBarProps() {
        return ({
            title: '选择支付方式',
            gesturesEnabled: false,
            leftTitle: (
                '稍后付款'
            ),
            rightTitle: (
                ''
            ),
            leftIcon: null,
            type: 1,
        })
    }

    canBack() {
        return false;
    }

    onRightPress() {
        Alert.alert(
            '提示',
            '支付成功',
            [
                {
                    text: '查看订单', onPress: () => {
                        this.goBack({id: this.state.id});
                    }
                },
            ], {cancelable: false}
        )
    }

    onLeftPress() {
        switch (this.state.from) {
            case PAY_FROM_CREATE_ORDER:
                Alert.alert(
                    '确定稍后支付',
                    '下单后15分钟内未支付成功,订单将被关闭,请尽快完成支付',
                    [
                        {text: '稍后支付', onPress: () => {
                                NavigationUtil.resetGo(this.props.navigation, ['Home', 'OrderDetail'], {id: this.state.id});
                            }},
                        {text: '继续支付', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                )
                // this.navigate('OrderDetail',{id: this.state.id})
                break;
            case PAY_FROM_ORDER_ORDER_LIST:
            case PAY_FROM_ORDER_DETAIL:
                Alert.alert(
                    '确定稍后支付',
                    '下单后15分钟内未支付成功,订单将被关闭,请尽快完成支付',
                    [
                        {text: '稍后支付', onPress: () => this.goBack()},
                        {text: '继续支付', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                )
                break
            case PAY_FROM_WALLET:
                Alert.alert(
                    '确定稍后支付',
                    '下单后15分钟内未支付成功,订单将被关闭,请尽快完成支付',
                    [
                        {text: '稍后支付', onPress: () => this.goBack()},
                        {text: '继续支付', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                )
                break
            default:
                Alert.alert(
                    '确定稍后支付',
                    '下单后15分钟内未支付成功,订单将被关闭,请尽快完成支付',
                    [
                        {text: '稍后支付', onPress: () => this.goBack()},
                        {text: '继续支付', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                )
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
            from: PAY_FROM_CREATE_ORDER,
        }
        var that = this;
        WeChat.addListener(
            'PayReq.Resp',
            (response) => {
                that.showLoading('获取支付信息中...')
                if (parseInt(response.errCode) === 0) {
                    setTimeout(() => {
                        that.hideLoading()
                        that.paySuccess();
                    }, 500);
                } else {
                    this.hideLoading()
                    this.showShort('支付失败');
                }
            }
        );
    }

    onReady(e) {

        let userInfo = UserStore.get();
        this.setState({
            id: e.id,
            orderno: e.orderno,
            totalPrice: e.totalPrice,
            from: e.from,
            balance: userInfo.balance,
            type: e.orderType,
            orderDetailList: e.orderDetailList
        })
    }
    onUnload(){
        // WeChat.removeAllListeners();
    }
    clearBuyCar(){
        if (this.state.orderDetailList) {
            this.state.orderDetailList.map((item)=>{
                BuyCarStore.remove(item.goodId);
            })
        }
    }

    paySuccess() {
        this.clearBuyCar();
        switch (this.state.from) {
            case PAY_FROM_CREATE_ORDER:
                Alert.alert(
                    '提示',
                    '支付成功',
                    [
                        {text: '查看订单', onPress: () => {
                            NavigationUtil.resetGo(this.props.navigation, ['Home', 'OrderDetail'], {id: this.state.id});
                        }
                    }],{cancelable: false});
                break;
            case PAY_FROM_ORDER_DETAIL:
                Alert.alert(
                    '提示', '支付成功',
                    [{
                        text: '查看订单', onPress: () => {
                            this.goBack({id: this.state.id});
                        }
                    }],
                    {cancelable: false});
                break
            case PAY_FROM_ORDER_ORDER_LIST:
                Alert.alert(
                    '提示', '支付成功',
                    [{
                        text: '查看订单', onPress: () => {
                            NavigationUtil.resetGo(this.props.navigation, ['Home', 'OrderList', 'OrderDetail'], {id: this.state.id});
                        }
                    }],
                    {cancelable: false});
                break
            case  PAY_FROM_WALLET:
                Alert.alert(
                    '提示',
                    '支付成功',
                    [
                        {text: '查看金额', onPress: () => this.goBack()},
                    ],
                    {cancelable: false}
                );
                break
            default:
                Alert.alert(
                    '提示',
                    '支付成功',
                    [
                        {text: '查看金额', onPress: () => this.goBack()},
                    ],
                    {cancelable: false}
                );
                break
        }

    }

    /**
     * "type":1                //类型：Number  必有字段  备注：类型(1:商品订单,2:余额充值)
     */
    onPay() {
        if (this.state.select === 2) {//微信
            this.showLoading('支付中...');
            Request.post('/api/pay/createPay', {
                money: this.state.totalPrice,
                type: this.state.type,
                payType: 2,
                orderId: this.state.id
            }).then(rep => {
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
                                this.showShort('取消支付');
                            });
                        } else {
                            this.showShort('没有安装微信软件，请您安装微信之后再试');
                        }
                    });
                }else {
                    this.showShort(rep.message)
                }
            }).catch(err => {
            }).done(() => {
                this.hideLoading();
            })

        } else if (this.state.select === 1) {//支付宝
            this.showLoading('支付中...');
            var that = this;
            Request.post('/api/pay/createPay', {
                money: this.state.totalPrice,
                type: this.state.type,
                payType: 1,
                orderId: this.state.id
            }).then(rep => {
                this.hideLoading();
                if (rep.code == 0) {
                    AliPay.pay(rep.data.content).then(function (data) {
                        // that.showLoading('获取支付信息中...')
                        setTimeout(() => {
                            // that.hideLoading()
                            that.paySuccess()
                        }, 500);
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
        } else if (this.state.select === 3) {//余额支付
            Modal.prompt(
                null,
                '余额支付',
                (value) => {
                    this.setState({
                        password: value
                    },()=>{
                        this.yePay();
                    })
                },
                'default',
                null,
                ['请输入支付密码'],
            );

        }
    }
    yePay(){
        this.showLoading('支付中...');
        Request.post('/api/pay/createPay', {
            money: this.state.totalPrice,
            password: this.state.password,
            type: this.state.type,
            payType: 3,
            orderId: this.state.id
        }).then(rep => {
            this.showLoading('获取支付信息中...')
            var that = this;
            if (rep.code == 0) {
                that.hideLoading()
                setTimeout(() => {
                    that.paySuccess()
                }, 500);
            } else {
                this.hideLoading()
                this.showShort(rep.message);
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
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
                    {this.state.from !== PAY_FROM_WALLET &&

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
                        <Text style={{fontSize: 14, color: '#333', marginLeft: 15, flex: 1}}>余额支付</Text>
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
                    }
                </View>
                <Text style={{fontSize: 14, color: '#666', marginTop: 15, marginLeft: 15,}}>提示:请15分钟内支付订单</Text>
                <TouchableView style={{
                    alignSelf: 'center',
                    width: width - 30,
                    marginTop: 20,
                    height: 44,
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
