import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
// import Toast from '../../utils/ToastUtil';
import Request from "../../utils/Request";
// import * as Storage from '../common/Storage';
// import RegisterContainer from '../containers/RegisterContainer';
// import {userLogin} from '../actions/userActions';
// import Loading from '../components/Loading';
import store from 'react-native-simple-store';
import {Toast, Modal} from 'antd-mobile-rn';
import StorageUtil from "../../utils/StorageUtil";
import UserStore from "../../store/UserStore";
import {Loading} from "../../utils/Loading";
import {BaseComponent} from '../../components/base/BaseComponent'
import NavigationUtil from "../../utils/NavigationUtil";

export default class LoginPage extends BaseComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '用户登录1',
        title: '用户登录1',
        headerLeft: null,
        gesturesEnabled: false
    });

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
        };
    }

    componentWillUnmount() {
        // this.unsubscribe();
    }

    componentDidMount() {
        // Storage.getUser()
        // .then((user) => {
        //     if (user.id) {
        //         this.props.navigator.popToTop();
        //     }
        // });
        this.setCanBack(false);
    }


    componentWillUpdate(nextProps, nextState) {
        InteractionManager.runAfterInteractions(() => {
            // const {userReducer} = this.props;
            // if (userReducer.user.id) {
            //     this.props.navigator.popToTop();
            // }
            // if (!userReducer.isLoading && userReducer.status == false) {
            // Toast.showLong(userReducer.message);
            // }
        });
    }

    render() {
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
        // InteractionManager.runAfterInteractions(() => {
        //     this.props.navigator.push({
        //         name: 'RegisterContainer',
        //         component: RegisterContainer,
        //         passProps: {
        //             ...this.props,
        //         }
        //     })
        // });
        // Modal.prompt(
        //     'Name',
        //     'name message',
        //     (password) => console.log(`password: ${password}`),
        //     'default',
        //     null,
        //     ['please input name'],
        // );
        // console.log(caches);
        // StorageUtil.save('test','xx');
        // var s =StorageUtil.get('test');
        // console.log('s=' + s);
        // let token = UserStore.get().token;
        // console.log("loginpage token=" + token);
        // // Loading.show();
        // Toast.loading('Loading...', 0, () => {
        //     console.log('Load complete !!!');
        // });
        // this.showShort('退出');
        this.showDLoading()
    }

    _forgetPassword() {
        const {navigate} = this.props.navigation;
        navigate('Feedback', {isFirst: true});
    }

    _login() {
        let {mobile, password} = this.state;

        if (!mobile.length) {
            this.showLong('请输入正确的手机号');
            return;
        }
        if (!password.length) {
            this.showLong('请输入密码');
            return;
        }
        InteractionManager.runAfterInteractions(() => {
            this.showLoading('登录中..');
            Request.post('login.do',
                {phone: "15811508404", code: 123456},
                {mock: true, mockId: 672823})
                .then(rep => {
                    if (rep.bstatus.code === 0) {
                        UserStore.save({token: '12341234'});
                        NavigationUtil.reset(this.props.navigation, 'Home');
                    }
                    this.showLong(rep.bstatus.desc);
                }).catch(err => {
            }).done(() => {
                this.hideLoading();
            })
        });
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

class RegisterBtn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigator.push({'id': 'register'})}>
                <Text>注册</Text>
            </TouchableOpacity>
        )
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
        borderBottomWidth: 1,
        borderBottomColor: '#dbdada',
    },
    loginInput: {
        height: 40,
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
    },

    loginBtn: {
        backgroundColor: '#ff6836',
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