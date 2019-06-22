import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, Text, TextInput, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import LinearGradient from "react-native-linear-gradient";
import TouchableView from "../../components/TouchableView";
import RadioModal from "../../components/RadioModal";
let {width, height} = Dimensions.get('window')

export default class MyWallet extends BaseComponent{
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
            money:0,
            aliPay:true,
            weChatPay:false,
        }
    }
    _render() {
        const {aliPay,weChatPay} = this.state
        return (
            <View style={{flex: 1}}>
                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0, y: .8}}
                                colors={['#63D5A2', CommonStyle.themeColor]}
                                style={{height: 150,justifyContent: 'center',alignItems: 'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:8}}>
                        <Text style={{fontSize:12,color:'#fff'}}>我的余额(元)</Text>
                        <Image source={require('../../img/money_icon.png')}
                               style={{width: 11, height: 9, resizeMode: 'contain'}}/>
                    </View>
                    <Text style={{fontSize:33,color:'#fff'}}>999999</Text>
                </LinearGradient>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:CommonStyle.white}}>
                    <Text style={{fontSize:10,color:'#7e7e7e'}}>钱包充值</Text>
                    <View
                        style={{height: 30,
                            paddingLeft: 10,
                            width:180,}}
                        />
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:CommonStyle.white}}>
                    <Text style={{fontSize:14,color:'#333'}}>金额（元）</Text>
                    <TextInput
                        ref="money_num"
                        placeholder='请输入充值金额'
                        style={{height: 40,
                            paddingLeft: 10,
                            width:150,
                            fontSize: 16,}}
                        keyboardType='numeric'
                        maxLength={11}
                        onChangeText={(text) => this.setState({money: text})}
                        value={this.state.money ? this.state.money : ''}
                        />
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:CommonStyle.white,padding:36}}>
                    <TouchableView style={{
                        height: 17,
                        borderRadius: 30,
                        backgroundColor: aliPay?'#09C7F7':CommonStyle.gray,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft:20,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom:5,
                        marginRight:20,
                        flexDirection:'row'
                    }} onPress={()=>{
                        this.setState({
                            weChatPay:false,
                            aliPay:true
                        })
                    }}>
                        <Text style={{color: '#ffffff', fontSize: 11}}>支付宝</Text>
                        <Image source={require('../../img/small_checked.png')}
                               style={{width: 10, height: aliPay?10:0, resizeMode: 'contain',marginLeft:5}}/>
                    </TouchableView>
                    <TouchableView style={{
                        height: 17,
                        borderRadius: 30,
                        backgroundColor: weChatPay?CommonStyle.themeColor:CommonStyle.gray,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft:20,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom:5,
                        marginRight:20,
                        flexDirection:'row'
                    }} onPress={()=>{
                        this.setState({
                            weChatPay:true,
                            aliPay:false
                        })
                    }}>
                        <Text style={{color: '#ffffff', fontSize: 11}}>微    信</Text>
                        <Image source={require('../../img/small_checked.png')}
                               style={{width: 10, height: weChatPay?10:0, resizeMode: 'contain',marginLeft:5}}/>
                    </TouchableView>
                </View>

                <View style={{marginTop:27,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#999' ,fontSize:10}}>温馨提示：充值成功后，到账可能会有一定延迟，请耐心等待。</Text>
                </View>
                <TouchableView style={{
                    height: 40,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    marginBottom:10,
                    borderRadius: 30,
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=>{
                    this.showShort('立即充值')
                }}>
                    <Text style={{color: '#ffffff', fontSize: 14}}>立即充值</Text>
                </TouchableView>
            </View>
        );
    }

}
