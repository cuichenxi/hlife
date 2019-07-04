import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Image, ImageBackground, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";

export default class About extends BaseComponent{
    navigationBarProps() {
        return ({
            title: '关于'
        })
    }
    _render() {
        return (
            <View style={{backgroundColor:'#fff',flex: 1}}>
                <ImageBackground style={{alignItems:'center',justifyContent:'center',height:200}} source={require('../../img/login_bg.png')}>
                    <Image source={require('../../img/login_logo.png')} style={{width:173,
                        height:66, alignItems:'center'}} resizeMode='cover'/>
                </ImageBackground>
                <View style={{alignItems:'center',justifyContent:'flex-start',flexDirection:'row',height:50,marginLeft:10}}>
                    <Text>宜居</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%',marginRight: 10,marginLeft: 10}}/>
                <View style={{alignItems:'center',justifyContent:'flex-start',flexDirection:'row',margin:10}}>
                    <Text style={{fontSize:14,color:'#666'}}>这里是关于</Text>
                </View>
            </View>
        );
    }

}
