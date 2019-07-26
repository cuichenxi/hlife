import {DeviceEventEmitter, Dimensions, Image, Text, View} from "react-native";
import React from "react";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import {BaseView} from "../../components/base/BaseView";
import util from "../../utils/util";
import TouchableView from "../../components/TouchableView";
import {ImageStyle} from "../../common/ImageStyle";
import {CommonStyle} from "../../common/CommonStyle";

let {width, height} = Dimensions.get('window')
export default class MessageListView extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            liked: false
        };
        console.log(this.props)
    }

    componentDidMount(){
       this.deviceEventEmitter = DeviceEventEmitter.addListener("msgreadAll", (param) => {
           this.listRef._refresh();
        });
    }
    componentWillUnmount(){
        if (this.deviceEventEmitter) {
            this.deviceEventEmitter.remove();
        }
    }
    _render() {
        return (
            <View style={{flex: 1}}>
                <GiftedListView
                    onRef={(ref)=>{
                        this.listRef = ref;
                    }}
                    style={{marginTop: 10}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>
        )
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {type: this.state.index + 1, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/home/messageList', param,
            {
                mock: false,
                mockId: 1095710,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null, {emptyTitle: "空空如也 ~"})
            }
        }).catch(err => {
            callback(null, {emptyTitle: null})
        }).done(() => {
            this.hideLoading();
        })
    }

    //         "communityId": 4,
    //         "createtime": "2019-07-26 11:38:30",
    //         "id": 3,
    //         "isRead": 0,
    //         "message": "123",
    //         "title": "1232",
    //         "type": 3
// {title: '通知'},//1
// {title: '管家'},//2
// {title: '订单'},//3
// {title: '其他'},//4
    _renderRowView(item, i) {
        var icon = 0;
        if (item.type == 1) {
            icon = require('../../img/ic_message_active.png');
        } else if (item.type == 2) {
            icon = require('../../img/ic_message_gj.png');
        }else if (item.type == 3) {
            icon = require('../../img/ic_message_order.png');
        } else {
            icon = require('../../img/ic_message_fw.png');
        }
        return (
            <TouchableView style={{
                backgroundColor: 'white',
                // height:50,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10
            }} onPress={() => {
                this.state.onButtonPress(item);
                setTimeout(() => {
                    this.listRef._refresh();
                }, 1000);
            }}>
                <Image
                    source={icon}
                    style={{width: 38, height: 38, resizeMode: ImageStyle.contain}}
                />
                <View style={{flex: 1, marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center'}}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', flex: 1, width: width - 70}}>
                        <Text style={{
                            fontSize: 14,
                            color: '#333'
                        }}>{item.title}</Text>
                        <Text style={{color: '#999999', fontSize: 12, textAlign: 'right',}}>{item.createtime}</Text>
                    </View>
                    <Text style={{
                        fontSize: 13,
                        color: '#999'
                    }}>{item.message}</Text>
                </View>
                {item.isRead === 0 &&
                <View style={{
                    backgroundColor: CommonStyle.red, borderRadius: 4, width: 8, height: 8,
                    position: CommonStyle.absolute, left: 45, top: 12
                }}></View>}

            </TouchableView>


        );
    }
}
