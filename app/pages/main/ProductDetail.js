import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Swiper from "react-native-swiper";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TouchableView from "../../components/TouchableView";

let {width, height} = Dimensions.get('window')

const Font = {
    Ionicons,
    FontAwesome
}

export default class ProductDetail extends BaseComponent {
    navigationBarProps() {
        return {
            // hiddenLeftItem: true,
            title: '商品详情',
            // gesturesEnabled: false
        }
    }

    _render() {
        return (
            <View style={{flex:1,
                flexDirection: 'column'}}>
                <ScrollView style={{flex:1,
                    flexDirection: 'column'}} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />}>
                    <View>
                        <View style={{backgroundColor: '#fff'}}>
                            {/*{this._renderBanner()}*/}
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',paddingRight: 10,
                                paddingLeft: 10}}>
                                <Text>伊丽莎白雅顿绿茶女士淡香水</Text>
                                <Image source={require('../../img/share.png')}
                                       style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                            </View>
                            <View style={{flexDirection: 'row',padding: 10}}>
                                <Text>￥159</Text>
                                <Text>￥459</Text>
                                <Text>宜居甄选</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',padding:10}}>
                                <Text>快递:0.0</Text>
                                <Text>已售:1222件</Text>
                                <Text>江苏南京</Text>
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
                            <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,padding:10,backgroundColor:'#fff'}}>
                            <Image source={require('../../img/kuaidi.png')}
                                   style={{width: 50, height: 50, resizeMode: 'contain'}}/>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text>
                                    全国（除新疆偏远地区外）
                                </Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                                    <Text style={{color:CommonStyle.themeColor,borderRadius:30,borderWidth: 1,borderColor:CommonStyle.themeColor,padding:3,marginRight:10,fontSize:12}}>客服电话</Text>
                                    <Text style={{color:CommonStyle.themeColor,borderRadius:30,borderWidth: 1,borderColor:CommonStyle.themeColor,padding:3,marginLeft:10,fontSize:12}}>进入店铺</Text>
                                </View>
                            </View>

                            <Text>99.9%</Text>
                            <Text>好评率</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', marginTop: 20,
                            height: 50, alignItems: 'center', paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff'
                        }}>
                            <Text>商品评价</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text
                                    style={{color: CommonStyle.textGrayColor, fontSize: 12, marginRight: 10}}>查看全部评论</Text>
                                <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                               color="#bbb"/>
                            </View>
                        </View>

                    </View>

                </ScrollView>
                <View style={{flexDirection:'row',justifyContent: 'space-between',width:width,position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center'}}>
                    <TouchableView style={{
                        alignItems: 'center',
                        backgroundColor: CommonStyle.white,
                        justifyContent: 'center',
                        height: 40,
                        // textAlign: 'center',
                        width:width/4,

                    }} onPress={() => this.state.onButtonPress()}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../img/shopkeeper.png')}
                                   style={{width: 15, height: 15, resizeMode: 'contain'}}/>
                            <Text style={{color: CommonStyle.textGrayColor,fontSize:12}}>联系店主</Text>
                        </View>
                    </TouchableView>
                    <View style={{height:40,width:0.5,backgroundColor: CommonStyle.lineColor,}}/>
                    <TouchableView style={{
                        alignItems: 'center',
                        backgroundColor: CommonStyle.white,
                        justifyContent: 'center',
                        height: 40,
                        width:width/4,
                        // textAlign: 'center',

                    }} onPress={() => this.state.onButtonPress()}>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../img/shopping_cart.png')}
                                   style={{width: 15, height: 15, resizeMode: 'contain'}}/>
                            <Text style={{color: CommonStyle.textGrayColor,fontSize:12}}>加入购物车</Text>
                        </View>
                    </TouchableView>
                    <TouchableView style={{
                        alignItems: 'center',
                        backgroundColor: CommonStyle.themeColor,
                        justifyContent: 'center',
                        height: 40,
                        width:width/2,
                        // textAlign: 'center',
                    }} onPress={() => this.state.onButtonPress()}>
                        <Text style={{color: 'white'}}>立即购买</Text>
                    </TouchableView>
                </View>

            </View>

        )
    }

    _renderBanner() {
        return (
            <Swiper style={styles.banner} paginationStyle={{bottom: 10, left: 100}}
                    dotStyle={{backgroundColor: 'rgba(200,200,200,.2)', width: 6, height: 6}}
                    activeDotStyle={{backgroundColor: 'rgba(100,100,100,.5)', width: 6, height: 6}} showsButtons={false}
                    autoplay={true} showsPagination={true}>
                {this.state.banners.map((banner, i) => {
                    return (
                        <TouchableHighlight key={i} onPress={() => {
                            this._loadWeb(banner.title, banner.url)
                        }}>
                            <Image style={[styles.slide,]} source={{uri: banner.imagePath}}></Image>
                        </TouchableHighlight>
                    );
                })}
            </Swiper>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 68,
    },

});
