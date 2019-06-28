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

    componentWillMount() {
        this.fetchData()
    }

    refreshing = () => {

    }

    _render() {
        const {rows} = this.state
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }}>
                <View style={{flex: 1}}>
                    <FlatList ref={(flatList) => this._flatList = flatList}
                              ItemSeparatorComponent={this._separator}
                              renderItem={this._renderItem}

                              onRefresh={() => this.refreshing()}
                              refreshing={this.state.isLoading}

                              onEndReachedThreshold={0.1}
                        // onEndReached={
                        //     () => this._onLoadMore()
                        // }

                              data={rows}>

                    </FlatList>
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

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray}}/>;
    }


    fetchData(page = 1) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/goodsaddresslist', param,
            {
                mock: false,
                mockId: 1095864,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                this.setState({
                    rows: rep.data.rows
                })
            } else {
                this.showShort(rep.message);
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
            this.hideLoading();
        })
    }


    _renderItem = (item) => {
        console.log(item)
        return (
            <SwipeAction style={{
                backgroundColor: 'transparent',
            }} autoClose={true} onOpen={() => {
                // this.navigate('ModifyHousingAddress',{address:item})
            }}
                         onClose={() => console.log('close')}
                         onPress={() => {
                             this.navigate('ModifyHousingAddress', {address: item})
                         }}
                         right={[
                             {
                                 text: '删除',
                                 onPress: () => {
                                     let list = this.state.rows
                                     // 删除指定位置元素
                                     list.splice(item.index, 1)
                                     console.log(list)
                                     //todo 删除逻辑
                                     this.setState(
                                         {
                                             row: list
                                         }
                                     )

                                 },
                                 style: {backgroundColor: 'red', color: 'white'},
                             },
                         ]}>
                <TouchableView onPress={() => {
                    this.navigate('ModifyHousingAddress', {address: item.item})
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        height: 50,
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
                        <View style={{flex: 1, marginLeft: 20}}>
                            <Text style={{
                                textAlign: 'left',
                                color: '#999999',
                                fontSize: 13
                            }}>{item.item.communityName}</Text>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    color: '#999999',
                                    fontSize: 13,
                                    marginTop: 5
                                }}>{item.item.unitName}</Text>
                        </View>
                        <Font.Ionicons style={{marginLeft: 10}} name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>
                </TouchableView>

            </SwipeAction>
        )
    }


    goAddHousingAddress() {
        this.navigate('AddShippingAddress')
    }

}
