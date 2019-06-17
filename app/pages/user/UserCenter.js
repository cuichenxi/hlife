import React from 'react'
import {
    Text,
    View,
    Linking,
    StyleSheet,
    ScrollView, Image,
    Modal as ModalView
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
import NavigationUtil from "../../utils/NavigationUtil";
import Request from "../../utils/Request";


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
            redCount: 0,
            integralCount: 0,
            singInCount: 0,
            signCount: 0,
            balance: 0,
            signVisible: false,
        }
        this.config = [
            {icon: "ios-pin", name: "我的订单", first: true, onPress: this.goPage.bind(this, "address")},
            {
                icon: "ios-heart",
                name: "我的收藏",
                first: true,
                color: "#fc7b53",
                onPress: this.goPage.bind(this, "MyCollection")
            },
            {icon: "ios-pin", name: "我的访客", onPress: this.goPage.bind(this, "MyVisitor")},
            {icon: "ios-pin", name: "我的小区", onPress: this.goPage.bind(this, "MyAddress")},
            {icon: "ios-pin", name: "我的地址", onPress: this.goPage.bind(this, "MyShippingAddress")},
            {icon: "logo-usd", name: "缴费记录", onPress: this.goPage.bind(this, "address")},
            {icon: "ios-cart", name: "缴费记录", onPress: this.goPage.bind(this, "MaintainRecord")},
            {
                icon: "ios-heart",
                name: "我的发票",
                first: true,
                marginTop: 10,
                onPress: this.goPage.bind(this, "MyInvoiceList")
            },
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
        this.hideHeader(true);
        let userInfo = UserStore.get();
        this.setState({
            headerUrl: userInfo.avatar,
            // headerUrl: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1542198920071/youji.gif',
            userName: userInfo.userName,
            userPhone: userInfo.phone,
            redCount: userInfo.redCount,
            integralCount: userInfo.integralCount,
            balance: userInfo.balance,
        })
    }

    _renderListItem() {
        return this.config.map((item, i) => {
            return (<ItemArrow key={i} {...item}/>)
        })
    }

    /**
     * 签到
     */
    requestSign() {
        this.showLoading('签到中...');
        Request.post('/api/user/signIn', {},
            {
                mock: true,
                mockId: 1095514,
            }).then(rep => {
            if (rep.code == 0) {
                this.setState({
                    signVisible: true,
                    singInCount: rep.data.singInCount,
                    signCount: rep.data.integralCount,
                    integralCount: this.state.integralCount + rep.data.integralCount,
                })
                UserStore.save({integralCount: this.state.integralCount + 1})
            }
        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
    }


    _renderSignView() {
        return (
            <ModalView
                animationType="fade"
                transparent={true}
                visible={this.state.signVisible}
                onRequestClose={() => {
                }}
            >
                <View style={{
                    backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TouchableView onPress={() => {
                        this.setState({
                            signVisible: false
                        })
                    }}>
                        <View style={{
                            width: 300,
                            height: 360,
                            alignItems: 'center',
                            borderRadius: 15,
                            backgroundColor: '#99000000'
                        }}>
                            <Image style={{
                                width: 300,
                                height: 360,
                                borderRadius: 15,
                            }} source={require("../../img/splash.png")}/>
                            <View  style={{
                                position: 'absolute',
                                bottom: 30,
                                alignItems: 'center',
                                width: 300,
                                height: 200,
                                justifyContent: 'flex-end',
                            }}>
                                <View style={{flexDirection:'row' ,alignItems: 'center',}}>
                                    <Text style={{fontSize:14,
                                        color: '#666'}}>你已连续签到</Text>
                                    <Text style={{fontSize:16,
                                        color: CommonStyle.themeColor}}>{this.state.singInCount}</Text>
                                    <Text style={{fontSize:14,
                                        color: '#666'}}>天</Text>
                                </View>
                                <View style={{flexDirection:'row',marginTop:10}}>
                                    <Text style={{fontSize:14,
                                        color: '#666'}}>今天签到的积分:</Text>
                                    <Text style={{fontSize:16,
                                        color: CommonStyle.themeColor}}>{`${this.state.signCount}分`}</Text>
                                </View>
                                <View style={{alignItems: 'center',marginTop:25, justifyContent: 'center',width:120, height:42 ,borderRadius:22,backgroundColor:CommonStyle.themeColor}}>
                                    <Text style={{fontSize:16,
                                        color: '#fff',textAlign:'center',textAlignVertical:'center'}}>知道了</Text>
                                </View >
                            </View>
                        </View>
                    </TouchableView>
                </View>
            </ModalView>
        );
    }

    _render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: CommonStyle.bgColor}}>
                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0, y: .8}}
                                colors={['#63D5A2', CommonStyle.themeColor]}
                                style={{height: 190}}>
                </LinearGradient>
                <TouchableView style={{position: 'absolute', top: 40, right: 0}} onPress={() => {
                    // this.navigate('AboutPage')
                    this.navigate('MySetting')
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
                        width: 70,
                    }} onPress={
                        this.requestSign.bind(this)
                    }>
                        <LinearGradient start={{x: 0.0, y: 0}} end={{x: 1, y: 0}}
                                        colors={[CommonStyle.themeColor, '#63D5A2']}
                                        style={{
                                            height: 30, flex: 1, flexDirection: 'row', alignItems: 'center',
                                            justifyContent: 'center', borderTopLeftRadius: 15,
                                            borderBottomLeftRadius: 15
                                        }} onPress={
                            this.requestSign.bind(this)
                        }>

                            <QIcon style={{alignSelf: 'center'}} name={'icon-home'} size={14}
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
                    <View style={{
                        marginTop: 20, flex: 1, width: '80%', flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <TouchableView style={{alignItems: 'center'}} onPress={() => {
                            this.navigate('RedPacket')
                        }}>
                            <Text style={{
                                color: CommonStyle.themeColor,
                                fontSize: 18
                            }}>{this.state.balance}</Text>
                            <Text style={{
                                marginTop: 2,
                                color: "#666",
                                fontSize: 14
                            }}>钱包</Text>
                        </TouchableView>
                        <View style={{backgroundColor: CommonStyle.lineColor, height: 35, width: 1}}/>
                        <TouchableView style={{alignItems: 'center'}} onPress={() => {
                            this.navigate('RedPacket')
                        }}>
                            <Text style={{
                                color: CommonStyle.themeColor,
                                fontSize: 18
                            }}>{this.state.redCount}</Text>
                            <Text style={{
                                marginTop: 2,
                                color: "#666",
                                fontSize: 14
                            }}>红包(个)</Text>
                        </TouchableView>
                        <View style={{backgroundColor: CommonStyle.lineColor, height: 35, width: 1}}/>
                        <TouchableView style={{alignItems: 'center'}} onPress={() => {
                            this.navigate('RedPacket')
                        }}>
                            <Text style={{
                                color: CommonStyle.themeColor,
                                fontSize: 18
                            }}>{this.state.integralCount}</Text>
                            <Text style={{
                                marginTop: 2,
                                color: "#666",
                                fontSize: 14
                            }}>积分</Text>
                        </TouchableView>
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    top: 45,
                    left: 0,
                    right: 0,
                    alignSelf: 'center'
                }}>
                    <TouchableView style={{
                        alignSelf: 'center'
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

                <View style={{flex: 1, marginTop: 80}}>
                    {this._renderListItem()}
                </View>
                {this._renderSignView()}
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
