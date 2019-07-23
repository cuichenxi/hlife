import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {ImageBackground, RefreshControl, ScrollView, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Request from "../../utils/Request";
import ImageView from "../../components/ImageView";
import {Grid} from "antd-mobile-rn";
import TouchableView from "../../components/TouchableView";


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
            refreshing: false,
            imageList: [
                'http://115.28.21.13:8080/profile/upload/1563511765718.jpg'
            ]
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

    onComment(evaluate) {
        let param = {id: this.state.item.id,evaluate:evaluate};
        this.showLoading('评价中...')
        Request.post('/api/user/repairComment', param).then(rep => {
            if (rep.code == 0 ) {
                this.requestData();
            } else {
                this.showShort(rep.message);
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
            this.setState({refreshing: false});
        })
    }
    requestData() {
        let param = {id: this.state.item.id};
        this.showLoading()
        Request.post('/api/steward/repairInfo', param).then(rep => {
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

    // "address":"mock",                //类型：String  必有字段  备注：地址
    // "assignTime":"mock",                //类型：String  必有字段  备注：分配维修时间
    // "checkRecordId":1,                //类型：Number  必有字段  备注：巡查记录id
    // "comment":"mock",                //类型：String  必有字段  备注：评价
    // "communityName":"mock",                //类型：String  必有字段  备注：小区名称
    // "createtime":"mock",                //类型：String  必有字段  备注：提交时间
    // "endImageList": - [                //类型：Array  必有字段  备注：完成时图片
    //     "mock"                //类型：String  必有字段  备注：无
    //     ],
    // "evaluate":1,                //类型：Number  必有字段  备注：0 未评价 1不满意 2 满意
    // "evaluateTime":"mock",                //类型：String  必有字段  备注：评价时间
    // "finishTime":"mock",                //类型：String  必有字段  备注：完成时间
    // "id":1,                //类型：Number  必有字段  备注：ID
    // "imageList": - [                //类型：Array  必有字段  备注：图片
    //     "mock"                //类型：String  必有字段  备注：无
    //     ],
    // "intro":"mock",                //类型：String  必有字段  备注：描述问题
    // "limitTime":1,                //类型：Number  必有字段  备注：限制完成时间1 两小时 2 四小时 3 八小时 4 二十四小时 5四十八小时 6七十二小时
    // "memberName":"mock",                //类型：String  必有字段  备注：业主名称
    // "needpay":1,                //类型：Number  必有字段  备注：是否需要支付 0不需要 1需要
    // "orderno":"mock",                //类型：String  必有字段  备注：订单号
    // "paysn":"mock",                //类型：String  必有字段  备注：支付流水号
    // "paysn2":"mock",                //类型：String  必有字段  备注：支付流水号
    // "paytype":1,                //类型：Number  必有字段  备注：1支付宝2微信
    // "phone":"mock",                //类型：String  必有字段  备注：联系电话
    // "price":"mock",                //类型：String  必有字段  备注：支付金额
    // "processTime":"mock",                //类型：String  必有字段  备注：处理时间
    // "repairContent":"mock",                //类型：String  必有字段  备注：维修详情
    // "repairStatus":"mock",                //类型：String  必有字段  备注：1分配超时 2处理超时
    // "repairtype":1,                //类型：Number  必有字段  备注：1家居保修2小区报修3小区卫生4小区绿化 5 小区安全
    // "returnVisitContent":"mock",                //类型：String  必有字段  备注：回访内容
    // "returnVisitTime":"mock",                //类型：String  必有字段  备注：回访时间
    // "status":1,                //类型：Number  必有字段  备注：状态 1 未处理 2 正在派单 3派单完成 4已接单 5维修中 6已完成 7已评价8等待支付9支付完成10支付失败
    // "takeTime":"mock",                //类型：String  必有字段  备注：接单时间
    // "title":"mock",                //类型：String  必有字段  备注：标题
    // "type":1                //类型：Number  必有字段  备注：工单类型1业主提交 2 师傅端提交3巡查异常提交
    _render() {
        const {data} = this.state
        var statusStr = '';
        if (data.status === 1) {
            statusStr = '未处理';
        } else if (data.status === 2) {
            statusStr = '正在派单';
        } else if (data.status === 3) {
            statusStr = '派单完成';
        } else if (data.status === 4) {
            statusStr = '已接单';
        } else if (data.status === 5) {
            statusStr = '维修中';
        } else if (data.status === 6) {
            statusStr = '已完成';
        } else if (data.status === 7) {
            statusStr = '已评价';
        } else if (data.status === 8) {
            statusStr = '等待支付';
        } else if (data.status === 9) {
            statusStr = '支付完成';
        } else if (data.status === 10) {
            statusStr = '支付失败';
        }
        var repairtypeStr = '';
        if (data.repairtype === 1) {
            repairtypeStr = '家居保修';
        } else if (data.repairtype === 2) {
            repairtypeStr = '小区报修';
        } else if (data.repairtype === 3) {
            repairtypeStr = '小区卫生';
        } else if (data.repairtype === 3) {
            repairtypeStr = '小区绿化';
        } else if (data.repairtype === 3) {
            repairtypeStr = '小区安全';
        }
        var evaluateStr = '未评价';
        if (data.evaluate === 1) {
            evaluateStr = '未评价';
        } else if (data.evaluate === 2) {
            evaluateStr = '满意';
        } else if (data.evaluate === 3) {
            evaluateStr = '不满意';
        }

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
                        <View style={{flexDirection: 'row',marginTop: 10}}>
                            <Text style={{fontSize: 14, color: '#333'}}>订单状态 : </Text>
                            <Text style={{marginLeft: 5, fontSize: 14, color: '#333'}}>{statusStr}</Text>
                        </View>
                        {/*<View style={{flexDirection: 'row', marginTop: 10}}>*/}
                            {/*<Text style={{fontSize: 14, color: '#333'}}>订单编号 : </Text>*/}
                            {/*<Text style={{marginLeft: 5, fontSize: 14, color: '#333'}}>{data.orderno}</Text>*/}
                        {/*</View>*/}
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={{fontSize: 14, color: '#333'}}>工单类型 : </Text>
                            <Text style={{marginLeft: 5, fontSize: 14, color: '#333'}}>{repairtypeStr}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={{fontSize: 14, color: '#333'}}>下单时间 : </Text>
                            <Text style={{marginLeft: 5, fontSize: 14, color: '#333'}}>{data.createtime}</Text>
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
                            fontSize: 14,
                            color: '#333',
                            marginLeft: 12
                        }}>{address}</Text>
                    </View>
                    <ImageBackground style={{height: 3, width: '100%'}}
                                     source={require('../../img/bg_order_confirm.png')}></ImageBackground>
                    {data.imageList && <View style={{marginTop: 15, backgroundColor: '#fff', paddingHorizontal: 15}}>
                        {this._renderGridView(data.imageList)}
                    </View>}
                    <View style={{marginTop: 15, backgroundColor: '#fff', paddingLeft: 15}}>
                        <Text style={{fontSize: 14, color: '#333', paddingVertical: 12}}>报销报事</Text>
                        <View style={{backgroundColor: CommonStyle.lightGray, flex: 1, height: .5}}/>
                        <Text style={{fontSize: 12, color: '#666', paddingTop: 15,}}>标题 : {data.title}</Text>
                        <Text style={{fontSize: 12, color: '#666', paddingBottom: 15, marginTop: 10}}>内容 : {data.intro}</Text>
                    </View>
                    <View style={{backgroundColor: CommonStyle.lightGray, flex: 1, height: .5}}/>
                    {data.evaluate > 0&&
                    <View style={{marginTop: 1, backgroundColor: '#fff', paddingLeft: 12}}>
                        <Text style={{fontSize: 14, color: '#333', paddingVertical: 15}}>评价</Text>
                        <View style={{backgroundColor: CommonStyle.lightGray, flex: 1, height: .5}}/>
                        <Text style={{fontSize: 12, color: '#333', paddingVertical: 15,}}>{evaluateStr}</Text>
                    </View>
                    }
                </ScrollView>
                {(data.evaluate <= 1 && data.status > 6)&&
                <View style={{
                    position: CommonStyle.absolute,
                    bottom: 0,
                    height: 48,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableView style={{
                        flex: 1,
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: CommonStyle.gray,
                    }} onPress={() => {
                        this.onComment(1)
                    }}
                    ><Text style={{fontSize: 16, color: '#fff'}}>不满意</Text>
                    </TouchableView>
                    <TouchableView style={{
                        flex: 1,
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: CommonStyle.tomato,
                    }} onPress={() => {
                        this.onComment(2)
                    }}
                    >
                        <Text style={{fontSize: 16, color: '#fff'}}>满意</Text>
                    </TouchableView>
                </View>
                }
            </View>
        );
    }

    _renderGridView(imageList) {
        return (
            <Grid
                data={imageList}
                columnNum={4}
                hasLine={false}
                itemStyle={{height: 100}}
                renderItem={this._renderGridItem.bind(this)}
            />
        )
    }

    _renderGridItem(item, index) {
        return (
            <TouchableView style={{height: 100}} onPress={() => {
                // this._jumpRouter(item)
            }}>
                <View style={{flex: 1, height: 100}}>
                    <ImageView source={item} style={{width: 100, height: 100,}}
                               defaultSource={require("../../img/default_image.png")}/>
                </View>
            </TouchableView>
        );
    }

}
