import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {
    Dimensions,
    Image,
    Modal, Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Switch from "antd-mobile-rn/es/switch/index.native";
import TouchableView from "../../components/TouchableView";
import {GIVEADVICE} from "../../constants/AppConstants";
import * as WeChat from "react-native-wechat";
import DeviceInfo from "react-native-device-info";
import AntDModal from "antd-mobile-rn/es/modal/index.native";
import {CPKEY} from "../../constants/CPKC";

import CodePush from 'react-native-code-push';
const shareIconWechat = require('../../img/share_icon_wechat.png');
const shareIconMoments = require('../../img/share_icon_moments.png');
const Font = {
    Ionicons,
    FontAwesome
}
export default class MySetting extends BaseComponent{
    navigationBarProps() {
        return ({
            title: '设置'
        })
    }

    constructor(props) {
        super(props);
        this.state={
            checked:true,
            isShareModal: false,
            cacheSize:Math.floor(Math.random() * (1 - 5)) + 5
        }
    }

    renderSpinner = () => {
        const {params} = this.props.navigation.state;
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState({
                        isShareModal: false
                    });
                }}
            >
                <View key="spinner" style={styles.spinner}>
                    <View style={styles.spinnerContent}>
                        <Text
                            style={[styles.spinnerTitle, {fontSize: 20, color: 'black'}]}
                        >
                            分享到
                        </Text>
                        <View style={styles.shareParent}>
                            <TouchableOpacity
                                style={styles.base}
                                onPress={() => {
                                    WeChat.isWXAppInstalled().then((isInstalled) => {
                                        if (isInstalled) {
                                            WeChat.shareToSession({
                                                title: '幸福宜居',
                                                description: '分享自:' + DeviceInfo.getApplicationName(),
                                                thumbImage: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4qeaqe4arj2040040745.jpg',
                                                type: 'news',
                                                webpageUrl: 'https://www.pgyer.com/6vsc'
                                            }).catch((error) => {
                                                this.showShort(error.message, true);
                                            });
                                        } else {
                                            this.showShort('没有安装微信软件，请您安装微信之后再试', true);
                                        }
                                    });
                                }}
                            >
                                <View style={styles.shareContent}>
                                    <Image style={styles.shareIcon} source={shareIconWechat}/>
                                    <Text style={styles.spinnerTitle}>好友</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.base}
                                onPress={() => {
                                    WeChat.isWXAppInstalled().then((isInstalled) => {
                                        if (isInstalled) {
                                            WeChat.shareToTimeline({
                                                title: '幸福宜居',
                                                thumbImage: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4qeaqe4arj2040040745.jpg',
                                                type: 'news',
                                                webpageUrl: 'https://www.pgyer.com/6vsc'
                                            }).catch((error) => {
                                                this.showShort(error.message, true);
                                            });
                                        } else {
                                            this.showShort('没有安装微信软件，请您安装微信之后再试', true);
                                        }
                                    });
                                }}
                            >
                                <View style={styles.shareContent}>
                                    <Image style={styles.shareIcon} source={shareIconMoments}/>
                                    <Text style={styles.spinnerTitle}>朋友圈</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };


    _render(){
        const {cacheSize} = this.state
        return(
            <View>
                <View style={[styles.item,styles.itemMarginTop]}>
                    <Text style={styles.text}>是否接收提醒</Text>
                    <Switch checked={this.state.checked}
                            onChange={(value)=>{
                                this.setState({
                                    checked:value
                                })
                            }}
                            color={CommonStyle.themeColor}
                    />
                </View>
                <TouchableView onPress={()=>{
                    this.navigate('About')
                }}>
                    <View style={[styles.item,styles.itemMarginTop]}>
                        <Text style={styles.text}>关于幸福宜居</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#999',fontSize:14,marginRight: 6}}>当前版本V{DeviceInfo.getVersion()}</Text>
                            <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>
                        </View>

                    </View>
                </TouchableView>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                <TouchableView onPress={()=>{
                    this.setState({
                        isShareModal: true
                    });
                }}>
                    <View style={styles.item}>
                        <Text style={styles.text}>邀请家人朋友</Text>
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>
                </TouchableView>

                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                <TouchableView onPress={()=>{
                    this.onButtonClick()
                }}>
                    <View style={styles.item}>
                        <Text style={styles.text}>清除缓存</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#999',fontSize:14,marginRight: 6}}>{cacheSize}MB</Text>
                            <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>
                        </View>
                    </View>
                </TouchableView>

                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                <TouchableView onPress={()=>{
                    this.navigate('CommitInfo', {title: '意见反馈', hideUpload: true,commitType:GIVEADVICE})
                }}>
                    <View style={styles.item}>
                        <Text style={styles.text}>意见反馈</Text>
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>
                </TouchableView>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                <TouchableView onPress={()=>{
                    this.push('Web', {article: {title: '隐私政策', url: 'http://115.28.21.13:8080/wap/privacy'}})
                }}>
                    <View style={styles.item}>
                        <Text style={styles.text}>隐私政策</Text>
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>
                </TouchableView>

                {
                    Platform.OS === 'ios'?<View style={{width:0}}/>:
                        <TouchableView style={[styles.item,styles.itemMarginTop]} onPress={()=>{
                            this.showLoading("检测中...")
                            setTimeout(()=>{
                                this.hideLoading()
                            },2000)
                            CodePush.sync({
                                deploymentKey: false ? CPKEY.CP_KEY_STAGING : CPKEY.CP_KEY_PRO,
                                updateDialog: {
                                    optionalIgnoreButtonLabel: '稍后',
                                    optionalInstallButtonLabel: '更新',
                                    optionalUpdateMessage: '幸福宜居有新版本了，是否更新？',
                                    title: '更新提示'
                                },
                                installMode: CodePush.InstallMode.IMMEDIATE
                            });
                        }}>
                            <Text style={styles.text}>版本检测</Text>
                            <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>
                        </TouchableView>
                }

                <Modal
                    animationType="fade"
                    visible={this.state.isShareModal}
                    transparent
                    onRequestClose={() => {
                        this.setState({
                            isShareModal: false
                        });
                    }}
                >
                    {this.renderSpinner()}
                </Modal>
            </View>
        )
    }

    onButtonClick()  {
        AntDModal.alert('清除缓存', '是否清除缓存', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            { text: '确定', onPress: () => {
                    // Math.floor(Math.random() * (1 - 5)) + 5
                    this.setState({
                        cacheSize:0
                    })
                }},
        ]);
    };

}

const styles = StyleSheet.create(
    {
        item:{
            backgroundColor: 'white',
            height:50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
            paddingLeft: 20,
            paddingRight: 20,
        },
        itemMarginTop:{
            marginTop:10
        },
        text:{
            textAlign: 'center', color: CommonStyle.textBlockColor,fontSize:14
        },

        base: {
            flex: 1
        },
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#FFF'
        },
        spinner: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.65)'
        },
        spinnerContent: {
            justifyContent: 'center',
            width: Dimensions.get('window').width * (7 / 10),
            height: Dimensions.get('window').width * (7 / 10) * 0.68,
            backgroundColor: '#fcfcfc',
            padding: 20,
            borderRadius: 5
        },
        spinnerTitle: {
            fontSize: 18,
            color: '#313131',
            textAlign: 'center',
            marginTop: 5
        },
        shareParent: {
            flexDirection: 'row',
            marginTop: 20
        },
        shareContent: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        shareIcon: {
            width: 40,
            height: 40
        }
    }
)
