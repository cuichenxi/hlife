import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Switch from "antd-mobile-rn/es/switch/index.native";


const Font = {
    Ionicons,
    FontAwesome
}
export default class MySetting extends BaseComponent{
    navigationBarProps() {
        return ({
            title: '设置'
        })
    }

    constructor(props) {
        super(props);
        this.state={
            checked:false
        }
    }


    _render(){
        return(
            <View>
                <View style={styles.item}>
                    <Text style={styles.text}>是否接收提醒</Text>
                    <Switch checked={this.state.checked}
                            onChange={(value)=>{
                                this.setState({
                                    checked:value
                                })
                            }}
                            color={CommonStyle.themeColor}
                    />
                </View>
                <View style={[styles.item,styles.itemMarginTop]}>
                    <Text style={styles.text}>关于幸福宜居</Text>
                    <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                   color="#bbb"/>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                <View style={styles.item}>
                    <Text style={styles.text}>邀请家人朋友</Text>
                    <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                   color="#bbb"/>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                <View style={styles.item}>
                    <Text style={styles.text}>清除缓存</Text>
                    <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                   color="#bbb"/>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                <View style={styles.item}>
                    <Text style={styles.text}>意见反馈</Text>
                    <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                   color="#bbb"/>
                </View>
                <View style={[styles.item,styles.itemMarginTop]}>
                    <Text style={styles.text}>新版本检测</Text>
                    <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                   color="#bbb"/>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create(
    {
        item:{
            backgroundColor: 'white',
            height:50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
            // padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
        },
        itemMarginTop:{
            marginTop:10
        },
        text:{
            textAlign: 'center', color: CommonStyle.textBlockColor,fontSize:14
        }
    }
)
