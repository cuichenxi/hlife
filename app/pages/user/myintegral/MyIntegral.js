import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Image, Text, View} from "react-native";
import {CommonStyle} from "../../../common/CommonStyle";
import LinearGradient from "react-native-linear-gradient";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import IntegralDetailView from "./IntegralDetailView";
import IntegralRedPacketView from "./IntegralRedPacketView";

/**
 * 我的积分
 */
export default class MyIntegral extends BaseComponent{
    navigationBarProps() {
        return {
            title: '我的积分',
        }
    }
    _render() {
        const tabs = [
            {title: '积分明细'},
            {title: '红包'},
        ];
        return (
            <View style={{flex: 1}}>
                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0, y: .8}}
                                colors={['#63D5A2', CommonStyle.themeColor]}
                                style={{height: 150,justifyContent: 'center',alignItems: 'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:8}}>
                        <Text style={{fontSize:12,color:'#fff'}}>我的积分</Text>
                        <Image source={require('../../../img/jifen_icon.png')}
                               style={{width: 11, height: 9, resizeMode: 'contain'}}/>
                    </View>
                    <Text style={{fontSize:33,color:'#fff'}}>999999</Text>
                </LinearGradient>
                <Tabs tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor}  onChange={(tab,index)=>{
                    // index
                }}
                      tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor}} initialPage={0} tabBarPosition="top">

                    {this.renderPage.bind(this)}
                </Tabs>
            </View>
        );
    }

    renderPage(tab,index){
        console.log(index)
        if (index === 0){
            return(
                <IntegralDetailView style={{
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
        } else if (index === 1){
            return(
                <IntegralRedPacketView style={{
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
}
