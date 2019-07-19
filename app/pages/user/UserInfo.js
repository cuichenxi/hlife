import React from 'react'
import {Keyboard, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import {BaseComponent} from "../../components/base/BaseComponent";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import {ActionSheet, Modal,DatePicker} from "antd-mobile-rn";
import ImagePicker from 'react-native-image-crop-picker';
import Request from "../../utils/Request";
import Icon from 'react-native-vector-icons/Ionicons';
import UserStore from "../../store/UserStore";
import ImageView from "../../components/ImageView";
import List from "antd-mobile-rn/es/list/index.native";
import {ThemeStyle} from "../../common/ThemeStyle";

export default class UserInfo extends BaseComponent {

    navigationBarProps() {
        return {
            title: '个人资料',
            rightTitle:(
                '保存'
            ),
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            avatar: '',
            userName: '-',
            nickName: '-',
            userPhone: '-',
            gender: 1,
            sign: '',
            birthday: '',
            date: undefined,
        };
    }

    onReady(param) {
        let userInfo = UserStore.get();
        this.setState({
            gender: userInfo.gender,
            sign: userInfo.sign,
            birthday: userInfo.birthday,
            avatar: userInfo.avatar,
            userName: userInfo.userName,
            userPhone: userInfo.phone,
            nickName: userInfo.nickName,
        })
    }
    onRightPress(){
        this.updateUserInfo();
    }
    //{"avatar":"http://115.28.21.13/images/1561829802433.jpg",
    // "birthday":null
    // ,"gender":1,"isAuth":1,
    // "nickName":"Tracy",
    // "phone":"15811508401",
    // "sign":"你在哪里呀",
    // "token":null,"
    // userName":"15811508404"}
    updateUserInfo(){
        this.showLoading('保存信息中...')
        var param ={
            gender: this.state.gender,
            sign: this.state.sign,
            birthday: this.state.birthday,
            avatar: this.state.avatar,
            userName: this.state.userName,
            userPhone: this.state.phone,
            nickName: this.state.nickName,
        }
        Request.post('/api/user/userInfoUpdate', param)
            .then(rep => {
                if (rep.code == 0 && rep.data) {
                    UserStore.save({
                        isAuth:rep.data.isAuth,
                        userName: rep.data.userName,
                        phone:rep.data.phone,
                        avatar: rep.data.avatar,
                        sign: rep.data.sign,
                        gender: rep.data.gender,
                        birthday: rep.data.birthday,
                        nickName: rep.data.nickName,
                    });
                    this.setState({
                        gender: rep.data.gender,
                        sign: rep.data.sign,
                        birthday: rep.data.birthday,
                        avatar: rep.data.avatar,
                        userName: rep.data.userName,
                        userPhone: rep.data.phone,
                        nickName: rep.data.nickName,
                    })
                }
            }).catch(err => {

        }).done(() => {
            this.hideLoading()
        })
    }

    dateToString(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString();
        var day = (date.getDate()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        var dateTime = year + "-" + month + "-" + day;
        console.log(dateTime)
        return dateTime;
    }

    onUpdatePhone(){
        this.navigate('ModifyPhone',{},(e)=>{
                this.setState({
                    userPhone: e.phone,
                })
            })
    }

    _render() {
        console.log(this.state.birthday)
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: CommonStyle.lineColor, marginTop: 10, height: 0.5}}/>
                <TouchableView style={{height: 50,}} onPress={() => {
                    this._onSelectImage()
                }}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitle}>头像</Text>
                        <ImageView source={ this.state.avatar}
                                   defaultSource={require("../../img/default_head.png")}
                                   style={{
                                       width: 40,
                                       height: 40,
                                       resizeMode: "cover",
                                       overflow: "hidden",
                                       borderRadius: 20
                                   }}/>
                        <Icon style={{marginLeft: 10, marginTop: 2}} name="ios-arrow-forward-outline" size={20}
                              color={CommonStyle.color_999}/>
                    </View>
                </TouchableView>
                <View style={{backgroundColor: CommonStyle.lineColor, height: 0.5}}/>

                <TouchableView style={{height: 45,}} onPress={() => {
                    this._onUpdateUserName()
                }}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitle}>姓名</Text>
                        <Text style={styles.itemSubTitle}>{this.state.userName}</Text>
                        <Icon style={{marginTop: 2}} name="ios-arrow-forward-outline" size={20}
                              color={CommonStyle.color_999}/>
                    </View>
                </TouchableView>
                <View style={{backgroundColor: CommonStyle.lineColor, height: 0.5}}/>
                <TouchableView style={{height: 45,}} onPress={() => {
                    this.onUpdateNickName()
                }}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitle}>昵称</Text>
                        <Text style={styles.itemSubTitle}>{this.state.nickName}</Text>
                        <Icon style={{marginTop: 2}} name="ios-arrow-forward-outline" size={20}
                              color={CommonStyle.color_999}/>
                    </View>
                </TouchableView>
                <View style={{backgroundColor: CommonStyle.lineColor, height: 0.5, marginLeft: 16,}}/>
                <TouchableView style={{height: 45}} onPress={() => {
                    this.onUpdatePhone();
                }}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitle}>手机号</Text>
                        <Text style={styles.itemSubTitle}>{this.state.userPhone}</Text>
                        <Icon style={{marginTop: 2}} name="ios-arrow-forward-outline" size={20}
                              color={CommonStyle.color_999}/>
                    </View>
                </TouchableView>
                <View style={{backgroundColor: CommonStyle.lineColor, height: 0.5}}/>
                <TouchableView style={{height: 45}} onPress={() => {
                    this.onUpdateGender()
                }}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitle}>性别</Text>
                        <Text style={styles.itemSubTitle}>{this.state.gender==1?'男':'女'}</Text>
                        <Icon style={{marginTop: 2}} name="ios-arrow-forward-outline" size={20}
                              color={CommonStyle.color_999}/>
                    </View>

                </TouchableView>
                <List>
                    <DatePicker
                        value={this.state.date}
                        mode="date"
                        minDate={new Date(1900, 1, 1)}
                        maxDate={new Date()}
                        onChange={this.onChange}
                        format="YYYY-MM-DD"
                        title={'出生日期'}
                        extra={this.state.birthday}
                    >
                        <List.Item arrow="horizontal" extra={''}><Text style={{color: CommonStyle.color_333, fontSize: 14}}>出生日期</Text></List.Item>
                    </DatePicker>
                </List>
                <View style={{backgroundColor: CommonStyle.lineColor, marginTop: 10, height: 0.5}}/>
                <TouchableView style={{height: 45}} onPress={() => {
                    this.onSign();
                }}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitle}>个性签名</Text>
                        <Text style={styles.itemSubTitle}>{this.state.sign?this.state.sign:'更新签名'}</Text>
                        <Icon style={{marginTop: 2}} name="ios-arrow-forward-outline" size={20}
                              color={CommonStyle.color_999}/>
                    </View>
                </TouchableView>

                <View style={{backgroundColor: CommonStyle.lineColor, marginTop: 10, height: 0.5}}/>
                <TouchableView style={{height: 45}} onPress={() => {
                    this.navigate('PaymentVerification')
                }}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitle}>支付密码</Text>
                        <Text style={styles.itemSubTitle}>  </Text>
                        <Icon style={{marginTop: 2}} name="ios-arrow-forward-outline" size={20}
                              color={CommonStyle.color_999}/>
                    </View>
                </TouchableView>
                <View style={{backgroundColor: CommonStyle.lineColor, height: 0.5}}/>
                <TouchableOpacity style={[ThemeStyle.btn_submit,{
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 50,
                    backgroundColor: CommonStyle.red
                }]} onPress={this._logout.bind(this)}>
                    <Text style={{fontSize: 17, color: CommonStyle.white}}>退出登录</Text>
                </TouchableOpacity>
            </View>
        );

    }

    onChange = (value) => {
        console.log(value)
        this.setState({birthday: this.dateToString(value)})
        this.setState({date: value});
    }

    _logout() {
        Modal.alert('提示', '确定退出登录', [
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
            {
                text: '确定', onPress: () => {
                    UserStore.clear();
                    this.reset('Login')
                }
            },
        ]);
    }

    _onSelectImage() {
        const BUTTONS = [
            '相册',
            '相机',
            '取消',
        ];
        ActionSheet.showActionSheetWithOptions(
            {
                options: BUTTONS,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    ImagePicker.openPicker({
                        width: 300,
                        height: 300,
                        cropping: true
                    }).then(image => {
                        let files = [
                            {
                                filePath: image.path,
                                fileType: image.mime,
                            }
                        ]
                        this._uploadHeader(files);
                    });
                } else if (buttonIndex == 1) {
                    ImagePicker.openCamera({
                        width: 300,
                        height: 300,
                        cropping: true
                    }).then(image => {
                        console.log(image);
                    });
                }
            },
        );
    }

    _uploadHeader(files) {
        this.showLoading('上传中...')
        Keyboard.dismiss();
        Request.uploadFile('/api/user/batchUpdateImage', files)
            .then(rep => {
                if (rep.code === 0&&rep.data){
                    this.setState({
                        avatar: rep.data[0]
                    })
                }else {
                    this.showShort(rep.message)
                }
            }).catch(err => {
            this.showShort(err)
        }).done(() => {
            this.hideLoading();
        })

    }
    _onUpdateUserName() {
        Modal.prompt(
            null,
            '修改姓名',
            (value) => {
                this.setState({
                    userName: value
                })
            },
            'default',
            null,
            ['请输入姓名'],
        );
    }
    onUpdateNickName() {
        Modal.prompt(
            null,
            '修改昵称',
            (value) => {
                this.setState({
                    nickName: value
                })
            },
            'default',
            null,
            ['请输入昵称'],
        );
    }
    onSign() {
        Modal.prompt(
            null,
            '更新签名',
            (value) => {
                this.setState({
                    sign: value
                })
            },
            'default',
            null,
            ['请输入签名'],
        );
    }
    onUpdateGender(){
        const BUTTONS = [
            '男',
            '女',
            '取消',
        ];
        ActionSheet.showActionSheetWithOptions(
            {
                options: BUTTONS,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    this.setState({
                            gender:1
                        }
                    )
                } else if (buttonIndex == 1) {
                    this.setState({
                            gender:2
                        }
                    )
                }
            },
        );
    }

    _onUpdatePaymentCode(){
        Modal.prompt(
            '修改支付密码',
            '密码信息',
            (password) => console.log(`password: ${password}`),
            'secure-text',
            'defaultValue',
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle: {
        flex: 1,
        paddingRight: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: CommonStyle.white,
        justifyContent: "space-between",
        paddingLeft: 16,
    },
    itemTitle: {
        flex: 1,
        color: CommonStyle.color_333,
        fontSize: 14
    },
    itemSubTitle: {
        color: CommonStyle.color_666,
        fontSize: 13
        ,
        marginRight: 10
    },
    loginOutBtn: {
        // marginTop: 120,
        // width: '80%',
        // height: 44,
        // alignSelf: 'center',
        // justifyContent: 'center',
        // backgroundColor: CommonStyle.themeColor,
        // alignItems: 'center',
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: CommonStyle.themeColor,
        justifyContent: 'center',
        height: 40,
        width: '80%',
        // textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        marginBottom: 50
    },
})
