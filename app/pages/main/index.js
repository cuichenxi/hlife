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
import {CALL_BACK_TEST, UPDATE_USER_INFO} from "../../constants/ActionTypes";
import JPushModule from "jpush-react-native/index";
import ADStore from "../../store/ADStore";
import util from "../../utils/util";
import {ImageStyle} from "../../common/ImageStyle";
import {getUrlParam} from '../../utils/UrlUtil'
import {CPKEY} from '../../constants/CPKC'
import CodePush from 'react-native-code-push';
// import {debug} from "../../utils/DeviceInfo";


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
                    imagePath: null
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
                    name: '房屋租售',
                    imageUrl: require('../../img/menu_fwzs.png'),
                    active: 'HouseSellRent'
                }, {
                    name: '投诉表扬',
                    imageUrl: require('../../img/menu_tsby.png'),
                    active: 'GiveAdvice'
                }
            ],
            typeIds: [],
            typeList: {},
            goodsRecommend: [],
            isAuth: 0,
            searchHint: '搜索',
            messages: 0
        };
        this.onHasPermission();
    }

    // onShow(e) {
    //     this.getUserInfo()
    // }

    onReady(e) {
        this.hideHeader(true);
        this.codePush();
        this.initPush();
        this.getUserInfo()
        this.getAD();
        this.addEventListener(UPDATE_USER_INFO,(e)=>{
            this.getUserInfo()
        })
    }

    /**
     *  rOfQ8XGOt98_57EL3FJIogtaEFaL1847071a-a410-40be-8295-ea5fb8bf4b4a staging //安卓
     *  K6yVS_qXUMNuWuppkSEpFyOVmB921847071a-a410-40be-8295-ea5fb8bf4b4a Production  //安卓
     *  ttINUFwHSiyS40PcWa39-eTQB2Q5ryhtF9zA7  staging //ios
     *  37_lnnPrUpSXghoyqf-CpGYKPcZ_BJZnYF9z07 Production  //ios
     */
    codePush() {
        // this.showLong("__DEV__=" + util.debug() ? "debug" : "release");
        var debug = false;
        CodePush.sync({
            deploymentKey: debug ? CPKEY.CP_KEY_STAGING : CPKEY.CP_KEY_PRO,
            updateDialog: {
                optionalIgnoreButtonLabel: '稍后',
                mandatoryUpdateMessage: '幸福宜居有新版本了',
                optionalInstallButtonLabel: '后台更新',
                mandatoryContinueButtonLabel:'继续',
                optionalUpdateMessage: '幸福宜居有新版本了，是否更新？',
                title: '提示'
            },
            installMode: CodePush.InstallMode.IMMEDIATE
        });
    }

    initPush() {
        if (Platform.OS === 'android') {
            JPushModule.initPush()
            JPushModule.getInfo(map => {
                console.log('push info', map);
            })
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {

                }
            })
        } else {
            JPushModule.setupPush()
        }
        JPushModule.addReceiveCustomMsgListener(map => {
            console.log('extras: ' + JSON.stringify(map));
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
            // if (map) {
            //     if (Platform.OS === 'android') {
            //         var extraJson = null;
            //         if (map.extras) {
            //             extraJson = JSON.parse(map.extras);
            //         }
            //         JPushModule.sendLocalNotification({
            //             buildId: 1,
            //             id: map.id,
            //             title: map.title,
            //             content: map.content,
            //             extra: extraJson
            //         });
            //     }else {
            //         var timestamp = new Date().getTime();
            //         if (map.extras) {
            //             JPushModule.sendLocalNotification({
            //                 id: map.id ? map.id : 0,
            //                 fireTime:timestamp,
            //                 title: map.title,
            //                 content: map.content,
            //                 extra: map.extras
            //             });
            //         }
            //         /**
            //          * iOS Only
            //          * 设置本地推送
            //          * @param {Date} date  触发本地推送的时间
            //          * @param {String} textContain 推送消息体内容
            //          * @param {Int} badge  本地推送触发后 应用 Badge（小红点）显示的数字
            //          * @param {String} alertAction 弹框的按钮显示的内容（IOS 8默认为"打开", 其他默认为"启动"）
            //          * @param {String} notificationKey  本地推送标示符
            //          * @param {Object} userInfo 推送的附加字段 选填
            //          * @param {String} soundName 自定义通知声音，设置为 null 为默认声音
            //          *  static setLocalNotification(
            //          date: Date,
            //          alertBody: string,
            //          badge?: number,
            //          alertAction?: string,
            //          notificationKey?: string,
            //          userInfo?: any,
            //          soundName?: string
            //          ):
            //          */
            //         // if (map.extras) {
            //         //
            //         //     JPushModule.setLocalNotification(
            //         //         new Date(),
            //         //         map.content,
            //         //         this.state.messages + 1,
            //         //         map.content,
            //         //         "1",
            //         //         map.extras,
            //         //         null
            //         //     );
            //         // }
            //     }
            // }
        })
        JPushModule.addReceiveNotificationListener(map => {
            // console.log('alertContent: ' + map.alertContent)
            console.log(' addReceiveNot extras: ' + JSON.stringify(map));
            // if (Platform.OS === 'ios') {
            //     // JPushModule.setBadge(map.aps.badge, success => {
            //     //
            //     // });
            // } else {
            //     JPushModule.setBadge(1, success => {
            //
            //     });
            // }
            JPushModule.setBadge(this.state.messages + 1, success => {

            });
            this.getUserInfo()
        })

        JPushModule.addReceiveOpenNotificationListener(map => {
            // console.log('Opening notification!')
            if (map == null) {
                return
            }
            if (Platform.OS === 'android') {
                console.log('map.extra: ' + map.extras);
                if (map.extras) {
                    this.jumpSecondActivity(JSON.parse(map.extras));
                }
            }else {
                console.log('map.extra: ' + JSON.stringify(map));
                if (map.extras) {
                    this.jumpSecondActivity({
                        title:map.extras.title,
                        active:map.extras.active,
                        messageId:map.extras.messageId,
                    });
                }
            }
            // JPushModule.clearAllNotifications();
        })

        //android
        JPushModule.addGetRegistrationIdListener(registrationId => {
            // alert('' + registrationId);
            this.sendPushId(registrationId)
            console.log('Device register succeed, registrationId ' + registrationId)
        })
        JPushModule.getRegistrationID((registrationId) => {
            // alert('' + registrationId);
            this.sendPushId(registrationId)
            console.log('Device register succeed, registrationId ' + registrationId)
        })
        //ios
        // JPushModule.getAppkeyWithcallback((registrationId) => {
        //     // alert('' + registrationId);
        //     console.log('Device register succeed, registrationId ' + registrationId)
        // })
        // JPushModule.clearAllNotifications();
    }


    getAD() {
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
        Request.post('/api/home/advertising', {}).then(rep => {
            if (rep.code == 0 && rep.data) {
                ADStore.save({
                    imageUrl: rep.data.imgurl,
                    active: rep.data.link,
                    times: rep.data.times,
                });
            }
        }).catch(err => {
        }).done(() => {

        })

        Request.post('/api/home/slideshow', {type: 1}, {cache: false}, (cacheRep) => {
            if (cacheRep) {
                // if (cacheRep.code == 0) {
                //     let _banners = [];
                //     if (cacheRep.data) {
                //         cacheRep.data.forEach(item => {
                //             _banners.push({
                //                 title: item.title,
                //                 url: item.link,
                //                 imagePath: item.imgurl
                //             })
                //         })
                //         this.setState({
                //             banners: _banners,
                //         });
                //     }
                // }
            }
        }).then(rep => {
            // alert(JSON.stringify(rep.data))
            if (rep.code == 0) {
                let _banners = [];
                if (rep.data) {
                    rep.data.forEach(item => {
                        _banners.push({
                            title: item.title,
                            url: item.link,
                            imagePath: item.imgurl
                        })
                    })
                    this.setState({
                        banners: _banners,
                    });
                }
            }
        }).catch(err => {
        }).done(() => {
        })
        Request.post('/api/home/slideshow', {type: 2}, {cache: false}, (cacheRep) => {
            if (cacheRep) {
                // if (cacheRep.code == 0) {
                //     let _recommendList = [];
                //     if (cacheRep.data) {
                //         cacheRep.data.forEach(item => {
                //             _recommendList.push({
                //                 title: item.title,
                //                 url: item.link,
                //                 imagePath: item.imgurl
                //             })
                //         })
                //         this.setState({
                //             recommendList: _recommendList,
                //         });
                //     }
                // }
            }
        }).then(rep => {
            if (rep.code == 0) {
                let _recommendList = [];
                if (rep.data) {
                    rep.data.forEach(item => {
                        _recommendList.push({
                            title: item.title,
                            url: item.link,
                            imagePath: item.imgurl
                        })
                    })
                    this.setState({
                        recommendList: _recommendList,
                    });
                }
            }
        }).catch(err => {
        }).done(() => {
        })

    }

    sendPushId(pushId) {
        Request.post('/api/user/reportPushId', {pushId: pushId}).then(rep => {
            if (rep.code == 0) {
                console.debug('同步pushId' + pushId);
            }
            else {
                console.debug('同步pushId失败' + pushId);
            }
        }).catch(err => {
        }).done(() => {
        })
    }

    onUnload() {
        // JPushModule.removeReceiveCustomMsgListener(this.receiveCustomMsgListener)
        // JPushModule.removeReceiveNotificationListener(this.receiveNotificationListener)
        // JPushModule.removeReceiveOpenNotificationListener(this.openNotificationListener)
        // JPushModule.removeGetRegistrationIdListener(this.getRegistrationIdListener)
        console.log('Will clear all notifications')
        // JPushModule.clearAllNotifications()
    }


    onHasPermission() {
        JPushModule.hasPermission(res => console.log(`onHasPermission ${res}`))
    }

    jumpSecondActivity(extras) {
        if (extras == null) {
            return;
        }
        var url = extras.active;
        if (url && url.indexOf('productDetail') != -1) {
            this.msgread(extras.messageId);
            var id = getUrlParam(url, 'id');
            this.navigate('ProductDetail', {id: id})
        } else if (url && url.indexOf('activeDetail') != -1) {
            this.msgread(extras.messageId);
            var id = getUrlParam(url, 'id');
            this.navigate('activeDetail', {id: id});
        } else if (url && url.indexOf('orderDetail') != -1) {
            this.msgread(extras.messageId);
            var id = getUrlParam(url, 'id');
            this.navigate('OrderDetail', {id: id});
        }else if (url && url.indexOf('messageDetail') != -1) {
            var id = getUrlParam(url, 'id');
            this.msgread(id);
            this.navigate('messageDetail', {id: id});
        } else {
            // this.navigate('ProductInfo',{title:'商品详情',htmlContent: htmlContent})
            var title = extras.title;
            var user = UserStore.get();
            url = url + "/" + user.token;
            this.push('Web', {article: {title: title, url: url}})
        }
        setTimeout(() => {
            this.getUserInfo()
        }, 3000);
    }

    msgread(id) {
        Request.post('/api/home/msgread', {evaluate: 1, id: id}).then(rep => {
            if (rep.code == 0 && rep.data) {

            } else {

            }
        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        });
    }

    canExitApp() {
        return true;
    }


    /**
     *
     * 欢迎页 & 推送通知消息列表 & 首页banner
     * active: 字段
     *
     * https://baidu.com 跳网页
     * qfant://xfyj/productDetail?id=1 跳商品详情
     * qfant://xfyj/activeDetail?id=1 跳活动详情
     * qfant://xfyj/orderDetail?id=1 跳订单详情
     */
    schamaJump(title, url) {
        if (url && url.indexOf('productDetail') != -1) {
            var id = getUrlParam(url, 'id');
            this.navigate('ProductDetail', {id: id})
        } else if (url && url.indexOf('activeDetail') != -1) {
            var id = getUrlParam(url, 'id');
            this.navigate('activeDetail', {id: id});
        }else if (url && url.indexOf('orderDetail') != -1) {
            var id = getUrlParam(url, 'id');
            this.navigate('OrderDetail', {id: id});
        }else if (url && url.indexOf('messageDetail') != -1) {
            var id = getUrlParam(url, 'id');
            this.navigate('messageDetail', {id: id});
        } else {
            this.push('Web', {article: {title: title, url: url}})
        }
    }


    getUserInfo() {
        Request.post('/api/user/getuserinfo', {}).then(rep => {
            if (rep.code === 0 && rep.data) {
                if (!util.isArrayEmpty(rep.data.pushTag)) {
                    JPushModule.setTags(rep.data.pushTag, (tags) => {
                        console.debug('pushtags=' + JSON.stringify(tags));
                    })
                }
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
                    pushTag: rep.data.pushTag,
                });
                this.setState({
                    isAuth: rep.data.isAuth,
                    searchHint: rep.data.searchHint,
                    messages: rep.data.messageCount
                });
                JPushModule.setBadge(rep.data.messageCount, success => {

                });
            }

        }).catch(err => {

        }).done(() => {
            this.setState({refreshing: false});
        })
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getUserInfo()
        this.getAD();
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
                    this.navigate('scanInfo', {serialNum: backData})
                }, 500);

            }
        );
        // $router();
        // this.navigate('scanInfo',{serialNum: 1111111})
    }

    _renderHeader() {
        var authText = '请认证'
        const {isAuth} = this.state
        if (isAuth === 0) {
            authText = '请认证'
        } else if (isAuth === 1) {
            authText = '已认证'
        } else if (isAuth === 2) {
            authText = '认证中'
        } else if (isAuth === 3) {
            authText = '认证失败'
        }
        return (
            <View style={{height: CommonStyle.navHeight}}>
                <View style={{
                    flex: 1, flexDirection: 'row', height: CommonStyle.navContentHeight,
                    marginTop: CommonStyle.navStatusBarHeight, alignItems: 'center'
                }}>
                    <TouchableView style={{width: 60, height: 50, alignItems: 'center', justifyContent: 'center'}}
                                   onPress={() => {
                                       console.log('isAuth', isAuth)
                                       if (isAuth == 1) {
                                           this.showShort('您已完成认证')
                                       } else if (isAuth != 1) {
                                           this.navigate('AuthPage', {}, (e) => {
                                               this.setState({
                                                   isAuth: e.isAuth
                                               })
                                           });
                                       }
                                   }}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 14}}>{authText}</Text>
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
                                marginLeft: 10
                            }} source={require("../../img/icon_search.png")}/>
                            <TouchableView style={{
                                flex: 1,
                                height: 30,
                                alignItems: 'center',
                                flexDirection: 'row',
                            }} onPress={() => {
                                this.navigate("goodsSearch")
                            }}>
                                <Text style={{
                                    color: "#fff",
                                    fontSize: 14,
                                    flex: 1,
                                    marginLeft: 5
                                }}>{util.isEmpty(this.state.searchHint) ? '搜索' : this.state.searchHint}</Text>
                            </TouchableView>
                            <TouchableView style={{width: 60, alignItems: 'center', justifyContent: 'center'}}
                                           onPress={() => {
                                               this.onScanClick()
                                           }}>
                                <Image style={{
                                    width: 16,
                                    height: 16, marginLeft: 8
                                }} source={require("../../img/icon_scan.png")}/>
                            </TouchableView>
                        </View>
                    </View>
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
                        <Badge style={{
                            position: CommonStyle.absolute, top: 15, right: 0,
                            width: 20,
                            height: 20,
                        }} text={this.state.messages} overflowCount={10} small>

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
                    autoplay={true} showsPagination={true} autoplayTimeout={2}>
                {this.state.banners.map((banner, i) => {
                    return (
                        <TouchableView key={i} onPress={() => {
                            if (banner.url) {
                                this.schamaJump(banner.title, banner.url);
                            }
                        }}>
                            <ImageView style={{height: 255, width: '100%', resizeMode: ImageStyle.stretch,}}
                                       source={banner.imagePath}
                                       defaultSource={require('../../img/bg_banner.png')}></ImageView>
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
                <View style={[{flex: 1, height: 70}, styles.typesItem]}>
                    <ImageView source={item.imageUrl} style={{width: 30, height: 30,}}
                               defaultSource={require("../../img/default_image.png")}/>
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
                    autoplay={true} showsPagination={true} loop={true}>
                {this.state.recommendList.map((banner, i) => {
                    return (
                        <TouchableView style={{
                            // paddingRight: 10,
                            // paddingLeft: 10,
                        }} key={i} onPress={() => {
                            if (banner.url) {
                                this.schamaJump(banner.title, banner.url);
                            }
                        }}>
                            <ImageView style={{
                                // borderRadius: 40,
                                width: '100%',
                                height: 80,
                                resizeMode: ImageStyle.cover
                            }} source={banner.imagePath}
                                       defaultSource={require('../../img/bg_center_banner.png')}></ImageView>
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
                this.navigate('ProductDetail', item);
            }}>
                <View style={[{
                    flex: 1, borderRadius: 3, backgroundColor: '#fff',
                    borderColor: '#fff',
                    padding: 10,
                    borderWidth: .5,
                }]}>
                    <ImageView source={item.goodsImage} style={{width: '100%', marginTop: 10, height: 100,}}
                               defaultSource={require("../../img/default_image.png")}/>
                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={{
                        flex: 1, fontSize: 14, color: "#333", marginTop: 20,
                    }}>{item.goodsName}</Text>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: "flex-end", marginTop: 10}}>
                        <Text style={{fontSize: 12, color: CommonStyle.themeColor}}>￥<Text
                            style={{fontSize: 24, color: CommonStyle.themeColor,}}>{item.goodsPrice}</Text></Text>
                        <Text style={{
                            fontSize: 12,
                            color: '#666',
                            marginLeft: 5,
                            marginBottom: 5,
                            textDecorationLine: 'line-through'
                        }}>{`￥${item.marketPrice}`}</Text>
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
                <View style={{marginTop: 55}}>
                    {this._renderCenterView()}
                </View>
                {this.state.goodsRecommend && <TouchableView onPress={() => {
                    this.navigate('goodsList', {'type': 0, title: '商品列表'});
                }}>
                    <View style={{
                        paddingHorizontal: 10, paddingVertical: 15, marginTop: 10, flex: 1, flexDirection: 'row',
                        alignItems: 'center', backgroundColor: '#fff', borderColor: CommonStyle.lineColor,
                        borderBottomWidth: .5
                    }}>
                        <View style={{backgroundColor: CommonStyle.themeColor, height: 18, width: 2}}></View>
                        <Text style={{fontSize: 15, color: CommonStyle.themeColor, marginLeft: 5, flex: 1}}>商品推荐</Text>
                        <Text style={{fontSize: 13, color: '#666',}}>更多</Text>
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
    },
    typesItem: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
})
