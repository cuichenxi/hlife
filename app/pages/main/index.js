import React from 'react';
import {
    DeviceEventEmitter,
    TouchableHighlight, ScrollView, ListView, StyleSheet,
    Image, View, Text, Dimensions, TextInput, RefreshControl
} from "react-native";
import Swiper from 'react-native-swiper'
import {BaseComponent} from "../../components/base/BaseComponent";
import GridView from "../../components/GridView";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import QIcon from "../../components/icon";
import BarcodePage from "../witget/BarcodePage";
import UserStore from "../../store/UserStore";
import NavigationUtil from "../../utils/NavigationUtil";
import Request from "../../utils/Request";
import {Badge} from "antd-mobile-rn";
// import ImageUtil from "../../utils/ImageUtil";

const {width, height} = Dimensions.get('window')

export default class Main extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            refreshing: false,
            title: '首页',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            banners: [
                {
                    title: '百度',
                    url: 'http://www.baidu.com',
                    imagePath: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png'
                }
            ],
            recommendList: [
                {
                    title: '百度',
                    url: 'http://www.baidu.com',
                    imagePath: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png'
                }
            ],
            types: [
                {
                    name: '报修报事',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Register'
                }, {
                    name: '电子钥匙',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'ContactList'
                }, {
                    name: '物业缴费',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '违章查询',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'ContactList'
                }, {
                    name: '快递查询',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
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

    onShow() {
        this.hideHeader(true);
    }

    onReady(param) {
        this.getHomeData();
        this.getUserInfo();
    }

    _loadWeb(title, url) {
        this.push('Web', {article: {title: title, url: url}})
    }


    getHomeData() {
        Request.post('/api/user/geuserinfo', {},
            {
                mock: true,
                mockId: 1092531,
            }, (cacheRep) => {
                if (cacheRep) {
                    this.setData(cacheRep.data)
                }
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setData(rep.data)
            }
        }).catch(err => {

        }).done(() => {
            this.setState({refreshing: false});
        })

        Request.post('/api/home/goodsRecommend', {page: 0, pageSize: 10},
            {
                mock: true,
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

    getUserInfo() {
        Request.post('/api/user/geuserinfo', {},
            {
                mock: true,
                mockId: 1124783,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                UserStore.save(rep.data);
            }
        }).catch(err => {

        }).done(() => {

        })
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getHomeData()
    }

    _jumpRouter(typeItem) {
        this.push(typeItem.active, {title: typeItem.name});
    }

    onScanClick() {
        this.navigate("BarcodePage", {
            callback: (backData) => {
                this.showShort(backData)
            }
        });
    }

    _renderHeader() {
        return (
            <View style={{height: CommonStyle.navHeight}}>
                <View style={{
                    flex: 1, flexDirection: 'row', height: CommonStyle.navContentHeight,
                    marginTop: CommonStyle.navStatusBarHeight, alignItems: 'center'
                }}>
                    <TouchableView style={{width: 60, alignItems: 'center',justifyContent:'center'}} onPress={() => {
                        this.showShort("请认证")
                    }}>
                        <Text style={{textAlign: 'center',color:'#fff', fontSize: 14}} >{this.state.isAuth?'请认证':'已认证'}</Text>
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
                        <QIcon style={{textAlign: 'center', width: 20, width: 20, marginLeft: 8}} name={'icon-home'}
                               size={12}
                               color={CommonStyle.color_666}></QIcon>
                        <Text style={{color: "#fff", fontSize: 14,flex:1, marginLeft: 5}}>{this.state.searchHint}</Text>
                        <TouchableView style={{width: 60, alignItems: 'center',justifyContent:'center'}} onPress={() => {
                            this.onScanClick()
                        }}>
                            <QIcon style={{textAlign: 'center',  marginLeft: 8}} name={'icon-home'}
                                   size={16}
                                   color="#333"></QIcon>
                        </TouchableView>
                    </View>
                    </TouchableView>
                    <TouchableView style={{ alignItems: 'center',justifyContent:'center'}} onPress={() => {
                        this.showShort("消息")
                    }}>
                        <Badge text={this.state.unreadMessageCount} overflowCount={99} small >
                            <QIcon style={{textAlign: 'center',paddingLeft:15,paddingRight:15}} name={'icon-home'} size={16}
                                   color="#333"></QIcon>
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
                            <Image style={[styles.slide,]} source={{uri: banner.imagePath}}></Image>
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
                    borderColor: CommonStyle.lightGray,
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
                    <Image source={item.imageUrl} style={{width: 35, height: 35, marginTop: 6}}/>
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
                        <TouchableHighlight style={{
                            paddingRight: 10,
                            paddingLeft: 10,
                        }} key={i} onPress={() => {
                            this._loadWeb(banner.title, banner.url)
                        }}>
                            <Image style={{
                                borderRadius: 40,
                                height: 80,
                                resizeMode: Image.resizeMode.stretch,
                            }} source={{uri: banner.imagePath}}></Image>
                        </TouchableHighlight>
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
                    <Image source={{uri:item.goodsImage}} style={{width: '100%', marginTop:10, height: 100,}}/>
                    <Text style={{flex:1,fontSize: 14, color: "#333", marginTop: 20,
                        numberOfLines: 1,ellipsizeMode:'tail'}}>{item.goodsName}</Text>
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
                    this.showLong("更多")
                }}>
                    <View style={{
                        paddingHorizontal: 10, paddingVertical: 15, marginTop: 20, flex: 1, flexDirection: 'row',
                        alignItems: 'center', backgroundColor: '#fff', borderColor: CommonStyle.lineColor,
                        borderBottomWidth: .5
                    }}>
                        <View style={{backgroundColor: CommonStyle.themeColor, height: 18, width: 2}}></View>
                        <Text style={{fontSize: 16, color: CommonStyle.themeColor, marginLeft: 5, flex: 1}}>商品推荐</Text>
                        <Text style={{fontSize: 14, color: '#666', justifySelf: 'flex-end'}}>更多</Text>
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
        resizeMode: Image.resizeMode.stretch,
    },
    typesItem: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
})