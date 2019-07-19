import {BaseComponent} from "../../components/base/BaseComponent";
import {Dimensions, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import GiftedListView from "../../components/refreshList/GiftedListView";
import React from "react";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
import util from "../../utils/util";
import ImageView from "../../components/ImageView";

const imageUrl=require('../../img/default_image.png');


export default class MyCollection extends BaseComponent{

    navigationBarProps() {
        return {
            title: '我的收藏',
        }
    }
    _render(){
        return(
            <GiftedListView
                style={{ flex: 1, marginTop: 10}}
                rowView={this._renderRowView.bind(this)}
                onFetch={this.makeRemoteRequest.bind(this)}
                loadMore={false}
            />
        )
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/collectlist', param).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null, {emptyTitle: '暂无收藏'})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    _renderRowView(item) {
        return (
            <TouchableView onPress={() => this.navigate('ProductDetail', {id: item.productId})}>
                <View style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5
                }}>
                    <ImageView
                        source={item.goodsImage}
                        defaultSource={imageUrl}
                        style={{
                            width: 90,
                            height: 90,
                            marginLeft: 10,
                        }}
                    />
                    <View style={{flex: 1, padding: 10, justifyContent: 'flex-end'}}>
                        <Text style={{
                            fontSize: 14,
                            marginBottom: 10,
                            textAlign: 'left', color: '#333'
                        }}>{item.goodsName}</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1
                        }}>
                            <Text style={{
                                textAlign: 'left',
                                color: CommonStyle.themeColor,
                                fontSize: 13
                            }}>{item.goodsPrice}元</Text>
                            {/*<Text style={{textAlign: 'left', color: '#999999', fontSize: 12,borderWidth: 1,*/}
                            {/*borderColor:CommonStyle.lineColor,borderRadius:10,paddingLeft: 5,paddingRight: 5}}>找相似</Text>*/}
                        </View>
                    </View>
                </View>


            </TouchableView>

        );
    }
}
