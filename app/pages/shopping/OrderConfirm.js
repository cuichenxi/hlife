import React from 'react'
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View,} from 'react-native'

import {BaseComponent} from "../../components/base/BaseComponent";
import {CommonStyle} from "../../common/CommonStyle";
import {PAY_FROM_CREATE_ORDER} from "../../constants/ActionTypes";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
import ImageView from "../../components/ImageView";

import Ionicons from 'react-native-vector-icons/Ionicons'
import util from "../../utils/util";

export default class OrderConfirm extends BaseComponent {
    navigationBarProps() {
        return ({
            title: '确认订单',
        })
    }


    constructor(props) {
        super(props)
        this.state = {
            id: 0,
        }
    }

    onReady(e) {

    }

    onSubmit() {
        this.showLoading("生单中...")
        let param = {
            addressId: 3,
            leaveMessage: this.state.leaveMessage,
            orderDetailList: [
                {
                    goodId: this.state.goodId,
                    // num: this.state.num
                    num: 1
                }
            ],
            redPacketId: this.state.redPacketId
        };
        Request.post('/api/goods/createOrder', param).then(rep => {
            if (rep.code === 0 && rep.data) {
                this.navigate('OrderConfirm', {id: rep.data.id, from: PAY_FROM_CREATE_ORDER})
            } else {
                this.showShort(rep.message);
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
        })
    }

    _render() {
        return (
            <View style={styles.container}>

                <ScrollView style={{
                    flex: 1,
                    marginTop: 10
                }}>
                    <TouchableView style={{
                        flexDirection: 'row',
                        flex: 1,
                        height: 48,
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        alignItems: 'center'
                    }} onPress={() => {
                        this.showLong('选择地址');
                    }}>
                        <ImageView style={{height: 22, width: 22}}
                                   defaultSource={require('../../img/icon_address_order.png')}/>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            color: '#333',
                            marginLeft: 12
                        }}>{util.isEmpty(this.state.address) ? '选择收货地址' : this.state.address}</Text>
                        <Ionicons style={{marginLeft: 10}} name="ios-arrow-forward-outline" size={(18)}
                                  color="#bbb"/>)}
                    </TouchableView>
                    <ImageBackground style={{height: 3, width: '100%'}}
                                     source={require('../../img/bg_order_confirm.png')}></ImageBackground>
                    <View style={{
                        paddingHorizontal: 12,
                        paddingVertical: 15,
                        marginTop: 10,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        height: 100,
                        flex: 1
                    }}>
                        <ImageView style={{height: 70, width: 70}}
                                   source={this.state.imageUrl} defaultSource={require('../../img/default_image.png')}/>
                        <Text
                            style={{marginLeft: 15, flex: 1, fontSize: 16, color: '#333'}}>{this.state.goodName}</Text>
                        <View style={{marginTop: 6, flexDirection: 'column'}}>
                            <Text style={{fontSize: 14, color: '#333'}}>￥{this.state.totalPrice}</Text>
                            <Text style={{marginTop: 6, fontSize: 14, color: '#333'}}>x{this.state.num}</Text>
                        </View>
                    </View>

                    <TouchableView style={{
                        flexDirection: 'row',
                        flex: 1,
                        height: 48,
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        borderTopWidth: 0.5,
                        borderColor: CommonStyle.lightGray
                    }} onPress={() => {
                        this.showLong('发票');
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            color: '#333',
                        }}>电子发票</Text>
                        <Text style={{
                            fontSize: 15,
                            color: '#333',
                            marginLeft: 12
                        }}>{util.isEmpty(this.state.invoice) ? '选择发票' : this.state.invoice}</Text>
                        <Ionicons style={{marginLeft: 10}} name="ios-arrow-forward-outline" size={(18)}
                                  color="#bbb"/>)}
                    </TouchableView>
                    <TouchableView style={{
                        flexDirection: 'row',
                        flex: 1,
                        height: 48,
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        borderTopWidth: 0.5,
                        borderColor: CommonStyle.lightGray
                    }} onPress={() => {
                        this.showLong('红包');
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            color: '#333',
                        }}>红包</Text>
                        <Text style={{
                            fontSize: 15,
                            color: '#333',
                            marginLeft: 12
                        }}>{util.isEmpty(this.state.redPacket) ? '选择红包' : this.state.redPacket}</Text>
                        <Ionicons style={{marginLeft: 10}} name="ios-arrow-forward-outline" size={(18)}
                                  color="#bbb"/>)}
                    </TouchableView>
                    <TouchableView style={{
                        flexDirection: 'row',
                        flex: 1,
                        height: 48,
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        borderTopWidth: 0.5,
                        borderColor: CommonStyle.lightGray
                    }} onPress={() => {

                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            color: '#333',
                        }}>配送方式</Text>
                        <Text style={{
                            fontSize: 15,
                            color: '#666',
                            marginLeft: 12,
                            marginRight: 20
                        }}>快递 00.00</Text>
                    </TouchableView>
                    <View style={{
                        backgroundColor:'#fff',paddingVertical:15,
                        borderTopWidth: 0.5,
                        borderBottom:0.5,
                        borderColor: CommonStyle.lightGray,
                    }}>
                    <Text style={{
                        backgroundColor:'#fff',
                        paddingHorizontal: 10, fontSize: 15, color: '#333',
                    }}>买家留言</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        paddingVertical:10,
                        backgroundColor: '#eaeaea',
                        paddingHorizontal: 10,
                        marginHorizontal:10,
                        borderRadius:10,
                    }} onPress={() => {

                    }}>
                    <TextInput
                        placeholder='请输入留言'
                        underlineColorAndroid="transparent"
                        style={{height:30, width:'90%'}}
                        maxLength={100}
                        onChangeText={(text)=>{
                            this.setState({
                                    message:text
                             }
                            )
                        }}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        height: 48,
                        marginTop:10,
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                        borderColor: CommonStyle.lightGray
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            color: '#333',
                        }}>选择支付方式</Text>
                        <ImageView style={{height: 16, width: 16}} defaultSource={require('../../img/icon_checked.png')}/>
                        <Text style={{
                            fontSize: 15,
                            color: '#333',
                            marginLeft: 12,
                            marginRight: 20
                        }}>线上支付</Text>
                    </View>
                </ScrollView>
                <View style={{
                    position: CommonStyle.absolute,
                    bottom: 0,
                    height: 48,
                    backgroundColor: '#fff',
                    borderTop: 0.5,
                    borderColor: CommonStyle.lightGray,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{paddingLeft: 20, fontSize: 14, color: '#333', flex: 1}}>共{this.state.num}件</Text>
                    <Text style={{fontSize: 14, color: '#333'}}>应付:</Text>
                    <Text style={{fontSize: 15, color: CommonStyle.red}}>￥{this.state.totalPrice}</Text>
                    <TouchableView style={{
                        marginLeft: 20,
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: CommonStyle.themeColor,
                        width: 110
                    }}
                                   onPress={() => {
                                       this.onSubmit()
                                   }}
                    >
                        <Text style={{fontSize: 14, color: '#fff'}}>立即下单</Text>
                    </TouchableView>
                </View>
            </View>
        );


    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
