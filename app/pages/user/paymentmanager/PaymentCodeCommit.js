import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {CommonStyle} from "../../../common/CommonStyle";

export default class PaymentCodeCommit extends BaseComponent{
    navigationBarProps() {
        return {
            title: '重置支付密码',
        }
    }
    constructor(props) {
        super(props);
        this.state={
            userPhone:'',
            authCode:'',
            authState: '显示请求的状态',
            codeRequesting:false,
            paymentCode:'',
            paymentCodeAgain:'',
        }
    }

    _render() {
        return (
            <View style={{backgroundColor: CommonStyle.white,flex: 1,marginTop:10}}>

                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../../../img/yanzhengma.png')}
                           style={{ width: 20, height: 20, resizeMode: 'contain'}}/>
                    <TextInput
                        style={styles.loginInput}
                        underlineColorAndroid="transparent"
                        placeholder='请设置你新的6位支付密码'
                        keyboardType='numeric'
                        maxLength={6}
                        secureTextEntry={true}
                        onChangeText={(value) =>{
                            this.setState({
                                paymentCode:value
                            })
                        }}
                        value={this.state.paymentCode}
                    />
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../../../img/yanzhengma.png')}
                           style={{ width: 20, height: 20, resizeMode: 'contain'}}/>
                    <TextInput
                        style={styles.loginInput}
                        underlineColorAndroid="transparent"
                        placeholder='请重复'
                        keyboardType='numeric'
                        maxLength={6}
                        secureTextEntry={true}
                        onChangeText={(value) =>{
                            this.setState({
                                paymentCodeAgain:value
                            })
                        }}
                        value={this.state.paymentCodeAgain}
                    />
                </View>

                <TouchableOpacity style={{
                    height: 40,
                    width:300,
                    marginLeft: 30,
                    marginRight: 30,
                    borderRadius: 30,
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:30
                }} onPress={()=>{
                    this.navigate('PaymentCodeCommit')
                }}>
                    <Text style={styles.loginText}>确认提交</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({

    formInput: {
        flexDirection: 'row',
        height: 60,
        padding: 20,
        justifyContent:'center',
        alignItems:'center'
    },
    formInputSplit: {
        borderBottomWidth: .5,
        borderBottomColor: CommonStyle.lineColor,
    },
    loginInput: {
        height: 42,
        paddingLeft: 10,
        flex: 1,
        fontSize: 18,
        marginTop:3
    },

    loginBtn: {
        backgroundColor: CommonStyle.themeColor,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    loginText: {
        color: '#ffffff',
        fontSize: 17,
    },


});
