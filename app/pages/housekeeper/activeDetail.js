import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";
import util from "../../utils/util";
import Swiper from "react-native-swiper";
import ImageView from "../../components/ImageView";
import {ThemeStyle} from "../../common/ThemeStyle";


export default class Payment extends BaseComponent {
    navigationBarProps() {
        return {
            title: '活动详情',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isOneChecked: false,
            data: {
                activityDate: '',
                activityName: '',
                activityNum: '',
                content: '',
                id: '',
                imageUrl: [],
                isJoin: '',
                persons: 0,
                status: 0,
                place: '',
                author: ''
            },
        }
    }

    /**
     imageUrl activityName activityDate activityContent activityNum id
     */
    onReady(e) {
        this.setTitle(e.activityName);
        this.requestData(e.id)
    }

    requestData(id) {
        Request.post('/api/neighbour/activityInfo', {id: id},
            {
                mock: false,
                mockId: 1095640,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState({
                    data: rep.data
                })
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            this.setState({refreshing: false});
        })

    }

    onApply() {
        this.showDLoading()
        Request.post('/api/neighbour/activityJoin', {id: this.state.data.id},
            {
                mock: false,
                mockId: 1095640,
            }).then(rep => {
            if (rep.code == 0) {
                this.goBack()
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
        })
    }

    _render() {
        const {data} = this.state
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{
                    flex: 1,
                    marginTop: 10,
                    flexDirection: 'column'
                }}>
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        {this._renderBanner()}
                        <View style={{paddingHorizontal: 15, marginTop: 15}}>
                            <Text style={{
                                fontSize: 14,
                                color: CommonStyle.textBlockColor,
                                flex: 1
                            }}>{data.activityName}</Text>
                            <Text style={{fontSize: 12, color: '#999'}}>{data.activityNum}人已参与</Text>
                        </View>
                        <Text style={{fontSize: 18, color: '#666', padding: 15}}>{data.content}</Text>

                        <View style={styles.item}>
                            <Text style={styles.text}>发起人</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#999', fontSize: 14, marginRight: 6}}>{data.author}</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.text}>活动时间</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#999', fontSize: 14, marginRight: 6}}>{data.activityDate}</Text>
                            </View>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.text}>活动地址</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#999', fontSize: 14, marginRight: 6}}>{data.place}</Text>
                            </View>
                        </View>

                    </View>

                    {this.state.data.status === 1&&this.state.data.isJoin ===0?
                        <TouchableView style={[ThemeStyle.btn_submit,{
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 20,
                        }]} onPress={() => {
                            this.onApply();
                        }}>
                            <Text style={{fontSize: 17, color: '#fff'}}>报名</Text>
                        </TouchableView> :
                        <TouchableView style={[ThemeStyle.btn_gray,{
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 20,
                        }]} onPress={() => {
                            // this.goBack();
                        }}>
                            <Text style={{fontSize: 15, color: '#fff'}}>{this.state.data.isJoin ===0?'报名已结束':'已报名'}</Text>
                        </TouchableView>
                    }

                </ScrollView>

            </View>
        );
    }

    _renderBanner() {
        if (util.isArrayEmpty(this.state.data.imageUrl)) {
            this.state.data.imageUrl = [{}];
        }
        return (
            <Swiper style={{height: 300,}} paginationStyle={{bottom: 10}}
                    dotStyle={{backgroundColor: 'rgba(200,200,200,.2)', width: 6, height: 6}}
                    activeDotStyle={{backgroundColor: 'rgba(255,255,255,.5)', width: 6, height: 6}}
                    showsButtons={false}
                    autoplay={true} showsPagination={true}>
                {this.state.data.imageUrl.map((banner, i) => {
                    return (
                        <ImageView style={{
                            height: 300, width: '100%',
                            resizeMode: Image.resizeMode.contain,
                        }} source={banner} defaultSource={require("../../img/default_image.png")}></ImageView>
                    );
                })}
            </Swiper>
        );

    }


}

const styles = StyleSheet.create(
    {
        item: {
            backgroundColor: 'white',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
        },
        itemMarginTop: {
            marginTop: 10
        },
        text: {
            textAlign: 'center', color: CommonStyle.textBlockColor, fontSize: 14
        },

    }
)
