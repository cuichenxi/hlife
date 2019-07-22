import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {ImageBackground, RefreshControl, ScrollView, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Request from "../../utils/Request";
import ImageView from "../../components/ImageView";


export default class RepairOrderDetail extends BaseComponent {
    navigationBarProps() {
        return {
            title: '工单详情',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            data: {},
            refreshing: false
        }
    }

    // "communityName": "药都蓝湾",
    // "content": "哈哈",
    // "createTime": "2019-07-15 15:06:07",
    // "id": 2,
    // "memberName": "Tracy",
    // "reply": null,
    // "replyTime": null,
    // "status": 0
    onReady(e) {
        this.setState({
            item: e,
        }, () => {
            this.requestData();
        });
    }

    requestData() {
        let param = {id: this.state.item.id};
        this.showLoading()
        Request.post('/api/steward/complaintpraiseInfo', param).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState({
                    data: rep.data
                })
            } else {
                this.showShort(rep.message);
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
            this.setState({refreshing: false});
        })
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.requestData();
    }

    // "communityName": "药都蓝湾",
    // "content": "哈哈",
    // "createTime": "2019-07-15 15:06:07",
    // "id": 2,
    // "memberName": "Tracy",
    // "reply": null,
    // "replyTime": null,
    // "status": 0
    _render() {
        const {data} = this.state
        var statusStr = data.status === 0 ? '处理中' : '已处理';
        var address = data.communityName + '\r\n' + data.memberName;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{
                    flex: 1,
                }} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />}>
                    <View style={{
                        marginTop: 10, paddingHorizontal: 15, paddingVertical: 12,
                        backgroundColor: '#fff'
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 14, color: '#333'}}>订单状态 : </Text>
                            <Text style={{marginLeft: 5, fontSize: 14, color: '#333'}}>{statusStr}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={{fontSize: 14, color: '#333'}}>下单时间 : </Text>
                            <Text style={{marginLeft: 5, fontSize: 14, color: '#333'}}>{data.createTime}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        height: 58,
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        marginTop: 12,
                        alignItems: 'center'
                    }}>
                        <ImageView style={{height: 22, width: 22}}
                                   defaultSource={require('../../img/icon_address_order.png')}/>
                        <Text style={{
                            flex: 1,
                            fontSize: 15,
                            color: '#333',
                            marginLeft: 12
                        }}>{address}</Text>
                    </View>
                    <ImageBackground style={{height: 3, width: '100%'}}
                                     source={require('../../img/bg_order_confirm.png')}></ImageBackground>

                    <View style={{marginTop: 15, backgroundColor: '#fff', paddingLeft: 15}}>
                        <Text style={{fontSize: 16, color: '#333', paddingVertical:15}}>投诉表扬</Text>
                        <View style={{backgroundColor: CommonStyle.lightGray, flex: 1, height: .5}}/>
                        <Text style={{fontSize: 16, color: '#333', paddingVertical: 15,}}>{data.content}</Text>
                    </View>
                    <View style={{marginTop: 15, backgroundColor: '#fff', paddingLeft: 15}}>
                        <Text style={{fontSize: 16, color: '#333', paddingVertical:15}}>处理反馈</Text>
                        <View style={{backgroundColor:CommonStyle.lightGray,flex:1, height: .5}}/>
                        <Text style={{
                            fontSize: 16,
                            color: '#333',
                            paddingVertical: 15,
                        }}>{data.reply ? data.reply : '暂无'}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

}
