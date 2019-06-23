import React from 'react';
import {
    TouchableHighlight, ScrollView, ListView, StyleSheet,
    Image, View, Text, Dimensions, TextInput, RefreshControl
} from "react-native";
import Swiper from 'react-native-swiper'
import {BaseComponent} from "../../components/base/BaseComponent";
import GridView from "../../components/GridView";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import BarcodePage from "../witget/BarcodePage";
import Request from "../../utils/Request";
import QIcon from "../../components/icon";
import {Badge} from "antd-mobile-rn";

const {width, height} = Dimensions.get('window')

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
                    active: 'Register'
                }, {
                    name: '园区超市',
                    imageUrl: require('../../img/menu_yqcs.png'),
                    active: 'ContactList'
                }, {
                    name: '家政服务',
                    imageUrl: require('../../img/menu_jzfw.png'),
                    active: 'HouseholdServerList'
                }, {
                    name: '快递查询',
                    imageUrl: require('../../img/menu_kdcx.png'),
                    active: 'ContactList'
                }, {
                    name: '违章查询',
                    imageUrl: require('../../img/menu_wzcx.png'),
                    active: 'Login'
                }, {
                    name: '手机充值',
                    imageUrl: require('../../img/menu_sjcx.png'),
                    active: 'Register'
                }, {
                    name: '日用百货',
                    imageUrl: require('../../img/menu_rcbh.png'),
                    active: 'ContactList'
                }, {
                    name: '健康养生',
                    imageUrl: require('../../img/menu_jkys.png'),
                    active: 'Login'
                }
            ],
            typeIds: [],
            typeList: {},
            goodsRecommend: [],
            searchHint: '请搜索',
            unreadMessageCount: 0
        };
    }


    onReady(param) {
        // this.getHomeData();
        this.hideHeader(this);
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
                    <Image source={item.imageUrl} style={{width: 30, height: 30, marginTop: 20, resizeMode:'center'}}/>
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
                        this.showShort("购物车")
                    }}>
                        <QIcon style={{textAlign: 'center', paddingLeft: 15, paddingRight: 15}} name={'icon-home'}
                               size={16}
                               color="#333"></QIcon>
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
                            <Text style={{
                                color: "#fff",
                                fontSize: 14,
                                flex: 1,
                                marginLeft: 5
                            }}>{this.state.searchHint}</Text>
                            <TouchableView style={{width: 60, alignItems: 'center', justifyContent: 'center'}}
                                           onPress={() => {
                                               this.onScanClick()
                                           }}>
                                <QIcon style={{textAlign: 'center', marginLeft: 8}} name={'icon-home'}
                                       size={16}
                                       color="#333"></QIcon>
                            </TouchableView>
                        </View>
                    </TouchableView>
                    <TouchableView style={{alignItems: 'center', justifyContent: 'center', height: 50}} onPress={() => {
                        this.showShort("消息")
                    }}>
                        <Badge text={this.state.unreadMessageCount} overflowCount={99} small>
                            <QIcon style={{textAlign: 'center', paddingLeft: 15, paddingRight: 15}} name={'icon-home'}
                                   size={16}
                                   color="#333"></QIcon>
                        </Badge>
                    </TouchableView>
                </View>
            </View>
        );
    }

    _renderBottomView(index){
        return (
            <TouchableView style={{
                margin: 10,
                flex: 1
            }} onPress={() => {
                this.showShort("xx" + index);
            }}>
                <Image style={{
                    flex: 1
                }}
                       source={{uri: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png'}}></Image>
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
                <View style={{marginTop: 310,backgroundColor:'#fff', position: CommonStyle.absolute, bottom:0,top: 0, left: 0, right: 0, flex: 1,}}>
                    {this._renderBottomView(0)}
                    {this._renderBottomView(1)}
                    {this._renderBottomView(2)}
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
