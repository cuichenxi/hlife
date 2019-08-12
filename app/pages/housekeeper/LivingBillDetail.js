import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import {ImageStyle} from "../../common/ImageStyle";

let {width} = Dimensions.get('window')

export default class LivingBillDetail extends BaseComponent {
    navigationBarProps() {
        return {
            title: '账单详情',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                address: '',
                date: '',
                price: '',
                payPrice: '',
                payedPrice: '',
                cycle: '',
                unitPrice: '',
                size: '',
            },
            detailList: [],

        }
    }


    onReady(e) {
        this.setState({
            data: e.item
        })
    }


    _render() {
        const {data} = this.state
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: 10
                }}>
                    <View style={styles.titleLine}>
                        <Image source={require('../../img/bill_info.png')}
                               style={{width: 20, height: 20, resizeMode: ImageStyle.contain}}/>
                        <Text style={{
                            color: '#333',
                            padding: 3,
                            fontSize: 16
                        }}>收费信息</Text>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                    {/* <View style={styles.contentItem}>
                        <Text style={styles.contentText}>收费信息：</Text>
                        <Text style={styles.contentRightText}>{data.title}</Text>
                    </View>*/}
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>业主信息：</Text>
                        <Text style={styles.contentRightText}>{data.roomName}</Text>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>


                    <View style={{
                        flex: 1,

                    }}>

                        <View style={styles.titleLine}>

                            <Image source={require('../../img/bill_detail.png')}
                                   style={{width: 20, height: 20, resizeMode: ImageStyle.contain}}/>
                            <Text style={{
                                color: '#333',
                                padding: 3,
                                fontSize: 16
                            }}>{data.name}</Text>
                            <Text style={styles.contentRightText}>{data.startDate}~{data.endDate}</Text>

                        </View>


                        <View style={{flex: 1,}}>
                            <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                            <View style={styles.contentItem}>
                                <Text style={styles.contentText}>应交金额：</Text>
                                <Text style={styles.themeColor}>{data.shouldMoney}</Text>
                            </View>
                            <View style={styles.contentItem}>
                                <Text style={styles.contentText}>单位价格：</Text>
                                <Text style={styles.contentRightText}>{data.unitPrice}</Text>
                            </View>
                            <View style={styles.contentItem}>
                                <Text style={styles.contentText}>数量：</Text>
                                <Text style={styles.contentRightText}>{data.count}</Text>
                            </View>
                        </View>


                    </View>


                </ScrollView>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    titleLine: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff'
    },
    contentItem: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff'
    },
    contentText: {
        color: '#333',
        padding: 3,
        fontSize: 15
    },
    contentRightText: {
        color: '#666',
        padding: 3,
        fontSize: 14
    },
    themeColor: {
        color: CommonStyle.themeColor,
        padding: 3,
        fontSize: 14
    }
})
