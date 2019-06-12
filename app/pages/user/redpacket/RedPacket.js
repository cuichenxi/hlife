import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Text, StyleSheet, View} from "react-native";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import {CommonStyle} from "../../../common/CommonStyle";
import RedPacketView from "./RedPacketView";
import ToastUtil from "../../../utils/ToastUtil";

export default class RedPacket extends BaseComponent {

    onReady(e) {
        this.setTitle("红包")
    }

    _render() {
        const tabs = [
            {title: '未使用'},
            {title: '已使用'},
            {title: '已过期'},
        ];
        return (
            <Tabs style={{marginTop: 10}} tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor}
                  tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor}} initialPage={0} tabBarPosition="top">
                {this.renderPage.bind(this)}
            </Tabs>

        );
    }

    renderPage(tab, index) {
        return (
            <RedPacketView style={styles.container} tab={tab} index={index}
                           onItemPress={(item) => {
                               this.goBack(item)
                               // ToastUtil.showShort("item = " + JSON.stringify(item));
                           }}/>)
    }

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CommonStyle.bgColor,
    },
});