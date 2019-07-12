import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {StyleSheet} from "react-native";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import {CommonStyle} from "../../../common/CommonStyle";
import RedPacketView from "./RedPacketView";

export default class RedPacket extends BaseComponent {

    onReady(e) {
        this.setTitle("红包")
        this.setState({
            from: e.from
        })
    }

    _render() {
        const tabs = [
            {title: '未使用'},
            {title: '已使用'},
            {title: '已过期'},
        ];
        return (
            <Tabs style={{marginTop: 1}} tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor}
                  tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor}} initialPage={0} tabBarPosition="top" swipeable={false}>
                {this.renderPage.bind(this)}
            </Tabs>

        );
    }

    renderPage(tab, index) {
        return (
            <RedPacketView style={styles.container} tab={tab} index={index} from={this.state.from}
                           onItemPress={(item) => {
                               if (this.state.from === 1) {
                                   this.goBack(item);
                               }
                               // ToastUtil.showShort("item = " + JSON.stringify(item));
                           }}/>);
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
