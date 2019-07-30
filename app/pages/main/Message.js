import React from 'react';
import {Alert, DeviceEventEmitter, StyleSheet, View} from 'react-native';
import {BaseComponent} from '../../components/base/BaseComponent'
import {CommonStyle} from "../../common/CommonStyle";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import MessageListView from "./MessageListView";
import Request from "../../utils/Request";
import {getUrlParam} from "../../utils/UrlUtil";
import UserStore from "../../store/UserStore";
import {PAGE_SIZE} from "../../constants/AppConstants";
import util from "../../utils/util";

export default class Message extends BaseComponent {
    navigationBarProps() {
        return {
            title: '通知',
            rightTitle: '全部已读'
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            hasUnRead1: false,
            hasUnRead2: false,
            hasUnRead3: false,
            hasUnRead4: false,
        };
    }
    onRightPress() {
        Alert.alert(
            '提示',
            '标记全部已读',
            [
                {text: '确定', onPress: () => this.allRead()},
            ],
            {cancelable: true}
        );
    }
    allRead(){
        Request.post('/api/home/msgreadAll').then(rep => {
            if (rep.code == 0) {
                DeviceEventEmitter.emit("msgreadAll", {msgreadAll: 1});
                this.requestUnReads();
            } else {

            }
        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
    }

    onUnload() {

    }

    msgread(index,item) {
        Request.post('/api/home/msgread', {evaluate: 1, id: item.id}).then(rep => {
            if (rep.code == 0 ) {
                this.getUnReadByType(index + 1);
            } else {

            }
        }).catch(err => {

        }).done(() => {

        });
    }

    getUnReadByType(type) {
        let param = {type: type, page: 0, pageSize: PAGE_SIZE};
        Request.post('/api/home/messageList', param,
            {
                mock: false,
                mockId: 1095710,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                var hasUnRead = false;
                rep.data.rows.map((item) => {
                    if (item.isRead === 0) {
                        console.log("getUnReadByType", " forEach type=" + type + "hasUnRead=" + hasUnRead);
                        hasUnRead = true;
                    }
                });
                console.log("getUnReadByType", "type=" + type + "hasUnRead=" + hasUnRead);
                switch (type) {
                    case 1:
                        this.setState({
                            hasUnRead1: hasUnRead
                        });
                        break
                    case 2:
                        this.setState({
                            hasUnRead2: hasUnRead
                        });
                        break
                    case 3:
                        this.setState({
                            hasUnRead3: hasUnRead
                        });
                        break
                    case 4:
                        this.setState({
                            hasUnRead4: hasUnRead
                        });
                        break
                }

            } else {

            }
        }).catch(err => {

        }).done(() => {

        })
    }

    onReady(e) {
        this.requestUnReads();
    }
    requestUnReads() {
        this.getUnReadByType(1)
        this.getUnReadByType(2)
        this.getUnReadByType(3)
        this.getUnReadByType(4)
    }

    _render() {
        const tabs = [
            {title: '通知'},//1
            {title: '管家'},//2
            {title: '订单'},//3
            {title: '其他'},//4
        ];
        return (
            <View style={styles.container}>
                <Tabs tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor} onChange={(tab, index) => {
                    // index
                }}
                      tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor}} initialPage={0}
                      tabBarPosition="top" swipeable={false}>
                    {this.renderPage.bind(this)}
                </Tabs>
                <View style={{
                    position: CommonStyle.absolute, top: 0,left:0, right: 30,
                    height: 20,
                    flexDirection:'row'
                }}>
                    <View style={{flex: 1,alignItems:'center' }}>
                        {this.state.hasUnRead1&&
                         <View style={{backgroundColor: CommonStyle.red, marginLeft:60,borderRadius: 5, width: 10, height: 10}}/>
                        }
                    </View>
                    <View style={{flex: 1,alignItems:'center'}}>
                        {this.state.hasUnRead2 &&
                        <View style={{
                            backgroundColor: CommonStyle.red,
                            marginLeft: 65,
                            borderRadius: 5,
                            width: 10,
                            height: 10
                        }}/>
                        }
                    </View>
                    <View style={{flex: 1,alignItems:'center'}}>
                        {this.state.hasUnRead3 &&
                        <View style={{
                            backgroundColor: CommonStyle.red,
                            marginLeft: 70, borderRadius: 5, width: 10, height: 10
                        }}/>
                        }
                    </View>
                    <View style={{flex: 1,alignItems:'center'}}>
                        {this.state.hasUnRead4 &&
                        <View style={{
                            backgroundColor: CommonStyle.red,
                            marginLeft: 70,
                            borderRadius: 5,
                            width: 10,
                            height: 10
                        }}/>
                        }
                    </View>
                </View>
            </View>
        );
    }

    renderPage(tab, index) {
        console.log(index)
        return (
            <MessageListView style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }} tab={tab} index={index} onButtonPress={(e) => {
                this.msgread(index,e);
                this._loadWeb("", e.active)
                // this.navigate('s',e)
            }}/>
        )
    }

    _loadWeb(title, url) {
        if (url && url.indexOf('productDetail') != -1) {
            var id = getUrlParam(url, 'id');
            this.navigate('ProductDetail', {id: id})
        } else if (url && url.indexOf('activeDetail') != -1) {
            var id = getUrlParam(url, 'id');
            this.navigate('activeDetail', {id: id});
        } else if (url && url.indexOf('orderDetail') != -1) {
            var id = getUrlParam(url, 'id');
            this.navigate('OrderDetail', {id: id});
        } else {
            // this.navigate('ProductInfo',{title:'商品详情',htmlContent: htmlContent})
            var user = UserStore.get();
            url = url + "/" + user.token;
            this.push('Web', {article: {title: title, url: url}})
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    textInput: {
        width: 200,
        height: 100,
        fontSize: 18,
        padding: 15,
    }
});

