import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Request from "../../utils/Request";
import UserStore from "../../store/UserStore";
import {BaseComponent} from '../../components/base/BaseComponent'
import NavigationUtil from "../../utils/NavigationUtil";
import {CommonStyle} from "../../common/CommonStyle";
import CountDownButton from "../../components/CountDownButton";

var { width, height } = Dimensions.get('window');

export default class Login extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '用户登录',
            gesturesEnabled: false
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
            authCode: '',
            authState: '显示请求的状态',
            codeRequesting:false
        };
    }

    canBack() {
        return false;
    }
    onReady(e){
        this.hideHeader(true);
    }


    _render() {
        const {mobile,codeRequesting} = this.state
        return (
            <View style={styles.container}>
                <ImageBackground style={{alignItems:'center',justifyContent:'center',height:200}} source={require('../../img/login_bg.png')}>
                    <Image source={require('../../img/login_logo.png')} style={{width:173,
                        height:66, alignItems:'center'}} resizeMode='cover'/>
                </ImageBackground>

                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../../img/shouji.png')}
                           style={{ width: 20, height: 20, resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_name"
                        placeholder='请输入手机号码'
                        underlineColorAndroid="transparent"
                        style={styles.loginInput}
                        keyboardType='numeric'
                        maxLength={11}
                        onChangeText={this.onChangeMobile.bind(this)}/>
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../../img/yanzhengma.png')}
                           style={{ width: 20, height: 20, resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_auth"
                        style={styles.loginInput}
                        underlineColorAndroid="transparent"
                        placeholder='请输入验证码'
                        keyboardType='numeric'
                        onChangeText={this.onChangeAuth.bind(this)}
                    />
                    <View style={{
                        height: 30, justifyContent: 'center',
                    }}>
                        <CountDownButton
                            executeFunc={(shouldStartCounting)=>{
                                // 组件加载完成后 回吐开始倒计时的function 把这个function绑定到当前对象
                                this.shouldStartCounting = shouldStartCounting;
                            }}
                            textStyle={{color: CommonStyle.themeColor}}
                            disableColor={CommonStyle.gray}
                            timerTitle={'获取验证码'}
                            enable={!codeRequesting}
                            onClick={(shouldStartCounting) => {
                                this._requestAuthCode(shouldStartCounting)
                            }}
                            counting={codeRequesting}
                            timerEnd={() => {
                                this.setState({
                                    authState: '倒计时结束'
                                })
                            }}/>
                    </View>
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
                    marginTop:50,
                    // position: 'absolute',
                    // bottom: 0,
                    // marginBottom:150,
                    alignSelf: 'center'
                }} onPress={this._login.bind(this)}>
                    <Text style={styles.loginText}>登录</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _register() {
        this.push("Register");
    }

    _forgetPassword() {
        const {navigate} = this.props.navigation;
        navigate('Feedback', {isFirst: true});
    }

    _login() {
        Keyboard.dismiss();
        let {mobile, authCode} = this.state;

        if (!mobile.length) {
            this.showLong('请输入正确的手机号');
            return;
        }
        if (!authCode.length) {
            this.showLong('请输入验证码');
            return;
        }
        this.showLoading('登录中..');
        var param = {phone: this.state.mobile, code: this.state.authCode};
        Request.post('/api/user/login', param,
            {
                mock: false,
                mockId: 672823,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                UserStore.save(rep.data);
                NavigationUtil.reset(this.props.navigation, 'Home');
            } else {
                this.showShort(rep.message);
            }

        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
    }

    _requestAuthCode(shouldStartCounting) {
        if (this.state.mobile.length !== 11) {
            this.showShort('请输入有效的手机号');
            return;
        }

        var param = {phone: this.state.mobile,type:1};

        Request.post('/api/user/getAuthCode', param,
            {
                mock: false,
                mockId: 1089766,
            }).then(rep => {
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

    onChangeMobile(text) {
        this.state.mobile = text;
        // this.setState({'mobile': text});
    }

    onChangePassword(text) {
        this.state.password = text;
        // this.setState({'password': text});
    }

    onChangeAuth(text){
        this.state.authCode = text;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    headerWrap: {
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ff7419',
    },
    header: {
        color: '#fff',
        paddingTop: 22,
        fontSize: 17,
    },

    loginWrap: {
        backgroundColor: '#FCE9D4',
    },
    imgWrap: {
        flexDirection: 'row',
        flex: 1,
    },
    loginMain: {
        flex: 1,
    },
    comCulture: {
        width: 320,
        marginTop: 50,
    },

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
        fontSize: 16,
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

    registerWrap: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
});
