import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Text, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
import util from "../../utils/util";
import ImageView from "../../components/ImageView";

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
//
    postComment(){
        //类型：Number  必有字段  备注：1不满意 2 满意
        Request.post('/api/user/repairComment', {evaluate:1,id:item.id}).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
            } else {
            }
        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
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
                callback(null,{emptyTitle: '暂无工单记录'})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    _renderRowView(item) {
        const statusFontColor = item.statusFontColor;
        const statusBgColor = item.statusBgColor;
        return (
            <TouchableView onPress={() => {
                this.navigate("RepairOrderDetail", item)
            }}>
                <View style={{
                    backgroundColor: '#fff',
                    height: 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // padding: 10,
                }}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <ImageView defaultSource={require("../../img/icon_tools.png")} style={{
                            width: 27,
                            height: 27, alignItems: 'center', marginLeft: 10
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
                            }}>报修时间:{item.createtime}</Text>
                        </View>
                    </View>

                    <View style={{
                        color: statusFontColor,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: statusBgColor,
                        backgroundColor:statusBgColor,
                        paddingTop:3,
                        paddingBottom:3,
                        paddingRight:5,
                        paddingLeft:5,
                        marginRight: 12
                    }}>
                        <Text style={{
                            color: statusFontColor,
                            fontSize: 12,
                        }}>{item.statusName}</Text>
                    </View>
                </View>
            </TouchableView>

        )
    }

}
