import React from 'react'
import {Text, View} from 'react-native'
import {BaseComponent} from "../../components/base/BaseComponent";
import {CommonStyle} from "../../common/CommonStyle";


export default class UserCenter extends BaseComponent {
    navigationBarProps() {
        return {
            title: '设备信息',
        }
    }

    // 设备名称 安装位置 最后巡查时间 巡查人 巡查项目 电梯灯 电梯监控
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
            topData: [
                {
                    title: '设备名称',
                    content: '3#xxx'
                }, {
                    title: '设备名称',
                    content: '3#xxx'
                }
            ], checkData: [
                {
                    title: '电梯灯',
                    isOk: true
                }, {
                    title: '电梯监控',
                    isOk: false
                }
            ]
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