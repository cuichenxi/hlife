import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {CommonStyle} from "../../../common/CommonStyle";
import TouchableView from "../../../components/TouchableView";
import {Dimensions, FlatList, Text, View} from "react-native";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from "react-native-vector-icons/Ionicons";
import SwipeAction from "antd-mobile-rn/es/swipe-action/index.native";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import util from "../../../utils/util";

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

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            isLoading: false,
            isRefresh: true,
        }
    }

    onReady(e){
        this.setState({
            from: e.from
        })
    }
    refreshing = () => {

    }

    _render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <View style={{flex: 1,marginTop: 10}}>
                    <GiftedListView
                        onRef={(ref)=>{
                            this.listRef = ref;
                        }}
                        style={{ flex: 1}}
                        rowView={this._renderItem.bind(this)}
                        onFetch={this.fetchData.bind(this)}
                        loadMore={false}
                        pagination={false}
                    />
                </View>


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
                }} onPress={() => {
                    this.goAddHousingAddress()
                }}>
                    <Text style={{color: 'white'}}>新增收货地址</Text>
                </TouchableView>
            </View>
        );
    }

    fetchData(page = 1,callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/goodsaddresslist', param,
            {
                mock: false,
                mockId: 1095864,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null,{emptyTitle: '暂无收货地址'})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    deleteData(id) {
        let param = { id: id};

        Request.post('/api/user/goodsAddressDelete', param,
            {
                mock: false,
                mockId: 1125915,
            }).then(rep => {
            if (rep.code == 0 ) {
                // console.log(JSON.stringify(rep))
                // let list = this.state.rows
                // // 删除指定位置元素
                // list.splice(index, 1)
                // console.log(list)
                // //todo 删除逻辑
                // this.setState({row: list})
                this.listRef._refresh();

            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
    }


    _renderItem(item,sectionId,index){
        console.log(item)
        return (
            <SwipeAction style={{
                backgroundColor: 'transparent',
            }} autoClose={true} onOpen={() => {
                // this.navigate('ModifyHousingAddress',{address:item})
            }}
                         onClose={() => console.log('close')}
                         right={[
                             {
                                 text: '删除',
                                 onPress: () => {
                                     this.deleteData(item.id,index)
                                 },
                                 style: {backgroundColor: 'red', color: 'white'},
                             },
                         ]}>
                <TouchableView onPress={() => {
                    if (this.state.from === 1) {
                        this.goBack(item);
                    } else {
                        this.navigate('AddShippingAddress', {
                            address: item, update: true, api: '/api/user/goodsaddressUpdate'},  (data) => {
                                this.listRef._refresh();
                        });
                    }
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5
                    }}>
                        <View style={{flex: 1, marginLeft: 20}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{
                                    textAlign: 'left',
                                    color: CommonStyle.textBlockColor,
                                    fontSize: 13
                                }}>{item.name}</Text>
                                <Text style={{
                                    textAlign: 'left',
                                    color: CommonStyle.textBlockColor,
                                    fontSize: 13,
                                    marginLeft:10
                                }}>{item.tel}</Text>
                            </View>

                            <Text
                                style={{
                                    textAlign: 'left',
                                    color: CommonStyle.textGrayColor,
                                    fontSize: 13,
                                    marginTop: 5
                                }}>{item.detail}</Text>
                        </View>
                        <Font.Ionicons style={{marginRight: 10}} name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>
                </TouchableView>

            </SwipeAction>
        )
    }


    goAddHousingAddress() {
        this.navigate('AddShippingAddress',{api:'/api/user/shippingAddress',},(data) =>{
                this.listRef._refresh();
            })
    }

}
