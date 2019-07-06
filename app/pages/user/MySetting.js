import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {
    Dimensions,
    Image,
    Modal,
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
            checked:false,
            isShareModal: false

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
                                                thumbImage: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4demz7fuhj203r03rt8k.jpg',
                                                type: 'news',
                                                webpageUrl: 'www.baidu.com'
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
                                    <Text style={styles.spinnerTitle}>微信</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.base}
                                onPress={() => {
                                    WeChat.isWXAppInstalled().then((isInstalled) => {
                                        if (isInstalled) {
                                            WeChat.shareToTimeline({
                                                title: '幸福宜居',
                                                thumbImage: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4demz7fuhj203r03rt8k.jpg',
                                                type: 'news',
                                                webpageUrl: 'www.baidu.com'
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
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
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
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
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

                <View style={[styles.item,styles.itemMarginTop]}>
                    <Text style={styles.text}>新版本检测</Text>
                    <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                   color="#bbb"/>
                </View>
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
        /*Modal.AntdModal.alert('清除缓存', '是否清除缓存', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            { text: '确定', onPress: () => console.log('ok') },
        ]);*/
        Modal.AntdModal.alert('清除缓存', '是否清除缓存', [
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
            {
                text: '确定', onPress: () => {
                    // UserStore.clear();
                    // this.reset('Login')
                }
            },
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
