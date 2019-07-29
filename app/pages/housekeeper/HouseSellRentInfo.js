import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Image, Linking, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Modal from "antd-mobile-rn/es/modal/index.native";
import TouchableView from "../../components/TouchableView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import ImageView from "../../components/ImageView";
import {ImageStyle} from "../../common/ImageStyle";
import util from "../../utils/util";
import Swiper from "react-native-swiper";

export default class HouseSellRentInfo extends BaseComponent {
    navigationBarProps() {
        return {
            title: '房屋详情',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.navigation.state.params.id,
            index:this.props.navigation.state.params.index,
            data: {
                address:'',
                content:'',
                id:'',
                intro:'',
                phone:'',
                pic:'',
                title: '',
                communityName:'',
                square:'',
                imageList:[]
            }
        }
    }

    onReady() {
        this.makeRemoteRequest()
    }

    _render() {
        const {data,index} = this.state
        return (
            <ScrollView>
                <View>

                    {this._renderBanner()}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        height: 60,
                        backgroundColor: '#fff'
                    }}>

                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 15}}>
                            <Text style={{
                                color: '#333',
                                padding: 3,
                                fontSize: 15
                            }}>{data.title}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',height:70,backgroundColor:'#fff',marginTop:10, justifyContent: 'flex-start'}}>
                        <View style={{flex: 2, marginLeft: 20}}>
                            <Text style={{fontSize: 15, color: '#333'}}>{index == 0?'售价：':'租金：'}</Text>
                            <Text style={{color: CommonStyle.themeColor}}></Text>
                        </View>
                        <View style={{flex: 0.01, height: 70, width: 0.5, backgroundColor: CommonStyle.lightGray}}/>
                        <View style={{flex: 2, marginLeft: 20}}>
                            <Text style={{fontSize: 15, color: '#333'}}>房型：</Text>
                            <Text style={{color: CommonStyle.themeColor}}>{data.bedroom}室{data.livingRoom}厅{data.restRoom}卫</Text>
                        </View>
                        <View style={{flex: 0.01, height: 70, width: 0.5, backgroundColor: CommonStyle.lightGray}}/>
                        <View style={{flex: 2, marginLeft: 20}}>
                            <Text style={{fontSize: 15, color: '#333'}}>建筑面积：</Text>
                            <Text style={{color: CommonStyle.themeColor}}>{data.square}平米</Text>
                        </View>
                    </View>

                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        height: 40,
                        backgroundColor: '#fff',
                        marginTop: 7
                    }}>
                        <Image source={require('../../img/icon_lianxi.png')} style={{
                            width: 16,
                            height: 16, alignItems: 'center', marginLeft: 12
                        }} resizeMode='cover'/>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5}}>
                            <Text style={{
                                color: '#333',
                                padding: 3,
                                fontSize: 15
                            }}>联系方式：</Text>
                        </View>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingBottom: 35,
                        paddingTop: 5,
                        backgroundColor: '#fff'
                    }}>

                        <View style={styles.contactTypeView}>
                            <Image source={require('../../img/icon_shouji.png')} style={{
                                width: 13.5,
                                height: 18.5, alignItems: 'center', marginLeft: 12,resizeMode:ImageStyle.contain
                            }} resizeMode='cover'/>
                            <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5}}>
                                <Text style={styles.contactTypeText}>手机：{data.phone}</Text>
                            </View>
                        </View>
                        <View style={styles.contactTypeView}>
                            <Image source={require('../../img/icon_dizhi.png')} style={{
                                width: 14,
                                height: 13, alignItems: 'center', marginLeft: 12
                            }} resizeMode='cover'/>
                            <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5}}>
                                <Text style={styles.contactTypeText}>地址：{data.communityName}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <TouchableView onPress={() => {
                        this.onButtonClick(data.phone)
                    }}>
                        <View style={{
                            height: 40,
                            marginLeft: 30,
                            marginRight: 30,
                            marginTop: 20,
                            borderRadius: 30,
                            backgroundColor: CommonStyle.themeColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Image source={require('../../img/call_phone.png')} style={{
                                width: 18,
                                height: 18, alignItems: 'center', marginRight: 16
                            }} resizeMode='cover'/>
                            <Text style={{color: '#ffffff', fontSize: 14}}>一键拨号</Text>
                        </View>
                    </TouchableView>
                </View>
            </ScrollView>
        );
    }

    makeRemoteRequest() {
        let param = {id: this.state.id};

        console.log(this.props)
        Request.post('/api/steward/housingDetail', param,
            {
                mock: false,
                mockId: 1095356,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                // callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
                console.log('======')
                console.log(rep.data)
                this.setState({
                    data:rep.data
                })
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    onButtonClick = (phone) => {
        Modal.alert('提示', '是否拨打电话', [
            {
                text: '取消', onPress: () => {
                    console.log('cancel')
                }, style: 'cancel'
            },
            {
                text: '确定', onPress: () => {
                    console.log('ok')
                    Linking.openURL(`tel:${phone}`)
                }
            },
        ]);
    };

    _renderBanner() {
        if (util.isArrayEmpty(this.state.data.imageList)) {
            this.state.data.imageList = [{}];
        }
        return (
            <Swiper style={{height: 150,}} paginationStyle={{bottom: 10}}
                    dotStyle={{backgroundColor: 'rgba(200,200,200,.2)', width: 6, height: 6}}
                    activeDotStyle={{backgroundColor: 'rgba(255,255,255,.5)', width: 6, height: 6}}
                    showsButtons={false}
                    autoplay={true} showsPagination={true}>
                {this.state.data.imageList.map((banner, i) => {
                    return (
                        <ImageView style={{
                            height: 150, width: '100%',
                            resizeMode: ImageStyle.contain,
                        }} source={banner} defaultSource={require("../../img/default_image.png")}/>
                    );
                })}
            </Swiper>
        );

    }
}

const styles = StyleSheet.create({
    contactTypeView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 20,
        backgroundColor: '#fff',
        width: '100%'
    },
    contactTypeText: {
        color: '#333',
        padding: 3,
        fontSize: 13
    }
})
