import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Text, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import util from "../../utils/util";
import {CommonStyle} from "../../common/CommonStyle";

export default class RechargeRecord extends BaseComponent{
    navigationBarProps() {
        return ({
            title: '充值记录'
        })
    }
    _render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex: 1,marginTop: 10}}>
                    <GiftedListView
                        onRef={(ref)=>{
                            this.listRef = ref;
                        }}
                        style={{ flex: 1}}
                        rowView={this.renderItem.bind(this)}
                        onFetch={this.makeRemoteRequest.bind(this)}
                        loadMore={true}
                    />
                </View>
            </View>
        );
    }

    renderItem(item) {
        let status = item.status
        return (
            <View style={{
                backgroundColor: 'white',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5
            }}>
                <View style={{flex: 1, marginLeft: 10}}>
                    <Text style={{
                        textAlign: 'left',
                        color: CommonStyle.textBlockColor,
                        fontSize: 15
                    }}>{item.payType === 1?'支付宝':'微信'}</Text>
                    <Text
                        style={{
                            textAlign: 'left',
                            color: CommonStyle.textGrayColor,
                            fontSize: 13,
                            marginTop: 5
                        }}>{item.chargeTime}</Text>
                </View>

                <View style={{alignItems:'center',justifyContent: 'center',marginRight: 10,flexDirection:'row'}}>
                    <Text
                        style={{
                            textAlign: 'left',
                            color: status == 1?CommonStyle.themeColor:CommonStyle.red,
                            fontSize: 13,
                        }}>+{item.chargeMoney}元</Text>
                    <Text
                        style={{
                            textAlign: 'left',
                            color: '#666',
                            fontSize: 13,
                            marginLeft:5
                        }}>{status === 0?'未支付':(status === 1?'成功':'失败')}</Text>
                </View>
            </View>


        )
    }

    makeRemoteRequest(page = 1, callback) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/chargeList', param,
            {
                mock: false,
                mockId: 1095607,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null, {emptyTitle: '暂无充值记录'})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }
}
