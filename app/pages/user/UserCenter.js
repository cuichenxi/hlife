import React from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    RefreshControl,
    TouchableOpacity
} from 'react-native'
// import NavBar from '../component/NavBar'
// import Item from '../component/Item'
// import Setting from './Setting'
// import UserProfile from './UserProfile'
// import Address from './Address'

import Icon from 'react-native-vector-icons/Ionicons'
import {BaseComponent} from "../../components/base/BaseComponent";
import {CommonStyle} from "../../common/CommonStyle";
import QIcon from '../../components/icon';

let {width, height} = Dimensions.get('window')

export default class UserCenter extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '',
            rightIcon: {
                name: 'icon-home',
                size: 20,
                color: '#fff'
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false
        }
        this.config = [
            {icon: "ios-pin", name: "收货地址", onPress: this.goPage.bind(this, "address")},
            {icon: "ios-heart", name: "我的收藏", color: "#fc7b53"},
            {icon: "md-images", name: "美食相册"},
            {icon: "logo-usd", name: "推荐有奖", subName: "5元现金", color: "#fc7b53"},
            {icon: "ios-cart", name: "积分商城", subName: "0元好物在这里", color: "#94d94a"},
            {icon: "ios-medal", name: "饿了吗会员卡", subName: "未开通", color: "#ffc636"},
            {icon: "md-flower", name: "服务中心"},
            {icon: "ios-outlet", name: "欢迎评分"},
            {icon: "md-contacts", name: "加盟合作"},
        ]
    }

    goPage(key, data = {}) {
        let pages = {
            // "address": Address
        }
        if (pages[key]) {
            this.props.navigator.push({
                component: pages[key],
                args: {data}
            })
        }
    }

    leftPress() {

    }

    rightPress() {
        this.props.navigator.push({
            // component: Setting,
            args: {}
        });
    }

    goProfile() {
        this.props.navigator.push({
            // component: UserProfile,
            // args: {}
        });
    }

    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 1500)
    }

    _renderListItem() {
        return this.config.map((item, i) => {
            if (i % 3 == 0) {
                item.first = true
            }
            // return (<Item key={i} {...item}/>)
            return null;
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: CommonStyle.bgColor}}>
                <View style={{
                    backgroundColor: CommonStyle.themeColor, flexDirection: 'row', height: CommonStyle.navContentHeight,
                    marginTop: CommonStyle.navStatusBarHeight, justifyContent: 'flex-end', alignItems: 'center'
                }}>
                    <TouchableOpacity>
                        <View style={{
                            justifyContent: 'center',
                            backgroundColor: '#333',
                            flex:1,
                            alignItems: 'flex-end', width: 40
                        }}>
                            <QIcon style={{alignSelf: 'center'}} name={'icon-home'} size={22}
                                   color={CommonStyle.black}></QIcon>
                        </View>
                    </TouchableOpacity>
                </View>
                {/*<ScrollView style={styles.scrollView}>*/}
                {/*<View>*/}
                {/*<View/>*/}
                {/*<TouchableOpacity>*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}
                {/*</ScrollView>*/}
            </View>
        );
    }

    // position: 'absolute',
    renderBac() {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={{minHeight: height - 64 - (46), paddingBottom: 100, backgroundColor: "#f3f3f3"}}>
                    <TouchableWithoutFeedback onPress={this.goProfile.bind(this)}>
                        <View style={styles.userHead}>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <Image source={require('../../img/about_logo.png')}
                                       style={{width: (60), height: (60), borderRadius: (30)}}/>
                                <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                                    <Text style={{color: "#fff", fontSize: (18)}}>_平行时空</Text>
                                    <View style={{marginTop: (10), flexDirection: "row"}}>
                                        <Icon name="ios-phone-portrait-outline" size={(14)} color="#fff"/>
                                        <Text
                                            style={{color: "#fff", fontSize: 13, paddingLeft: 5}}>135****0418</Text>
                                    </View>
                                </View>
                            </View>
                            <Icon name="ios-arrow-forward-outline" size={(22)} color="#fff"/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.numbers}>
                        <TouchableWithoutFeedback>
                            <View style={styles.numItem}>
                                <Text style={{
                                    color: "#f90",
                                    fontSize: 18,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>{"999999.0元"}</Text>
                                <Text style={{
                                    color: "#333",
                                    fontSize: 12,
                                    textAlign: "center",
                                    paddingTop: 5
                                }}>{"余额"}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={[styles.numItem, {
                                borderLeftWidth: 1,
                                borderLeftColor: "#f5f5f5",
                                borderRightWidth: 1,
                                borderRightColor: "#f5f5f5"
                            }]}>
                                <Text style={{
                                    color: "#ff5f3e",
                                    fontSize: 18,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>{"1940个"}</Text>
                                <Text style={{
                                    color: "#333",
                                    fontSize: 12,
                                    textAlign: "center",
                                    paddingTop: 5
                                }}>{"优惠"}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={styles.numItem}>
                                <Text style={{
                                    color: "#6ac20b",
                                    fontSize: 18,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>{"999999分"}</Text>
                                <Text style={{
                                    color: "#333",
                                    fontSize: 12,
                                    textAlign: "center",
                                    paddingTop: 5
                                }}>{"积分"}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        {this._renderListItem()}
                    </View>
                </View>
            </ScrollView>
        )
    }
};
const styles = StyleSheet.create({
    scrollView: {
        marginBottom: (46),
        backgroundColor: CommonStyle.themeColor
    },
    userHead: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: CommonStyle.themeColor
    },
    numbers: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 74
    },
    numItem: {
        flex: 1,
        height: 74,
        justifyContent: "center",
        alignItems: "center"
    }
})
