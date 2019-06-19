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
 *我的地址
 */
export default class MyAddress extends BaseComponent {
    navigationBarProps() {
        return {
            title: '我的地址',
            gesturesEnabled: false
        }
    }

    constructor(props) {
        super(props);
        this.state={
            addressList:[]
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
                    onRef={this.onRef}
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
                    <Text style={{color: 'white'}}>新增小区地址</Text>
                </TouchableView>
            </View>
        );
    }

    onRef=(ref) =>{
        this.GiftedListView = ref
    }


    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('api/user/goodsaddresslist',param,
            {
                mock: true,
                mockId: 1095864,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState(
                    {
                        addressList:rep.data.rows
                    }
                )
                callback(this.state.addressList,{allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    _renderRowView(item,i){
        return (
            <SwipeAction style={{
                backgroundColor: 'transparent',
            }} autoClose={true} onOpen={() => {
                // this.navigate('ModifyHousingAddress',{address:item})
            }}
                         onClose={() => console.log('close')}
                         onPress={() => {
                             this.navigate('ModifyHousingAddress',{address:item})
                         }}
                         right={[
                             {
                                 text: '删除',
                                 onPress: () => {
                                     this.showShort('delete')
                                     let list = this.state.addressList
                                     console.log(list)
                                     console.log(item)
                                     console.log(i)
                                     // item.id='一单元-403'
                                     list = this.removeArray(list,item)
                                     console.log(list)
                                     // console.log(this.GiftedListView.props)
                                     //todo 删除逻辑
                                     // this.GiftedListView._updateRows()
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

    getIndex(_arr,_obj){
        var len = _arr.level
        for (var i=0;i<len;i++){
            if (_arr[i] == _obj){
                return parseInt(i)
            }
        }
        return -1
    }

    removeArray(_arr,_obj){
        var length = _arr.length;
        for (var i = 0; i < length; i++) {
            if (_arr[i] == _obj) {
                if (i == 0) {
                    _arr.shift(); //删除并返回数组的第一个元素
                    return _arr;
                }
                else if (i == length - 1) {
                    _arr.pop();  //删除并返回数组的最后一个元素
                    return _arr;
                }
                else {
                    _arr.splice(i, 1); //删除下标为i的元素
                    return _arr;
                }
            }
        }
    }

    goAddHousingAddress() {
        this.navigate('AddHousingAddress')
    }
}
