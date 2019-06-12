import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Text, View} from "react-native";
import Request from "../../../utils/Request";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from "react-native-vector-icons/Ionicons";
import {CommonStyle} from "../../../common/CommonStyle";
import TouchableView from "../../../components/TouchableView";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import HousingAddressView from "./HousingAddressView";
import ToastUtil from "../../../utils/ToastUtil";


const Font = {
    Ionicons,
    FontAwesome
}
/**
 *我的地址
 */
export default class MyAddress extends BaseComponent {
    navigationBarProps() {
        return {
            title: '我的地址',
        }
    }


    _render() {
        const tabs = [
            {title: '小区地址'},
            {title: '收货地址'},
        ];
        return (
            <Tabs style={{marginTop: 10}} tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor}  onChange={(tab,index)=>{
                // index
                ToastUtil.showShort("index = " + index);
            }}
                  tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor}} initialPage={0} tabBarPosition="top">

                {this.renderPage.bind(this)}
            </Tabs>

        )
    }

    renderPage(tab,index){
        console.log(index)
        return(
            <HousingAddressView style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }} tab={tab} index={index}
                                onItemPress={(item) => {
                                    // this.goBack(item)
                                    this.navigate('ModifyHousingAddress',{address:item})
                                    // ToastUtil.showShort("index = " + index);
                                }} onButtonPress={() =>{
                                    this.goAddHousingAddress()
            }}/>
        )
    }


    goAddHousingAddress() {
        this.navigate('AddHousingAddress')
    }
}
