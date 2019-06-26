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
import TouchableView from "../../components/TouchableView";
import ToastUtil from "../../utils/ToastUtil";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

var {width, height} = Dimensions.get('window');
const Font = {
    Ionicons,
    FontAwesome
}

export default class AuthPage extends BaseComponent {
    navigationBarProps() {
        return {
            // hiddenLeftItem: true,
            title: '认证',
            // gesturesEnabled: false
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
            authCode: '',
            housingAddress: '选择你所居住的小区',
            element: '选择楼栋/单元室',
            idType: '选择身份',
            housingId: '',
        };
    }

    canBack() {
        return false;
    }


    _render() {
        const {mobile} = this.state
        return (
            <View style={styles.container}>
                <ImageBackground style={{alignItems: 'center', justifyContent: 'center', height: 200}}
                                 source={require('../../img/login_bg.png')}>
                    <Image source={require('../../img/login_logo.png')} style={{
                        width: 173,
                        height: 66, alignItems: 'center'
                    }} resizeMode='cover'/>
                </ImageBackground>


                <View style={{backgroundColor: '#ffffff', height: 60,justifyContent:'center',alignItems:'center'}}>

                    <TouchableView onPress={() => {
                        this.navigate('HousingAddressList', {
                            title: '选择小区',
                            api: 'api/user/selectCommunity',
                            callback: (data) => {
                                ToastUtil.showShort(data.name);
                                this.setState({
                                    housingAddress: data.name,
                                    housingId: data.id
                                })
                            }
                        })
                    }}>

                        <View
                            style={{flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', width: width, padding: 10}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../../img/xiaoqu.png')}
                                       style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                                <Text style={{marginLeft: 5}}>{this.state.housingAddress}</Text>
                            </View>

                            <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>
                        </View>
                    </TouchableView>

                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={{backgroundColor: '#ffffff', height: 60,justifyContent:'center',alignItems:'center'}}>

                    <TouchableView onPress={() => {
                        this.navigate('HousingAddressList', {
                            title: '选择楼栋/单元',
                            api: 'api/user/selectCommunity',
                            callback: (data) => {
                                ToastUtil.showShort(data.name);
                                this.setState({
                                    element: data.name,
                                })
                            }
                        })
                    }}>

                        <View
                            style={{flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', width: width, padding: 10}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../../img/danyuan.png')}
                                       style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                                <Text
                                    style={{marginLeft: 5}}>{this.state.elementName ? this.state.elementName : "选择小区的苑、幢、单元室"}</Text>
                            </View>

                            <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>
                        </View>
                    </TouchableView>

                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={{
                    backgroundColor: '#ffffff',
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10
                }}>
                    <Image source={require('../../img/auth_name.png')}
                           style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_name"
                        placeholder='输入姓名'
                        style={styles.loginInput}
                        keyboardType='numeric'
                        maxLength={11}
                        underlineColorAndroid="transparent"
                        onChangeText={this.onChangeMobile.bind(this)}/>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <TouchableOpacity style={{
                    height: 40,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 20,
                    borderRadius: 30,
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={this._login.bind(this)}>
                    <Text style={styles.loginText}>认证</Text>
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
                this.goBack({isAuth:true})
                // NavigationUtil.reset(this.props.navigation, 'Home');
            } else {
                this.showShort(rep.message);
            }

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

    onChangeAuth(text) {
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
