import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView, Linking,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Request from "../../utils/Request";
import {BaseComponent} from '../../components/base/BaseComponent'
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {FROMAUTH} from "../../constants/AppConstants";
import ImageView from "../../components/ImageView";
import QIcon from "../../components/icon";
import {CALL_BACK_PUBLISH_HOUSE} from "../../constants/ActionTypes";
import UserStore from "../../store/UserStore";
import Modal from "antd-mobile-rn/es/modal/index.native";


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
            name: '',
            housingAddress: this.props.navigation.state.params.address ? this.props.navigation.state.params.address.communityName : '选择你所居住的小区',
            elementName: this.props.navigation.state.params.address ? this.props.navigation.state.params.address.unitName + this.props.navigation.state.params.address.buildingName : '选择楼栋/单元',
            housingId: this.props.navigation.state.params.address ? this.props.navigation.state.params.address.communityId : '',
            buildingId: this.props.navigation.state.params.address ? this.props.navigation.state.params.address.buildingId : '',
            unitId: this.props.navigation.state.params.address ? this.props.navigation.state.params.address.unitId : '',
            roomName: this.props.navigation.state.params.address ? this.props.navigation.state.params.address.roomName : '',
            roomId: this.props.navigation.state.params.address ? this.props.navigation.state.params.address.roomId : '',
            address: this.props.navigation.state.params.address
        };
    }

    onReady(param) {
        var {isAuth} = UserStore.get();
        var authText = '认证'
        if (isAuth === 0){
            authText = '认证'
        } else if (isAuth === 1){
            authText = '已认证'
        } else if (isAuth === 2){
            authText = '认证中'
        } else if (isAuth === 3){
            authText = '认证失败'
        }
        this.setTitle(authText)
        this.hideHeader(true);
        this.registerCallBack(CALL_BACK_PUBLISH_HOUSE,(e)=>{
            if (e) {
                this.setState({
                    elementName: e.elementName,
                    buildingId: e.buildingId,
                    unitId: e.unitId,
                    roomName: '选择房间号',
                })
            }
        })
    }

    _renderHeader() {
        return (
            <View style={{height: CommonStyle.navHeight}}>
                <View style={{
                    flex: 1, flexDirection: 'row', height: CommonStyle.navContentHeight,
                    marginTop: CommonStyle.navStatusBarHeight, alignItems: 'center', marginLeft: 10, marginRight: 22
                }}>
                    <TouchableView onPress={() => {
                        this.goBack()
                    }}>
                        <QIcon name={'icon-back'} size={25} color={'#fff'}/>
                    </TouchableView>

                    <View style={{flex: 1, height: 50, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 17}}>认证</Text>
                    </View>
                </View>

            </View>
        );
    }

    _render() {
        const {address} = this.state
        console.log(address)
        var {isAuth} = UserStore.get();
        var authText = '提交审核'
        if (isAuth === 0){
            authText = '提交审核'
        } else if (isAuth === 1){
            authText = '重新提交审核'
        } else if (isAuth === 2){
            authText = '提交审核'
        } else if (isAuth === 3){
            authText = '提交审核'
        }
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='position'>

                    <ImageBackground style={{alignItems: 'center', justifyContent: 'center', height: 200}}
                                     source={require('../../img/login_bg.png')}>
                        <Image source={require('../../img/login_logo.png')} style={{
                            width: 116,
                            height: 44, alignItems: 'center'
                        }} resizeMode='cover'/>
                    </ImageBackground>
                    <View style={{position: CommonStyle.absolute, left: 0, top: 0, right: 0,}}>
                        {this._renderHeader()}
                    </View>


                    <View style={{
                        backgroundColor: '#ffffff',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <TouchableView onPress={() => {
                            this.navigate('HousingAddressList', {
                                title: '选择小区',
                                api: '/api/user/selectCommunity'},
                                (data) => {
                                    this.setState({
                                        housingAddress: data.name,
                                        housingId: data.id,
                                        elementName: '选择楼栋/单元',
                                        roomName: '',
                                    })
                                }
                            )
                        }}>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: width,
                                    padding: 10
                                }}>
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
                    <View style={{
                        backgroundColor: '#ffffff',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <TouchableView onPress={() => {
                            if (this.state.housingAddress == '选择你所居住的小区') {
                                this.showShort('请选择小区');
                                return;
                            }
                            this.navigate('ElementList', {
                                title: '选择楼栋/单元',
                                housingId: this.state.housingId,
                                api: '/api/user/selectelement',
                                from: FROMAUTH},
                                (data) => {
                                    this.setState({
                                        element: data.name,
                                        roomName: '选择房间号',
                                    })
                            }, true)
                        }}>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: width,
                                    padding: 10
                                }}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require('../../img/danyuan.png')}
                                           style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                                    <Text
                                        style={{marginLeft: 5}}>{this.state.elementName ? this.state.elementName : "选择楼栋/单元"}</Text>
                                </View>

                                <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                               color="#bbb"/>
                            </View>
                        </TouchableView>

                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                    <View style={{
                        backgroundColor: '#ffffff',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <TouchableView onPress={() => {
                            if (this.state.elementName == '选择楼栋/单元') {
                                this.showShort('请选择楼栋/单元');
                                return;
                            }
                            this.navigate('RoomList', {
                                title: '选择房间号',
                                buildingId: this.state.buildingId,
                                api: '/api/user/selectroom',
                                unitId: this.state.unitId,
                                from: FROMAUTH},
                                 (data) => {
                                    this.setState({
                                        roomName: data.name,
                                        roomId: data.id
                                    })
                            })
                        }}>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: width,
                                    padding: 10
                                }}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require('../../img/fangjianhao.png')}
                                           style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                                    <Text
                                        style={{marginLeft: 5}}>{this.state.roomName ? this.state.roomName : "选择房间号"}</Text>
                                </View>

                                <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                               color="#bbb"/>
                            </View>
                        </TouchableView>

                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                    <View style={{
                        backgroundColor: '#ffffff',
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10
                    }}>
                        <Image source={require('../../img/auth_name.png')}
                               style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                        <TextInput
                            placeholder='输入姓名'
                            style={styles.loginInput}
                            maxLength={11}
                            underlineColorAndroid="transparent"
                            value={this.state.name}
                            onChangeText={(value) => {
                                this.setState({name: value})
                            }}/>

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
                    }} onPress={() => {
                        this._auth()
                    }}>
                        <Text style={styles.loginText}>{authText}</Text>
                    </TouchableOpacity>
                    <TouchableView onPress={()=>{
                        this.onButtonClick('0558-5625395')
                    }}>
                        <View style={{
                            backgroundColor: '#fff',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginTop: 5,
                            marginLeft: 30,
                            marginRight: 30,
                            flexDirection: 'row',
                        }}>
                            <ImageView defaultSource={require("../../img/icon_auth_phone.png")} resizeMode='cover'
                                       style={{width: 13, height: 13}}/>
                            <Text style={{fontSize: 11, color: '#999', marginLeft: 7}}>客服电话</Text>
                        </View>
                    </TouchableView>


                </KeyboardAvoidingView>
                <View style={{
                    backgroundColor: '#f7f7f7',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                    width: '100%',
                    height: 60,
                    flexDirection: 'row',
                    position: CommonStyle.absolute,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}>
                    <ImageView defaultSource={require("../../img/icon_auth_notice.png")} resizeMode='cover'
                               style={{width: 13, height: 13}}/>
                    <Text style={{fontSize: 11, color: '#999', marginLeft: 7}}>提交申请后，我们会在一个工作日之内完成审核</Text>
                </View>
            </View>
        )
    }


    onButtonClick = (tel) => {
        Modal.alert('提示', '是否拨打电话', [
            { text: '取消', onPress: () => {console.log('cancel')}, style: 'cancel' },
            { text: '确定', onPress: () => {
                    console.log('ok')
                    Linking.openURL(`tel:${tel}`)
                } },
        ]);
    };

    _forgetPassword() {
        const {navigate} = this.props.navigation;
        navigate('Feedback', {isFirst: true});
    }

    _auth() {
        var {isAuth} = UserStore.get();
        if (isAuth === 2) {
            this.showShort('认证中');
            return;
        }

            Keyboard.dismiss();
        let {housingAddress, elementName, roomName, roomId, name} = this.state;

        if (housingAddress == '选择你所居住的小区') {
            this.showShort('请选择小区');
            return;
        }
        if (elementName == '选择楼栋/单元') {
            this.showShort('请选择楼栋/单元');
            return;
        }
        if (roomName == '选择房间号') {
            this.showShort('请选择房号');
            return;
        }
        if (!name.length) {
            this.showShort('请输入姓名');
            return;
        }
        this.showLoading('认证中..');
        var param = {roomId: roomId, name: name};
        Request.post('/api/user/auth', param).then(rep => {
            if (rep.code == 0) {
                // UserStore.save(rep.data);
                this.goBack({isAuth: true})
                // NavigationUtil.reset(this.props.navigation, 'Home');
            } else {
                this.showShort(rep.message);
            }

        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    formInput: {
        flexDirection: 'row',
        height: 60,
        padding: 20,
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

});
