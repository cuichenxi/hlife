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
                    <Text>幸福宜居</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%',marginRight: 10,marginLeft: 10}}/>
                <View style={{alignItems:'center',justifyContent:'flex-start',flexDirection:'row',margin:10}}>
                    <Text style={{fontSize:14,color:'#666'}}>“幸福宜居”APP是由亳州市宜居物业管理有限公司拥有自主产权、并由安徽启凡科技研发，为宜居物业业主量身定制的融合了基础物业服务、园区生活服务、邻里社交服务等的一站式生活服务平台，致力于为广大宜居业主打造更安全、更便捷、更和睦的幸福园区。</Text>
                </View>
            </View>
        );
    }

}
