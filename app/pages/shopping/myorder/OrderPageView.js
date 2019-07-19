import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import TouchableView from "../../../components/TouchableView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {CommonStyle} from "../../../common/CommonStyle";
import util from "../../../utils/util";
import ImageView from "../../../components/ImageView";
import NavigationUtil from "../../../utils/NavigationUtil";
import {ORDER_TYPE_DD, PAY_FROM_ORDER_ORDER_LIST} from "../../../constants/ActionTypes";

export default class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
        };
    }

    _onFetch(page = 1, callback) {
        // this.showInDLoading()
        let param = {status: this.state.index > 0 ? this.state.index : '', page: page - 1, pageSize: PAGE_SIZE,};
        Request.post("/api/goods/orderList", param, (cacheRep) => {
            if (cacheRep) {
                if (cacheRep.code == 0 && cacheRep.data && !util.isArrayEmpty(cacheRep.data.rows)) {
                    callback(cacheRep.data.rows, {allLoaded: page * PAGE_SIZE >= cacheRep.data.total})
                } else {
                    callback(null, {emptyTitle: '暂无订单'})
                }
            }
        }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null, {emptyTitle: '暂无订单'})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        });
    }

    _renderRowView(item, index) {
        var statusStr = '待支付';
        // 1:等待支付;2:订单取消;3:支付成功;4:支付失败;5:已发货;6:申请退款;7:退款完成;8:订单完成;9:已评价
        switch (item.status) {
            case 1:
                statusStr = '等待支付';
                break
            case 2:
                statusStr = '订单取消';
                break
            case 3:
                statusStr = '支付成功';
                break
            case 4:
                statusStr = '支付失败';
                break
            case 5:
                statusStr = '已发货';
                break
            case 6:
                statusStr = '申请退款';
                break
            case 7:
                statusStr = '退款完成';
                break
            case 8:
                statusStr = '订单完成';
                break
            case 9:
                statusStr = '已评价';
                break
        }
        var totalPrice = 0;
        if (!util.isArrayEmpty(item.goodsList)) {
            item.goodsList.map((item) => {
                totalPrice = totalPrice + item.price * item.num;
            })
        }
        return (
            <TouchableView style={{
                backgroundColor: '#fff',
                // borderRadius:0,
                // marginHorizontal:0,
                marginTop: 10,
                // borderColor:CommonStyle.bgColor,
                // borderBottomWidth: 0.5,
            }} onPress={() => {
                NavigationUtil.navigate(this.props.navigation, 'OrderDetail', {id: item.id})
            }}>
                <View style={{
                    flexDirection: 'row', height: 44, borderColor: CommonStyle.lightGray, borderBottomWidth: 0.5,
                    justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15
                }}>
                    <Text style={{fontSize: 16, color: '#666', fontWeight: 'bold'}}>订单:{item.orderno}</Text>
                    <Text style={{fontSize: 14, color: '#333'}}>{statusStr}</Text>
                </View>
                {item.goodsList && item.goodsList.map((item, index) => this._renderOrderItem(item, index))}
                <View style={{
                    flexDirection: 'row', height: 50,
                    justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15
                }}>
                    <Text style={{fontSize: 15, color: '#333'}}>合计: {totalPrice}</Text>
                    {item.status == 1 && <TouchableView style={{
                        borderColor: CommonStyle.tomato, borderWidth: 0.5, borderRadius: 15,
                        height: 30, width: 60, alignItems: 'center', justifyContent: 'center'
                    }} onPress={() => {
                        NavigationUtil.navigate(this.props.navigation, 'PayCenter', {
                            id: item.id,
                            totalPrice: totalPrice,
                            orderno: item.orderno,
                            orderType: ORDER_TYPE_DD,
                            from: PAY_FROM_ORDER_ORDER_LIST
                        })
                    }}>
                        <Text style={{fontSize: 14, color: CommonStyle.tomato}}>付款</Text>
                    </TouchableView>
                    }
                </View>
            </TouchableView>
        );
    }

    _renderOrderItem(item, index) {
        return (
            <View key={index} style={{
                paddingVertical: 8,
                marginHorizontal: 15,
                flexDirection: 'row',
                height: 86,
                flex: 1,
                borderColor: CommonStyle.lightGray, borderBottomWidth: 0.8,
            }}>
                <ImageView style={{height: 70, width: 70}}
                           source={item.pic} defaultSource={require('../../../img/default_image.png')}/>
                <Text
                    style={{
                        marginLeft: 15,
                        marginTop: 10,
                        flex: 1,
                        fontSize: 16,
                        color: '#333'
                    }}>{item.goodsName}</Text>
                <View style={{marginTop: 6, flexDirection: 'column'}}>
                    <Text style={{fontSize: 14, color: '#333'}}>￥{item.price}</Text>
                    <Text style={{marginTop: 6, fontSize: 14, color: '#333'}}>x{item.num}</Text>
                </View>
            </View>
        );
    }


    _render() {
        return (
            <GiftedListView
                style={styles.container}
                rowView={this._renderRowView.bind(this)}
                onFetch={this._onFetch.bind(this)}
                loadMore={true}
                pagination={false} // enable infinite scrolling using touch to load more
                renderSeparator={() => {
                    return (null)
                }}
            />
        );
    }
}
;
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
});
