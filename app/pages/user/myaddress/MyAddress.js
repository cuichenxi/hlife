import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {CommonStyle} from "../../../common/CommonStyle";
import TouchableView from "../../../components/TouchableView";
import {Dimensions, Text, View} from "react-native";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from "react-native-vector-icons/Ionicons";
import UserStore from "../../../store/UserStore";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import util from "../../../utils/util";

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
        this.state = {
            rows: [],
            isLoading: false,
            isRefresh: true,
            iaAuth: 0
        }
    }


    refreshing = () => {

    }

    onReady() {
        let userInfo = UserStore.get();
        this.setState({
            iaAuth: userInfo.iaAuth,
        })
    }

    _render() {
        const {rows} = this.state
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                    <GiftedListView
                        onRef={(ref)=>{
                            this.listRef = ref;
                        }}
                        style={{ flex: 1,marginTop: 10}}
                        rowView={this._renderItem.bind(this)}
                        onFetch={this.fetchData.bind(this)}
                        loadMore={false}
                        pagination={false}
                    />

                <TouchableView style={{
                    alignItems: 'center',
                    backgroundColor: !util.isArrayEmpty(rows)?CommonStyle.gray:CommonStyle.themeColor,
                    justifyContent: 'center',
                    height: 40,
                    width: width,
                    // textAlign: 'center',
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center'
                }} onPress={() => {
                    if (!util.isArrayEmpty(rows)){
                        //
                    } else {
                        this.goAddHousingAddress()
                    }
                }}>
                    <Text style={{color: 'white'}}>我的小区</Text>
                </TouchableView>
            </View>
        );
    }

    /**
     * 空布局
     */
    _createEmptyView() {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    暂无小区
                </Text>
            </View>
        );
    }

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray}}/>;
    }

    fetchData(page = 1,callback) {
        let param = {page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/mycommunityList', param,
            {
                mock: false,
                mockId: 1095864,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data)) {
                this.state.rows = rep.data
                callback(rep.data)
            } else {
                callback(null,{emptyTitle: '暂无小区'})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }


    _renderItem (item) {
        console.log(item)
        return (
            <TouchableView onPress={() => {
                this.navigate('AuthPage', {address: item})
            }}>
                <View style={{
                    backgroundColor: 'white',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5
                }}>
                    <View style={{flex: 1, marginLeft: 20}}>
                        <Text style={{
                            textAlign: 'left',
                            color: '#333',
                            fontSize: 13
                        }}>{item.communityName}</Text>
                        <Text
                            style={{
                                textAlign: 'left',
                                color: '#666',
                                fontSize: 13,
                                marginTop: 5
                            }}>{item.buildingName+item.unitName + item.roomName}</Text>
                    </View>
                    <Font.Ionicons style={{marginLeft: 10}} name="ios-arrow-forward-outline" size={(18)}
                                   color="#bbb"/>
                </View>
            </TouchableView>
        )
    }


    goAddHousingAddress() {
        this.navigate('AuthPage')
    }
}
