import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, Text, TextInput, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import LinearGradient from "react-native-linear-gradient";
import TouchableView from "../../components/TouchableView";
import ImageView from "../../components/ImageView";
import UserStore from "../../store/UserStore";
import QIcon from "../../components/icon";
import Request from "../../utils/Request";
import {ORDER_TYPE_CZ, PAY_FROM_WALLET} from "../../constants/ActionTypes";
import {Modal} from "antd-mobile-rn/lib/index.native";
import {ThemeStyle} from "../../common/ThemeStyle";

let {width, height} = Dimensions.get('window')

export default class MyWallet extends BaseComponent {
    navigationBarProps() {
        return {
            title: '钱包',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            initItem: '支付宝',
            initId: '1',
            money: 0,
            aliPay: true,
            weChatPay: false,
            balance: ''
        }
    }

    submit() {
        this.showDLoading()
        if (this.state.money < 0) {
            this.showShort('请输入充值金额');
            return;
        }
        let param = {money: this.state.money};
        Request.post('/api/pay/balanceRecharge', param,
            {
                mock: false,
                mockId: 1095864,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.navigate('PayCenter', {
                    id: rep.data.id,
                    totalPrice: rep.data.totalPrice,
                    orderno: rep.data.orderno,
                    orderType: ORDER_TYPE_CZ,
                    from: PAY_FROM_WALLET
                })
            } else if (rep.code == 1060) {
                Modal.alert('提示', '未设置支付密码,立即设置',
                    [{
                        text: '取消', onPress: () => {
                        },
                    }, {
                        text: '确定', onPress: () => {
                            this.navigate('PaymentVerification')
                        }
                    }])
            } else {
                this.showShort(rep.message);
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
    }

    _renderHeader() {
        return (
            <View style={{height: CommonStyle.navHeight}}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: CommonStyle.navContentHeight,
                    marginTop: CommonStyle.navStatusBarHeight,
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                    justifyContent: 'space-between'
                }}>
                    <TouchableView onPress={() => {
                        this.goBack()
                    }}
                                   style={{flex: 1}}
                    >
                        <QIcon name={'icon-back'} size={25} color={'#fff'}/>
                    </TouchableView>

                    <View style={{flex: 1, height: 50, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 17}}>钱包</Text>
                    </View>
                    <TouchableView onPress={() => {
                        this.navigate('RechargeRecord')
                    }} style={{flex: 1}}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1}}>
                            <ImageView
                                defaultSource={require("../../img/icon_jifen_yiwen.png")}
                                style={{
                                    width: 15,
                                    height: 15,
                                    resizeMode: "cover",
                                }}/>
                            <Text style={{textAlign: 'center', color: '#fff', fontSize: 11, marginLeft: 5}}>钱包明细</Text>
                        </View>

                    </TouchableView>
                </View>

            </View>
        );
    }

    onReady(param) {
        this.hideHeader(true);
    }

    onShow() {
        let userInfo = UserStore.get();
        this.setState({
            balance: userInfo.balance,
        })
        // this.showLoading('查询余额...');
        Request.post('/api/user/getuserinfo', {}).then(rep => {
            if (rep.code === 0 && rep.data) {
                UserStore.save({
                    balance: rep.data.balance,
                });
                this.setState({
                    balance: rep.data.balance,
                });
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
        })
    }

    _render() {
        const {aliPay, weChatPay, balance} = this.state
        return (
            <View style={{flex: 1}}>
                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0, y: .8}}
                                colors={['#63D5A2', CommonStyle.themeColor]}
                                style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{position: CommonStyle.absolute, left: 0, top: 0, right: 0,}}>
                        {this._renderHeader()}
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 8,
                        marginTop: 50
                    }}>
                        <Text style={{fontSize: 12, color: '#fff'}}>我的余额(元)</Text>
                        <Image source={require('../../img/money_icon.png')}
                               style={{width: 11, height: 9, resizeMode: 'contain'}}/>
                    </View>
                    <Text style={{fontSize: 33, color: '#fff'}}>{balance}</Text>
                </LinearGradient>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: CommonStyle.white
                }}>
                    <Text style={{fontSize: 12, color: '#7e7e7e'}}>钱包充值</Text>
                    <View
                        style={{
                            height: 30,
                            paddingLeft: 10,
                            width: 180,
                        }}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: CommonStyle.white
                }}>
                    <Text style={{fontSize: 15, color: '#333'}}>金额（元）</Text>
                    <TextInput
                        ref="money_num"
                        placeholder='请输入充值金额'
                        style={{
                            height: 40,
                            paddingLeft: 10,
                            width: 150,
                            fontSize: 16,
                        }}
                        keyboardType='numeric'
                        maxLength={11}
                        onChangeText={(text) => this.setState({money: text})}
                        value={this.state.money ? this.state.money : ''}
                    />
                </View>
                {false &&
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: CommonStyle.white,
                    padding: 36
                }}>
                    <TouchableView style={{
                        height: 30,
                        borderRadius: 30,
                        backgroundColor: aliPay ? '#09C7F7' : CommonStyle.gray,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 20,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                        marginRight: 20,
                        flexDirection: 'row'
                    }} onPress={() => {
                        this.setState({
                            weChatPay: false,
                            aliPay: true
                        })
                    }}>
                        <Text style={{color: '#ffffff', fontSize: 11}}>支付宝</Text>
                        <Image source={require('../../img/small_checked.png')}
                               style={{width: 10, height: aliPay ? 10 : 0, resizeMode: 'contain', marginLeft: 5}}/>
                    </TouchableView>
                    <TouchableView style={{
                        height: 30,
                        borderRadius: 30,
                        backgroundColor: weChatPay ? CommonStyle.themeColor : CommonStyle.gray,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 20,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                        marginRight: 20,
                        flexDirection: 'row'
                    }} onPress={() => {
                        this.setState({
                            weChatPay: true,
                            aliPay: false
                        })
                    }}>
                        <Text style={{color: '#ffffff', fontSize: 11}}>微 信</Text>
                        <Image source={require('../../img/small_checked.png')}
                               style={{width: 10, height: weChatPay ? 10 : 0, resizeMode: 'contain', marginLeft: 5}}/>
                    </TouchableView>
                </View>
                }
                <View style={{marginTop: 27, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#999', fontSize: 10}}>温馨提示：充值成功后，到账可能会有一定延迟，请耐心等待。</Text>
                </View>
                <TouchableView style={[ThemeStyle.btn_submit, {
                    marginTop: 20,
                    marginLeft: 15,
                    marginRight: 15,
                }]}  onPress={() => {
                    this.submit();
                }}>
                    <Text style={{color: '#ffffff', fontSize: 17}}>立即充值</Text>
                </TouchableView>
            </View>
        );
    }

}
