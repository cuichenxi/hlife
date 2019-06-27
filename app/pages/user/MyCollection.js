import {BaseComponent} from "../../components/base/BaseComponent";
import {Dimensions, Image, Text, TouchableOpacity, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import GiftedListView from "../../components/refreshList/GiftedListView";
import React from "react";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
const imageUrl=require('../../img/about_logo.png');

let {width, height} = Dimensions.get('window')


export default class MyCollection extends BaseComponent{

    navigationBarProps() {
        return {
            title: '我的收藏',
        }
    }
    _render(){
        return(
            <GiftedListView
                style={{with: width, flex: 1}}
                rowView={this._renderRowView.bind(this)}
                onFetch={this.makeRemoteRequest.bind(this)}
                loadMore={false}
            />
        )
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/collectlist', param,
            {
                mock: false,
                mockId: 1095622,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    _renderRowView(item) {
        return (
            <TouchableView >
                <View style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5
                }}>
                    <Image
                        source={{uri:item.goodsImage}}
                        style={{
                            width: 100,
                            height: 90,
                            marginLeft: 10,
                        }}
                    />
                    <View style={{flex: 1, marginLeft: 10,justifyContent:'flex-end'}}>
                        <Text style={{
                            fontSize: 13,
                            textAlign: 'left', color: '#666666'
                        }}>{item.goodsName}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',flex:1}}>
                            <Text style={{textAlign: 'left', color: CommonStyle.themeColor, fontSize: 13}}>{item.goodsPrice}</Text>
                            <Text style={{textAlign: 'left', color: '#999999', fontSize: 12,borderWidth: 1,
                                borderColor:CommonStyle.lineColor,borderRadius:10,paddingLeft: 5,paddingRight: 5}}>找相似</Text>
                        </View>
                    </View>
                </View>


            </TouchableView>

        )
    }
}
