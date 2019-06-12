import React from 'react'
import {
    Text,
    View,
    Linking,
    StyleSheet,
    ScrollView,
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
import TouchableView from "../../components/TouchableView";


export default class UserCenter extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            headerUrl: '',
            userName: '-',
            userPhone: '-',
        }
        this.config = [
            {icon: "ios-pin", name: "我的订单", first:true,onPress: this.goPage.bind(this, "address")},
            { icon: "ios-heart", name: "我的收藏",first:true, color: "#fc7b53", onPress: this.goPage.bind(this, "address")},
            {icon: "ios-pin", name: "我的访客",   onPress: this.goPage.bind(this, "MyVisitor")},
            {icon: "ios-pin", name: "我的小区",  onPress: this.goPage.bind(this, "address")},
            {icon: "ios-pin", name: "我的地址", onPress: this.goPage.bind(this, "MyAddress")},
            {icon: "logo-usd", name: "缴费记录", onPress: this.goPage.bind(this, "address")},
            {icon: "ios-cart", name: "缴费记录", onPress: this.goPage.bind(this, "MaintainRecord")},
            {icon: "ios-heart", name: "我的发票",first:true, marginTop: 10, onPress: this.goPage.bind(this, "RedPacket")},
            {icon: "ios-heart", name: "红包", marginTop: 10, onPress: this.goPage.bind(this, "RedPacket")},
            {icon: "md-flower", name: "支付调试", onPress: this.goPage.bind(this, "PayPage")},
            {icon: "md-flower", name: "CodePushPage", onPress: this.goPage.bind(this, "CodePushPage")},
            {icon: "md-flower", name: "GiftedListDemo", onPress: this.goPage.bind(this, "GiftedListDemo")},
            {icon: "md-flower", name: "GiftedListDemoNet", onPress: this.goPage.bind(this, "GiftedListDemoNet")},
            {icon: "md-flower", name: "GiftedListDemoFree", onPress: this.goPage.bind(this, "GiftedListDemoFree")},
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
            headerUrl: userInfo.avatar,
            // headerUrl: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1542198920071/youji.gif',
            userName: userInfo.userName,
            userPhone: userInfo.phone,
        })
    }

    _renderListItem() {
        return this.config.map((item, i) => {
            return (<ItemArrow key={i} {...item}/>)
        })
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: CommonStyle.bgColor}}>
                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0, y: .8}}
                                colors={['#63D5A2', CommonStyle.themeColor]}
                                style={{height: 190}}>
                </LinearGradient>
                <TouchableView style={{position: 'absolute', top: 40, right: 0}} onPress={() => {
                    this.navigate('AboutPage')
                }}>
                    <View style={{
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: 'flex-end', width: 40
                    }}>
                        <FIcon style={{alignSelf: 'center'}} name={'settings'} size={21}
                               color={CommonStyle.white}></FIcon>
                    </View>
                </TouchableView>
                <View style={{
                    position: 'absolute',
                    alignItems: 'center',
                    top: 80,
                    flex: 1,
                    left: 10,
                    right: 10,
                    borderRadius: 10,
                    height: 180,
                    backgroundColor: '#fff',
                    borderColor: CommonStyle.lightGray,
                    borderWidth: 1
                }}>
                    <TouchableView style={{
                        position: 'absolute',
                        top: 15,
                        right: -1,
                        width: 80,
                    }} onPress={() => {
                        this.showLong("签到")
                    }}>
                        <LinearGradient start={{x: 0.0, y: 0}} end={{x: 1, y: 0}}
                                        colors={[CommonStyle.themeColor, '#63D5A2']}
                                        style={{
                                            height: 30, flex: 1, flexDirection: 'row', alignItems: 'center',
                                            justifyContent: 'center', borderTopLeftRadius: 15,
                                            borderBottomLeftRadius: 15
                                        }}>

                            <QIcon style={{alignSelf: 'center'}} name={'icon-home'} size={16}
                                   color={'#fff'}></QIcon>
                            <Text style={{
                                color: "#fff",
                                fontSize: 14,
                                marginLeft: 5
                            }}>签到</Text>
                        </LinearGradient>
                    </TouchableView>

                    <Text style={{
                        marginTop: 45,
                        color: "#333",
                        fontSize: 16
                    }}>{this.state.userPhone ? this.state.userPhone : this.state.userName}</Text>
                    <TouchableView style={{
                        marginTop: 5,
                    }} onPress={() => {
                        this.navigate('UserInfo')
                    }}>
                        <Text style={{
                            color: "#666",
                            fontSize: 14
                        }}>查看/编辑个人资料</Text>
                    </TouchableView>
                </View>
                <View style={{
                    position: 'absolute',
                    top: 45,
                    left:0,
                    right:0,
                    alignSelf:'center'
                }}>
                    <TouchableView style={{
                        alignSelf:'center'
                    }} onPress={() => {
                        this.navigate('UserInfo')
                    }}>
                        <ImageView source={{uri: this.state.headerUrl}}
                                   placeholderSource={require("../../img/default_head.png")}
                                   style={{
                                       width: 70,
                                       height: 70,
                                       overflow: "hidden",
                                       backgroundColor: '#fff',
                                       borderRadius: 35
                                   }} onPress={() => {
                        }}/>
                    </TouchableView></View>

                <View style={{flex: 1,marginTop:80}}>
                    {this._renderListItem()}
               </View>
            </ScrollView>
        );
    }
};
const styles = StyleSheet.create({
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
