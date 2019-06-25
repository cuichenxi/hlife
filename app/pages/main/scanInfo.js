import React from 'react'
import {Text, View} from 'react-native'
import {BaseComponent} from "../../components/base/BaseComponent";
import {CommonStyle} from "../../common/CommonStyle";
import Request from "../../utils/Request";

// 检查时间 小区名称 设备安装位置 设备名称 巡查人
// "checkTime":"mock",                //类型：String  必有字段  备注：检查时间
// "communityName":"mock",                //类型：String  必有字段  备注：小区名称
// "content":"mock",                //类型：String  必有字段  备注：设备详情
// "imageList": - [                //类型：Array  必有字段  备注：设备巡查图片
//     "mock"                //类型：String  必有字段  备注：无
//     ],
// "itemsList": - [                //类型：Array  必有字段  备注：巡查项目结果
//     - {                //类型：Object  必有字段  备注：无
//         "chooseValue":1,                //类型：Number  必有字段  备注：巡查结果(是否正常 0:否,1:是)
//         "name":"mock"                //类型：String  必有字段  备注：巡查备注
//     }
//     ],
// "photo":"mock",                //类型：String  必有字段  备注：设备图片
// "position":"mock",                //类型：String  必有字段  备注：设备安装位置
// "remark":"mock",                //类型：String  必有字段  备注：巡查备注
// "title":"mock",                //类型：String  必有字段  备注：设备名称
// "workerId":1,                //类型：Number  必有字段  备注：巡查人ID
// "workerName":"mock"                //类型：String  必有字段  备注：巡查人姓名
// 设备名称 安装位置 最后巡查时间 巡查人 巡查项目 电梯灯 电梯监控
// "itemsList": - [                //类型：Array  必有字段  备注：巡查项目结果
//     - {                //类型：Object  必有字段  备注：无
//         "chooseValue":1,                //类型：Number  必有字段  备注：巡查结果(是否正常 0:否,1:是)
//         "name":"mock"                //类型：String  必有字段  备注：巡查备注
//     }
//     ],
export default class UserCenter extends BaseComponent {
    navigationBarProps() {
        return {
            title: '设备信息',
        }
    }

    getScanData(serialNum) {
        this.showDLoading()
        Request.post('/api/home/scan', {serialnum: serialNum},
            {
                mock: false,
                mockId: 673062,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setData(rep.data)
            }else {
                this.showShort(rep.message)
            }
        }).catch(err => {
        }).done(() => {
            this.hideLoading()
        })
    }

    onReady(e) {
        this.getScanData(e.serialNum);
    }

    setData(e) {
        if (!e) {
            return
        }
        let _topData = [{
            title: '设备名称',
            content: e.title
        }, {
            title: '小区名称',
            content: e.communityName
        }, {
            title: '设备安装位置',
            content: e.position
        }, {
            title: '设备名称',
            content: e.title
        }, {
            title: '巡查人',
            content: e.workerName
        }, {
            title: '最后检查时间',
            content: e.checkTime
        }];
        this.setState(
            {
                topData: _topData
            }
        )
        if (e.itemsList) {
            let _checkData = [];
            e.itemsList.map = (item, index) => {
                _checkData.push({
                    title: item.name,
                    isOk: item.chooseValue == 1
                })
            }
            this.setState(
                {
                    checkData: _checkData
                }
            )
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
            topData: [], checkData: []
        }
    }

    _render() {
        return (
            <View style={{flex: 1, marginTop: 10}}>
                {this.renderTop()}
                <View style={{
                    marginTop: 10,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 15,
                    marginHorizontal: 15
                }}>
                    <Text style={{fontSize: 16, color: CommonStyle.themeColor, marginBottom: 15}}>巡查项目</Text>
                    {this.renderCheck()}
                </View>
            </View>
        )
    }

    renderCheck() {
        return this.state.checkData.map((item, i) => {
            return (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                }}>
                    <Text style={{fontSize: 16, color: '#333'}}>{item.title}</Text>
                    {item.isOk ?
                        <Text style={{fontSize: 16, color: CommonStyle.green}}>正常</Text> :
                        <Text style={{fontSize: 16, color: CommonStyle.red}}>不正常</Text>
                    }
                </View>
            );
        })
    }

    renderTop() {
        return this.state.topData.map((item, i) => {
            return (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 5, paddingHorizontal: 15, backgroundColor: '#fff'
                }}>
                    <Text style={{fontSize: 16, color: '#333'}}>{item.title}</Text>
                    <Text style={{fontSize: 16, color: '#666'}}>{item.content}</Text>
                </View>
            );
        })
    }
}