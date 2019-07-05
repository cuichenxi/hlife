import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {ImageBackground, RefreshControl, ScrollView, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";
import {PAY_FROM_ORDER_DETAIL} from "../../constants/ActionTypes";
import ImageView from "../../components/ImageView";


export default class OrderDetail extends BaseComponent {
    navigationBarProps() {
        return {
            title: '订单详情',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            headerUrl: '',
            leaveMessage: null,
            id: null,
            num: 0,
            redPacketId: 0,
            addressId: 1,
            refreshing: false
        }
    }

    onShow(e) {
        this.setState({
            id: e.id,
        }, () => {
            this.requestData();
        });
    }

    requestData() {
        let param = {id: this.state.id};
        this.showInDLoading()
        Request.post('/api/goods/orderInfo', param).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState({
                    data: rep.data
                })
            } else {
                this.showShort(rep.message);
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
            this.setState({refreshing: false});
        })
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.requestData();
    }

// {"code":0,"data":{"createtime":"Tue Jul 02 22:30:31 CST 2019","goodsList":
// [{"amount":1.5,"goodsId":3,"goodsName":"食用油5L","id":21,"num":1,
// "pic":"2019/06/11/0228c4f0a5ca13f32cd2243cf805d300.jpg","price":1.5}]
// ,"id":21,"isrefund":0,"orderno":"1562077830535"
// ,"paysn":null,"paystatus":0,"paytime":null,"paytype":2,
// "shippingAddressListDTO":
// {"city":null,"cparam":null,"detail":"Jvzhengxiaoqu 10-2-602",
// "district":null,"id":3,"isDefault":0,"name":"Tracy","province":null,"tel":"15811508404"}
// ,"status":1,"totalprice":1.5}

    onPay() {
        this.navigate('PayCenter', {id: this.state.id, from: PAY_FROM_ORDER_DETAIL})
    }

    _render() {
        const {data} = this.state
        var statusStr = '待支付';
        switch (data.status) {
            case 0:
                statusStr = '待支付';
                break
            case 1:
                statusStr = '已取消';
                break
        }
        var sh = data.shippingAddressListDTO;
        var address=''
        if (sh) {
            address = sh.detail + '\r\n' + sh.name + ' ' + sh.tel;
        }
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{
                    flex: 1,
                }} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />}>
                    <View style={{
                        marginTop: 10, paddingHorizontal: 15, paddingVertical: 12,
                        backgroundColor: '#fff'
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 14, color: '#333'}}>订单状态 : </Text>
                            <Text style={{marginLeft: 5, fontSize: 14, color: '#333'}}>{statusStr}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={{fontSize: 14, color: '#333'}}>订单编号 : </Text>
                            <Text style={{marginLeft: 5, fontSize: 14, color: '#333'}}>{data.orderno}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={{fontSize: 14, color: '#333'}}>下单时间 : </Text>
                            <Text style={{marginLeft: 5, fontSize: 14, color: '#333'}}>{data.createtime}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={{fontSize: 14, color: '#333'}}>合计金额 : </Text>
                            <Text style={{marginLeft: 5, fontSize: 14, color: '#333'}}>￥{data.totalprice}</Text>
                        </View>
                    </View>
                    {data.goodsList && data.goodsList.map((item) => this._renderOrderItem(item))}
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        height: 58,
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        marginTop: 12,
                        alignItems: 'center'
                    }}>
                        <ImageView style={{height: 22, width: 22}}
                                   defaultSource={require('../../img/icon_address_order.png')}/>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            color: '#333',
                            marginLeft: 12
                        }}>{address}</Text>
                    </View>
                    <ImageBackground style={{height: 3, width: '100%'}}
                                     source={require('../../img/bg_order_confirm.png')}></ImageBackground>

                </ScrollView>
                <View style={{
                    position: CommonStyle.absolute,
                    bottom: 0,
                    height: 48,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableView style={{
                        flex: 1,
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: CommonStyle.tomato,
                    }} onPress={() => {
                        this.onPay()
                    }}
                    >
                        <Text style={{fontSize: 16, color: '#fff'}}>付款</Text>
                    </TouchableView>
                </View>
            </View>);
    }

    _renderOrderItem(item) {
            return (
                <View style={{
                    paddingHorizontal: 12,
                    paddingVertical: 15,
                    marginTop: 10,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    height: 100,
                    flex: 1,
                }}>
                    <ImageView style={{height: 70, width: 70}}
                               source={this.state.imageUrl} defaultSource={require('../../img/default_image.png')}/>
                    <Text
                        style={{marginLeft: 15, flex: 1, fontSize: 16, color: '#333'}}>{item.goodName}</Text>
                    <View style={{marginTop: 6, flexDirection: 'column'}}>
                        <Text style={{fontSize: 14, color: '#333'}}>￥{item.price}</Text>
                        <Text style={{marginTop: 6, fontSize: 14, color: '#333'}}>x{item.num}</Text>
                    </View>
                </View>
            )
    }
}
