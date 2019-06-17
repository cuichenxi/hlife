import React from 'react';
import {Image, FlatList, Linking,ScrollView, StyleSheet, Text, View, TouchableOpacity, RefreshControl} from 'react-native';
import {BaseComponent} from "../../components/base/BaseComponent";
import GridView from "../../components/GridView";
import TouchableView from "../../components/TouchableView";
import QIcon from "../../components/icon";
import {CommonStyle} from "../../common/CommonStyle";
import Icon from "react-native-vector-icons/Ionicons";
import Request from "../../utils/Request";

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
            types: [
                {
                    name: '物业缴费',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Register'
                }, {
                    name: '生活缴费',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'lifePay'
                }, {
                    name: '报修报事',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '智能家居',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'ContactList'
                }, {
                    name: '手机充值',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '常用电话',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '租房租售',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '社区通告',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }
            ],
            activities: [
                {
                    imageUrl: require('../../img/about_logo.png'),
                    activityName: '端午节龙舟赛',
                    date: '06月07日举办',
                    joinPeople: 12
                },
                {
                    imageUrl: require('../../img/about_logo.png'),
                    activityName: '社区文化艺术节',
                    date: '06月08日举办',
                    joinPeople: 19
                },
                {
                    imageUrl: require('../../img/about_logo.png'),
                    activityName: '三月八日女神节',
                    date: '03月08日举办',
                    joinPeople: 100
                },
            ]
        };
    }
    onReady(){
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
        Linking.openURL("alipays://platformapi/startapp?appId=20000193");
            // this.push(typeItem.active, {title: typeItem.name});
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
                    <View style={[styles.titleLine, {marginTop: 20}]}>
                        <Icon name="ios-arrow-forward-outline" size={16} color='#999'/>
                        <Text style={{fontSize: 14, color: CommonStyle.color_333}}>小区活动</Text>
                    </View>
                    <View >
                        {this._renderBottomItem(activities)}
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
                    <Image source={item.imageUrl} style={{width: 35, height: 35, marginTop: 20}}/>
                    <Text style={{fontSize: 14, color: "#333", marginTop: 10}}>{item.name}</Text>
                </View>
            </TouchableView>
        )
    }

    _rendCardView() {
        return (
            <View style={{flexDirection: 'row', flex: 1, marginTop: 20}}>
                <TouchableView style={{flex: 1}}onPress={()=>{
                    this.showShort("查一查")
                }}>
                <View style={{paddingLeft:20,borderRadius:3,backgroundColor:'#fff',borderColor:'#eee',height:80,marginHorizontal: 10 , flex: 1 ,justifyContent:'center'}}>
                    <Text style={{color:'#333',fontWeight: 'bold',fontSize:16}}>查一查</Text>
                    <Text  style={{color: '#999',fontSize:14 ,marginTop:10}}>物业知识共分享</Text>
                    <Image source={require('../../img/about_logo.png')} style={{position:'absolute',width: 35, height: 35,right:0, bottom: 0}}/>
                </View>
                </TouchableView>
                <TouchableView style={{flex: 1}}onPress={()=>{
                    this.showShort("电话物业")
                }}>
                <View style={{paddingLeft:20,borderRadius:3,backgroundColor:'#fff',borderColor:'#eee',height:80,marginHorizontal: 10 , flex: 1 ,justifyContent:'center'}}>
                    <Text style={{color:'#333',fontWeight: 'bold',fontSize:16}}>电话物业</Text>
                    <Text  style={{color: '#999',fontSize:14 ,marginTop:10}}>24小时在线</Text>
                    <Image source={require('../../img/about_logo.png')} style={{position:'absolute',width: 35, height: 35,right:0, bottom: 0}}/>
                </View>
                </TouchableView>
            </View>

        )
    }

    _renderBottomItem = (data) => {
        return data.map((item, i) => {
            return (<TouchableOpacity style={{
                backgroundColor: 'white',
                // height:50,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5
            }}>
                <Image
                    source={item.imageUrl}
                    style={{
                        width: 100,
                        height: 90,
                        marginLeft: 10,
                    }}
                />
                <View style={{flex: 1, marginLeft: 10}}>
                    <Text style={{
                        fontSize: 17,
                        marginBottom: 8,
                        textAlign: 'left', color: '#666666'
                    }}>{item.activityName}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={item.imageUrl}
                               style={{
                                   width: 20,
                                   height: 20,
                               }}/>
                    </View>
                </View>
                <View>
                    <Text style={{textAlign: 'left', color: '#999999', fontSize: 15}}>{item.date}</Text>
                    <Text style={{textAlign: 'left', color: '#999999', fontSize: 15}}>已有{item.joinPeople}人参加活动</Text>
                </View>
            </TouchableOpacity>)
        })
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

