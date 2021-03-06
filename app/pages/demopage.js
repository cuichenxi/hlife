import React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    SafeAreaView,
    TouchableWithoutFeedback,
    Button,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import {BaseComponent} from "../../components/base/BaseComponent";
import {CommonStyle} from "../../common/CommonStyle";
import QIcon from '../../components/icon';
import LinearGradient from 'react-native-linear-gradient';
import ItemArrow from "../../components/ItemArrow";

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
            xiaoqu: '矩阵'
        }
        this.config = [
            {icon: "md-flower", name: "GiftedListDemo", onPress: this.goPage.bind(this, "GiftedListDemo")},
            {icon: "md-flower", name: "GiftedListDemoNet", onPress: this.goPage.bind(this, "GiftedListDemoNet")},
            {icon: "md-flower", name: "GiftedListDemoFree", onPress: this.goPage.bind(this, "GiftedListDemoFree")},
            {icon: "ios-pin", name: "收货地址", onPress: this.goPage.bind(this, "address")},
            {icon: "ios-heart", name: "我的收藏", color: "#fc7b53", onPress: this.goPage.bind(this, "address")},
            {icon: "md-images", name: "我的小区", subName: this.state.xiaoqu, onPress: this.goPage.bind(this, "address")},
            {icon: "logo-usd", name: "缴费记录", subName: "5元现金", onPress: this.goPage.bind(this, "address")},
            {icon: "ios-cart", name: "维修记录", subName: "0元好物在这里", onPress: this.goPage.bind(this, "MaintainRecord")},
            {icon: "ios-medal", name: "联系客服", subName: "未开通", onPress: this.goPage.bind(this, "address")},
            {icon: "md-flower", name: "关于我们", onPress: this.goPage.bind(this, "address")},
        ]
    }

    goPage(data = {}) {
        this.navigate(data)
    }

    goProfile() {
        this.navigate('UserInfo')
    }

    componentDidMount() {
        super.componentDidMount()
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
                        <QIcon style={{alignSelf: 'center'}} name={'icon-home'} size={18}
                               color={CommonStyle.white}></QIcon>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: CommonStyle.bgColor}}>
                <ScrollView style={styles.scrollView}>
                    <LinearGradient start={{x: 0.0, y: 0}} end={{x: .8, y: 0}}
                                    colors={['#2CC1E9', CommonStyle.themeColor]}
                                    style={{height: 180}}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 16,
                            marginTop: CommonStyle.navHeight
                        }}>
                            <Image source={require('../../img/about_logo.png')}
                                   style={{width: (60), height: (60), borderRadius: (30)}}/>
                            <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                                <Text style={{color: "#fff", fontSize: (18)}}>有爱一声</Text>
                                <View style={{marginTop: (10), flexDirection: "row"}}>
                                    <Icon name="ios-phone-portrait-outline" size={(14)} color="#fff"/>
                                    <Text
                                        style={{color: "#fff", fontSize: 13, paddingLeft: 5}}>135****0418</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={{
                        backgroundColor: '#fff',
                        flex: 1,
                        flexDirection: 'row',
                        height: 40,
                        paddingHorizontal: 16,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: 14, color: CommonStyle.color_333}}>我的订单</Text>
                        <Text style={{
                            fontSize: 12, color: CommonStyle.color_999, flex: 1, textAlign: 'right',
                            marginRight: 5
                        }}>查看全部订单</Text>
                        <Icon name="ios-arrow-forward-outline" size={16} color='#999'/>
                    </View>
                    <View style={{
                        flex: 1,
                        backgroundColor: CommonStyle.lineColor,
                        height: .5
                    }}/>
                    <View style={{
                        backgroundColor: '#fff',
                        flex: 1,
                        flexDirection: 'row',
                        height: 60,
                        paddingHorizontal: 16,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={styles.orderItem}>
                            <QIcon style={styles.orderItemIcon} name={'icon-home'} size={22}
                                   color={CommonStyle.color_666}></QIcon>
                            <Text style={styles.orderItemText}>待付款</Text>
                        </View>
                        <View style={styles.orderItem}>
                            <QIcon style={styles.orderItemIcon} name={'icon-home'} size={22}
                                   color={CommonStyle.color_666}></QIcon>
                            <Text style={styles.orderItemText}>待收货</Text>
                        </View>
                        <View style={styles.orderItem}>
                            <QIcon style={styles.orderItemIcon} name={'icon-home'} size={22}
                                   color={CommonStyle.color_666}></QIcon>
                            <Text style={styles.orderItemText}>待评价</Text>
                        </View>
                        <View style={styles.orderItem}>
                            <QIcon style={styles.orderItemIcon} name={'icon-home'} size={22}
                                   color={CommonStyle.color_666}></QIcon>
                            <Text style={styles.orderItemText}>售后</Text>
                        </View>
                    </View>
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
