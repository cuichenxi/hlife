import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import CheckBox from "../../components/Checkbox";
import TouchableView from "../../components/TouchableView";
import {ImageStyle} from "../../common/ImageStyle";

let {width, height} = Dimensions.get('window')

export default class Payment extends BaseComponent {
    navigationBarProps() {
        return {
            title: '选择付款方式',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isOneChecked: false,
        }
    }

    _render() {
        return (
            <View>
                <View style={{justifyContent: 'center', alignItems: 'center', height: 100, backgroundColor: '#fff'}}>
                    <Text style={{fontSize: 14, color: '#666'}}>应付金额</Text>
                    <Text style={{fontSize: 29, color: CommonStyle.themeColor}}>￥199.00</Text>
                </View>
                <View style={[styles.contentItem, styles.marginTop]}>
                    <Text style={styles.contentText}>合计金额</Text>
                    <Text style={styles.contentRightText}>199</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={styles.contentItem}>
                    <Text style={styles.contentText}>支付方式</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={styles.typeView}>
                    <View style={styles.centerRow}>
                        <Image source={require('../../img/wallet_icon.png')}
                               style={{width: 32, height: 32, resizeMode: ImageStyle.contain}}/>
                        <Text style={{
                            color: '#333',
                            padding: 3,
                            fontSize: 14,
                            marginLeft: 10
                        }}>钱包支付</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                        <Text style={{
                            paddingLeft: 5,
                            color: CommonStyle.themeColor,
                            fontSize: 15,
                            marginRight: 10
                        }}>￥13</Text>
                        <CheckBox
                            style={styles.checkBox}
                            onClick={() => {
                                this.setState({
                                    isOneChecked: !this.state.isOneChecked
                                })
                            }}
                            isChecked={this.state.isOneChecked}
                            rightText={''}
                            rightTextStyle={styles.text}
                            checkedImage={<Image source={require('../../img/selted.png')} style={styles.image}/>}
                            unCheckedImage={<Image source={require('../../img/selt.png')} style={styles.image}/>}
                        />
                    </View>
                </View>
                <View style={styles.typeView}>
                    <View style={styles.centerRow}>
                        <Image source={require('../../img/alipay_icon.png')}
                               style={{width: 32, height: 32, resizeMode: ImageStyle.contain}}/>
                        <View style={{justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10}}>
                            <Text style={{
                                color: '#333',
                                textAlign: 'center',
                                fontSize: 14,

                            }}>支付宝支付</Text>
                            <Text style={{fontSize: 13, color: '#999', textAlign: 'center'}}>推荐支付宝用户使用</Text>
                        </View>

                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                        <Text style={{
                            paddingLeft: 5,
                            color: CommonStyle.themeColor,
                            fontSize: 15,
                            marginRight: 10
                        }}>￥13</Text>
                        <CheckBox
                            style={styles.checkBox}
                            onClick={() => {
                                this.setState({
                                    isOneChecked: !this.state.isOneChecked
                                })
                            }}
                            isChecked={this.state.isOneChecked}
                            rightText={''}
                            rightTextStyle={styles.text}
                            checkedImage={<Image source={require('../../img/selted.png')} style={styles.image}/>}
                            unCheckedImage={<Image source={require('../../img/selt.png')} style={styles.image}/>}
                        />
                    </View>
                </View>
                <View style={styles.typeView}>
                    <View style={styles.centerRow}>
                        <Image source={require('../../img/alipay_icon.png')}
                               style={{width: 32, height: 32, resizeMode: ImageStyle.contain}}/>
                        <View style={{justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10}}>
                            <Text style={{
                                color: '#333',
                                textAlign: 'center',
                                fontSize: 14,

                            }}>微信支付</Text>
                            <Text style={{fontSize: 13, color: '#999', textAlign: 'center'}}>推荐微信用户使用</Text>
                        </View>

                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                        <Text style={{
                            paddingLeft: 5,
                            color: CommonStyle.themeColor,
                            fontSize: 15,
                            marginRight: 10
                        }}>￥13</Text>
                        <CheckBox
                            style={styles.checkBox}
                            onClick={() => {
                                this.setState({
                                    isOneChecked: !this.state.isOneChecked
                                })
                            }}
                            isChecked={this.state.isOneChecked}
                            rightText={''}
                            rightTextStyle={styles.text}
                            checkedImage={<Image source={require('../../img/selted.png')} style={styles.image}/>}
                            unCheckedImage={<Image source={require('../../img/selt.png')} style={styles.image}/>}
                        />
                    </View>
                </View>
                <Text style={{padding:10,fontSize:13,color:'#666'}}>请在15分钟内支付订单</Text>
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
                    this.guestPass()
                }}>
                    <Text style={{color: '#ffffff', fontSize: 20}}>确认支付</Text>
                </TouchableView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    contentItem: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff'
    },
    contentText: {
        color: '#333',
        padding: 3,
        fontSize: 15
    },
    contentRightText: {
        color: CommonStyle.themeColor,
        padding: 3,
        fontSize: 14
    },
    marginTop: {
        marginTop: 10
    },
    typeView:{
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    centerRow:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
})
