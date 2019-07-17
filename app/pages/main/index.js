import React from 'react';
import {Image, Linking, ListView, Platform, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import Swiper from 'react-native-swiper'
import {BaseComponent} from "../../components/base/BaseComponent";
import GridView from "../../components/GridView";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import BarcodePage from "../witget/BarcodePage";
import Request from "../../utils/Request";
import {Badge} from "antd-mobile-rn";
import {LINK_APIPAYS_EXPRESS, LINK_APIPAYS_WZ} from "../../constants/UrlConstant";
import ImageView from "../../components/ImageView";
import UserStore from "../../store/UserStore";
import {CALL_BACK_TEST} from "../../constants/ActionTypes";
import JPushModule from "jpush-react-native/index";
import ADStore from "../../store/ADStore";
import util from "../../utils/util";

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
                    // imagePath: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png'
                }
            ],
            recommendList: [
                {
                    title: '',
                    url: '',
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
                    active: 'ElectronicKey'
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
            isAuth: 0,
            searchHint:'搜索',
            messages: 0
        };
        // this.onGetRegistrationIdPress = this.onGetRegistrationIdPress.bind(this)
        // this.onHasPermission = this.onHasPermission.bind(this)
        // this.jumpSecondActivity = this.jumpSecondActivity.bind(this)
        // this.setTag = this.setTag.bind(this)
        // this.setAlias = this.setAlias.bind(this)
    }
    //rOfQ8XGOt98_57EL3FJIogtaEFaL1847071a-a410-40be-8295-ea5fb8bf4b4a staging
    //Zuhm7813pnWp80Jxdy3_J07YWFJP1847071a-a410-40be-8295-ea5fb8bf4b4a test
    //K6yVS_qXUMNuWuppkSEpFyOVmB921847071a-a410-40be-8295-ea5fb8bf4b4a Production

    onShow(e){
        this.getHomeData()
        JPushModule.clearAllNotifications();
    }

    onReady(e) {
        // this.showShort('onReady')
        // CodePush.sync({
        //     // deploymentKey: 'rOfQ8XGOt98_57EL3FJIogtaEFaL1847071a-a410-40be-8295-ea5fb8bf4b4a"',
        //     updateDialog: {
        //         optionalIgnoreButtonLabel: '稍后',
        //         optionalInstallButtonLabel: '后台更新',
        //         optionalUpdateMessage: '幸福宜居有新版本了，是否更新？',
        //         title: '更新提示'
        //     },
        //     installMode: CodePush.InstallMode.IMMEDIATE
        // });
        this.hideHeader(true);
        Request.post('/api/home/goodsRecommend', {page: 0, pageSize: 10})
            .then(rep => {
                if (rep.code == 0 && rep.data) {
                    this.setState({
                        goodsRecommend: rep.data.rows,
                    });
                }
            }).catch(err => {
        }).done(() => {
        })
        this.registerCallBack(CALL_BACK_TEST,(e)=>{
            this.showShort(JSON.stringify(e));
        })
        this.initPush();
        this.getAD();
    }

    initPush() {
        if (Platform.OS === 'android') {
            JPushModule.initPush()
            JPushModule.getInfo(map => {
                console.log('extras: ' + map)
            })
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {

                }
            })
        } else {
            JPushModule.setupPush()
        }
        // JPushModule.initPush();
        JPushModule.addReceiveCustomMsgListener(map => {
            console.log('android extras: ' + JSON.stringify(map));
            /**
             * @param {Object} notification = {
	 	  'buildId': Number     // 设置通知样式，1 为基础样式，2 为自定义样式。自定义样式需要先调用 setStyleCustom 接口设置自定义样式。(Android Only)
	 *    'id': Number    		// 通知的 id, 可用于取消通知
	 *    'title': String 		// 通知标题
	 *    'content': String  	// 通知内容
	 *	  'extra': Object       // extra 字段
	 *    'fireTime': Number    // 通知触发时间的时间戳（毫秒）
	 * 	  'badge': Number       // 本地推送触发后应用角标的 badge 值  （iOS Only）
	 *    'soundName': String   // 指定推送的音频文件 （iOS Only）
     *    'subtitle': String    // 子标题 （iOS10+ Only）
	 *  }
             */
            JPushModule.sendLocalNotification({});
            JPushModule.setBadge(1, success => {
            });
        })
        JPushModule.addReceiveNotificationListener(map => {
            // console.log('alertContent: ' + map.alertContent)
            console.log(' extras: ' + JSON.stringify(map));
            if (Platform.OS === 'ios') {
                JPushModule.setBadge(map.aps.badge, success => {
                });
            } else {
                JPushModule.setBadge(1, success => {
                });
            }

        })

        JPushModule.addReceiveOpenNotificationListener(map => {
            console.log('Opening notification!')
            console.log('map.extra: ' + map.extras)
            this.jumpSecondActivity(map)
            JPushModule.clearAllNotifications();
        })

        //android
        JPushModule.addGetRegistrationIdListener(registrationId => {
            // alert('' + registrationId);
            console.log('Device register succeed, registrationId ' + registrationId)
        })
        JPushModule.getRegistrationID((registrationId) => {
            // alert('' + registrationId);
            console.log('Device register succeed, registrationId ' + registrationId)
        })
        //ios
        // JPushModule.getAppkeyWithcallback((registrationId) => {
        //     // alert('' + registrationId);
        //     console.log('Device register succeed, registrationId ' + registrationId)
        // })
        // JPushModule.getAppkeyWithcallback()
        JPushModule.clearAllNotifications();
    }

    getAD(){
        Request.post('/api/home/advertising', {},
            {
                mock: false,
                mockId: 1095514,
            }).then(rep => {
            if (rep.code == 0&&rep.data) {
                ADStore.save({
                    // imageUrl: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1544009388067/ad_t1.gif',
                    imageUrl: rep.data.imgurl,
                    active: rep.data.link,
                    times: 3,
                });
            }
        }).catch(err => {
        }).done(() => {
        })
    }
    onUnload() {
        JPushModule.removeReceiveCustomMsgListener(this.receiveCustomMsgListener)
        JPushModule.removeReceiveNotificationListener(this.receiveNotificationListener)
        JPushModule.removeReceiveOpenNotificationListener(this.openNotificationListener)
        JPushModule.removeGetRegistrationIdListener(this.getRegistrationIdListener)
        console.log('Will clear all notifications')
        JPushModule.clearAllNotifications()
    }


    onHasPermission () {
        JPushModule.hasPermission( res => console.log(`onHasPermission ${res}`) )
    }


    onGetRegistrationIdPress () {
        JPushModule.getRegistrationID(registrationId => {
            this.setState({
                registrationId: registrationId
            })
        })
    }
    jumpSecondActivity (message) {
        // JPushModule.jumpToPushActivityWithParams('SecondActivity', {
        //   hello: 'world'
        // })
        this.navigate('message', message);
        // this.props.navigation.navigate('AboutPage')
    }



    canExitApp() {
        return true;
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


    getHomeData() {
        Request.post('/api/user/getuserinfo', {}).then(rep => {
            if (rep.code === 0 && rep.data) {
                if(!util.isEmpty(rep.data.pushTag)){
                    JPushModule.setTags([rep.data.pushTag],(tags)=>{
                        console.debug('pushtags=' + JSON.stringify(tags));
                    })
                }
                UserStore.save({
                    isAuth:rep.data.isAuth,
                    messages: rep.data.messageCount,
                    searchHint: !util.isEmpty(rep.data.searchHint)?rep.data.searchHint:'搜索',
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
                    pushTag: rep.data.pushTag,
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
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getHomeData()
    }

    _jumpRouter(typeItem) {
        if (typeItem && typeItem.active.indexOf('alipays://') === 0) {
            Linking.openURL(typeItem.active).catch(err => this.showShort("未检测到支付宝"));
        } else {
            this.navigate(typeItem.active, {title: typeItem.name});
        }
    }

    onScanClick() {
        this.navigate("BarcodePage", {},
            (backData) => {
                setTimeout(() => {
                    this.navigate('scanInfo',{serialNum: backData})
                }, 500);

            }
        );
        // this.navigate('scanInfo',{serialNum: 1111111})
    }

    _renderHeader() {
        var authText = '请认证'
        const {isAuth} = this.state
        if (isAuth === 0){
            authText = '请认证'
        } else if (isAuth === 1){
            authText = '已认证'
        } else if (isAuth === 2){
            authText = '认证中'
        } else if (isAuth === 3){
            authText = '认证失败'
        }
        return (
            <View style={{height: CommonStyle.navHeight}}>
                <View style={{
                    flex: 1, flexDirection: 'row', height: CommonStyle.navContentHeight,
                    marginTop: CommonStyle.navStatusBarHeight, alignItems: 'center'
                }}>
                    <TouchableView style={{width: 60,height:50, alignItems: 'center',justifyContent:'center'}} onPress={() => {
                            this.navigate('AuthPage',{},(e)=>{
                                   this.setState({
                                       isAuth: e.isAuth
                                   })
                                });
                    }}>
                        <Text style={{textAlign: 'center',color:'#fff', fontSize: 14}} >{authText}</Text>
                    </TouchableView>
                    <View style={{
                        flex: 1,
                        height: 30,
                    }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 30,
                        backgroundColor: 'rgba(255,255,255,.5)',
                        borderRadius: 15
                    }}>
                        <Image style={{
                            width: 12,
                            height: 12,
                            marginLeft:10
                        }} source={require("../../img/icon_search.png")}/>
                        <TouchableView style={{
                            flex: 1,
                            height: 30,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }} onPress={() => {
                            this.navigate("goodsSearch")
                        }}>
                          <Text style={{color: "#fff", fontSize: 14,flex:1, marginLeft: 5}}>{util.isEmpty(this.state.searchHint)?'搜索':this.state.searchHint}</Text>
                        </TouchableView>
                        <TouchableView style={{width: 60, alignItems: 'center',justifyContent:'center'}} onPress={() => {
                            this.onScanClick()
                        }}>
                            <Image style={{
                                width: 16,
                                height: 16,marginLeft: 8
                            }} source={require("../../img/icon_scan.png")}/>
                        </TouchableView>
                    </View>
                    </View>
                    <TouchableView style={{ alignItems: 'center',justifyContent:'center', height: 50}} onPress={() => {
                        this.navigate("Message")
                    }}>
                        <Badge text={this.state.messages} overflowCount={99} small >
                            <View style={{
                                width: 48,
                                height: 20,
                                paddingLeft:8,
                                paddingRight:18,
                            }}>
                                <ImageView style={{
                                    width: 20,
                                    height: 20,
                                }} source={require("../../img/icon_msg.png")}/>
                            </View>

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
                        <TouchableView key={i} onPress={() => {
                            if (banner.url) {
                                this._loadWeb(banner.title, banner.url);
                            }
                        }}>
                            <ImageView style={{height: 255,width:'100%',resizeMode:Image.resizeMode.stretch,}} source={banner.imagePath} defaultSource={require('../../img/bg_banner.png')} ></ImageView>
                        </TouchableView>
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
                    <ImageView source={item.imageUrl} style={{width: 30, height: 30,marginTop: 6}}/>
                    <Text style={{fontSize: 12, color: "#333", marginTop: 10}}>{item.name}</Text>
                </View>
            </TouchableView>
        )
    }

    _renderCenterView() {
        return (
            <Swiper style={{height: 80, marginTop: 15}} paginationStyle={{bottom: 10, left: 100}}
                    dotStyle={{backgroundColor: 'rgba(200,200,200,.2)', width: 6, height: 6}}
                    activeDotStyle={{backgroundColor: 'rgba(100,100,100,.5)', width: 6, height: 6}} showsButtons={false}
                    autoplay={true} showsPagination={true}>
                {this.state.recommendList.map((banner, i) => {
                    return (
                        <TouchableView style={{
                            // paddingRight: 10,
                            // paddingLeft: 10,
                        }} key={i} onPress={() => {
                            if (banner.url) {
                                this._loadWeb(banner.title, banner.url);
                            }
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
                this.navigate('ProductDetail',item);
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
                <View style={{marginTop: 45}}>
                    {this._renderCenterView()}
                </View>
                {this.state.goodsRecommend && <TouchableView onPress={() => {
                    this.navigate('goodsList', {'type': 0,title:'商品列表'});
                }}>
                    <View style={{
                        paddingHorizontal: 10, paddingVertical: 15, marginTop: 10, flex: 1, flexDirection: 'row',
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
