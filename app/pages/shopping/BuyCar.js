import React from "react";
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import ImageView from "../../components/ImageView";
import NavigationUtil from "../../utils/NavigationUtil";
import {BaseComponent} from "../../components/base/BaseComponent";
import BuyCarStore from "../../store/BuyCarStore";
import util from "../../utils/util";

export default class Index extends BaseComponent {
    navigationBarProps() {
        return ({
            title: '购物车',
            rightTitle: '编辑'
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            isAllSelect: false,
            goodsList: [],
        };
    }

    onRightPress(){
        if (this.state.isEdit) {
            this.setRightTitle('编辑')
        }else {
            this.setRightTitle('完成')
        }
        this.setState({
            isEdit: !this.state.isEdit
        })
    }
    onShow(e){
        var goodsList = BuyCarStore.get();
        var _goodsList =[]
        Object.assign(_goodsList, goodsList);
        _goodsList.reverse();
        var list =[]
        _goodsList.map((item) => {
            item.select = false;
            list.push(item);
        });
        this.setState({
            goodsList: list
        })
    }
    onReady(){
        var goodsList = BuyCarStore.get();
        var _goodsList =[]
        Object.assign(_goodsList, goodsList);
        _goodsList.reverse();
        var list =[]
        _goodsList.map((item) => {
            item.select = false;
            list.push(item);
        });
        this.setState({
            goodsList: list
        })
    }

    onSubmit() {
        if (!util.isArrayEmpty(this.state.goodsList)) {
            var _goodList=[]
            this.state.goodsList.map((item) => {
                if (item.select) {
                    _goodList.push({
                        id: item.id,
                        price: item.goodsPrice,
                        goodName: item.goodsName,
                        imageList: item.imageList,
                        num: item.num,
                    });
                }
            });

            if (util.isArrayEmpty(_goodList)) {
                this.showShort('选择商品')
                return;
            }
            var param ={
                goodsList: _goodList
            };
            this.navigate('OrderConfirm', param)
        }
    }
    // {
    // "categoryId":"10",
    // "categoryName":"日用百货",
    // "evaluationCount":0,
    // "goodsBody":null,
    // "goodsName":"牙膏",
    // "goodsPrice":8.0,
    // marketPrice
    // "goodsState":1,
    // "id":1,
    // "imageList":["http://115.28.21.13/images/2019/06/11/6f98a275379fb2a9b325be60da1c5c46.png"]
    // }
    _renderRowView(item ,index) {
        var price = item.goodsPrice * (util.isNumber(item.num) ? item.num : 0);
        return (
            <TouchableView style={{
                backgroundColor: '#fff',
                marginVertical: 10,
                borderColor: CommonStyle.bgColor,
                borderBottomWidth: 0.5,
            }} onPress={() => {
                NavigationUtil.navigate(this.props.navigation, 'ProductDetail', {id: item.id})
            }}>
                <View style={{
                    flexDirection: 'row', height: 44, borderColor: CommonStyle.lightGray, borderBottomWidth: 0.5,
                    justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15
                }}>
                    <Text style={{fontSize: 16, color: '#666', fontWeight: 'bold'}}>{item.categoryName}</Text>
                </View>
                <View style={{
                    paddingVertical: 8,
                    paddingRight: 15,
                    flexDirection: 'row',
                    height: 86,
                    flex: 1,
                    borderColor: CommonStyle.lightGray, borderBottomWidth: 0.5,
                }}>
                    <TouchableView style={{height: 70, width: 40, justifyContent: 'center', alignItems: 'center'}}
                                   onPress={() => {
                                       if (item.select) {
                                           item.select = false;
                                       } else {
                                           item.select = true;
                                       }
                                       var goodsList = this.state.goodsList;
                                       goodsList.slice(index, 1, item);
                                       this.setState({
                                           goodsList: goodsList
                                       })
                                   }}
                    >
                        <Image style={{height: 20, width: 20}}
                               source={item.select ? require('../../img/icon_buy_select.png') : require('../../img/icon_buy_unselect.png')}/>
                    </TouchableView>

                    <ImageView style={{height: 70, width: 70}}
                               source={util.isArrayEmpty(item.imageList) ? '' : item.imageList[0]} defaultSource={require('../../img/default_image.png')}/>
                    <View style={{flex: 1,marginLeft:15, marginTop: 10 ,justifyContent:'space-between'}}>
                        <Text  style={{ flex: 1, fontSize: 16, color: '#333'}}>{item.goodsName}</Text>
                        <View style={{ flexDirection: 'row',alignItems:'center'}}>
                            <Text style={{
                                fontSize: 26,
                                color: CommonStyle.tomato , flex: 1
                            }}>￥{price}</Text>
                            <View style={{flexDirection:'row'}}>
                                <TouchableView style={{
                                        width:30,height:30,borderColor:CommonStyle.lightGray ,borderWidth:0.5,justifyContent:'center',alignItems:'center'
                                }} onPress={()=>{
                                    if (item.num === 1) {
                                        return;
                                    }
                                    item.num = item.num - 1;
                                    var goodsList = this.state.goodsList;
                                    goodsList.slice(index, 1, item);
                                    this.setState({
                                        goodsList: goodsList
                                    })

                                }}>
                                    <Text style={{
                                        fontSize: 22,
                                        color: '#666',fontWeight: 'bold'
                                    }}>-</Text>
                                </TouchableView>
                                <View style={{
                                    width:30,height:30,borderColor:CommonStyle.lightGray ,borderWidth:0.5,
                                    justifyContent:'center',alignItems:'center' ,
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: '#333',fontWeight: 'bold'
                                    }}>{item.num}</Text>
                                </View>
                                <TouchableView style={{
                                    width:30,height:30,borderColor:CommonStyle.lightGray ,borderWidth:0.5,justifyContent:'center',alignItems:'center'
                                }} onPress={()=>{
                                    if (item.num == 10) {
                                        this.showShort('最多选10件')
                                        return;
                                    }
                                    item.num = item.num + 1;
                                    var goodsList = this.state.goodsList;
                                    goodsList.slice(index, 1, item);
                                    this.setState({
                                        goodsList: goodsList
                                    })
                                }}>
                                    <Text style={{
                                        fontSize: 22,
                                        color: '#666',fontWeight: 'bold'
                                    }}>+</Text>
                                </TouchableView>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableView>
        );
    }


    _render() {
        var totalPrice = 0;
        var totalNum = 0;
        if (!util.isArrayEmpty(this.state.goodsList)) {
            this.state.goodsList.map((item) => {
                if (item.num > 0 && item.select) {
                    totalNum = totalNum + item.num;
                    totalPrice = totalPrice + item.goodsPrice * item.num;
                }
            });
        }
        return (
            <View style={{flex: 1}}>
                <FlatList
                    style={{flex: 1, marginBottom: 50}}
                    data={this.state.goodsList}
                    ListEmptyComponent={this._createEmptyView}
                    ItemSeparatorComponent={this._separator}
                    renderItem={({item, index}) => this._renderRowView(item, index)}
                />
                <View style={{
                    position: CommonStyle.absolute,
                    bottom: 0,
                    height: 48,
                    backgroundColor: '#fff',
                    borderTop: 0.5,
                    borderColor: CommonStyle.lightGray,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableView style={{
                        height: 48,
                        flex: 1,
                        marginLeft: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                                   onPress={() => {
                                       if (!util.isArrayEmpty(this.state.goodsList)) {
                                           this.state.goodsList.map((item) => {
                                               if (this.state.isAllSelect) {
                                                   item.select = false;
                                               } else {
                                                   item.select = true;
                                               }
                                           });
                                       }
                                       this.setState({
                                           isAllSelect: !this.state.isAllSelect,
                                           goodsList: this.state.goodsList
                                       })
                                   }}
                    >
                        <Image style={{height: 20, width: 20}}
                               source={this.state.isAllSelect ? require('../../img/icon_buy_select.png') : require('../../img/icon_buy_unselect.png')}/>
                        <Text style={{paddingLeft: 10, fontSize: 14, color: '#333', flex: 1}}>全选</Text>
                    </TouchableView>
                    {!this.state.isEdit && <Text style={{
                        fontSize: 15,
                        color: CommonStyle.red
                    }}>￥{totalPrice}</Text>}
                    <TouchableView style={{
                        marginLeft: 20,
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: CommonStyle.red,
                        width: 110
                    }}
                                   onPress={() => {
                                       if (this.state.isEdit) {
                                           var list =[]
                                           this.state.goodsList.map((item) => {
                                               if (!item.select) {
                                                   list.push(item);
                                               }
                                           });
                                           this.setState({
                                               goodsList: list.length == 0 ? null : list
                                           })
                                           BuyCarStore.clear();
                                           BuyCarStore.save(list);
                                           console.debug(JSON.stringify(list));
                                           this.showShort('删除成功');
                                       } else {
                                           this.onSubmit()
                                       }
                                   }}
                    >
                        <Text
                            style={{fontSize: 14, color: '#fff'}}>{!this.state.isEdit ? `结算(${totalNum})` : '删除'}</Text>
                    </TouchableView>
                </View>
            </View>

        );
    }
    /**
     * 空布局
     */
    _createEmptyView() {
        return (
            <View style={{height: '100%', marginTop: 160, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    暂无商品
                </Text>
            </View>
        );
    }

    /**
     * 分割线
     */
    _separator() {
        return null;

    }
}
