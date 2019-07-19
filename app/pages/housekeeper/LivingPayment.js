import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TouchableView from "../../components/TouchableView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import CheckBox from "../../components/Checkbox";
import List from "antd-mobile-rn/es/list/index.native";
import DatePicker from "antd-mobile-rn/es/date-picker/index.native";
import util from "../../utils/util";
import {ORDER_TYPE_JF, PAY_FROM_JF} from "../../constants/ActionTypes";

let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}
/**
 * 物业缴费
 */
export default class LivingPayment extends BaseComponent {
    navigationBarProps() {
        return {
            title: '物业缴费'
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isAllChecked: false,
            communityinfo: '',
            isLoading: false,
            rows: [],
            items: 0,
            totalPrice: 0,
            defaultColor: CommonStyle.drakGray,
            enabledBt: false,
            endDate: undefined,
            endDatetime: '',
            startDate: undefined,
            checkedItems:[]
        }
    }

    onReady() {

    }

    refreshing = () => {

    }

    _render() {
        const {communityinfo, rows, items, totalPrice, defaultColor, enabledBt, endDate,checkedItems} = this.state
        if (endDate){
            return (
                <View style={styles.container}>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        height: 40,
                        width: width,
                        flexDirection: 'row',
                        paddingLeft: 5,
                        paddingRight: 5
                    }}>
                        <Text
                            style={{color: CommonStyle.textBlockColor, fontSize: 15, paddingLeft: 5}}>{communityinfo}</Text>
                    </View>
                    <ScrollView style={{
                        flex: 1,
                        // height: 1000,
                        flexDirection: 'column',
                        marginBottom:60
                    }} >

                        <FlatList ref={(flatList) => this._flatList = flatList}
                                  ItemSeparatorComponent={this._separator}
                                  renderItem={this._renderItem}
                                  ListEmptyComponent={this._createEmptyView}
                                  onRefresh={() => this.refreshing()}
                                  refreshing={this.state.isLoading}
                                  onEndReachedThreshold={0.1}
                                  data={rows}>

                        </FlatList>
                    </ScrollView>

                    <View style={styles.bottomView}>
                        <TouchableView style={[styles.bottomLeftBt, styles.bottomRow]} onPress={() => {

                        }}>
                            <CheckBox
                                style={styles.checkBox}
                                onClick={() => {
                                    var datas = rows
                                    if (datas.length == 0) {
                                        return
                                    }
                                    var totalPrice = 0
                                    var checkedItems=[]

                                    for (var data of datas) {
                                        if (!this.state.isAllChecked) {
                                            data.checked = true
                                        } else {
                                            data.checked = false
                                        }
                                        totalPrice = data.fee + totalPrice
                                        checkedItems = checkedItems.push(data.fee)

                                    }
                                    if (!this.state.isAllChecked) {
                                        this.setState({
                                            rows: datas,
                                            isAllChecked: !this.state.isAllChecked,
                                            items: datas.length,
                                            totalPrice: totalPrice,
                                            defaultColor: CommonStyle.themeColor,
                                            enabledBt: true,
                                            checkedItems:checkedItems
                                        })
                                    } else {
                                        this.setState({
                                            rows: datas,
                                            isAllChecked: !this.state.isAllChecked,
                                            items: 0,
                                            totalPrice: 0,
                                            defaultColor: CommonStyle.drakGray,
                                            enabledBt: false,
                                            checkedItems:[]
                                        })
                                    }

                                }}
                                isChecked={this.state.isAllChecked}
                                rightText={'全选'}
                                rightTextStyle={styles.text}
                                checkedImage={<Image source={require('../../img/icon_buy_select.png')}
                                                     style={styles.image}/>}
                                unCheckedImage={<Image source={require('../../img/icon_buy_unselect.png')}
                                                       style={styles.image}/>}
                            />
                            <Text style={{fontSize: 14, color: '#333'}}>全选</Text>
                        </TouchableView>
                        <View style={{height: 50, width: 0.5, backgroundColor: CommonStyle.lineColor,}}/>
                        <TouchableView style={[styles.bottomLeftBt, styles.centerBottomRow]} onPress={() => {
                            this.onSubmit()
                        }}>
                            <View style={{justifyContent: 'center', alignItems: 'flex-end',}}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Text style={{color: '#333', fontSize: 12, marginBottom: 2}}>共计:￥</Text>
                                    <Text style={{color: '#FF3633', fontSize: 20}}>{totalPrice}</Text>
                                </View>
                                <Text style={{color: '#666666', fontSize: 11}}>已选{items}项</Text>
                            </View>
                        </TouchableView>
                        <TouchableView style={{
                            alignItems: 'center',
                            backgroundColor: defaultColor,
                            justifyContent: 'center',
                            height: 50,
                            width: width / 3,
                        }} onPress={() => {
                            if (enabledBt) {
                                //
                                this.showShort('去缴费')
                            } else {
                                this.showShort('请至少选择一个交费项')
                            }
                        }}>
                            <Text style={{color: 'white', fontSize: 16}}>去缴费</Text>
                        </TouchableView>
                    </View>
                </View>
            );

        } else {
            return(
                <DatePicker
                    title={'截至日期'}
                    value={this.state.endDate}
                    mode="date"
                    minDate={new Date()}
                    maxDate={new Date(2026, 11, 3)}
                    onChange={this.onChange}
                    format="YYYY-MM-DD"
                    extra=' '
                    style={{marginTop: 10}}
                    onOk={() => {
                        console.log('====onOk====')
                        this.props.extra = ' '
                    }}
                    itemStyle={{alignItems: 'center', justifyContent: 'center'}}
                >
                    <List.Item arrow="horizontal" extra={' '}><Text>请选择缴费截至日期</Text></List.Item>
                </DatePicker>
            )
        }

    }

    onChange = (value) => {
        console.log(value)

        this.setState(
            {
                endDatetime: this.dateToString(value),
                endDate: value
            }
        )
        this.makeRemoteRequest(1,this.dateToString(value))


    }

    dateToString(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString();
        var day = (date.getDate()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        var dateTime = year + "-" + month + "-" + day;
        console.log(dateTime)
        return dateTime;
    }

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray}}/>;
    }

    /**
     * 空布局
     */
    _createEmptyView() {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    空空如也 ~
                </Text>
            </View>
        );
    }

    makeRemoteRequest(page= 1,endDatetime) {
        let param = {
            page: page - 1,
            pageSize: PAGE_SIZE,
            endDate: endDatetime,
            startDate: this.dateToString(new Date())
        };

        Request.post('/api/fee/totallist', param,
            {
                mock: false,
                mockId: 1125376,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                var datas = []
                for (var row of rep.data) {
                    row.checked = false
                    datas.push(row)
                }
                this.setState({
                    rows: datas,
                    communityinfo: rep.data.communityinfo
                })
                // callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    _renderItem = (item) => {
        return (
            <View style={{
                backgroundColor: 'white',
                height: 80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
                paddingLeft: 24,
                paddingRight: 30,
            }}>
                <CheckBox
                    style={styles.checkBox}
                    onClick={() => {
                        var datas = this.state.rows
                        datas[item.index].checked = !item.item.checked
                        var defaultColor = CommonStyle.drakGray
                        var enabledBt = false
                        var isAllChecked = false
                        var isSomeState = false

                        for (var data of datas) {
                            if (data.checked) {
                                defaultColor = CommonStyle.themeColor
                                enabledBt = true

                            }
                        }
                        for (var i = 0; i < datas.length; i++) {
                            console.log(datas[i].checked)
                            if (datas[0].checked !== datas[i].checked) {
                                isSomeState = false
                                isAllChecked = false
                            } else if (datas[0].checked === datas[i].checked) {
                                if (datas[0].checked) {
                                    isAllChecked = true
                                } else {
                                    isAllChecked = false
                                }
                                isSomeState = true
                            }
                        }

                        if (datas[item.index].checked) {
                            this.setState({
                                items: ++this.state.items,
                                rows: datas,
                                totalPrice: item.item.fee + this.state.totalPrice,
                                defaultColor: defaultColor,
                                enabledBt: enabledBt,
                                isAllChecked: isAllChecked
                            })
                        } else {
                            this.setState({
                                items: --this.state.items,
                                rows: datas,
                                totalPrice: this.state.totalPrice - item.item.fee,
                                defaultColor: defaultColor,
                                enabledBt: enabledBt,
                                isAllChecked: isAllChecked
                            })
                        }

                    }}
                    isChecked={item.item.checked}
                    rightText={''}
                    rightTextStyle={styles.text}
                    checkedImage={<Image source={require('../../img/icon_buy_select.png')} style={styles.image}/>}
                    unCheckedImage={<Image source={require('../../img/icon_buy_unselect.png')} style={styles.image}/>}
                />
                <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                    <Text style={{
                        textAlign: 'center',
                        color: CommonStyle.textBlockColor,
                        fontSize: 14
                    }}>{item.item.year}</Text>
                    <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor, fontSize: 17}}>待缴费{item.item.months}项</Text>
                </View>
                <TouchableView onPress={() => {
                    this.navigate("LivingPaymentDetail", {startDate: item.item.startDate,endDate:item.item.endDate})
                }}>
                    <Text style={{
                        color: CommonStyle.themeColor,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: CommonStyle.themeColor,
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingRight: 15,
                        paddingLeft: 15,
                        fontSize: 14
                    }}>选择明细</Text>
                </TouchableView>

            </View>

        )
    }

    onSubmit() {
        this.showLoading("生单中...");

        let param = {
            startDate: this.dateToString(this.state.startDate),
            endDate: this.dateToString(this.state.endDate)
        };
        Request.post('/api/pay/chargeBatch', param).then(rep => {
            if (rep.code === 0 && rep.data) {
                this.navigate('PayCenter', {
                        id: rep.data.id,
                        totalPrice: rep.data.totalPrice,
                        orderno: rep.data.orderno,
                        orderType: ORDER_TYPE_JF,
                        from: PAY_FROM_JF
                    }
                );
            } else {
                this.showShort(rep.message);
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
        })
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    banner: {height: 180,},
    slide: {
        height: 180,
        resizeMode: Image.resizeMode.stretch,
    },
    bottomIcon: {
        width: 15, height: 15, resizeMode: 'contain'
    },
    bottomView: {
        flexDirection: 'row', justifyContent: 'space-between', width: width, position: 'absolute',
        bottom: 0,
        height: 50,
        alignSelf: 'center'
    }
    ,
    bottomLeftBt: {
        alignItems: 'center',
        backgroundColor: CommonStyle.white,
        justifyContent: 'center',
        height: 50,
        width: width / 3,
    },
    marginBottom: {
        marginBottom: 20
    },
    marginTop: {
        marginTop: 20
    }, checkBox: {
        backgroundColor: 'white',
        height: 56,
        marginTop: 1,
        justifyContent: 'center'
    },
    image: {
        marginLeft: 16,
        width: 14,
        height: 14,
    },
    bottomRow: {
        flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
    },
    centerBottomRow: {
        alignItems: 'flex-end',
        paddingRight: 5
    }
});
