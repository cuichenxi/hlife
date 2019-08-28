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
import Ionicons from 'react-native-vector-icons/Ionicons'

const Font = {
    Ionicons,
}
export default class HouseholdServer extends BaseComponent {
    navigationBarProps() {
        return {
            title: '家政服务',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.navigation.state.params.id,
            data: {
                address:'',
                content:'',
                id:'',
                intro:'',
                phone:'',
                pic:'',
                title: '',
            }
        }
    }

    onReady() {
        this.makeRemoteRequest()
    }

    _render() {
        const {data} = this.state
        return (
            <ScrollView>
                <View>

                    <ImageView style={{height: 180, width: '100%',resizeMode: ImageStyle.contain,}}
                               defaultSource={require("../../img/default_image.png")}
                               source={data.pic}/>
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
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        height: 40,
                        backgroundColor: '#fff',
                        marginTop: 7
                    }}>
                        <Image source={require('../../img/server_intro.png')} style={{
                            width: 16,
                            height: 16, alignItems: 'center', marginLeft: 12
                        }} resizeMode='cover'/>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5}}>
                            <Text style={{
                                color: '#333',
                                padding: 3,
                                fontSize: 15
                            }}>业务简介：</Text>
                        </View>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <Text style={{
                        color: '#999',
                        fontSize: 13,
                        padding: 10,
                        width: '100%',
                        backgroundColor: '#fff'
                    }}>{data.intro}</Text>
                    {data.content!=null && <TouchableView style={{
                        paddingHorizontal: 10, height:35,  flex: 1, flexDirection: 'row',
                        alignItems: 'center', backgroundColor: '#fff',
                    }} onPress={() => {
                        this.navigate('ProductInfo', {title: '详细', htmlContent: data.content})
                    }}>
                        <Text style={{fontSize: 14, color:"#262626",flex: 1}}>查看详情</Text>
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </TouchableView>}
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        height: 40,
                        backgroundColor: '#fff',
                        marginTop: 7
                    }}>
                        <Image source={require('../../img/server_intro.png')} style={{
                            width: 16,
                            height: 16, alignItems: 'center', marginLeft: 12
                        }} resizeMode='cover'/>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5}}>
                            <Text style={{
                                color: '#333',
                                padding: 3,
                                fontSize: 15
                            }}>联系方式</Text>
                        </View>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingBottom: 5,
                        paddingTop: 5,
                        backgroundColor: '#fff'
                    }}>

                        <View style={styles.contactTypeView}>
                            <Image source={require('../../img/small_phone.png')} style={{
                                width: 13,
                                height: 13, alignItems: 'center', marginLeft: 12
                            }} resizeMode='cover'/>
                            <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5}}>
                                <Text style={styles.contactTypeText}>电话：{data.phone}</Text>
                            </View>
                        </View>
                        <View style={styles.contactTypeView}>
                            <Image source={require('../../img/icon_uc_shdz.png')} style={{
                                width: 12,
                                height: 13, alignItems: 'center', marginLeft: 12
                            }} resizeMode='cover'/>
                            <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5}}>
                                <Text style={styles.contactTypeText}>地址：{data.address}</Text>
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
        Request.post('/api/life/housekeepinginfo', param,
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
