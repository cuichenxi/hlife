import React from "react";
import {Dimensions, Image, StyleSheet, Text, TextInput, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";
import {PAGE_SIZE} from "../../constants/AppConstants";
import {CommonStyle} from "../../common/CommonStyle";
import {BaseComponent} from "../../components/base/BaseComponent";
import ImageView from "../../components/ImageView";
import util from "../../utils/util";

let {width} = Dimensions.get('window')
export default class Index extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            filterType: 0,
            params:{
                orderColumn:'goods_price',
                orderRule:'DESC',
            },
            text: ''
        };
    }

    onReady(e) {
        this.setTitle("商品搜索")
    }

    _onFetch(page=1 , callback) {
        console.log('page' + page);
        // this.showInDLoading()
        let param = {
            name: this.state.text,
            // orderColumn: this.state.params.orderColumn,
            // orderRule:this.state.params.orderRule,
            page: page-1 ,
            pageSize: PAGE_SIZE,};
        Request.post("/api/goods/basic", param,
            {
                mock: false,
                mockId: 1095476,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                if (rep.data.rows) {
                    var gridData = [];
                    var length = rep.data.rows.length;
                    for (var i = 0; i < length; i = i + 2) {
                        var item1 = rep.data.rows[i];
                        var item2
                        if (i < length) {
                            item2 = rep.data.rows[i + 1];
                        }
                        var item = {
                            item1: item1,
                            item2: item2
                        };
                        gridData.push(item)
                    }
                    callback(gridData, {firstLoad: false,allLoaded: page * PAGE_SIZE >= rep.data.total})
                }
            }else {
                this.showShort(rep.message);
                callback([], {firstLoad: false, allLoaded: true})
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
    }
    search(text) {
        if (util.isEmpty(text)){
            return
        }
        this.setState({
            text: text
        })
        this.showLoading('搜索中...')
        this.listRef._refresh();
    }
    _renderRowView(item) {
        return (
            <View style={{flexDirection: 'row'}}>
                {this._renderItemView(item.item1)}
                {item.item2 && this._renderItemView(item.item2)}
            </View>
        );
    }

    _renderItemView(item) {
        return (
            <TouchableView style={{
                width: (width - 30) / 2, borderRadius: 3, backgroundColor: '#fff',
                borderColor: '#fff',
                borderWidth: .5,
                margin: 5
            }} onPress={() => {
                this._jumpRouter(item)
            }}>
                <View style={[{
                    flex: 1, borderRadius: 3, backgroundColor: '#fff',
                    borderColor: '#fff',
                    padding: 10,
                    borderWidth: .5,
                }]}>
                    <ImageView source={item.goodsImage}
                               style={{alignSelf: 'center', width: 100, marginTop: 10, height: 100,}}
                               defaultSource={require("../../img/default_image.png")}/>
                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={{
                        flex: 1, fontSize: 14, color: "#333", marginTop: 20,
                    }}>{item.goodsName}</Text>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: "flex-end", marginTop: 10}}>
                        <Text style={{fontSize: 12, color: CommonStyle.themeColor}}>￥<Text
                            style={{fontSize: 24, color: CommonStyle.themeColor,}}>{item.goodsPrice}</Text></Text>
                        <Text style={{
                            fontSize: 12,
                            color: '#666',
                            marginLeft: 5,
                            marginBottom: 5
                        }}>{`￥${item.marketPrice}`}</Text>
                    </View>
                </View>
            </TouchableView>
        )
    }
    _renderEmptyView(refreshCallback) {
        return (
            <View style={{justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                padding: 20,}}>
                <Text style={{fontSize: 16, color: '#999'}}>
                    暂无商品
                </Text>
            </View>
        );
    }
    _render() {
        return (
            <View>
                <View style={{
                    height: 44, flexDirection: 'row', borderBottomWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderColor: CommonStyle.lightGray, backgroundColor: '#fff'
                }}>
                    <TextInput
                        inlineImageLeft='search_icon'
                        placeholder='输入商品名'
                        autoFocus ={true}
                        underlineColorAndroid="transparent"
                        style={{height: 35,flex:1,paddingLeft:15,borderRadius:15,marginLeft:15,marginRight:10, backgroundColor: 'rgba(200,200,200,.5)',borderColor: CommonStyle.lineColor, borderWidth: .5}}
                        onChangeText={(text) =>{
                           this.search(text)
                        }}
                    />
                </View>
                <GiftedListView
                    onRef={(ref)=>{
                        this.listRef = ref;
                    }}
                    style={styles.container}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this._onFetch.bind(this)}
                    loadMore={false}
                    pagination={false}
                    emptyView={this._renderEmptyView}
                    firstLoader={false}
                    refreshable={false}
                    renderSeparator={() => {
                        return (null);
                    }}
                />
            </View>
        );
    }


}
;
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
});
