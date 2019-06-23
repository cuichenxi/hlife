import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import {CommonStyle} from "../../../common/CommonStyle";
import ToastUtil from "../../../utils/ToastUtil";
import OrderView from "./OrderView";


/**
 *我的订单
 */
export default class MyOrder extends BaseComponent {
    navigationBarProps() {
        return {
            title: '我的订单',
        }
    }


    _render() {
        const tabs = [
            {title: '商城'},
            {title: '缴费'},
        ];
        return (
            <Tabs tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor}  onChange={(tab,index)=>{
                // index
            }}
                  tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor}} initialPage={0} tabBarPosition="top">

                {this.renderPage.bind(this)}
            </Tabs>

        )
    }

    renderPage(tab,index){
        console.log(index)
        return(
            <OrderView style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }} tab={tab} index={index}
                         onItemPress={(item) => {
                             // this.goBack(item)
                             // this.navigate('ModifyHousingAddress',{address:item})
                             // ToastUtil.showShort("index = " + index);
                         }}/>
        )
    }

}
