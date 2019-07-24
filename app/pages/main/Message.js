import React from 'react';
import {StyleSheet, View} from 'react-native';
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
        Request.post('/api/home/msgreadAll', {evaluate:1,id:item.id}).then(rep => {
            if (rep.code == 0 && rep.data) {
            } else {
            }
        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
    }
    msgread(){
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
            {title: '活动'},
            {title: '管家'},
            {title: '订单'},
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
            }} tab={tab} index={index} onButtonPress={(item) =>{
                this.msgread();
                this.navigate('MessageDetail',item)
            }}/>
        )
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
    _loadWeb(title, url) {
        if (url && url.indexOf('productDetail') !=-1) {
            var id = getUrlParam(url,'id');
            this.navigate('ProductDetail',{id: id})
        } else if (url && url.indexOf('activeDetail') != -1) {
            var id = getUrlParam(url,'id');
            this.navigate('activeDetail', {id: id});
        } else {
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

