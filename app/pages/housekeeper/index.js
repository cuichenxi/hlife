import React from 'react';
import {
    Image,
    ImageBackground,
    Linking,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {BaseComponent} from "../../components/base/BaseComponent";
import GridView from "../../components/GridView";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import Request from "../../utils/Request";
import ImageView from "../../components/ImageView";
import UserStore from "../../store/UserStore";
import util from "../../utils/util";
import {PAGE_SIZE} from "../../constants/AppConstants";
import GiftedListView from "../../components/refreshList/GiftedListView";


export default class Housekeeper extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '管家',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            phone:10086,
            types: [
                {
                    name: '物业缴费',
                    imageUrl: require('../../img/menu_wyjf.png'),
                    active: 'LivingPayment'
                }
                ,
                // {
                //     name: '发布房源',
                //     imageUrl: require('../../img/menu_wyjf.png'),
                //     active: 'PublishHouseInfo'
                // }
                , {
                    name: '访客通行',
                    imageUrl: require('../../img/menu_sdjf.png'),
                    active: 'GuestPassKey'
                }, {
                    name: '报修报事',
                    imageUrl: require('../../img/menu_bxbs.png'),
                    active: 'RepairsSelect'
                }, {
                    name: '咨询建议',
                    imageUrl: require('../../img/menu_zxjy.png'),
                    // active: 'ContactList'
                    active: 'GiveAdvice'
                }, {
                    name: '电子钥匙',
                    imageUrl: require('../../img/menu_dzcx.png'),
                    active: 'ElectronicKey'
                }, {
                    name: '常用电话',
                    imageUrl: require('../../img/menu_xydh.png'),
                    active: 'UsefulPhone'
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
            activities: [

                /*{
                    imageUrl: "",
                    activityName: "三月八日女神节",
                    activityDate: "03月08日",
                    activityContent: "三月八日女神节,三月八日女神节,三月八日女神节 三月八日女神节三月八日女神节三月八日女神节",
                    activityNum: 100,
                    id: 0,
                    status: 1
                },{
                    imageUrl: "",
                    activityName: "三月八日女神节",
                    activityDate: "03月08日",
                    activityContent: "三月八日女神节,三月八日女神节,三月八日女神节 三月八日女神节三月八日女神节三月八日女神节",
                    activityNum: 100,
                    id: 0,
                    status: 0
                },*/
            ]
        };
    }

    onReady() {
        this.requestData();
    }

    requestData() {
        Request.post('/api/steward/basci', {},
            {
                mock: true,
                mockId: 1095640,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // this.setData(rep.data)
            }
        }).catch(err => {

        }).done(() => {
            this.setState({refreshing: false});
        })

    }

    _onFetch(page = 1, callback){
        let param = { page: page - 1, pageSize: PAGE_SIZE,};
        Request.post("/api/neighbour/activityList", param
        ).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null, {emptyTitle: '暂无活动'})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        });
    }

    /**
     * "imageUrl": "",
     "title": "",
     "date": "",
     "personCount": "",
     "des": ""
     * @param data
     */
    setData(data) {
        let _activityList = [];
        if (data.activityList) {
            data.activityList.forEach(item => {
                _activityList.push({
                    title: item.name,
                    url: item.actionUrl,
                    imagePath: item.imageUrl
                })
            })
        }
        this.setState({
            activities: _activityList,
        });
    }

    canExitApp() {
        return true;
    }

    _jumpRouter(typeItem) {
        if (typeItem&&typeItem.active.indexOf('alipays://') === 0) {
            Linking.openURL(typeItem.active);
        } else {
            this.push(typeItem.active, {title: typeItem.name});
        }
    }

    _render() {
        let activities = this.state.activities;
        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />}>
                <View>
                    {this._renderGridView()}
                    {this._rendCardView()}
                    <View style={[styles.titleLine, {marginTop: 5}]}>
                        <Image style={{width:16,height:16}} source={require('../../img/icon_xqhd.png')}/>
                        <Text style={{fontSize: 16, marginLeft:5,color: CommonStyle.color_333}}>小区活动</Text>
                    </View>
                    <View>
                        {/*{this._renderBottomItem(activities)}*/}
                        <GiftedListView
                            style={styles.container}
                            rowView={this._renderBottomItem.bind(this)}
                            onFetch={this._onFetch.bind(this)}
                            loadMore={true}
                            renderSeparator={() => {
                                return (null);
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }

    _renderGridView() {
        return (
            <GridView
                style={{
                    flex: 1,
                    paddingBottom: 20,
                    marginTop: 10,
                    backgroundColor: '#fff'
                }}
                items={this.state.types}
                num={4}
                renderItem={this._renderGridItem.bind(this)}
            />
        );
    }

    _renderGridItem(item, index) {
        return (
            <TouchableView style={{flex: 1}} key={index} onPress={() => {
                this._jumpRouter(item)
            }}>
                <View style={[{flex: 1}, styles.typesItem]}>
                    <ImageView source={item.imageUrl} style={{width: 30, height: 30, marginTop: 20, }}/>
                    <Text style={{fontSize: 12, color: "#333", marginTop: 20}}>{item.name}</Text>
                </View>
            </TouchableView>
        )
    }

    _rendCardView() {
        return (
            <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
                <TouchableView style={{flex: 1,}} onPress={() => {
                        this.navigate("BarcodePage", {},
                             (backData) => {
                                setTimeout(() => {
                                    this.navigate('scanInfo',{serialNum: backData})
                                }, 500);

                        });
                }}>
                    <ImageBackground source={require('../../img/bg_cyc.png')} style={{
                        height: 80,
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: '#333',
                            fontWeight: 'bold',
                            marginLeft: 20,
                            fontSize: 16
                        }}>扫一扫</Text>
                        <Text style={{color: '#999', fontSize: 14, marginLeft: 20, marginTop: 10}}>物业知识共分享</Text>
                    </ImageBackground>
                </TouchableView>
                <TouchableView style={{flex: 1}} onPress={() => {
                    var {tenementPhone} = UserStore.get();
                    if (util.isEmpty(tenementPhone)) {
                        this.showShort('暂无物业电话')
                    }else {
                        Linking.openURL(`tel:${this.state.phone}`);
                    }
                }}>
                    <ImageBackground source={require('../../img/bg_dhwy.png')} style={{
                        height: 80,
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Text style={{color: '#333', fontWeight: 'bold', marginLeft: 20, fontSize: 16}}>电话物业</Text>
                        <Text style={{color: '#999', fontSize: 14, marginLeft: 20, marginTop: 10}}>24小时在线</Text>
                    </ImageBackground>
                </TouchableView>

            </View>

        )
    }

    _renderBottomItem(item){
        return (<TouchableOpacity style={{
            backgroundColor: '#fff',
            flex:1,
            flexDirection: 'row',
            paddingHorizontal:10,
            paddingVertical:5,
            borderColor: CommonStyle.lineColor,
            borderTopWidth: .5
        }} onPress={()=>{
            this.navigate('activeDetail', item);
        }
        }>
            <ImageView
                source={item.imageUrl}
                style={{
                    width: 90,
                    height: 90,
                    paddingLeft:10
                }}
                defaultSource={require('../../img/default_image.png')}
            />
            <View style={{flex: 1, paddingLeft: 10}}>
                <Text style={{
                    fontSize: 17,
                    marginTop:10,
                    textAlign: 'left', color: '#666666'
                }}>{item.activityName}</Text>
                <Text style={{textAlign: 'left', marginTop:5,color: '#999999', fontSize: 15}}>{item.activityDate}</Text>
                <Text style={{textAlign: 'left', marginTop:5,color: '#999999', fontSize: 15}}>已有{item.activityNum}人参加活动</Text>
            </View>
        </TouchableOpacity>)
    };
    goReportMatter() {
        this.navigate('MyAddressWithTab')
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 68,
    },
    card: {
        backgroundColor: "#fff",
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    slide: {
        height: 125,
        resizeMode: Image.resizeMode.stretch,
    },
    typesItem: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
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
    titleLine: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        height: 40,
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20
    }
});

