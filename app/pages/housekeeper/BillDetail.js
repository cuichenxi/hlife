import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Request from "../../utils/Request";

let {width, height} = Dimensions.get('window')

export default class BillDetail extends BaseComponent {
    navigationBarProps() {
        return {
            title: '账单详情',
        }
    }

    constructor(props) {
        super(props);
        this.state={
            data:{
                title:'',
                address:'',
                date:'',
                price:'',
                payPrice:'',
                payedPrice:'',
                cycle:'',
                unitPrice:'',
                size:'',
            }
        }
    }

    componentWillMount(){
        this.makeRemoteRequest()
    }


    _render() {
        const {data} = this.state
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width,marginTop:5}}/>
                    <View style={styles.titleLine}>
                        <Image source={require('../../img/bill_info.png')}
                               style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                        <Text style={{
                            color: '#333',
                            padding: 3,
                            fontSize: 16
                        }}>收费信息</Text>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>收费信息：</Text>
                        <Text style={styles.contentRightText}>{data.title}</Text>
                    </View>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>收费地址：</Text>
                        <Text style={styles.contentRightText}>{data.address}</Text>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                    <View style={styles.titleLine}>


                        <Image source={require('../../img/bill_detail.png')}
                               style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                        <Text style={{
                            color: '#333',
                            padding: 3,
                            fontSize: 16
                        }}>收费详情</Text>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                    <View style={styles.contentItem}>


                        <Text style={styles.contentText}>账单月份：</Text>
                        <Text style={styles.contentRightText}>{data.date}</Text>
                    </View>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>账单金额：</Text>
                        <Text style={styles.themeColor}>{data.price}</Text>
                    </View>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>已交金额：</Text>
                        <Text style={styles.themeColor}>{data.payedPrice}</Text>
                    </View>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>本次应收：</Text>
                        <Text style={styles.contentRightText}>{data.payPrice}</Text>
                    </View>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>计费周期：</Text>
                        <Text style={styles.contentRightText}>{data.cycle}</Text>
                    </View>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>单位价格：</Text>
                        <Text style={styles.contentRightText}>{data.unitPrice}</Text>
                    </View>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>面积：</Text>
                        <Text style={styles.contentRightText}>{data.size}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    makeRemoteRequest(id) {
        let param = {statusBODY: this.state.index, id: id};

        Request.post('api/steward/propertyfeeinfo', param,
            {
                mock: true,
                mockId: 1095672,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                this.setState({
                    data:rep.data
                })
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
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
        color:CommonStyle.themeColor,
        padding: 3,
        fontSize: 14
    }
})
