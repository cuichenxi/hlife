import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {View} from "react-native";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import {CommonStyle} from "../../common/CommonStyle";
import HouseSellRentView from "./HouseSellRentView";

export default class HouseSellRent extends BaseComponent {
    navigationBarProps() {
        return {
            title: '房屋租售',
            rightTitle:'发布房源'
        }
    }

    onRightPress(){
        this.navigate('PublishHouseInfo');
    }
    _render() {
        const tabs = [
            {title: '出售'},
            {title: '出租'},
        ];
        return (
            <View style={{flex: 1}}>
                <Tabs tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor} onChange={(tab, index) => {
                    // index
                }} tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor,}} initialPage={0}
                      tabBarPosition="top"
                      swipeable={false}
                >
                    {this.renderPage.bind(this)}

                </Tabs>
            </View>
        );
    }

    renderPage(tab, index) {
        return (
            <HouseSellRentView style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }} tab={tab} index={index}
                               onItemPress={(item) => {
                               }}
                               onButtonPress={() =>{
                                   this.navigate('PublishHouseInfo')
                               }}/>
        )
    }

}

/*const TabStyle = StyleSheet.create({
        ...TabStyles,
    topTabBarSplitLine: {
        borderBottomWidth: 0
    },
})*/
