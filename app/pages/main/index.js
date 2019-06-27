import React from 'react';
import {
    Image,
    Linking,
    ListView,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import Swiper from 'react-native-swiper'
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

export default class Main extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '首页',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            banners: [
                {
                    title: '',
                    url: '',
                    // imagePath: require('../../img/bg_banner.png')
                    imagePath: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png'
                }
            ],
            recommendList: [
                {
                    title: '百度',
                    url: 'http://www.baidu.com',
                    imagePath: ''
                }
            ],
            types: [
                {
                    name: '报修报事',
                    imageUrl: require('../../img/menu_bxbs.png'),
                    active: 'RepairsSelect'
                }, {
                    name: '电子钥匙',
                    imageUrl: require('../../img/menu_dzcx.png'),
                    active: 'GuestPassKey'
                }, {
                    name: '物业缴费',
                    imageUrl: require('../../img/menu_wyjf.png'),
                    active: 'LivingPayment'
                }, {
                    name: '违章查询',
                    imageUrl: require('../../img/menu_wzcx.png'),
                    active: LINK_APIPAYS_WZ
                }, {
                    name: '快递查询',
                    imageUrl: require('../../img/menu_kdcx.png'),
                    active: LINK_APIPAYS_EXPRESS
                }
            ],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            typeIds: [],
            typeList: {},
            goodsRecommend: [],
            isAuth: false,
            searchHint:'请搜索',
            unreadMessageCount: 0
        };
    }


    canExitApp() {
        return true;
    }

    onReady(param) {
        this.hideHeader(true);
        this.getHomeData();
    }

    _loadWeb(title, url) {
        this.push('Web', {article: {title: title, url: url}})
    }


    getHomeData() {
        Request.post('/api/user/getuserinfo', {},
            {
                mock: false,
                mockId: 1092531,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState({
                    isAuth: data.isAuth == 1,
                    searchHint: data.searchHint,
                    unreadMessageCount: data.messages
                });
                UserStore.save({
                    messages: data.messages
                })
            }
        }).catch(err => {

        }).done(() => {
            this.setState({refreshing: false});
        })

        Request.post('/api/home/goodsRecommend', {page: 0, pageSize: 10},
            {
                mock: false,
                mockId: 673062,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState({
                    goodsRecommend: rep.data.rows,
                });
            }
        }).catch(err => {
        }).done(() => {
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
            this.setState({
                banners: _banners,
            });
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
            this.setState({
                banners: _banners,
            });
        }

    }


    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getHomeData()
    }

    _jumpRouter(typeItem) {
        if (typeItem.active.indexOf('alipays://') == 0) {
            Linking.openURL(typeItem.active).catch(err => this.showShort("未检测到支付宝"));
        }else {
            this.navigate(typeItem.active,{title:typeItem.name});
        }
    }

    onScanClick() {
        this.navigate("BarcodePage", {
            callback: (backData) => {
                this.navigate('scanInfo',{serialNum: backData})
            }
        });
        // this.navigate('scanInfo',{serialNum: 1111111})
    }



    _renderHeader() {
        return (
            <View style={{height: CommonStyle.navHeight}}>
                <View style={{
                    flex: 1, flexDirection: 'row', height: CommonStyle.navContentHeight,
                    marginTop: CommonStyle.navStatusBarHeight, alignItems: 'center'
                }}>
                    <TouchableView style={{width: 60, alignItems: 'center',justifyContent:'center'}} onPress={() => {
                        if (!this.state.isAuth) {
                            this.navigate('AuthPage',{
                                params: {from: 1},callback:(e)=>{
                                   this.setState({
                                       isAuth: e.isAuth
                                   })
                                }});
                        }
                    }}>
                        <Text style={{textAlign: 'center',color:'#fff', fontSize: 14}} >{!this.state.isAuth?'请认证':'已认证'}</Text>
                    </TouchableView>
                    <TouchableView style={{
                        flex: 1,
                        height: 30,
                    }} onPress={() => {
                        this.showShort("搜索")
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
                            }} source={require("../../img/icon_scan.png")}/>
                        </TouchableView>
                    </View>
                    </TouchableView>
                    <TouchableView style={{ alignItems: 'center',justifyContent:'center', height: 50}} onPress={() => {
                        this.showShort("消息")
                        this.navigate("Message")
                    }}>
                        <Badge text={this.state.unreadMessageCount} overflowCount={99} small >
                            <Image style={{
                                width: 48,
                                height: 16,
                                paddingLeft:8,
                                paddingRight:18,
                                resizeMode:'center'
                            }} source={require("../../img/icon_msg.png")}/>
                        </Badge>
                    </TouchableView>
                </View>
            </View>
        );
    }

    _renderBanner() {
        return (
            <Swiper style={styles.banner} paginationStyle={{bottom: 10, left: 100}}
                    dotStyle={{backgroundColor: 'rgba(200,200,200,.2)', width: 6, height: 6}}
                    activeDotStyle={{backgroundColor: 'rgba(100,100,100,.5)', width: 6, height: 6}} showsButtons={false}
                    autoplay={true} showsPagination={true}>
                {this.state.banners.map((banner, i) => {
                    return (
                        <TouchableHighlight key={i} onPress={() => {
                            this._loadWeb(banner.title, banner.url)
                        }}>
                            <ImageView style={{height: 255,width:'100%',resizeMode:Image.resizeMode.stretch,}} source={banner.imagePath} defaultSource={require('../../img/bg_banner.png')} ></ImageView>
                        </TouchableHighlight>
                    );
                })}
            </Swiper>
        );
    }

    _renderGridView() {
        return (
            <GridView
                style={{
                    flex: 1,
                    paddingBottom: 20,
                    paddingTop: 20,
                    borderRadius: 10, backgroundColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    marginLeft: 10,
                    marginRight: 10
                }}
                items={this.state.types}
                num={5}
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
                    <Image source={item.imageUrl} style={{width: 30, height: 30,  resizeMode:'center',marginTop: 6}}/>
                    <Text style={{fontSize: 12, color: "#333", marginTop: 10}}>{item.name}</Text>
                </View>
            </TouchableView>
        )
    }

    _renderCenterView() {
        return (
            <Swiper style={{height: 80, marginTop: 20}} paginationStyle={{bottom: 10, left: 100}}
                    dotStyle={{backgroundColor: 'rgba(200,200,200,.2)', width: 6, height: 6}}
                    activeDotStyle={{backgroundColor: 'rgba(100,100,100,.5)', width: 6, height: 6}} showsButtons={false}
                    autoplay={true} showsPagination={true}>
                {this.state.recommendList.map((banner, i) => {
                    return (
                        <TouchableView style={{
                            // paddingRight: 10,
                            // paddingLeft: 10,
                        }} key={i} onPress={() => {
                            this._loadWeb(banner.title, banner.url)
                        }}>
                            <ImageView style={{
                                // borderRadius: 40,
                                width:'100%',
                                height: 80,
                                resizeMode:Image.resizeMode.cover
                            }} source={ banner.imagePath} defaultSource={require('../../img/bg_center_banner.png')}></ImageView>
                        </TouchableView>
                    );
                })}
            </Swiper>
        );
    }

    _renderBottomView() {
        return (
            <View style={{marginTop: 0}}>
                <GridView
                    style={{
                        flex: 1,
                        marginLeft: 5,
                        marginRight: 5
                    }}
                    items={this.state.goodsRecommend}
                    num={2}
                    renderItem={this._renderBottomItem.bind(this)}
                />
            </View>
        )
    }

    /**  "goodsImage": "xxxx",
     "goodsName": "榨汁机",
     "marketPrice": "289",
     "goodsPrice": "99",
     "id": 123123123**/
    _renderBottomItem(item, index) {
        return (
            <TouchableView style={{
                flex: 1, borderRadius: 3, backgroundColor: '#fff',
                borderColor: '#fff',
                borderWidth: .5,
                margin: 5
            }} key={index} onPress={() => {
                this._jumpRouter(item)
            }}>
                <View style={[{flex: 1, borderRadius: 3, backgroundColor: '#fff',
                    borderColor: '#fff',
                    padding: 10,
                    borderWidth: .5,}]}>
                    <ImageView source={item.goodsImage} style={{width: '100%', marginTop:10, height: 100,}} defaultSource={require("../../img/default_image.png")}/>
                    <Text  ellipsizeMode={'tail'} numberOfLines={1} style={{flex:1,fontSize: 14, color: "#333", marginTop: 20,
                        }}>{item.goodsName}</Text>
                    <View style={{flex:1 ,flexDirection:'row', alignItems: "flex-end", marginTop: 10}}>
                        <Text style={{fontSize: 12, color: CommonStyle.themeColor}}>￥<Text style={{fontSize: 24, color: CommonStyle.themeColor,}}>{item.goodsPrice}</Text></Text>
                        <Text style={{fontSize: 12, color: '#666',marginLeft:5 , marginBottom: 5 }}>{`￥${item.marketPrice}`}</Text>
                    </View>
                </View>
            </TouchableView>
        )
    }


    _render() {
        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />}>
                {this._renderBanner()}
                <View style={{position: CommonStyle.absolute, left: 0, right: 0, top: 200,}}>
                    {this._renderGridView()}
                </View>
                <View style={{marginTop: 50}}>
                    {this._renderCenterView()}
                </View>
                {this.state.goodsRecommend && <TouchableView onPress={() => {
                    this.navigate('goodsList', {'from': 0});
                }}>
                    <View style={{
                        paddingHorizontal: 10, paddingVertical: 15, marginTop: 20, flex: 1, flexDirection: 'row',
                        alignItems: 'center', backgroundColor: '#fff', borderColor: CommonStyle.lineColor,
                        borderBottomWidth: .5
                    }}>
                        <View style={{backgroundColor: CommonStyle.themeColor, height: 18, width: 2}}></View>
                        <Text style={{fontSize: 16, color: CommonStyle.themeColor, marginLeft: 5, flex: 1}}>商品推荐</Text>
                        <Text style={{fontSize: 14, color: '#666', }}>更多</Text>
                    </View>
                </TouchableView>
                }
                {this._renderBottomView()}
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
        // resizeMode:Image.resizeMode.contain,
    },
    typesItem: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
})
