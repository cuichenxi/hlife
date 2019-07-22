import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Text, View} from "react-native";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import GiftedListView from "../../components/refreshList/GiftedListView";
import ImageView from "../../components/ImageView";
import util from "../../utils/util";
import TouchableView from "../../components/TouchableView";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}
/**
 *我的缴费记录
 */
export default class MyPaymentRecord extends BaseComponent {
    navigationBarProps() {
        return {
            title: '缴费记录',
        }
    }


    _render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <GiftedListView
                    style={{ flex: 1,marginTop:10}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>

        )
    }


    makeRemoteRequest(page = 1, callback) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/fee/feelist', param,
            {
                mock: false,
                mockId: 1095582,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null,{emptyTitle: '暂无缴费记录'})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    _renderRowView(item) {
        const status = item.status
        var statusStr=''
        if (status == 0){
            statusStr='已提交'
        } else if (status == 1){
            statusStr='已付款'
        } else if (status == 2) {
            statusStr = '付款失败'
        } else if (status == 3){
            statusStr = '撤销'
        }
        return (
            <TouchableView style={{
                backgroundColor: 'white',
                // height:50,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5
            }} onPress={()=>{
                this.navigate('BillDetail',{id:item.id})
            }}>
                <View style={{flex: 1, marginLeft: 10,justifyContent:'flex-end'}}>
                    <Text style={{
                        fontSize: 14,
                        textAlign: 'left', color: '#333'
                    }}>单号：{item.orderno}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{
                            fontSize: 12,
                            textAlign: 'left', color: '#999'
                        }}>{item.totalMoney}元</Text>
                        <View style={{
                            marginRight: 10,flexDirection:'row',
                            alignItems:'center',justifyContent:'center'
                        }}>
                            <Text style={{
                                fontSize: 12,
                                textAlign: 'left', color: '#999'
                            }}>支付状态：{statusStr}</Text>
                            <Font.Ionicons style={{marginLeft: 10}} name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>
                        </View>

                    </View>

                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end',flex:1}}>
                        <Text style={{textAlign: 'left', color: '#333', fontSize: 14}}>缴费日期：{item.createdate}</Text>
                    </View>
                </View>
            </TouchableView>

        )
    }

    _renderGoodList = (data) => {
        return (
            <View style={{
                backgroundColor: 'white',
                // height:50,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5
            }}>
                <View style={{flex: 1, marginLeft: 10,justifyContent:'flex-end'}}>
                    <Text style={{
                        fontSize: 14,
                        textAlign: 'left', color: '#333'
                    }}>item.goodsName</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{
                            fontSize: 12,
                            textAlign: 'left', color: '#999'
                        }}>item.des</Text>
                        <Text style={{
                            fontSize: 12,
                            textAlign: 'left', color: '#999',marginRight: 15
                        }}>xitem.num</Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end',flex:1}}>
                        <Text style={{textAlign: 'left', color: '#333', fontSize: 14}}>item.price</Text>
                        <Text style={{textAlign: 'left', color: '#999999', fontSize: 13,
                            paddingLeft: 5,paddingRight: 5,marginLeft:5,textDecorationLine:'line-through',}}>item.realPirce</Text>
                    </View>
                </View>
            </View>


        )
    };

}
