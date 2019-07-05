import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {StyleSheet} from "react-native";
import {CommonStyle} from "../../../common/CommonStyle";
import {Tabs} from "antd-mobile-rn";
import OrderPageView from "./OrderPageView";


/**
 *我的订单
 */
export default class OrderList extends BaseComponent {
    navigationBarProps() {
        return {
            title: '我的订单',
        }
    }

    _render() {
        const tabs = [
            {title: '全部'},
            {title: '待支付'},
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
            <OrderPageView style={styles.container} tab={tab} index={index} navigation={this.props.navigation}
                           onItemPress={(item) => {
                               // this.goBack(item)
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


