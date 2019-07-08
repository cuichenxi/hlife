import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import CountDownButton from "../../../components/CountDownButton";
import {CommonStyle} from "../../../common/CommonStyle";
import UserStore from "../../../store/UserStore";
import util from "../../../utils/util";
import Request from "../../../utils/Request";

export default class PaymentVerification extends BaseComponent{
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
            password: ''
        }
    }

    onReady(){
        let userInfo = UserStore.get();
        this.setState({
            userPhone: userInfo.phone,
        })
    }
    _render() {
        const {userPhone,codeRequesting} = this.state
        return (
            <View style={{backgroundColor:CommonStyle.white,flex: 1,marginTop:10}}>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../../../img/shouji.png')}
                           style={{ width: 20, height: 20, resizeMode: 'contain'}}/>
                    <TextInput
                        placeholder='请输入手机号码'
                        underlineColorAndroid="transparent"
                        style={styles.loginInput}
                        keyboardType='numeric'
                        maxLength={11}
                        editable={false}
                        value={this.state.userPhone}/>
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../../../img/yanzhengma.png')}
                           style={{ width: 20, height: 20, resizeMode: 'contain'}}/>
                    <TextInput
                        style={styles.loginInput}
                        underlineColorAndroid="transparent"
                        placeholder='请输入验证码'
                        keyboardType='numeric'
                        maxLength={6}
                        onChangeText={(value) =>{
                            this.setState({
                                authCode:value
                            })
                        }}
                    />
                    <View style={{
                        height: 30, justifyContent: 'center', marginRight: 10
                    }}>
                        <CountDownButton
                            executeFunc={(shouldStartCounting)=>{
                                // 组件加载完成后 回吐开始倒计时的function 把这个function绑定到当前对象
                                this.shouldStartCounting = shouldStartCounting;
                            }}
                            textStyle={{color: CommonStyle.themeColor}}
                            disableColor={CommonStyle.gray}
                            timerTitle={'获取验证码'}
                            enable={userPhone.length > 10 && !codeRequesting}
                            onClick={(shouldStartCounting) => {
                                this._requestAuthCode(shouldStartCounting)
                            }}
                            timerEnd={() => {
                                this.setState({
                                    authState: '倒计时结束'
                                })
                            }}/>
                    </View>
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../../../img/yanzhengma.png')}
                           style={{ width: 20, height: 20, resizeMode: 'contain'}}/>
                    <TextInput
                        style={styles.loginInput}
                        underlineColorAndroid="transparent"
                        placeholder='请设置你新的支付密码'
                        // keyboardType='numeric'
                        maxLength={26}
                        secureTextEntry={true}
                        onChangeText={(value) =>{
                            this.setState({
                                password:value
                            })
                        }}
                        value={this.state.password}
                    />
                </View>

                <TouchableOpacity style={{
                    height: 40,
                    marginLeft: 30,
                    marginRight: 30,
                    borderRadius: 30,
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:30
                }} onPress={()=>{
                    this.commitPaymentCode()
                }}>
                    <Text style={styles.loginText}>保存</Text>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * 备注：验证码类型(1:登录;2:注册;3:修改密码;4:短信通知;5:修改绑定手机号;6:修改支付密码)
     * @param shouldStartCounting
     * @private
     */
    _requestAuthCode(shouldStartCounting) {

        this.setState({
            authState: '正在请求验证码',
            codeRequesting:true
        })

        var param = {phone: this.state.userPhone,type:6};

        Request.post('/api/user/getAuthCode', param,
            {
                mock: false,
                mockId: 1089766,
            }).then(rep => {
            let requestSucc = true
            this.setState({
                authState: `验证码获取${rep.code===0?'成功':'失败'}`,
                codeRequesting:false
            })
            shouldStartCounting && shouldStartCounting(rep.code===0)
            this.showShort(rep.message);

        }).catch(err => {
            shouldStartCounting && shouldStartCounting(false)
            this.showShort('网络异常');
        }).done(() => {
            this.hideLoading();
        })
    }

    commitPaymentCode() {
        if (this.state.authCode.length === 0) {
            this.showShort('请输入验证码');
            return;
        }
        if (this.state.password.length === 0) {
            this.showShort('请输入支付密码');
            return;
        }


        var param = {code: this.state.authCode,password:this.state.password};

        Request.post('/api/user/modifyPay', param,
            {
                mock: false,
                mockId: 1089766,
            }).then(rep => {
            if (rep.code === 0 && rep.data){
                this.goBack()
            } else {
                this.showShort(rep.message);
            }

        }).catch(err => {
            this.showShort(err);
        }).done(() => {
            this.hideLoading();
        })
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

