import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {CommonStyle} from "../../../common/CommonStyle";
import TouchableView from "../../../components/TouchableView";
import {Dimensions, Text, View} from "react-native";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from "react-native-vector-icons/Ionicons";
import SwipeAction from "antd-mobile-rn/es/swipe-action/index.native";

let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}
/**
 *我的收货地址
 */
export default class MyShippingAddress extends BaseComponent {
    navigationBarProps() {
        return {
            title: '我的收货地址',
        }
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
                />

                <TouchableView style={{
                    alignItems: 'center',
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    height: 40,
                    width: width,
                    // textAlign: 'center',
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center'
                }} onPress={() => {this.goAddHousingAddress()}}>
                    <Text style={{color: 'white'}}>新增收货地址</Text>
                </TouchableView>
            </View>
        );
    }


    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('api/user/goodsaddresslist',param,
            {
                mock: true,
                mockId: 1095864,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows,{allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    _renderRowView(item){
        return (
            <SwipeAction style={{
                backgroundColor: 'transparent',
            }} autoClose={true} onOpen={() => {
                this.navigate('ModifyHousingAddress',{address:item})
            }}
                         onClose={() => console.log('close')}
                         onPress={() => {
                             this.navigate('ModifyHousingAddress',{address:item})
                         }}
                         right={[
                             {
                                 text: '删除',
                                 onPress: () => {
                                     console.log('delete')
                                     console.log(item)
                                     let list = this.state.invoiceList

                                 },
                                 style: {backgroundColor: 'red', color: 'white'},
                             },
                         ]}>
                    <View style={{
                        backgroundColor: 'white',
                        // height:50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5
                    }}>
                        <View style={{

                            paddingLeft: 10,
                            borderRadius: 5,
                            backgroundColor: CommonStyle.themeColor,
                            paddingRight: 10
                        }}>
                            <Text style={{
                                textAlign: 'center', color: 'white',
                            }}>审核</Text>
                        </View>
                        <View style={{flex:1,marginLeft:20}}>
                            <Text style={{textAlign: 'left', color: '#999999', fontSize: 13}}>{item.communityName}</Text>
                            <Text
                                style={{textAlign: 'left', color: '#999999', fontSize: 13, marginTop: 5}}>{item.unitName}</Text>
                        </View>
                        <Font.Ionicons style={{marginLeft: 10}} name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>
            </SwipeAction>

        )
    }

    goAddHousingAddress() {
        this.navigate('AddShippingAddress')
    }
}
