import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import ScrollableTabView from 'react-native-scrollable-tab-view'
import CustomTabBar from "../../../components/CustomTabBar";

let {width, height} = Dimensions.get('window')

export default class MyAddress extends BaseComponent {

    _render() {
        const tabs = [
            {title: '小区地址'},
            {title: '收货地址'},
        ];

        return (
            <ScrollableTabView
                renderTabBar={() => (<CustomTabBar
                    backgroundColor={'#f4f4f4'}
                    // tabUnderlineDefaultWidth={20} // default containerWidth / (numberOfTabs * 4)
                    tabUnderlineScaleX={3} // default 3
                    activeColor={"#00E148"}
                    inactiveColor={"#333"}
                />)}>
                <View style={{flex:1,backgroundColor:'white',flexDirection:'column',alignItems:'center',justifyContent:'flex-end'}} tabLabel='小区地址'>
                    <View style={{alignItems: 'center',backgroundColor: '#00E148',justifyContent: 'center',height:40,width:width,textAlign:'center'}}>
                        <Text style={{color:'white'}} >新增小区地址</Text>
                    </View>
                </View>
                <Text tabLabel='收货地址'>tab2</Text>
            </ScrollableTabView>

            )
    }
}
