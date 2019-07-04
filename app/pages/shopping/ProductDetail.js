import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Swiper from "react-native-swiper";
import Ionicons from "react-native-vector-icons/Ionicons";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";
import {PAY_FROM_CREATE_ORDER, PAY_FROM_ORDER_DETAIL} from "../../constants/ActionTypes";
import LoadingView from "../../components/LoadingView";
import Loading from "../../components/Loading";
import LinearGradient from "react-native-linear-gradient";
import ImageView from "../../components/ImageView";
import util from "../../utils/util";

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
            leaveMessage: null,
            goodId: null,
            num: 0,
            redPacketId: 0,
            addressId: 1,
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
        Request.post('/api/goods/detail', param,
            {
                mock: false,
                mockId: 1095374,
            }).then(rep => {
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
        this.navigate('OrderConfirm', {id: '', from: PAY_FROM_CREATE_ORDER})
    }

    render() {
        const that = this;
        return (
            <View style={[styles.baseContainer]}>
                {that.state.inSideLoading ? <LoadingView loadingtext={that.state.loadingText}/> : this._render()}
                {that.state.hideHeader ? null :
                    <View style={{
                    position: CommonStyle.absolute,width:'100%'
                }}>{this.renderNavigationBar()}</View>}
                {that.state.isLoading ?
                    <Loading loadProps={{visible: that.state.isLoading, loadingText: that.state.loadingText}}/> : null}
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
                          this.showLong('已加入购物')
                    }}>
                            <Text style={{color: '#fff', fontSize: 15}}>加入购物车</Text>
                    </TouchableView>
                    <TouchableView style={{ alignItems: 'center',
                        backgroundColor: CommonStyle.themeColor,
                        justifyContent: 'center',
                        height: 48,
                        flex: 1.5}} onPress={() => this.onSubmit()}>
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
