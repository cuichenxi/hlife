import React from "react";
import {Image, Linking, Text, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import Request from "../../utils/Request";
import {PAGE_SIZE} from "../../constants/AppConstants";
import TouchableView from "../../components/TouchableView";
import {BaseView} from "../../components/base/BaseView";
import {CommonStyle} from "../../common/CommonStyle";
import ImageView from "../../components/ImageView";
import Modal from "antd-mobile-rn/es/modal/index.native";

const imageUrl = require('../../img/default_image.png');

/**
 * 房屋租售View
 */

export default class HouseSellRentView extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        };
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {type: this.state.index, page: page - 1, pageSize: PAGE_SIZE,communityId:this.state.communityId};

        Request.post('/api/steward/housingList', param,
            {
                mock: false,
                mockId: 1095607,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null, {emptyTitle: rep.message})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    _renderRowView(item) {
        return (
            <TouchableView>
                <View style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'space-between',
                    padding: 5
                }}>
                    <ImageView
                        source={item.image}
                        defaultSource={imageUrl}
                        style={{
                            width: 100,
                            height: 90,
                            marginLeft: 10,
                        }}
                    />
                    <View style={{ flex:1,marginLeft: 15, justifyContent: 'space-between',marginRight:30}}>

                        <Text style={{
                            fontSize: 15, color: '#333'
                        }}>{item.communityName}</Text>
                        <View style={{
                            flexDirection: 'row',
                            // justifyContent: 'flex-start',
                            alignItems:'center',
                            justifyContent:'space-between',
                            flex:1
                        }}>
                            <Text style={{
                                fontSize: 13,
                                color: '#666666'
                            }}>{item.base}</Text>
                            <Text style={{ fontSize: 13,
                                color: '#666666'}}>{item.square}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            flex: 1
                        }}>
                            <Text style={{color: CommonStyle.themeColor, fontSize: 15}}>￥{item.price}</Text>
                            <Text style={{color: '#999', fontSize: 11}}>{item.publicTime}</Text>
                        </View>
                    </View>
                    <TouchableView style={{marginRight: 30}}
                        onPress={() => {
                        this.onButtonClick(item.phone)
                    }}>
                        <Image source={require('../../img/bohao_icon.png')}
                               style={{width: 30, height: 30, resizeMode: 'contain'}}/>
                    </TouchableView>
                </View>


            </TouchableView>

        )
    }

    onButtonClick = (tel) => {
        Modal.alert('提示', '是否拨打电话', [
            { text: '取消', onPress: () => {console.log('cancel')}, style: 'cancel' },
            { text: '确定', onPress: () => {
                    console.log('ok')
                    Linking.openURL(`tel:${tel}`)
                } },
        ]);
    };


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
        );
    }



}
;
