import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Text, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
import util from "../../utils/util";
import ImageView from "../../components/ImageView";


export default class ComplaintList extends BaseComponent{
    navigationBarProps() {
        return {
            title: '投诉表扬',
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

    makeRemoteRequest(page = 1, callback) {
        // let param = { page: page - 1, pageSize: PAGE_SIZE};
        let param = { page: page - 1, pageSize: 100};

        console.log(this.props)
        Request.post('/api/steward/complaintpraiseList', param,
            {
                mock: false,
                mockId: 1095356,
            }).then(rep => {
            if (rep.code == 0 &&!util.isArrayEmpty(rep.data)) {
            // if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                // console.log(JSON.stringify(rep))
                callback(rep.data, {allLoaded: true})
            } else {
                callback(null,{emptyTitle: '暂无记录'})
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
                this.navigate("ComplaintDetail", item)
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
                        <ImageView defaultSource={require("../../img/menu_tsby.png")} style={{
                            width: 27,
                            height: 27, alignItems: 'center', marginLeft: 10
                        }} resizeMode='cover'/>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 15}}>
                            <Text style={{
                                color: '#333',
                                padding: 3,
                                fontSize: 15
                            }}>{item.memberName}</Text>
                            <Text style={{
                                color: '#999',
                                padding: 3,
                                fontSize: 13
                            }}>{item.createTime}</Text>
                        </View>
                    </View>

                        {/*<Text style={{*/}
                            {/*borderRadius: 30,*/}
                            {/*borderWidth: 1,*/}
                            {/*paddingTop:3,*/}
                            {/*paddingBottom:3,*/}
                            {/*paddingRight:5,*/}
                            {/*paddingLeft:5,*/}
                            {/*fontSize: 12,*/}
                            {/*marginRight: 12*/}
                        {/*}}>{item.status}</Text>*/}

                </View>
            </TouchableView>

        )
    }

}
