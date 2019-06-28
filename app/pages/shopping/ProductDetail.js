import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Swiper from "react-native-swiper";
import Ionicons from "react-native-vector-icons/Ionicons";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";

let {width, height} = Dimensions.get('window')


export default class ProductDetail extends BaseComponent {
    navigationBarProps() {
        return {
            title: '商品详情',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            headerUrl:'',
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
        let param = { id: e.id};
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
        })
    }
    onSubmit(){
        let param = {
            addressId: this.state.addressId,
            leaveMessage: this.state.leaveMessage,
            orderDetailList:[
                {
                    goodId: this.state.goodId,
                    num: this.state.num
                }
            ],
            redPacketId: this.state.redPacketId
        };
        Request.post('/api/goods/createOrder', param,
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
        })
    }

    _render() {
        const {data} = this.state
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <ScrollView style={{
                    flex: 1,
                    height: 1000,
                    flexDirection: 'column'
                }} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />}>
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        {this._renderBanner()}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10
                        }}>
                            <Text>{data !== null ? data.goodsName : ''}</Text>
                            <Image source={require('../../img/share.png')}
                                   style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                        </View>
                        <View style={{flexDirection: 'row', padding: 10}}>
                            <Text>{data !== null ? data.goodsPrice : ''}</Text>
                            <Text>{data !== null ? data.marketPrice : ''}</Text>
                            <Text>宜居甄选</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10
                        }}>
                            <Text>快递:0.0</Text>
                            <Text>已售:{data !== null ? data.sellNum : ''}</Text>
                            <Text>{data !== null ? data.sendSite : ''}</Text>
                        </View>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        height: 50,
                        paddingRight: 10,
                        paddingLeft: 10
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={require('../../img/check.png')}
                                   style={{width: 15, height: 15, resizeMode: 'contain'}}/>
                            <Text style={{fontSize: 11}}>每次限购:0.0</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={require('../../img/check.png')}
                                   style={{width: 15, height: 15, resizeMode: 'contain'}}/>
                            <Text style={{fontSize: 11}}>全场包邮</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={require('../../img/check.png')}
                                   style={{width: 15, height: 15, resizeMode: 'contain'}}/>
                            <Text style={{fontSize: 11}}>支持开局电子发票</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={require('../../img/check.png')}
                                   style={{width: 15, height: 15, resizeMode: 'contain'}}/>
                            <Text style={{fontSize: 11}}>支持快递配送</Text>
                        </View>

                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', marginTop: 20,
                        height: 50, alignItems: 'center', paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff'
                    }}>
                        <Text>数据参数</Text>
                        <Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        padding: 10,
                        backgroundColor: '#fff'
                    }}>
                        <Image source={require('../../img/kuaidi.png')}
                               style={{width: 50, height: 50, resizeMode: 'contain'}}/>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text>
                                全国（除新疆偏远地区外）
                            </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                <Text style={{
                                    color: CommonStyle.themeColor,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: CommonStyle.themeColor,
                                    padding: 3,
                                    marginRight: 15,
                                    fontSize: 10
                                }}>客服电话</Text>
                                <Text style={{
                                    color: CommonStyle.themeColor,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: CommonStyle.themeColor,
                                    padding: 3,
                                    marginLeft: 15,
                                    fontSize: 10
                                }}>进入店铺</Text>
                            </View>
                        </View>

                        <Text style={{fontSize: 13, color: CommonStyle.red}}>99.9%</Text>
                        <Text style={{fontSize: 10, color: CommonStyle.textGrayColor}}>好评率</Text>
                    </View>


                    <Image style={[styles.slide, styles.marginBottom,styles.marginTop]}
                           source={{uri: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png'}}></Image>

                    <View style={{height: 30}}></View>
                </ScrollView>
                <View style={styles.bottomView}>
                    <TouchableView style={styles.bottomLeftBt} onPress={() => this.state.onButtonPress()}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../../img/shopkeeper.png')}
                                   style={styles.bottomIcon}/>
                            <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>联系店主</Text>
                        </View>
                    </TouchableView>
                    <View style={{height: 40, width: 0.5, backgroundColor: CommonStyle.lineColor,}}/>
                    <TouchableView style={styles.bottomLeftBt} onPress={() => {this.navigate('ShoppingCart')}}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../../img/shopping_cart.png')}
                                   style={styles.bottomIcon}/>
                            <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>加入购物车</Text>
                        </View>
                    </TouchableView>
                    <TouchableView style={{
                        alignItems: 'center',
                        backgroundColor: CommonStyle.themeColor,
                        justifyContent: 'center',
                        height: 40,
                        width: width / 2,
                    }} onPress={() => this.onSubmit()}>
                        <Text style={{color: 'white'}}>立即购买</Text>
                    </TouchableView>
                </View>

            </View>

        )
    }

    _renderBanner() {
        if (this.state.data !== null) {
            this.state.data.imageList.push('https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png')
            this.state.data.imageList.push('https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png')
            return (
                <Swiper style={styles.banner} paginationStyle={{bottom: 10, left: 100}}
                        dotStyle={{backgroundColor: 'rgba(200,200,200,.2)', width: 6, height: 6}}
                        activeDotStyle={{backgroundColor: 'rgba(100,100,100,.5)', width: 6, height: 6}}
                        showsButtons={false}
                        autoplay={true} showsPagination={true}>
                    {this.state.data.imageList.map((banner, i) => {
                        return (
                            <TouchableHighlight key={i}>
                                <Image style={[styles.slide,]} source={{uri: banner}}></Image>
                            </TouchableHighlight>
                        );
                    })}
                </Swiper>
            );
        }

    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 68,
    },
    banner: {height: 180,},
    slide: {
        height: 180,
        resizeMode: Image.resizeMode.stretch,
    },
    bottomIcon: {
        width: 15, height: 15, resizeMode: 'contain'
    },
    bottomView: {
        flexDirection: 'row', justifyContent: 'space-between', width: width, position: 'absolute',
        bottom: 0,
        height: 40,
        alignSelf: 'center'
    }
    ,
    bottomLeftBt: {
        alignItems: 'center',
        backgroundColor: CommonStyle.white,
        justifyContent: 'center',
        height: 40,
        width: width / 4,
    },
    marginBottom: {
        marginBottom: 20
    },
    marginTop:{
        marginTop:20
    }
});
