import React from 'react';
import {Dimensions, Image, Linking, ScrollView, StyleSheet, Text, View} from "react-native";
import {BaseComponent} from "../../components/base/BaseComponent";
import GridView from "../../components/GridView";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import BarcodePage from "../witget/BarcodePage";
import Request from "../../utils/Request";
import {Badge} from "antd-mobile-rn";
import {LINK_APIPAYS_CZ, LINK_APIPAYS_EXPRESS, LINK_APIPAYS_WZ} from "../../constants/UrlConstant";
import ImageView from "../../components/ImageView";
import UserStore from "../../store/UserStore";
let {width, height} = Dimensions.get('window')
let bottomHeight = 0;

export default class Shopping extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '生活',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            types: [
                {
                    name: '送水上门',
                    imageUrl: require('../../img/menu_sssm.png'),
                    active: 'goodsList'
                }, {
                    name: '园区超市',
                    imageUrl: require('../../img/menu_yqcs.png'),
                    active: 'goodsList'
                }, {
                    name: '家政服务',
                    imageUrl: require('../../img/menu_jzfw.png'),
                    active: 'HouseholdServerList'
                }, {
                    name: '快递查询',
                    imageUrl: require('../../img/menu_kdcx.png'),
                    active: LINK_APIPAYS_EXPRESS
                }, {
                    name: '违章查询',
                    imageUrl: require('../../img/menu_wzcx.png'),
                    active: LINK_APIPAYS_WZ
                }, {
                    name: '水电缴费',
                    imageUrl: require('../../img/menu_sdjf.png'),
                    active: 'WaterElectricityPayment'
                }, {
                    name: '日用百货',
                    imageUrl: require('../../img/menu_rcbh.png'),
                    active: 'goodsList'
                }, {
                    name: '健康养生',
                    imageUrl: require('../../img/menu_jkys.png'),
                    active: 'goodsList'
                }
            ],
            typeIds: [],
            typeList: {},
            searchHint: '请搜索',
            unreadMessageCount: 0
        };
    }


    onReady(param) {
        this.hideHeader(this);
        bottomHeight = (height - 290 - 10 - 60) / 3 ;
    }

    _loadWeb(title, url) {
        this.push('Web', {article: {title: title, url: url}})
    }

    onShow(e){
        Request.post('/api/user/getuserinfo', {}).then(rep => {
            if (rep.code === 0 && rep.data) {
                UserStore.save({
                    isAuth:rep.data.isAuth,
                    messages: rep.data.messageCount,
                    searchHint: rep.data.searchHint,
                    userName: rep.data.userName,
                    phone:rep.data.phone,
                    avatar: rep.data.avatar,
                    sign: rep.data.sign,
                    gender: rep.data.gender,
                    birthday: rep.data.birthday,
                    redCount: rep.data.redCount,
                    integralCount: rep.data.integralCount,
                    balance: rep.data.balance,
                    tenementPhone: rep.data.tenementPhone,
                });
                this.setState({
                    isAuth: rep.data.isAuth,
                    searchHint: rep.data.searchHint,
                    messages: rep.data.messageCount
                });
            }
        }).catch(err => {

        }).done(() => {
            this.setState({refreshing: false});
        })
    }


    setData(data) {
        let _banners = [];
        if (data.bannerList) {
            data.bannerList.forEach(item => {
                _banners.push({
                    title: item.name,
                    url: item.actionUrl,
                    imagePath: item.imageUrl
                })
            })
        }
        let _recommendList = [];
        if (data.recommendList) {
            data.recommendList.forEach(item => {
                _recommendList.push({
                    title: item.name,
                    url: item.actionUrl,
                    imagePath: item.imageUrl
                })
            })
        }
        this.setState({
            banners: _banners,
            recommendList: _recommendList,
            isAuth: data.isAuth == 1,
            searchHint: data.searchHint,
            unreadMessageCount: data.unreadMessageCount
        });
    }


    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getHomeData()
    }

    _jumpRouter(typeItem) {
        if (typeItem&&typeItem.active.indexOf('alipays://') === 0) {
            Linking.openURL(typeItem.active).catch(err => this.showShort("未检测到支付宝"));
        }else if (typeItem.name == '园区超市') {
            this.navigate('goodsList', {'type': 1, title: '园区超市'});
        }else if (typeItem.name == '日用百货') {
            this.navigate('goodsList', {'type': 2, title: '日用百货'});
        }else if (typeItem.name == '健康养生') {
            this.navigate('goodsList', {'type': 3, title: '健康养生'});
        }else if (typeItem.name == '送水上门') {
            this.navigate('goodsList', {'type': 4, title: '送水上门'});
        }else {
            this.navigate(typeItem.active);
        }
    }

    onScanClick() {
        this.navigate("BarcodePage", {},
            (backData) => {
                setTimeout(() => {
                    this.navigate('scanInfo',{serialNum: backData})
                }, 500);

        });
    }

    _renderGridView() {
        return (
            <GridView
                style={{
                    flex: 1,
                    paddingBottom: 20,
                    paddingTop: 10,
                    borderRadius: 10, backgroundColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    marginLeft: 10,
                    marginRight: 10
                }}
                items={this.state.types}
                num={4}
                renderItem={this._renderGridItem.bind(this)}
            />
        )
    }

    _renderGridItem(item, index) {
        return (
            <TouchableView style={{flex: 1}} key={index} onPress={() => {
                this._jumpRouter(item)
            }}>
                <View style={[{flex: 1}, styles.typesItem]}>
                    <Image source={item.imageUrl} style={{width: 30, height: 30, marginTop: 20, }}/>
                    <Text style={{fontSize: 14, color: "#333", marginTop: 10}}>{item.name}</Text>
                </View>
            </TouchableView>
        )
    }

    _renderHeader() {
        return (
            <View style={{height: CommonStyle.navHeight}}>
                <View style={{
                    flex: 1, flexDirection: 'row', height: CommonStyle.navContentHeight,
                    marginTop: CommonStyle.navStatusBarHeight, alignItems: 'center'
                }}>
                    <TouchableView style={{alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                        this.navigate('BuyCar');
                    }}>
                        <Image style={{
                            width: 18,
                            height: 18,
                            marginHorizontal:15
                        }} source={require("../../img/icon_gwc.png")}/>
                    </TouchableView>
                    <TouchableView style={{
                        flex: 1,
                        height: 30,
                    }} onPress={() => {
                        this.navigate("goodsSearch")
                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            height: 30,
                            flexDirection: 'row',
                            backgroundColor: 'rgba(255,255,255,.5)',
                            borderRadius: 15
                        }}>
                            <Image style={{
                                width: 12,
                                height: 12,
                                marginLeft:10
                            }} source={require("../../img/icon_search.png")}/>
                            <Text style={{color: "#fff", fontSize: 14,flex:1, marginLeft: 5}}>{this.state.searchHint}</Text>
                            <TouchableView style={{width: 60, alignItems: 'center',justifyContent:'center'}} onPress={() => {
                                this.onScanClick()
                            }}>
                                <Image style={{
                                    width: 16,
                                    height: 16,marginLeft: 8
                                }} source={require("../../img/icon_scan_w.png")}/>
                            </TouchableView>
                        </View>
                    </TouchableView>
                    <TouchableView style={{ alignItems: 'center',justifyContent:'center', height: 50}} onPress={() => {
                        this.navigate("Message")
                    }}>
                        <Badge text={this.state.unreadMessageCount} overflowCount={99} small >
                            <View style={{
                                width: 48,
                                height: 20,
                                paddingLeft:8,
                                paddingRight:18,
                            }}>
                                <ImageView style={{
                                    width: 20,
                                    height: 20,
                                }} source={require("../../img/icon_msg_w.png")}/>
                            </View>

                        </Badge>
                    </TouchableView>
                </View>
            </View>
        );
    }

    _renderBottomView(index,image){
        return (
            <TouchableView style={{
                marginHorizontal:10,
                marginVertical: 5,
                flex:1
            }} onPress={() => {
                if (index == 0) {
                    this.navigate('goodsList', {'type': 5, title: '家用电器'});
                }else if (index == 1) {
                    this.navigate('goodsList', {'type': 4, title: '送水上门'});
                }else if (index == 2) {
                    this.navigate('HouseholdServerList')
                }
            }}>
                <ImageView style={{
                    height:bottomHeight, width: (width - 20),resizeMode: Image.resizeMode.cover
                }}
                       source={image}></ImageView>
            </TouchableView>
        )
    }

    _render() {

        return (
            <View style={styles.container} >
                <View style={{backgroundColor: CommonStyle.themeColor, height: 140}}></View>
                <View style={{marginTop: 100, position: CommonStyle.absolute, top: 0, left: 0, right: 0, flex: 1}}>
                    {this._renderGridView()}
                </View>
                <View style={{marginTop: 290,paddingTop:10,backgroundColor:'#fff', position: CommonStyle.absolute, bottom:0,top: 0, left: 0, right: 0, flex: 1,}}>
                    {this._renderBottomView(0,require('../../img/bg_live_dq.png'))}
                    {this._renderBottomView(1,require('../../img/bg_live_ss.png'))}
                    {this._renderBottomView(2,require('../../img/bg_live_jz.png'))}
                </View>
                <View style={{position: CommonStyle.absolute, left: 0, top: 0, right: 0,}}>
                    {this._renderHeader()}
                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 68,
        backgroundColor: CommonStyle.bgColor
    },
    card: {
        backgroundColor: "#fff",
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    banner: {height: 255,},
    slide: {
        height: 255,
        resizeMode: Image.resizeMode.stretch,
    },
    typesItem: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
})
