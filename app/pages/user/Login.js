import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import Request from "../../utils/Request";
import UserStore from "../../store/UserStore";
import {BaseComponent} from '../../components/base/BaseComponent'
import NavigationUtil from "../../utils/NavigationUtil";
import {CommonStyle} from "../../common/CommonStyle";

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
        };
    }

    canBack() {
        return false;
    }


    _render() {
        return (
            <View style={styles.container}>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../../img/user.png')}
                           style={{marginTop: 7, width: 20, height: 20, resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_name"
                        placeholder='请输入手机号'
                        style={styles.loginInput}
                        underlineColorAndroid="transparent"
                        onChangeText={this.onChangeMobile.bind(this)}/>
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../../img/passicon.png')}
                           style={{marginTop: 7, width: 20, height: 20, resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_psw"
                        style={styles.loginInput}
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        placeholder='请输入密码'
                        onChangeText={this.onChangePassword.bind(this)}/>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={this._login.bind(this)}>
                    <Text style={styles.loginText}>登录</Text>
                </TouchableOpacity>
                <View style={styles.registerWrap}>
                    <TouchableOpacity style={{alignItems: 'flex-start', flex: 1}}
                                      onPress={this._forgetPassword.bind(this)}>
                        <Text style={{color: '#62a2e0'}}>忘记密码?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}} onPress={this._register.bind(this)}>
                        <Text style={{color: '#62a2e0'}}>立即注册</Text>
                    </TouchableOpacity>
                </View>
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
        let {mobile, password} = this.state;

        if (!mobile.length) {
            this.showLong('请输入正确的手机号');
            return;
        }
        if (!password.length) {
            this.showLong('请输入密码');
            return;
        }
        this.showLoading('登录中..');
        var param = {phone: this.state.mobile, password: this.state.password};
        Request.post('/api/loginbyPhonepass', param,
            {
                mock: true,
                mockId: 672823,
                cache: 1,
            },(cacheRep)=>{
                if (cacheRep) {
                    UserStore.save(cacheRep.data);
                    // NavigationUtil.reset(this.props.navigation, 'Home');
                }
            }).then(rep => {
            if (rep.code == 0&&rep.data) {
                UserStore.save(rep.data);
                NavigationUtil.reset(this.props.navigation, 'Home');
            }
                // this.showShort(rep.bstatus.desc);
            }).catch(err => {
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    formInputSplit: {
        borderBottomWidth: .5,
        borderBottomColor: CommonStyle.lineColor,
    },
    loginInput: {
        height: 40,
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
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