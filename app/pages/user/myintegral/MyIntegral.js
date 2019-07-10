import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Image, Text, View} from "react-native";
import {CommonStyle} from "../../../common/CommonStyle";
import LinearGradient from "react-native-linear-gradient";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import IntegralDetailView from "./IntegralDetailView";
import IntegralRedPacketView from "./IntegralRedPacketView";
import UserStore from "../../../store/UserStore";
import NavigationBar from "../../../components/navigationBar/navigationBar";
import TouchableView from "../../../components/TouchableView";
import ImageView from "../../../components/ImageView";
import QIcon from "../../../components/icon";

/**
 * 我的积分
 */
export default class MyIntegral extends BaseComponent{
    navigationBarProps() {
        return {
            title: '积分',
        }
    }

    constructor(props) {
        super(props);
        this.state={
            integralCount:0
        }
    }

    _renderHeader() {
        return (
            <View style={{height: CommonStyle.navHeight}}>
                <View style={{
                    flex: 1, flexDirection: 'row', height: CommonStyle.navContentHeight,
                    marginTop: CommonStyle.navStatusBarHeight, alignItems: 'center', marginLeft: 10, marginRight: 10,justifyContent:'space-between'
                }}>
                    <TouchableView onPress={() => {
                        this.goBack()
                    }}
                                   style={{flex:1}}
                    >
                        <QIcon name={'icon-back'} size={25} color={'#fff'}/>
                    </TouchableView>

                    <View style={{flex: 1, height: 50, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 17}}>积分</Text>
                    </View>
                    <TouchableView onPress={() => {
                        this.navigate('IntegralExplain')
                    }} style={{flex:1}}>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',flex:1}}>
                            <ImageView
                                defaultSource={require("../../../img/icon_jifen_yiwen.png")}
                                style={{
                                    width: 15,
                                    height: 15,
                                }}/>
                            <Text style={{textAlign: 'center', color: '#fff', fontSize: 11,marginLeft:5}}>积分说明</Text>
                        </View>

                    </TouchableView>
                </View>

            </View>
        );
    }

    onReady(param) {
        this.hideHeader(true);
        let userInfo = UserStore.get();
        this.setState({
            integralCount: userInfo.integralCount,
        })
    }
    render() {
        const tabs = [
            {title: '积分明细'},
            {title: '红包'},
        ];
        return (
            <View style={{flex: 1}}>
                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0, y: .8}}
                                colors={['#63D5A2', CommonStyle.themeColor]}
                                style={{height: 150,justifyContent: 'center',alignItems: 'center'}}>
                    <View style={{position: CommonStyle.absolute, left: 0, top: 0, right: 0,}}>
                        {this._renderHeader()}
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:8,marginTop: 50}}>

                        <Text style={{fontSize:12,color:'#fff'}}>我的积分</Text>
                        <Image source={require('../../../img/jifen_icon.png')}
                               style={{width: 11, height: 9, resizeMode: 'contain'}}/>
                    </View>
                    <Text style={{fontSize:33,color:'#fff'}}>{this.state.integralCount}</Text>
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
                                       onIntegralCountChange={(integralCount) => {
                                 this.setState({
                                     integralCount
                                 })
                             }}/>
            )
        }

    }
}
