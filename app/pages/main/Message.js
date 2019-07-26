import React from 'react';
import {DeviceEventEmitter, StyleSheet, View} from 'react-native';
import {BaseComponent} from '../../components/base/BaseComponent'
import {CommonStyle} from "../../common/CommonStyle";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import MessageListView from "./MessageListView";
import Request from "../../utils/Request";
import {getUrlParam} from "../../utils/UrlUtil";

export default class Message extends BaseComponent {
    navigationBarProps() {
        return {
            title: '通知',
            rightTitle:'全部已读'
        }
    }
    onRightPress(){
        Request.post('/api/home/msgreadAll').then(rep => {
            if (rep.code == 0) {
                DeviceEventEmitter.emit("msgreadAll", {msgreadAll: 1});
            } else {

            }
        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
    }

    onUnload() {

    }
    msgread(item){
        Request.post('/api/home/msgread', {evaluate:1,id:item.id}).then(rep => {
            if (rep.code == 0 && rep.data) {

            } else {

            }
        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
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
                <Tabs tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor}  onChange={(tab,index)=>{
                    // index
                }}
                      tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor}} initialPage={0} tabBarPosition="top" swipeable={false}>
                    {this.renderPage.bind(this)}
                </Tabs>
            </View>
        );
    }

    renderPage(tab,index){
        console.log(index)
        return(
            <MessageListView style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }} tab={tab} index={index} onButtonPress={(e) =>{
                this.msgread(e);
                this._loadWeb("",e.active)
                // this.navigate('s',e)
            }}/>
        )
    }
    _loadWeb(title, url) {
        if (url && url.indexOf('productDetail') !=-1) {
            var id = getUrlParam(url,'id');
            this.navigate('ProductDetail',{id: id})
        } else if (url && url.indexOf('activeDetail') != -1) {
            var id = getUrlParam(url,'id');
            this.navigate('activeDetail', {id: id});
        } else if (url && url.indexOf('orderDetail') != -1) {
            var id = getUrlParam(url,'id');
            this.navigate('OrderDetail', {id: id});
        }else {
            // this.navigate('ProductInfo',{title:'商品详情',htmlContent: htmlContent})
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

