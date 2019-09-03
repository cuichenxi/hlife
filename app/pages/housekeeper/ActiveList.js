import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import ImageView from "../../components/ImageView";
import {CommonStyle} from "../../common/CommonStyle";
import {ImageStyle} from "../../common/ImageStyle";


export default class ActiveList extends BaseComponent{
    navigationBarProps() {
        return {
            title: '活动列表',
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
                    onFetch={this._onFetch.bind(this)}
                    loadMore={true}
                />
            </View>
        );
    }

    _onFetch(page = 1, callback) {
        let param = {page: page - 1, pageSize: 20,};
        Request.post("/api/neighbour/activityList", param
        ).then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null, {emptyTitle: '暂无活动'})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
        }).done(() => {
            // this.hideLoading();
        });
    }

    _renderRowView(item){
        return (<TouchableOpacity style={{
            backgroundColor: '#fff',
            flex:1,
            flexDirection: 'row',
            paddingHorizontal:10,
            paddingVertical:5,
            borderColor: CommonStyle.lineColor,
            borderTopWidth: .5
        }} onPress={()=>{
            this.navigate('activeDetail', item);
        }
        }>
            <ImageView
                source={item.imageUrl}
                style={{
                    width: 90,
                    height: 90,
                    paddingLeft:10,
                    resizeMode: ImageStyle.contain
                }}
                defaultSource={require('../../img/default_image.png')}
            />
            <View style={{flex: 1, paddingLeft: 10}}>
                <Text style={{
                    fontSize: 17,
                    marginTop:10,
                    textAlign: 'left', color: '#666666'
                }}>{item.activityName}</Text>
                <Text style={{textAlign: 'left', marginTop:5,color: '#999999', fontSize: 15}}>{item.activityDate}</Text>
                <Text style={{textAlign: 'left', marginTop:5,color: '#999999', fontSize: 15}}>已有{item.activityNum}人参加活动</Text>
            </View>
        </TouchableOpacity>)
    };


}
