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
import TouchableView from "../../components/TouchableView";
import ImageView from "../../components/ImageView";
import * as WeChat from "react-native-wechat";
import DeviceInfo from "react-native-device-info";

const shareIconWechat = require('../../img/share_icon_wechat.png');
export default class TrafficPermit extends BaseComponent{
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.fromElectronKey?'宜居通行证':'宜居访客通行证',
        }
    }

    constructor(props) {
        super(props);
        this.state={
            data: this.props.navigation.state.params.data,
            isShareModal: false,
        }
    }

    renderSpinner = () => {
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
                            发送给
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
                                                webpageUrl: this.state.data.imageUrl
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
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    _render() {
        const {data} = this.state
        return (
            <View style={{flex: 1}}>
                <View style={{justifyContent: 'center',alignItems: 'center',marginTop:36}}>
                    <Text style={{color:CommonStyle.themeColor,fontSize:14}}>{data.lockName}</Text>
                </View>
                <Text style={{color:CommonStyle.textBlockColor,padding:10}}>尊敬的{data.name}:</Text>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    <ImageView source={data.imageUrl}
                               defaultSource={require("../../img/default_image.png")}
                           style={{width: 182, height: 182, resizeMode: 'contain'}}/>
                </View>
                <Text style={{color:CommonStyle.themeColor,padding: 10,marginTop:10,fontSize:12}}>有效时间:{data.endTime}</Text>
                <Text style={{color:CommonStyle.textGrayColor,padding:10,fontSize:12}}>进入小区的时候,将二维码放置在门禁读头</Text>

                <TouchableView style={{
                    height: 40,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 20,
                    borderRadius: 30,
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=>{
                    this.setState({
                        isShareModal: true
                    });
                }}>
                    <Text style={{color: '#ffffff', fontSize: 15}}>发送给好友</Text>
                </TouchableView>
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
        );
    }

}

const styles = StyleSheet.create(
    {
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

