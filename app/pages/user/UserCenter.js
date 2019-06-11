import React from 'react'
import {
    Text,
    View,
    Linking,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'

import FIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Ionicons'
import {BaseComponent} from "../../components/base/BaseComponent";
import {CommonStyle} from "../../common/CommonStyle";
import QIcon from '../../components/icon';
import LinearGradient from 'react-native-linear-gradient';
import ItemArrow from "../../components/ItemArrow";
import UserStore from "../../store/UserStore";
import ImageView from "../../components/ImageView";
import {Modal} from "antd-mobile-rn/lib/index.native";
import ToastUtil from "../../utils/ToastUtil";

let {width, height} = Dimensions.get('window')

export default class UserCenter extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
            xiaoqu: '矩阵',
            headerUrl: '',
            userName: '-',
            userPhone: '-',
        }
        this.config = [

            {icon: "ios-pin", name: "设置", onPress: this.goPage.bind(this, "UserInfo")},
            {icon: "ios-heart", name: "关于", color: "#fc7b53", onPress: this.goPage.bind(this, "AboutPage")},
            {icon: "ios-pin", name: "收货地址", onPress: this.goPage.bind(this, "address")},
            {icon: "ios-heart", name: "红包", color: "#fc7b53", onPress: this.goPage.bind(this, "RedPacket")},
            {icon: "ios-heart", name: "我的收藏", color: "#fc7b53", onPress: this.goPage.bind(this, "address")},
            {icon: "md-images", name: "我的小区", subName: this.state.xiaoqu, onPress: this.goPage.bind(this, "address")},
            {icon: "logo-usd", name: "缴费记录", subName: "5元现金", onPress: this.goPage.bind(this, "address")},
            {icon: "ios-cart", name: "维修记录", subName: "0元好物在这里", onPress: this.goPage.bind(this, "MaintainRecord")},
            {icon: "ios-medal", name: "联系客服", subName: "未开通", onPress: this.goPage.bind(this, "contactUs")},
            {icon: "md-flower", name: "关于我们", onPress: this.goPage.bind(this, "AboutPage")},
            {icon: "md-flower", name: "BarcodePage", onPress: this.goPage.bind(this, "BarcodePage")},
            {icon: "md-flower", name: "支付调试", onPress: this.goPage.bind(this, "PayPage")},
            {icon: "md-flower", name: "CodePushPage", onPress: this.goPage.bind(this, "CodePushPage")},
            {icon: "md-flower", name: "GiftedListDemo", onPress: this.goPage.bind(this, "GiftedListDemo")},
            {icon: "md-flower", name: "GiftedListDemoNet", onPress: this.goPage.bind(this, "GiftedListDemoNet")},
            {icon: "md-flower", name: "GiftedListDemoFree", onPress: this.goPage.bind(this, "GiftedListDemoFree")},
            {icon: "md-flower", name: "我的地址", onPress: this.goPage.bind(this, "MyAddress")},
        ]
    }

    goPage(data = {}) {
        if (data === 'contactUs') {
            Modal.alert('提示', '联系客服', [
                {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
                {
                    text: '确定', onPress: () => {
                        Linking.openURL("tel:10086")
                    }
                },
            ]);
        } else {
            this.navigate(data);
        }
    }

    goProfile() {
        // this.navigate("RedPacket", {
        //     callback: (data) => {
        //         ToastUtil.showShort(data.price)
        //     }
        // })
        this.navigate('UserInfo')
    }

    canExitApp() {
        return true;
    }

    onReady(param) {
        let userInfo = UserStore.get();
        this.setState({
            // headerUrl: userInfo.headerUrl,
            headerUrl: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1542198920071/youji.gif',
            userName: userInfo.userName,
            userPhone: userInfo.phone,
        })
    }

    _renderListItem() {
        return this.config.map((item, i) => {
            return (<ItemArrow key={i} {...item}/>)
        })
    }

    _renderNavBar() {
        return (
            <View style={{
                position: 'absolute', flex: 1,
                flexDirection: 'row', height: CommonStyle.navContentHeight, width: width,
                marginTop: CommonStyle.navStatusBarHeight, justifyContent: 'space-between', alignItems: 'center'
            }}>

                <TouchableOpacity>
                    <View style={{
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: 'flex-end', width: 40
                    }}>
                        {/*<QIcon style={{alignSelf: 'center'}} name={'icon-home'} size={16}*/}
                        {/*color={CommonStyle.lightGray}></QIcon>*/}
                    </View>
                </TouchableOpacity>
                <Text style={{
                    fontSize: CommonStyle.navTitleFont,
                    color: CommonStyle.navTitleColor,
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>我的</Text>
                <TouchableOpacity onPress={() => this.goProfile()}>
                    <View style={{
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: 'flex-end', width: 40
                    }}>
                        <FIcon style={{alignSelf: 'center'}} name={'settings'} size={18}
                               color={CommonStyle.white}></FIcon>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: CommonStyle.bgColor}}>
                <ScrollView style={styles.scrollView}>
                    <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0, y: .8}}
                                    colors={['#63D5A2', CommonStyle.themeColor]}
                                    style={{height: 180}}>
                        <TouchableOpacity style={{height: 180}} onPress={() => this.goProfile()}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 16,
                                marginTop: CommonStyle.navHeight
                            }}>
                                <ImageView source={{uri: this.state.headerUrl}}
                                           placeholderSource={require("../../img/default_head.png")}
                                           style={{
                                               width: 60,
                                               height: 60,
                                               overflow: "hidden",
                                               borderRadius: 30
                                           }}/>
                                <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                                    <Text style={{color: "#fff", fontSize: (18)}}>{this.state.userName}</Text>
                                    <View style={{marginTop: (10), flexDirection: "row"}}>
                                        <Icon name="ios-phone-portrait-outline" size={(14)} color="#fff"/>
                                        <Text
                                            style={{
                                                color: "#fff",
                                                fontSize: 13,
                                                paddingLeft: 5
                                            }}>{this.state.userPhone}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={{
                        flex: 1,
                        backgroundColor: CommonStyle.lineColor,
                        height: .5
                    }}/>
                    <View style={{marginTop: 10}}>
                        {this._renderListItem()}
                    </View>
                </ScrollView>
                {this._renderNavBar()}
            </View>
        );
    }
};
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: CommonStyle.bgColor
    },
    orderItem: {justifyContent: 'center', alignItems: 'center'},
    orderItemIcon: {textAlign: 'center', width: 40, marginTop: 8,},
    orderItemText: {
        fontSize: 12,
        color: CommonStyle.color_666,
        flex: 1,
        marginTop: 4,
        textAlign: 'center'
    },
})
