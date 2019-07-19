import React from 'react'
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

import {BaseComponent} from "../../components/base/BaseComponent";
import {CommonStyle} from "../../common/CommonStyle";
import {ORDER_TYPE_DD, PAY_FROM_CREATE_ORDER} from "../../constants/ActionTypes";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
import ImageView from "../../components/ImageView";
import Ionicons from 'react-native-vector-icons/Ionicons'
import util from "../../utils/util";
const Font = {
    Ionicons,
}
export default class OrderConfirm extends BaseComponent {
    navigationBarProps() {
        return ({
            title: '确认订单',
        })
    }


    constructor(props) {
        super(props)
        this.state = {
            addressId: null,
            address: null,
            totalPrice: null,
            totalNum: 0,
            invoice: null,
            invoiceId: null,
            message: null,
            redPacket: null,
            redPrice: null,
            redId: null,
            goodsList:[
                // {
                //     id: 0,
                //     num: null,
                //     goodName: null,
                //     price: null,
                // }
            ]
        }
    }

    /**
     * {"categoryId":"10","
     * categoryName":"日用百货",
     * "evaluationCount":0,
     * "goodsBody":null,"
     * goodsName":"牙膏",
     * "goodsPrice":8.0,
     * "goodsState":1,
     * "id":1,
     * "imageList":["http://115.28.21.13/images/2019/06/11/6f98a275379fb2a9b325be60da1c5c46.png"],
     * "marketPrice":9.0,"saleNum":0,"sendSite":null}
     *
     * @param e
     */
    onReady(e) {
        this.setState({
            goodsList: e.goodsList
        })
    }

    onSubmit() {
        if (util.isEmpty(this.state.addressId)) {
            this.showShort('请选择收货地址')
            return;
        }
        this.showLoading("生单中...");
        var orderDetailList = [];
        this.state.goodsList.map((item)=>{
            orderDetailList.push({
                goodId: item.id,
                num: item.num
            })
        })
        let param = {
            addressId: this.state.addressId,
            leaveMessage: this.state.message,
            invoiceId: this.state.invoiceId,
            orderDetailList: orderDetailList,
            redPacketId: this.state.redPacketId
        };
        Request.post('/api/goods/createOrder', param).then(rep => {
            if (rep.code === 0 && rep.data) {
                this.navigate('PayCenter', {
                    id: rep.data.id,
                    totalPrice:rep.data.totalPrice,
                    orderno:rep.data.orderno,
                    orderDetailList: orderDetailList,
                    from: PAY_FROM_CREATE_ORDER,
                    orderType: ORDER_TYPE_DD})
            } else {
                this.showShort(rep.message);
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
        })
    }
    _renderOrderItem(item ,index) {
        return (
            <View key={index} style={{
                paddingVertical: 8,
                marginHorizontal: 15,
                flexDirection: 'row',
                height: 86,
                flex: 1,
                borderColor: CommonStyle.lightGray, borderBottomWidth: 0.5,
            }}>
                <ImageView style={{height: 70, width: 70}}
                           source={util.isArrayEmpty(item.imageList) ? '' : item.imageList[0]} defaultSource={require('../../img/default_image.png')}/>
                <Text
                    style={{marginLeft: 15,marginTop:10, flex: 1, fontSize: 16, color: '#333'}}>{`${item.goodName}`}</Text>
                <View style={{marginTop: 6, flexDirection: 'column'}}>
                    <Text style={{fontSize: 14, color: '#333'}}>￥{item.price}</Text>
                    <Text style={{marginTop: 6, fontSize: 14, color: '#333'}}>x{item.num}</Text>
                </View>
            </View>
        );
    }

    _render() {
        var {goodsList} = this.state;
        var totalNum = 0;
        var totalPrice = 0;
        if (goodsList) {
            goodsList.map((item)=>{
                totalNum = totalNum + item.num;
                totalPrice = totalPrice + (item.price * item.num);
            })
        }
        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <ScrollView style={{
                    marginTop: 10,
                    marginBottom:50
                }}>
                    <TouchableView style={{
                        flexDirection: 'row',
                        flex: 1,
                        height: 48,
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        alignItems: 'center'
                    }} onPress={() => {
                        this.navigate('MyShippingAddress',{from:1,},(e)=>{
                                if (e) {
                                    this.setState({
                                        addressId: e.id,
                                        address: e.detail + '\r\n' + e.name + ' ' + e.tel
                                    })
                            }})
                    }}>
                        <ImageView style={{height: 22, width: 22}}
                                   defaultSource={require('../../img/icon_address_order.png')}/>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            color: '#333',
                            marginHorizontal: 10

                        }}>{util.isEmpty(this.state.address) ? '选择收货地址' : this.state.address}</Text>
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </TouchableView>
                    <ImageBackground style={{height: 3, width: '100%'}}
                                     source={require('../../img/bg_order_confirm.png')}></ImageBackground>
                    <View style={{backgroundColor: '#fff', marginVertical: 10}}>
                        {goodsList && goodsList.map((item,index) => this._renderOrderItem(item,index))}
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
                        // {"address":"123123","bank":"","bankNo":"","createdTime":null,"id":9,"name":"Qfant","no":"123123","phone":"15811508404","type":0}
                        this.navigate('MyInvoiceList',{from:1,},(e)=>{
                                if (e) {
                                    this.setState({
                                        invoiceId: e.id,
                                        invoice: e.name + ' ' + e.no
                                    })
                            }})
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            color: '#333',
                        }}>电子发票</Text>
                        <Text style={{
                            fontSize: 15,
                            color: '#333',
                            marginHorizontal: 10
                        }}>{util.isEmpty(this.state.invoice) ? '选择发票' : this.state.invoice}</Text>
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
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
                        // "des": null,
                        //     "id": 11,
                        //     "instructions": null,
                        //     "price": null,
                        //     "title": "20元红包",
                        //     "validity": "2019-07-09~2019-07-31"
                        this.navigate('RedPacket',{from:1,},(e)=>{
                            if (e) {
                                this.setState({
                                    redPacketId: e.id,
                                    redPrice: e.price ,
                                    redPacket: e.title
                                })
                            }})
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            color: '#333',
                        }}>红包</Text>
                        <Text style={{
                            fontSize: 15,
                            color: '#333',
                            marginHorizontal: 10
                        }}>{util.isEmpty(this.state.redPacket) ? '选择红包' : this.state.redPacket}</Text>
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
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
                        backgroundColor: '#fff', paddingVertical: 15,
                        marginVertical: 10,
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                        borderColor: CommonStyle.lightGray,
                    }}>
                        <Text style={{
                            backgroundColor: '#fff',
                            paddingHorizontal: 10, fontSize: 15, color: '#333',
                        }}>买家留言</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        paddingVertical: 10,
                        backgroundColor: '#eaeaea',
                        paddingHorizontal: 10,
                        marginHorizontal: 10,
                        borderRadius: 10,
                    }}>
                        <TextInput
                            placeholder='请输入留言'
                            underlineColorAndroid="transparent"
                            style={{height: 40, width: '90%'}}
                            maxLength={100}
                            onChangeText={(text) => {
                                this.setState({
                                        message: text
                                    }
                                )
                            }}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        height: 48,
                        marginTop: 10,
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
                        <ImageView style={{height: 16, width: 16}}
                                   defaultSource={require('../../img/icon_checked.png')}/>
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
                    borderTopWidth: 0.5,
                    borderColor: CommonStyle.lightGray,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{paddingLeft: 20, fontSize: 14, color: '#333', flex: 1}}>共{totalNum}件</Text>
                    <Text style={{fontSize: 14, color: '#333'}}>应付:</Text>
                    <Text style={{
                        fontSize: 15,
                        color: CommonStyle.red
                    }}>￥{totalPrice - this.state.redPrice}</Text>
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
            </KeyboardAvoidingView>
        );


    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
