import React from 'react';
import {Image, FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BaseComponent} from "../../components/base/BaseComponent";
import GridView from "../../components/GridView";
import TouchableView from "../../components/TouchableView";
import QIcon from "../../components/icon";
import {CommonStyle} from "../../common/CommonStyle";
import Icon from "react-native-vector-icons/Ionicons";

const iconUrl = require('../../img/about_logo.png');
export default class Housekeeper extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            types: [
                {
                    name: '物业缴费',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Register'
                }, {
                    name: '生活缴费',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'ContactList'
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
            // dataSource: new ListView.DataSource({
            //     rowHasChanged: (row1, row2) => row1 !== row2
            // }),
            typeIds: [],
            typeList: {},
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

    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '管家',
        }
    }

    onNext = () => {
        this.navigate('Login', {isFirst: true});
    };

    canExitApp() {
        return true;
    }

    _render() {
        let activities = this.state.activities;
        return (
            <ScrollView style={styles.container}>
                <View>


                    {this._renderGridView()}
                    {this._rendCardView()}
                    <View style={styles.titleLine}>
                        <Icon name="ios-arrow-forward-outline" size={16} color='#999'/>
                        <TouchableOpacity onPress={()=>{this.goReportMatter()}}>
                            <Text style={{fontSize: 14, color: CommonStyle.color_333}}>物业服务</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        backgroundColor: CommonStyle.lineColor,
                        height: .5
                    }}/>
                    <View style={{
                        backgroundColor: '#fff',
                        flex: 1,
                        flexDirection: 'row',
                        height: 60,
                        paddingHorizontal: 16,
                        justifyContent: 'space-between',
                        alignItems: 'center',

                    }}>
                        <View style={styles.orderItem}>
                            <QIcon style={styles.orderItemIcon} name={'icon-home'} size={22}
                                   color={CommonStyle.color_666}></QIcon>
                            <Text style={styles.orderItemText}>送水服务</Text>
                        </View>
                        <View style={styles.orderItem}>
                            <QIcon style={styles.orderItemIcon} name={'icon-home'} size={22}
                                   color={CommonStyle.color_666}></QIcon>
                            <Text style={styles.orderItemText}>家政服务</Text>
                        </View>
                        <View style={styles.orderItem}>
                            <QIcon style={styles.orderItemIcon} name={'icon-home'} size={22}
                                   color={CommonStyle.color_666}></QIcon>
                            <Text style={styles.orderItemText}>访客通行</Text>
                        </View>
                        <View style={styles.orderItem}>
                            <QIcon style={styles.orderItemIcon} name={'icon-home'} size={22}
                                   color={CommonStyle.color_666}></QIcon>
                            <Text style={styles.orderItemText}>咨询建议</Text>
                        </View>
                    </View>
                    <View style={[styles.titleLine, {marginTop: 0}]}>
                        <Icon name="ios-arrow-forward-outline" size={16} color='#999'/>
                        <Text style={{fontSize: 14, color: CommonStyle.color_333}}>小区活动</Text>
                    </View>

                    <View>
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
                    flex: 1, paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: '#fff'
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
                    <Text style={{fontSize: 12, color: "#666", marginTop: 6}}>{item.name}</Text>
                </View>
            </TouchableView>
        )
    }

    _rendCardView() {
        return (
            <View style={{flexDirection: 'row', flex: 1, marginRight: 5, marginLeft: 5}}>
                <View style={styles.card}>
                    <Text>查一查</Text>
                    <Text>物业知识共分享</Text>
                </View>
                <View style={[styles.card, {marginLeft: 15}]}>
                    <Text>电话物业</Text>
                    <Text>24小时在线</Text>
                </View>
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
                    <View style={{flexDirection:'row'}}>
                        <Image source={item.imageUrl}
                               style={{
                                   width: 20,
                                   height: 20,}}/>
                    </View>
                </View>
                <View>
                    <Text style={{textAlign: 'left', color: '#999999', fontSize: 15}}>{item.date}</Text>
                    <Text style={{textAlign: 'left', color: '#999999', fontSize: 15}}>已有{item.joinPeople}人参加活动</Text>
                </View>
            </TouchableOpacity>)
        })
    }

    goReportMatter() {
        this.navigate('ReportMatter')
    }
}

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

