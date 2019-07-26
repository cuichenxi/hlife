import React from "react";
import {Text, View} from "react-native";
import {BaseView} from "../../components/base/BaseView";
import GiftedListView from "../../components/refreshList/GiftedListView";
import Request from "../../utils/Request";
import {PAGE_SIZE} from "../../constants/AppConstants";
import TouchableView from "../../components/TouchableView";
import ImageView from "../../components/ImageView";
import {ImageStyle} from "../../common/ImageStyle";
import {CommonStyle} from "../../common/CommonStyle";

/**
 * 话题view
 */

export default class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            liked: false
        };
        console.log(this.props)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {status: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/neighbour/topic', param)
            .then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data, {allLoaded: page * PAGE_SIZE >= rep.data.total})
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
            <TouchableView onPress={() => {
                this.state.onItemPress(item)
            }}>
                <View style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent:'center',
                    padding: 5,
                    flex:1
                }}>
                    <ImageView
                        source={item.pic}
                        defaultSource={require("../../img/default_image.png")}
                        style={{
                            width: 80,
                            height: 80,
                            resizeMode: ImageStyle.contain,//contain 等比例缩放 cover 模式只求在显示比例不失真的情况下填充整个显示区域。
                        }}
                    />
                    <View style={{
                        flex: 1,
                        marginLeft: 10,
                        padding: 10,
                        height:80,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}>
                        <Text style={{
                            fontSize: 14,
                             color: '#333'
                        }}>{item.name}</Text>
                        <Text style={{
                            fontSize: 12,
                             color: '#999'
                        }}>{item.des}</Text>


                    </View>
                </View>

            </TouchableView>

        )
    }

    _render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }}>
                <GiftedListView
                    style={{flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                    pagination={false}
                />
            </View>
        );
    }

}
;
