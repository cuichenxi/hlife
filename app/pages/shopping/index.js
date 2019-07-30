import React from 'react';
import {Dimensions, Image, Linking, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import {BaseComponent} from "../../components/base/BaseComponent";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import BarcodePage from "../witget/BarcodePage";
import Request from "../../utils/Request";
import {Badge, Grid} from "antd-mobile-rn";
import ImageView from "../../components/ImageView";
import UserStore from "../../store/UserStore";
import util from "../../utils/util";
import {ImageStyle} from "../../common/ImageStyle";
import {LINK_APIPAYS_JF} from "../../constants/UrlConstant";

let {width, height} = Dimensions.get('window')
let bottomHeight = 0;

export default class Shopping extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '生活',
        }
    }

    canExitApp() {
        return true;
    }

// , {
//     name: '家政服务',
//     imageUrl: require('../../img/menu_jzfw.png'),
//     active: 'HouseholdServerList'
// }, {
//     name: '快递查询',
//         imageUrl: require('../../img/menu_kdcx.png'),
//         active: LINK_APIPAYS_EXPRESS
// }, {
//     name: '违章查询',
//         imageUrl: require('../../img/menu_wzcx.png'),
//         active: LINK_APIPAYS_WZ
// }, {
//     name: '水电缴费',
//         imageUrl: require('../../img/menu_sdjf.png'),
//         active: 'WaterElectricityPayment'
// },
    constructor(props) {
        super(props);
        this.state = {
            types: [
                {
                    name: '送水上门',
                    imageUrl: require('../../img/menu_sssm.png'),
                    active: 'goodsList',
                    type: 1,
                }, {
                    name: '园区超市',
                    imageUrl: require('../../img/menu_yqcs.png'),
                    active: 'goodsList',
                    type: 1,
                }, {
                    name: '日用百货',
                    imageUrl: require('../../img/menu_rcbh.png'),
                    active: 'goodsList',
                    type: 1,
                }, {
                    name: '健康养生',
                    imageUrl: require('../../img/menu_jkys.png'),
                    active: 'goodsList',
                    type: 1,
                }
            ],
            typeIds: [],
            typeList: {},
            searchHint: '搜索',
            messages: 0
        };
    }


    onReady(param) {
        this.hideHeader(true);
        bottomHeight = (height - 290 - 10 - 60) / 3;
        Request.post('/api/user/getuserinfo', {}).then(rep => {
            if (rep.code === 0 && rep.data) {
                UserStore.save({
                    isAuth: rep.data.isAuth,
                    messages: rep.data.messageCount,
                    searchHint: !util.isEmpty(rep.data.searchHint) ? rep.data.searchHint : '搜索',
                    userName: rep.data.userName,
                    phone: rep.data.phone,
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
        this.housekeeping();
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.housekeeping();
    }

    housekeeping() {
        Request.post('/api/life/basic', {}, {cache: 1}, (cache) => {
            if (cache.code === 0 && cache.data) {
                console.debug('cache=' + JSON.stringify(cache.data));
                this.setMenuData(cache.data.menuList)
            }
        }).then(rep => {
            if (rep.code === 0 && rep.data) {
                this.setMenuData(rep.data.menuList)
            }
        }).catch(err => {

        }).done(() => {
            this.setState({refreshing: false});
        });
    }

    // "categoryIcon":"mock",                //类型：String  必有字段  备注：分类图标
    // "categoryName":"mock",                //类型：String  必有字段  备注：分类名称
    // "id":1
    // name: '送水上门',
    // imageUrl: require('../../img/menu_sssm.png'),
    // active: 'goodsList',
    // type:1,
    setMenuData(menuList) {
        var _list = [];
        if (!util.isArrayEmpty(menuList)) {
            menuList.map((item) => {
                _list.push({
                    name: item.categoryName,
                    imageUrl: item.categoryIcon,
                    active: 'goodsList',
                    type: item.id
                })
            });
            this.setState({
                types: _list
            })
        }
    }

    _loadWeb(title, url) {
        this.push('Web', {article: {title: title, url: url}})
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
        });
    }


    _jumpRouter(typeItem) {
        console.log(typeItem)
        if (typeItem && typeItem.active.indexOf('alipays://') === 0) {
            Linking.openURL(typeItem.active).catch(err => this.showShort("未检测到支付宝"));
        } else {
            this.navigate(typeItem.active, {type: typeItem.type, title: typeItem.name});
        }
    }

    onScanClick() {
        this.navigate("BarcodePage", {},
            (backData) => {
                setTimeout(() => {
                    this.navigate('scanInfo', {serialNum: backData})
                }, 500);

            });
    }

    _renderGridView() {
        return (
            <Grid
                data={this.state.types}
                columnNum={4}
                hasLine={false}
                itemStyle={{height: 70}}
                renderItem={this._renderGridItem.bind(this)}
            />
        )
    }

    _renderGridItem(item, index) {
        return (
            <TouchableView style={{height: 70}} onPress={() => {
                this._jumpRouter(item)
            }}>
                <View style={[{flex: 1, height: 70}, styles.typesItem]}>
                    <ImageView source={item.imageUrl} style={{width: 30, height: 30,}}
                               defaultSource={require("../../img/default_image.png")}/>
                    <Text style={{fontSize: 12, color: "#333", marginTop: 10}}>{item.name}</Text>
                </View>
            </TouchableView>
        );
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
                            marginHorizontal: 15
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
                                marginLeft: 10
                            }} source={require("../../img/icon_search.png")}/>
                            <Text style={{
                                color: "#fff",
                                fontSize: 14,
                                flex: 1,
                                marginLeft: 5
                            }}>{util.isEmpty(this.state.searchHint) ? '搜索' : this.state.searchHint}</Text>
                            <TouchableView style={{width: 60, alignItems: 'center', justifyContent: 'center'}}
                                           onPress={() => {
                                               this.onScanClick()
                                           }}>
                                <Image style={{
                                    width: 16,
                                    height: 16, marginLeft: 8
                                }} source={require("../../img/icon_scan_w.png")}/>
                            </TouchableView>
                        </View>
                    </TouchableView>
                    <TouchableView style={{alignItems: 'center', justifyContent: 'center', height: 50, width: 48}}
                                   onPress={() => {
                                       this.navigate("Message")
                                   }}>
                            <View style={{
                                width: 48,
                                height: 20,
                                paddingLeft: 12,
                            }}>
                                <ImageView style={{
                                    width: 20,
                                    height: 20,
                                }} source={require("../../img/icon_msg_w.png")}/>
                            </View>
                            <Badge  style={{
                                position:CommonStyle.absolute,top: 15, right: 0,
                                width: 20,
                                height: 20,
                            }}  text={this.state.messages} overflowCount={10} small>

                            </Badge>
                    </TouchableView>
                </View>
            </View>
        );
    }

    _renderBottomView(index, image) {
        return (
            <TouchableView style={{
                marginHorizontal: 10,
                marginVertical: 5,
                height: 100
            }} onPress={() => {
                if (index == 0) {
                    // this.navigate('WaterElectricityPayment')
                    Linking.openURL(LINK_APIPAYS_JF).catch(err => this.showShort("未检测到支付宝"));
                } else if (index == 1) {
                    this.navigate('goodsList', {'type': 17, title: '送水上门'});
                } else if (index == 2) {
                    this.navigate('HouseholdServerList')
                }
            }}>
                <ImageView style={{
                    height: 100, width: (width - 20), resizeMode: ImageStyle.cover
                }}
                           source={image}></ImageView>
            </TouchableView>
        )
    }

    _render() {
        var len = 0
        if (!util.isArrayEmpty(this.state.types)) {
            len = Math.ceil(this.state.types.length / 4);
        }
        var marginTop = len * 70 + 20;
        console.debug('len=' + len + 'marinTop' + marginTop);
        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />}>
                <View style={{backgroundColor: CommonStyle.themeColor, height: 140}}></View>
                <View style={{
                    marginTop: 100, position: CommonStyle.absolute, top: 0, left: 0, right: 0,
                    height: marginTop + 10,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderRadius: 10, backgroundColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    marginLeft: 10,
                    marginRight: 10
                }}>
                    {this._renderGridView()}
                </View>
                <View style={{marginTop: marginTop - 20, paddingTop: 10, backgroundColor: '#fff',}}>
                    {this._renderBottomView(0, require('../../img/bg_live_sdf.png'))}
                    {this._renderBottomView(1, require('../../img/bg_live_ss.png'))}
                    {this._renderBottomView(2, require('../../img/bg_live_jz.png'))}
                </View>
                <View style={{position: CommonStyle.absolute, left: 0, top: 0, right: 0,}}>
                    {this._renderHeader()}
                </View>
            </ScrollView>
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
    },
    typesItem: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
})
