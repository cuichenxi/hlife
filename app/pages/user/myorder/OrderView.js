import React from "react";
import {Dimensions, Image, Text, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {CommonStyle} from "../../../common/CommonStyle";
import TouchableView from "../../../components/TouchableView";

/**
 * 订单view
 */
let {width, height} = Dimensions.get('window')

export default class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        };
        console.log(this.props)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {status: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        console.log('==========')
        console.log(this.props)
        Request.post('api/goods/orderList', param,
            {
                mock: true,
                mockId: 1095582,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    _renderRowView(item) {
        return (
            <TouchableView >
                <View style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5
                }}>
                    <Image
                        source={{uri:item.imageUrl}}
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
                        }}>{item.title}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{
                                fontSize: 12,
                                textAlign: 'left', color: '#999'
                            }}>{item.des}</Text>
                            <Text style={{
                                fontSize: 12,
                                textAlign: 'left', color: '#999',marginRight: 15
                            }}>{item.num}</Text>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end',flex:1}}>
                            <Text style={{textAlign: 'left', color: '#333', fontSize: 14}}>{item.sellPrice}</Text>
                            <Text style={{textAlign: 'left', color: '#999999', fontSize: 13,
                                paddingLeft: 5,paddingRight: 5,marginLeft:5,textDecorationLine:'line-through',}}>{item.realPirce}</Text>
                        </View>
                    </View>
                </View>


            </TouchableView>

        )
    }


    _render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }}>
                <GiftedListView
                    style={{with: width, flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                    renderSeparator={() => {return (null);}}
                />
            </View>
        );
    }

}
;