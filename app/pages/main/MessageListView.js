import {BaseComponent} from "../../components/base/BaseComponent";
import {Dimensions, Image, Text, View} from "react-native";
import React from "react";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import {BaseView} from "../../components/base/BaseView";
import util from "../../utils/util";

let {width, height} = Dimensions.get('window')
export default class MessageList extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            liked: false
        };
        console.log(this.props)
    }

    _render() {
        return (
            <View style={{flex: 1}}>
                <GiftedListView
                    style={{marginTop:10}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>
        )
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {type: this.state.index+1, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/home/messageList', param,
            {
                mock: false,
                mockId: 1095710,
            }).then(rep => {
            if (rep.code == 0 && rep.data&&!util.isArrayEmpty(rep.data.rows)) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null,{emptyTitle: "空空如也 ~"})
            }
        }).catch(err => {
            callback(null,{emptyTitle: null})
        }).done(() => {
            this.hideLoading();
        })
    }

    _renderRowView(item, i) {
        return (

            <View style={{
                backgroundColor: 'white',
                // height:50,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5
            }}>
                <Image
                    source={require('../../img/order_message.png')}
                    style={{ width: 38, height: 38, resizeMode: 'contain'}}
                />
                <View style={{flex: 1, marginLeft: 10,alignItems:'flex-start',justifyContent: 'center'}}>
                    <View style={{justifyContent:'space-between',flexDirection:'row',flex:1,width:width-70}}>
                        <Text style={{
                            fontSize: 13,
                            textAlign: 'left', color: '#333'
                        }}>{item.title}</Text>
                        <Text style={{ color: '#999999', fontSize: 12,textAlign: 'right',}}>{item.date}</Text>
                    </View>
                    <Text style={{
                        fontSize: 13,
                        textAlign: 'left', color: '#999'
                    }}>{item.content}</Text>
                </View>
            </View>


        )
    }
}
