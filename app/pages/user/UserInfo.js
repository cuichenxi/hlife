import React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native'
import {BaseComponent} from "../../components/base/BaseComponent";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import {ActionSheet, Modal} from "antd-mobile-rn";
import ImagePicker from 'react-native-image-crop-picker';
import Request from "../../utils/Request";
import Icon from 'react-native-vector-icons/Ionicons';
import UserStore from "../../store/UserStore";
import ImageView from "../../components/ImageView";

export default class UserInfo extends BaseComponent {

    navigationBarProps() {
        return {
            title: '用户信息',
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            headerUrl: '',
            userName: '-',
            userPhone: '-',
        };
    }

    actived(param) {
        let userInfo = UserStore.get();
        this.setState({
            headerUrl: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1542198920071/youji.gif',
            // headerUrl: userInfo.headerUrl,
            userName: userInfo.userName,
            userPhone: userInfo.phone,
        })
    }

    _render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: CommonStyle.lineColor, marginTop: 10, height: 0.5}}/>
                <TouchableView style={{height: 50,}} onPress={() => {
                    this._onSelectImage()
                }}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitle}>头像</Text>
                        <ImageView source={{uri: this.state.headerUrl}}
                                   placeholderSource={require("../../img/default_head.png")}
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

                <View style={{backgroundColor: CommonStyle.lineColor, marginTop: 10, height: 0.5}}/>
                <TouchableView style={{height: 45,}} onPress={() => {
                    this._onUpdateNickName()
                }}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitle}>昵称</Text>
                        <Text style={styles.itemSubTitle}>{this.state.userName}</Text>
                        <Icon style={{marginTop: 2}} name="ios-arrow-forward-outline" size={20}
                              color={CommonStyle.color_999}/>
                    </View>
                </TouchableView>
                <View style={{backgroundColor: CommonStyle.lineColor, height: 0.5, marginLeft: 16,}}/>
                <TouchableView style={{height: 45}} onPress={() => {
                    // this._on()
                }}>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitle}>手机号</Text>
                        <Text style={styles.itemSubTitle}>{this.state.userPhone}</Text>
                    </View>
                </TouchableView>
                <View style={{backgroundColor: CommonStyle.lineColor, height: 0.5}}/>
                <TouchableOpacity style={styles.loginOutBtn} onPress={this._logout.bind(this)}>
                    <Text style={{fontSize: 16, color: CommonStyle.white}}>退出登录</Text>
                </TouchableOpacity>
            </View>
        );

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
                        console.log(image);
                        this.setState({
                            headerUrl: image.path
                        })
                    });
                } else {
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
        this.showDLoading();
        Request.uploadFile('login.do', files,
            {mock: false, mockId: 672823})
            .then(rep => {
                this.showLong(rep.bstatus.desc);
            }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
    }

    _onUpdateNickName() {
        Modal.prompt(
            null,
            '修改昵称',
            (nickName) => {
                this.setState({
                    userName: nickName
                })
            },
            'default',
            null,
            ['请输入昵称'],
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
        fontSize: 18
    },
    itemSubTitle: {
        color: CommonStyle.color_666,
        fontSize: 14
        ,
        marginRight: 10
    },
    loginOutBtn: {
        marginTop: 160,
        width: '80%',
        height: 44,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: CommonStyle.red,
        alignItems: 'center',
        borderRadius: 3,
    },
})
