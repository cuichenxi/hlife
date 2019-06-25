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
import Request from "../../utils/Request";
import {Badge} from "antd-mobile-rn";

const {width, height} = Dimensions.get('window')

export default class Steward extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '管家',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            types: [
                {
                    name: '物业缴费',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Register'
                }, {
                    name: '水电缴费',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'ContactList'
                }, {
                    name: '报修报事',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '咨询建议',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'ContactList'
                }, {
                    name: '电子钥匙',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                },{
                    name: '常用电话',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Register'
                }, {
                    name: '房屋租售',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'ContactList'
                }, {
                    name: '投诉表扬',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }
            ],
            typeIds: [],
            typeList: {},
            goodsRecommend: [],
        };
    }


    onReady(param) {
        // this.getHomeData();
    }

    _loadWeb(title, url) {
        this.push('Web', {article: {title: title, url: url}})
    }


    getHomeData() {

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
                    paddingTop: 20,
                    borderRadius: 10, backgroundColor: '#fff',
                    borderColor: CommonStyle.lightGray,
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
                <View style={{marginTop: 10}}>
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