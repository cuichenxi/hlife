import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Request from "../../utils/Request";
import {PAGE_SIZE} from "../../constants/AppConstants";
import TouchableView from "../../components/TouchableView";

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
            },
            detailList:[]
        }
    }


    onReady(e){
        this.makeRemoteRequest(e.id)
    }


    _render() {
        const {data,detailList} = this.state
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop:10
                }}>
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
                   {/* <View style={styles.contentItem}>
                        <Text style={styles.contentText}>收费信息：</Text>
                        <Text style={styles.contentRightText}>{data.title}</Text>
                    </View>*/}
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>收费地址：</Text>
                        <Text style={styles.contentRightText}>{data.address}</Text>
                    </View>

                    <FlatList ref={(flatList) => this._flatList = flatList}
                              ItemSeparatorComponent={this._separator}
                        // renderItem={this._renderItem.bind(this)}
                              refreshing={false}
                              style={{flex: 1,marginTop:10}}
                              keyExtractor={this._keyExtractor}
                              onEndReachedThreshold={0.1}
                              renderItem={this._renderItem}
                              data={detailList}>

                    </FlatList>


                </ScrollView>
            </View>
        );
    }

    _keyExtractor = (item, index) => {
        return '' + index
    }

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray}}/>;
    }

    makeRemoteRequest(id,page=1) {
        let param = {page: page - 1, pageSize: PAGE_SIZE, id: id};

        this.showDLoading()
        Request.post('/api/fee/feeInfo', param,
            {
                mock: false,
                mockId: 1095672,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {

                var datas = []
                for (var row of rep.data.detailList) {
                    row.isShow = false
                    datas.push(row)
                }

                this.setState({
                    data:rep.data,
                    detailList:datas
                })
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
    }


    _renderItem = (data) => {
        var isShow = data.item.isShow
        return (
            <View style={{
                flex:1
            }}>

                <TouchableView style={styles.titleLine} onPress={()=>{
                    var datas = this.state.detailList;
                    datas[data.index].isShow = !data.item.isShow

                    this.setState({
                        detailList:datas
                    })
                }}>

                    <Image source={require('../../img/bill_detail.png')}
                           style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                    <Text style={{
                        color: '#333',
                        padding: 3,
                        fontSize: 16
                    }}>{data.item.yearmonth+data.item.chargeSettingName}</Text>
                    <Text style={styles.contentRightText}>{data.item.startDate.substring(0, 10)}~{data.item.endDate.substring(0, 10)}</Text>

                </TouchableView>
                <View style={{flex:1,height:data.item.isShow?'100%':0}}>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                    {/*<View style={styles.contentItem}>
                        <Text style={styles.contentText}>收费名目：</Text>
                        <Text style={styles.contentRightText}>{data.item.chargeSettingName}</Text>
                    </View>*/}
                    {/*<View style={styles.contentItem}>


                        <Text style={styles.contentText}>账单月份：</Text>
                        <Text style={styles.contentRightText}>{data.item.yearmonth}</Text>
                    </View>*/}
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>账单金额：</Text>
                        <Text style={styles.themeColor}></Text>
                    </View>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>已交金额：</Text>
                        <Text style={styles.themeColor}></Text>
                    </View>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>本次应收：</Text>
                        <Text style={styles.contentRightText}>{data.item.shouldMoney}</Text>
                    </View>
                    {/*<View style={styles.contentItem}>
                        <Text style={styles.contentText}>计费周期：</Text>
                        <Text style={styles.contentRightText}>{data.item.startDate.substring(0, 10)}~{data.item.endDate.substring(0, 10)}</Text>
                    </View>*/}
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>单位价格：</Text>
                        <Text style={styles.contentRightText}>{data.item.unitPrice}</Text>
                    </View>
                    <View style={styles.contentItem}>
                        <Text style={styles.contentText}>面积：</Text>
                        <Text style={styles.contentRightText}></Text>
                    </View>
                </View>


            </View>

        )
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
