import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Image, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";

export default class TrafficPermit extends BaseComponent{
    navigationBarProps() {
        return {
            title: '宜居访客通行证',
        }
    }

    constructor(props) {
        super(props);
        this.state={
            data: this.props.navigation.state.params.data
        }
    }


    _render() {
        const {data} = this.state
        return (
            <View style={{backgroundColor:'#fff',flex: 1}}>
                <View style={{justifyContent: 'center',alignItems: 'center',marginTop:36}}>
                    <Text style={{color:CommonStyle.themeColor,fontSize:14}}>{data.community}</Text>
                </View>
                <Text style={{color:CommonStyle.textBlockColor,padding:10}}>尊敬的{data.visitorName}:</Text>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    <Image source={{uri: data.imageUrl}}
                           style={{width: 182, height: 182, resizeMode: 'contain'}}/>
                </View>
                <Text style={{color:CommonStyle.themeColor,padding: 10,marginTop:10,fontSize:12}}>有效时间:{data.validity}</Text>
                <Text style={{color:CommonStyle.textGrayColor,padding:10,fontSize:12}}>进入小区的时候,将二维码放置在门禁读头</Text>

                <TouchableView style={{
                    height: 40,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 20,
                    borderRadius: 30,
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=>{
                    //
                }}>
                    <Text style={{color: '#ffffff', fontSize: 15}}>发送给好友</Text>
                </TouchableView>
            </View>
        );
    }

}
