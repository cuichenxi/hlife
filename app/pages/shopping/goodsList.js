import React from "react";
import {Dimensions, Image, Linking, StyleSheet, Text, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";
import {PAGE_SIZE} from "../../constants/AppConstants";
import {CommonStyle} from "../../common/CommonStyle";
import {BaseComponent} from "../../components/base/BaseComponent";
import ImageView from "../../components/ImageView";

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
            type: 0
        };
    }

    navigationBarProps() {
        return {
            rightTitle:(
                '搜索'
            ),
        }
    }
    // {'type': 0,title:'商品列表'}
    onReady(e) {
        this.setState({
                type: e.type
            }
        )
        this.setTitle(e.title);
    }

    onRightPress(){
         this.navigate('goodsSearch')
    }
    _onFetch(page=1 , callback) {
        console.log('page' + page);
        // this.showInDLoading()
        let param = {
            orderColumn: this.state.params.orderColumn,
            orderRule:this.state.params.orderRule,
            type: this.state.type,
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
                callback(null,{emptyTitle: rep.message})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }
    //
    /**
     * filterType 0 价格降序 1 价格升序 3销量降序 4 销量升序
     * 价格升序：
     orderColumn=goods_price
     orderRule=ASC

     价格降序：
     orderColumn=goods_price
     orderRule=DESC

     销量升序：
     orderColumn=sale_num
     orderRule=ASC

     销量降序：
     orderColumn=sale_num
     orderRule=DESC
     */
    updateFilter(type) {
      this.setState(
          {
              filterType: type
          }
      )
        if (type == 0) {
            this.setState(
                {
                    orderColumn:'goods_price',
                    orderRule:'DESC',
                }
            )
        }else if (type == 1) {
            this.setState(
                {
                    orderColumn:'goods_price',
                    orderRule:'ASC',
                }
            )
        }else if (type == 2) {
            this.setState(
                {
                    orderColumn:'sale_num',
                    orderRule:'DESC',
                }
            )
        }else if (type == 3) {
            this.setState(
                {
                    orderColumn:'sale_num',
                    orderRule:'ASC',
                }
            )
        }
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
    _jumpRouter(item) {
        this.navigate('ProductDetail',item);
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

    _render() {
        return (
            <View style={{flex:1}}>
                <View style={{
                    height: 44, flexDirection: 'row', borderBottomWidth: 1,
                    borderColor: CommonStyle.lightGray, backgroundColor: '#fff'
                }}>
                    <TouchableView style={{
                        height: 44,
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                                   onPress={() => {
                                       var type = this.state.filterType;
                                       if (this.state.filterType == 2||this.state.filterType == 3) {
                                           type = 0;
                                       }else if (this.state.filterType == 0) {
                                           type = 1;
                                       }else if (this.state.filterType == 1) {
                                           type = 0;
                                       }
                                       this.updateFilter(type);
                                   }}
                    >
                        <Text style={{fontSize: 14, color: (this.state.filterType==0||this.state.filterType==1 ) ?CommonStyle.themeColor:'#333'}}>价格</Text>
                        <View style={{height:16,width:16}}>
                            {this.state.filterType==0&&<Image style={{height:16, width: 16 ,resizeMode:Image.resizeMode.stretch  }} source={require('../../img/icon_down.png')}/>}
                            {this.state.filterType==1&&<Image style={{height:16, width: 16 ,resizeMode:Image.resizeMode.stretch }} source={require('../../img/icon_up.png')}/>}
                        </View>
                    </TouchableView>
                    <TouchableView style={{
                        height: 44,
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} onPress={() => {
                        var type = this.state.filterType;
                        if (this.state.filterType == 0||this.state.filterType == 1) {
                            type = 2;
                        }else if (this.state.filterType == 2) {
                            type = 3;
                        }else if (this.state.filterType == 3) {
                            type = 2;
                        }
                        this.updateFilter(type);
                    }}>
                        <Text style={{fontSize: 14, color: (this.state.filterType==2||this.state.filterType==3) ?CommonStyle.themeColor:'#333'}}>销量</Text>
                        <View style={{height:16,width:16}}>
                            {this.state.filterType==2&&<Image style={{height:16, width: 16 ,resizeMode:Image.resizeMode.stretch  }} source={require('../../img/icon_down.png')}/>}
                            {this.state.filterType==3&&<Image style={{height:16, width: 16 ,resizeMode:Image.resizeMode.stretch }} source={require('../../img/icon_up.png')}/>}
                        </View>
                    </TouchableView>
                </View>
                <GiftedListView
                    onRef={(ref)=>{
                        this.listRef = ref;
                    }}
                    style={styles.container}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this._onFetch.bind(this)}
                    loadMore={true}
                    pagination={true}
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
