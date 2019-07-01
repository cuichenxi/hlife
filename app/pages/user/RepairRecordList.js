import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
import util from "../../utils/util";
let {width, height} = Dimensions.get('window')

export default class RepairRecordList extends BaseComponent{
    navigationBarProps() {
        return {
            title: '工单记录',
        }
    }
    _render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }}>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                <GiftedListView
                    style={{with: width, flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>
        );
    }

    makeRemoteRequest(page = 1, callback) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        console.log(this.props)
        Request.post('/api/user/repairList', param,
            {
                mock: false,
                mockId: 1095356,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                this.showShort(rep.message);
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
            <TouchableView onPress={() => {
                // this.navigate("HouseholdServer", {data: item})
            }}>
                <View style={{
                    backgroundColor: 'white',
                    height: 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // padding: 10,
                }}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{uri: item.pic}} style={{
                            width: 37,
                            height: 37, alignItems: 'center', marginLeft: 12
                        }} resizeMode='cover'/>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 15}}>
                            <Text style={{
                                color: '#333',
                                padding: 3,
                                fontSize: 15
                            }}>{item.title}</Text>
                            <Text style={{
                                color: '#999',
                                padding: 3,
                                fontSize: 13
                            }}>业务简介:{item.intro}</Text>
                        </View>
                    </View>

                        <Text style={{
                            color: CommonStyle.white,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: CommonStyle.themeColor,
                            backgroundColor:CommonStyle.themeColor,
                            paddingTop:3,
                            paddingBottom:3,
                            paddingRight:5,
                            paddingLeft:5,
                            fontSize: 12,
                            marginRight: 12
                        }}>处理中</Text>

                </View>
            </TouchableView>

        )
    }

}
