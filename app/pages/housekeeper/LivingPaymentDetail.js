import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import CheckBox from "../../components/Checkbox";
import LivingPaymentItem from "./LivingPaymentItem";
import util from "../../utils/util";
import {ORDER_TYPE_JF, PAY_FROM_JF} from "../../constants/ActionTypes";

let {width} = Dimensions.get('window')

/**
 * 物业缴费明细列表
 */
export default class LivingPaymentDetail extends BaseComponent {
    navigationBarProps() {
        return {
            title: '物业缴费明细'
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isOneChecked: false,
            communityinfo: '',

            rows: [],
            totalPrice: 0,
            defaultColor: CommonStyle.drakGray,
            enabledBt: false,
            items: 0,
            year: this.props.navigation.state.params.year,
            // startDate: this.props.navigation.state.params.startDate,
            // endDate: this.props.navigation.state.params.endDate,
            feeType: this.props.navigation.state.params.feeType,
            type: this.props.navigation.state.params.type,
            address: this.props.navigation.state.params.address,
            isAllChecked: false,
            isLoading: false,
            months: [],
        }
    }

    onReady() {
        this.makeRemoteRequest()
    }

    _render() {
        const {address, rows, items, totalPrice, defaultColor, months} = this.state
        return (
            <View style={styles.container}>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: 40,
                    width: width,
                    textAlign: 'center',
                    flexDirection: 'row',
                    paddingLeft: 5,
                    paddingRight: 5
                }}>
                    <Text
                        style={{color: CommonStyle.textBlockColor, fontSize: 15, paddingLeft: 5}}>{address}</Text>
                </View>
                <ScrollView style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginBottom:60
                }}>

                    <FlatList ref={(flatList) => this._flatList = flatList}
                              ItemSeparatorComponent={this._separator}
                              refreshing={false}
                              style={{flex: 1}}
                              keyExtractor={this._keyExtractor}
                              onEndReachedThreshold={0.1}
                              renderItem={({item, index}) => (
                                  <LivingPaymentItem
                                      item={item}
                                      select={item.checked}
                                      onItemChecked={() => this.onItemSelected(item, index)}
                                      onPress={() => {
                                          this.navigate('LivingBillDetail',{item:item})
                                      }}
                                  />
                              )}
                              data={rows}>

                    </FlatList>
                </ScrollView>

                <View style={styles.bottomView}>
                    <TouchableView style={[styles.bottomLeftBt, styles.bottomRow]}>
                        <CheckBox
                            style={styles.checkBox}
                            onClick={() => {
                                var datas = rows
                                var months = []
                                if (datas.length == 0) {
                                    return
                                }
                                var totalPrice = 0
                                for (var data of datas) {
                                    if (!this.state.isAllChecked) {
                                        data.checked = true
                                        months.push(parseInt(data.yearMonth))
                                    } else {
                                        data.checked = false
                                    }
                                    totalPrice = data.totalMoney + totalPrice
                                }
                                this.state.months = months
                                console.log(this.state.months)
                                if (!this.state.isAllChecked) {
                                    this.setState({
                                        rows: datas,
                                        isAllChecked: !this.state.isAllChecked,
                                        items: datas.length,
                                        totalPrice: totalPrice,
                                        defaultColor: CommonStyle.themeColor,
                                        enabledBt: true,
                                        months: months,
                                    })
                                } else {
                                    this.setState({
                                        rows: datas,
                                        isAllChecked: !this.state.isAllChecked,
                                        items: 0,
                                        totalPrice: 0,
                                        defaultColor: CommonStyle.drakGray,
                                        enabledBt: false,
                                        months: [],
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
                        // this.navigate('ShoppingCart')
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
                        // this.navigate('Payment')
                        this.onSubmit()
                    }}>
                        <Text style={{color: 'white', fontSize: 16}}>去缴费</Text>
                    </TouchableView>
                </View>
            </View>
        );
    }

    _keyExtractor = (item, index) => {
        return '' + index
    }

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray}}/>;
    }

    onItemSelected(item, index) {
        var datas = this.state.rows
        datas[index].checked = !item.checked
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

        let checkedList = []
        for (var i = 0; i < datas.length; i++) {
            checkedList.push(datas[i].checked)
        }

        isSomeState = this.isAllEqual(checkedList)
        if (isSomeState){
            isAllChecked = checkedList[0]
        }

        if (datas[index].checked) {
            this.state.months.push(parseInt(datas[index].yearMonth))
            this.setState({
                items: ++this.state.items,
                rows: datas,
                totalPrice: item.totalMoney + this.state.totalPrice,
                defaultColor: defaultColor,
                enabledBt: enabledBt,
                isAllChecked: isAllChecked,
                // months:months
            })

        } else {
            for (var i = 0; i < this.state.months.length; i++) {
                if (this.state.months[i] == parseInt(datas[index].yearMonth)) {
                    this.state.months.splice(i, 1)
                }
            }

            this.setState({
                items: --this.state.items,
                rows: datas,
                totalPrice: this.state.totalPrice - item.totalMoney,
                defaultColor: defaultColor,
                enabledBt: enabledBt,
                isAllChecked: isAllChecked,
                // months:months
            })
        }

    }

    makeRemoteRequest() {
        let param = {
            // page: page - 1,
            // pageSize: PAGE_SIZE,
            // startDate: this.state.startDate.substring(0, 10),
            // endDate: this.state.endDate.substring(0, 10),
            feeType: this.state.feeType,
            type: this.state.type
        };

        Request.post('/api/fee/list', param,
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
                    communityinfo: rep.data.communityinfo,
                })
                // callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
        })
    }


    isAllEqual(array){
        if (array.length >0){
            return !array.some(function (value,index) {
                return value !== array[0];
            })
        } else {
            return true
        }
    }

    onSubmit() {
        let months = this.state.months
        if (util.isArrayEmpty(months)) {
            return
        }
        months.sort()
        console.log('this.state.rows[0]',this.state.rows[0])
        if (this.isOrderNumeric(months)){
            if (months[0] == this.state.rows[0].yearMonth){
                console.log('符合提交：',months)

                let param = {
                    month: this.state.months,
                    type: this.state.type,
                    feeType: this.state.feeType,

                };
                this.showLoading("生单中...");
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
            } else {
                this.showShort('请选择第一个待缴费月份')
            }
        } else {
            this.showShort('请选择连续的待缴月份')
        }
    }


    /**
     * 判断是否是递增数组
     * @param array
     * @returns {boolean}
     */
    isOrderNumeric(array){
        var flag = true;
        for (var i=0;i<array.length;i++){
            if (i>0){
                var num = array[i]
                var num_ = array[i-1]+1
                if (num != num_){
                    flag = false
                    break
                }
            }
        }
        if (!flag){
            for (var i=0;i<array.length;i++){
                if (i>0){
                    var num = array[i]
                    var num_ = array[i-1]-1
                    if (num != num_){
                        flag = false
                        break
                    }
                }
            }
        }
        return flag
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
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
    },
    checkBox: {
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
