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
import {ThemeStyle} from "../../common/ThemeStyle";


export default class ModifyPhone extends BaseComponent {
    navigationBarProps() {
        return {
            title: '修改手机号',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
            authCode: '',
            authState: '显示请求的状态',
            codeRequesting: false,
            oldPhone: ''
        };
    }

    onReady(e) {
        let userInfo = UserStore.get();
        this.setState({
            oldPhone: userInfo.phone,
        })
    }

    _render() {
        const {mobile, codeRequesting} = this.state
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: CommonStyle.bgColor, height: 10, width: '100%'}}/>
                <Text style={{fontSize: 12, marginLeft: 20, marginTop: 15, color: '#333'}}>旧号码</Text>
                <View style={[{
                    height: 45,
                    justifyContent: 'center',
                    marginLeft: 20,
                }, styles.formInputSplit]}>
                    <Text style={[{
                        fontSize: 18, color: '#333'
                    }, styles.formInputSplit]}>{this.state.oldPhone}</Text>
                </View>
                <Text style={{fontSize: 12, marginLeft: 20, marginTop: 15, color: '#333'}}>新号码</Text>
                <View style={[{
                    height: 45,
                    justifyContent: 'center',
                    marginLeft: 20,
                }, styles.formInputSplit]}>
                    <TextInput
                        ref="login_name"
                        placeholder='请输入手机号'
                        underlineColorAndroid="transparent"
                        style={styles.loginInput}
                        keyboardType='numeric'
                        maxLength={11}
                        onChangeText={(text)=>{
                            const newText = text.replace(/[^\d]+/, '');
                            this.state.mobile = newText;
                        }}/>
                </View>
                <Text style={{fontSize: 12, marginLeft: 20, marginTop: 15, color: '#333'}}>验证码</Text>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <TextInput
                        ref="login_auth"
                        style={styles.loginInput}
                        underlineColorAndroid="transparent"
                        placeholder='请输入验证码'
                        keyboardType='numeric'
                        maxLength={6}
                        onChangeText={(text) =>{
                            const newText = text.replace(/[^\d]+/, '');
                            this.state.authCode = newText;
                        }}
                    />
                    <View style={{
                        height: 35, justifyContent: 'center',
                    }}>
                        <CountDownButton
                            executeFunc={(shouldStartCounting) => {
                                // 组件加载完成后 回吐开始倒计时的function 把这个function绑定到当前对象
                                this.shouldStartCounting = shouldStartCounting;
                            }}
                            textStyle={{color: CommonStyle.themeColor}}
                            disableColor={CommonStyle.gray}
                            timerTitle={'获取验证码'}
                            enable={mobile.length > 10 && !codeRequesting}
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
                <TouchableOpacity style={[ThemeStyle.btn_submit, {
                    marginTop: 20,
                    marginLeft: 15,
                    marginRight: 15,
                }]} onPress={this._save.bind(this)}>
                    <Text style={styles.loginText}>保存</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _register() {
        this.push("Register");
    }

    _forgetPassword() {
        const {navigate} = this.props.navigation;
        navigate('Feedback', {isFirst: true});
    }

    _save() {
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
        this.showLoading('保存中..');
        var param = {phone: this.state.mobile, code: this.state.authCode};
        Request.post('/api/user/resetPhone', param).then(rep => {
            if (rep.code == 0) {
                UserStore.save({phone: this.state.mobile});
                this.goBack()
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
            this.showLong('请输入手机号');
            return;
        }
        this.setState({
            authState: '正在请求验证码',
            codeRequesting: true
        })

        var param = {phone: this.state.mobile, type: 5};

        Request.post('/api/user/getAuthCode', param,
            {
                mock: false,
                mockId: 1089766,
            }).then(rep => {
            this.setState({
                authState: `验证码获取${rep.code === 0 ? '成功' : '失败'}`,
                codeRequesting: false
            })
            shouldStartCounting && shouldStartCounting(rep.code === 0)
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

    onChangeAuth(text) {
        this.state.authCode = text;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
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
        height: 45,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formInputSplit: {
        borderBottomWidth: .5,
        borderBottomColor: CommonStyle.lineColor,
    },
    loginInput: {
        height: 42,
        flex: 1,
        fontSize: 18,
        marginTop: 3,
        color:'#333'
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
