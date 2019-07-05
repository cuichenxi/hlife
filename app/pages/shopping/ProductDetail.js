import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, Modal as ModalView, ScrollView, StyleSheet, Text, View,} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Swiper from "react-native-swiper";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";
import LoadingView from "../../components/LoadingView";
import Loading from "../../components/Loading";
import LinearGradient from "react-native-linear-gradient";
import ImageView from "../../components/ImageView";
import util from "../../utils/util";
import BuyCarStore from "../../store/BuyCarStore";

let {width, height} = Dimensions.get('window')


export default class ProductDetail extends BaseComponent {
    navigationBarProps() {
        return {
            title: '商品详情',
            navBarStyle: {
                backgroundColor: '(255, 255, 255, 0)'
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            headerUrl: '',
            goodId: null,
            num: 1,
            submitVisible: false,
            addBuy: false,
        }
    }

    onReady(e) {
        this.setState({
            goodId: e.id
        });
        this.makeRemoteRequest(e);
    }

    makeRemoteRequest(e) {
        let param = {id: e.id};
        this.showDLoading()
        Request.post('/api/goods/detail', param).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState(
                    {
                        data: rep.data
                    }
                )
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
        })
    }

    onSubmit() {
        var param ={
            goodsList: [
                {
                    id: this.state.data.id,
                    price: this.state.data.goodsPrice,
                    goodName: this.state.data.goodsName,
                    num: this.state.num,
                }
            ]}
        this.navigate('OrderConfirm', param)
    }

    _renderSubmit() {
        return (
            <ModalView
                animationType="fade"
                transparent={true}
                visible={this.state.submitVisible}
                onRequestClose={() => {
                }}
            >
                <TouchableView style={{
                    backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, alignItems: 'center',
                    justifyContent: 'flex-end',
                }} onPress={() => {
                    this.setState({
                        submitVisible: false
                    })
                }}>
                    <View style={{
                        width: '100%',
                        backgroundColor: '#fff'
                    }}>
                        <Text style={{
                            fontSize: 14, color: '#333', marginHorizontal: 15, marginVertical: 15,
                        }}>立即购买</Text>
                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 15, paddingVertical: 12,
                            borderBottomWidth: 0.5, borderColor: CommonStyle.lightGray, borderTopWidth: 0.5
                        }}>
                            <ImageView style={{
                                height: 70, width: 70,
                                resizeMode: Image.resizeMode.contain,
                            }} source={util.isArrayEmpty(this.state.data.imageList) ? '' : this.state.data.imageList[0]}
                                       defaultSource={require("../../img/default_image.png")}></ImageView>
                            <Text style={{
                                marginLeft: 15,
                                fontSize: 22,
                                marginTop: 10,
                                color: CommonStyle.red
                            }}>￥{this.state.data.goodsPrice}元</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent : 'space-between',
                            alignItems: 'center',
                            fontSize: 12, color: '#333', marginHorizontal: 15, marginVertical: 12,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#666'
                            }}>购买数量</Text>
                            <View style={{flexDirection:'row'}}>
                                <TouchableView style={{
                                    width:35,height:35,borderColor:CommonStyle.lightGray ,borderWidth:0.5,
                                    borderBottomLeftRadius:2, borderTopLeftRadius: 2,justifyContent:'center',alignItems:'center'
                                }} onPress={()=>{
                                    if (this.state.num == 0) {
                                        return;
                                    }
                                    this.setState({
                                        num: this.state.num - 1
                                    })
                                }}>
                                    <Text style={{
                                        fontSize: 22,
                                        color: '#666',fontWeight: 'bold'
                                    }}>-</Text>
                                </TouchableView>
                                <View style={{
                                    width:35,height:35,borderColor:CommonStyle.lightGray ,borderWidth:0.5,
                                    justifyContent:'center',alignItems:'center' ,
                                }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#333',fontWeight: 'bold'
                                }}>{this.state.num}</Text>
                                </View>
                                <TouchableView style={{
                                    width:35,height:35,borderColor:CommonStyle.lightGray ,borderWidth:0.5,
                                    borderBottomLeftRadius:2, borderTopLeftRadius: 2,justifyContent:'center',alignItems:'center'
                                }} onPress={()=>{
                                    if (this.state.num == 10) {
                                        this.showShort('最多选10件')
                                        return;
                                    }
                                    this.setState({
                                        num: this.state.num + 1
                                    });
                                }}>
                                    <Text style={{
                                        fontSize: 22,
                                        color: '#666',fontWeight: 'bold'
                                    }}>+</Text>
                                </TouchableView>
                            </View>
                        </View>
                        <TouchableView style={{
                            backgroundColor: CommonStyle.tomato, height: 48, marginTop: 30, justifyContent: 'center'
                            , alignItems: 'center'
                        }} onPress={()=>{
                            this.setState({
                            submitVisible: false
                        })
                            this.onSubmit()
                        }}>
                            <Text style={{fontSize: 16, color: '#fff'}}>确定</Text>
                        </TouchableView>
                    </View>
                </TouchableView>
            </ModalView>
        );
    }
    render() {
        const that = this;
        return (
            <View style={[styles.baseContainer]}>
                {that.state.inSideLoading ? <LoadingView loadingtext={that.state.loadingText}/> : this._render()}
                {that.state.hideHeader ? null :
                    <View style={{
                        position: CommonStyle.absolute, width: '100%'
                    }}>{this.renderNavigationBar()}</View>}
                {that.state.isLoading ?
                    <Loading loadProps={{visible: that.state.isLoading, loadingText: that.state.loadingText}}/> : null}
                {this._renderSubmit()}
            </View>
        );
    }

    _render() {
        const {data} = this.state
        return (
            <View style={{
                flex: 1
            }}>
                <ScrollView style={{
                    flex: 1,
                    height: 1000,
                    flexDirection: 'column'
                }}>
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        {this._renderBanner()}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10
                        }}>
                            <Text style={{fontSize: 18, color: '#333'}}>{data.goodsName}</Text>
                            <TouchableView onPress={() => {
                                this.setState({
                                    isCollect: !this.state.isCollect
                                })
                            }}>
                                <Image
                                    source={this.state.isCollect ? require('../../img/icon_sc_press.png') : require('../../img/icon_sc.png')}
                                    style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                            </TouchableView>

                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end', paddingLeft: 10}}>
                            <Text style={{fontSize: 22, color: CommonStyle.themeColor}}>￥{data.goodsPrice}</Text>
                            {data.marketPrice && <Text style={{
                                marginLeft: 5,
                                fontSize: 13,
                                marginBottom: 2,
                                color: '#666',
                                textDecorationLine: 'line-through'
                            }}>￥{data.marketPrice}</Text>}
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10
                        }}>
                            <Text>快递费:{util.isEmpty(data.expressPrice) ? '0.0' : data.expressPrice}</Text>
                            <Text>已售:{util.isEmpty(data.sellNum) ? 0 : data.sellNum}</Text>
                            <Text>发货地:{util.isEmpty(data.sendSite) ? '未知' : data.sendSite}</Text>
                        </View>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        height: 50,
                        paddingRight: 10,
                        paddingLeft: 10
                    }}>

                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={require('../../img/check.png')}
                                   style={{width: 12, height: 12, resizeMode: 'contain'}}/>
                            <Text style={{fontSize: 12, color: '#333', marginLeft: 2}}>支持开局电子发票</Text>
                        </View>
                        <View style={{
                            marginLeft: 50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image source={require('../../img/check.png')}
                                   style={{width: 12, height: 12, resizeMode: 'contain'}}/>
                            <Text style={{fontSize: 12, color: '#333', marginLeft: 2}}>支持快递配送</Text>
                        </View>

                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>

                    <View style={{height: 30}}></View>
                </ScrollView>
                <View style={{  flexDirection: 'row',width: '100%', position: 'absolute',
                    bottom: 0,
                    height: 48,
                    alignItems: 'center'}}>
                    <TouchableView style={{
                        alignItems: 'center',
                        backgroundColor: CommonStyle.white,
                        justifyContent: 'center',
                        height: 48,
                        flex: 1}} onPress={() => {
                        this.navigate('ProductShoppingCart')
                    }}>
                            <Image source={require('../../img/shopping_cart.png')}
                                   style={{ width: 25, height: 25, resizeMode: 'contain'}}/>
                    </TouchableView>
                    <View style={{height: 48, width: 0.5, backgroundColor: CommonStyle.lineColor,}}/>
                    <TouchableView style={{ alignItems: 'center',
                        backgroundColor: '#FF6347',
                        justifyContent: 'center',
                        height: 48,
                        flex: 1.2}} onPress={() => {
                            this.setState({
                                addBuy: !this.state.addBuy
                            })
                        if (this.state.addBuy) {
                            this.showShort('已移除购物车');
                            BuyCarStore.remove(data.id);
                        } else {
                            BuyCarStore.save([data]);
                            this.showShort('已加入购物车');
                        }
                    }}>
                            <Text style={{color: '#fff', fontSize: 15}}>{this.state.addBuy?'移除购物车':'加入购物车'}</Text>
                    </TouchableView>
                    <TouchableView style={{ alignItems: 'center',
                        backgroundColor: CommonStyle.themeColor,
                        justifyContent: 'center',
                        height: 48,
                        flex: 1.5}} onPress={() => {this.setState({
                        submitVisible: true
                    })}}>
                        <Text style={{color: '#fff', fontSize: 15}}>立即购买</Text>
                    </TouchableView>
                </View>

            </View>

        );
    }

    _renderBanner() {
        if (util.isArrayEmpty(this.state.data.imageList)) {
            this.state.data.imageList = [{}];
        }
        return (
            <Swiper style={{height: 420,}} paginationStyle={{bottom: 10}}
                    dotStyle={{backgroundColor: 'rgba(200,200,200,.2)', width: 6, height: 6}}
                    activeDotStyle={{backgroundColor: 'rgba(255,255,255,.5)', width: 6, height: 6}}
                    showsButtons={false}
                    autoplay={true} showsPagination={true}>
                {this.state.data.imageList.map((banner, i) => {
                    return (
                        <TouchableView
                            style={{height: 420, width: '100%', justifyContent: 'center', alignItems: 'center'}}
                            key={i}>
                            <ImageView style={{
                                height: 300, marginTop: 50, width: '100%',
                                resizeMode: Image.resizeMode.contain,
                            }} source={banner} defaultSource={require("../../img/default_image.png")}></ImageView>
                            <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0, y: 1}}
                                            colors={['#fff', '#aaa']}
                                            style={{
                                                height: 60, position: CommonStyle.absolute, bottom: 0,
                                                width: '100%'
                                            }}>
                            </LinearGradient>
                        </TouchableView>
                    );
                })}
            </Swiper>
        );

    }


}
const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        backgroundColor: CommonStyle.bgColor
    },
    container: {
        flex: 1,
        paddingBottom: 68,
    },
    bottomIcon: {
        width: 15, height: 15, resizeMode: 'contain'
    },
    bottomLeftBt: {
        alignItems: 'center',
        backgroundColor: CommonStyle.white,
        justifyContent: 'center',
        height: 48,
        width: width / 4,
    },
    marginBottom: {
        marginBottom: 20
    },
    marginTop: {
        marginTop: 20
    }
});
