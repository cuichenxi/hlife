import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Text, View} from "react-native";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import GiftedListView from "../../components/refreshList/GiftedListView";
import ImageView from "../../components/ImageView";

let {width, height} = Dimensions.get('window')

/**
 *我的缴费记录
 */
export default class MyPaymentRecord extends BaseComponent {
    navigationBarProps() {
        return {
            title: '我的缴费记录',
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
                    renderSeparator={() => {return (null);}}
                />
            </View>

        )
    }


    makeRemoteRequest(page = 1, callback) {
        let param = {status: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/goods/orderList', param,
            {
                mock: false,
                mockId: 1095582,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null,{emptyTitle: rep.message})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    _renderRowView(item) {
        return (
            <View >
                {this._renderGoodList(item.goodsList)}
            </View>

        )
    }

    _renderGoodList = (data) => {
        return data.map((item, i) => {
            return (
                <View style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5
                }}>
                    <ImageView
                        source={item.pic}
                        defaultSource={require("../../img/default_image.png")}
                        style={{
                            width: 100,
                            height: 90,
                            marginLeft: 10,
                        }}
                    />
                    <View style={{flex: 1, marginLeft: 10,justifyContent:'flex-end'}}>
                        <Text style={{
                            fontSize: 14,
                            textAlign: 'left', color: '#333'
                        }}>{item.goodsName}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{
                                fontSize: 12,
                                textAlign: 'left', color: '#999'
                            }}>{item.des}</Text>
                            <Text style={{
                                fontSize: 12,
                                textAlign: 'left', color: '#999',marginRight: 15
                            }}>x{item.num}</Text>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end',flex:1}}>
                            <Text style={{textAlign: 'left', color: '#333', fontSize: 14}}>{item.price}</Text>
                            <Text style={{textAlign: 'left', color: '#999999', fontSize: 13,
                                paddingLeft: 5,paddingRight: 5,marginLeft:5,textDecorationLine:'line-through',}}>{item.realPirce}</Text>
                        </View>
                    </View>
                </View>


            )
        })
    };

}
