import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TouchableView from "../../components/TouchableView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import CheckBox from "../../components/Checkbox";
import LivingPaymentItem from "./LivingPaymentItem";
import util from "../../utils/util";

let {width} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}
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
            startDate: this.props.navigation.state.params.startDate,
            endDate: this.props.navigation.state.params.endDate,
            isAllChecked: false,
            isLoading: false,
            months:[]
        }
    }

    onReady() {
        this.makeRemoteRequest()
    }

    _render() {
        const {communityinfo, rows, items, totalPrice, defaultColor,months} = this.state
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
                        style={{color: CommonStyle.textBlockColor, fontSize: 15, paddingLeft: 5}}>{communityinfo}</Text>
                </View>
                <ScrollView style={{
                    flex: 1,
                    flexDirection: 'column'
                }}>

                    <FlatList ref={(flatList) => this._flatList = flatList}
                              ItemSeparatorComponent={this._separator}
                        // renderItem={this._renderItem.bind(this)}
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
                                          this.navigate('BillDetail')
                                      }}
                                  />
                              )}
                              data={rows}>

                    </FlatList>
                </ScrollView>

                <View style={styles.bottomView}>
                    <TouchableView style={[styles.bottomLeftBt, styles.bottomRow]}
                                   onPress={() => this.state.onButtonPress()}>
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
                                        months:months
                                    })
                                } else {
                                    this.setState({
                                        rows: datas,
                                        isAllChecked: !this.state.isAllChecked,
                                        items: 0,
                                        totalPrice: 0,
                                        defaultColor: CommonStyle.drakGray,
                                        enabledBt: false,
                                        months:[]
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
                    <View style={{height: 60, width: 0.5, backgroundColor: CommonStyle.lineColor,}}/>
                    <TouchableView style={[styles.bottomLeftBt, styles.centerBottomRow]} onPress={() => {
                        this.navigate('ShoppingCart')
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
                        height: 60,
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
        for (var i = 0; i < datas.length; i++) {
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
            for (var i=0;i<this.state.months.length;i++){
                if (this.state.months[i] == parseInt(datas[index].yearMonth)){
                    this.state.months.splice(i,1)
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

    makeRemoteRequest(page = 1) {
        let param = {
            page: page - 1,
            pageSize: PAGE_SIZE,
            startDate: this.state.startDate.substring(0,10) ,
            endDate: this.state.endDate.substring(0,10)
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
                    communityinfo: rep.data.communityinfo
                })
                // callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
        })
    }


    _renderItem = (item) => {
        return (
            <TouchableView onPress={() => {
                this.navigate("BillDetail")
            }}>
                <View style={{
                    backgroundColor: 'white',
                    height: 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // padding: 10,
                }}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
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
                                        totalPrice: item.item.totalMoney + this.state.totalPrice,
                                        defaultColor: defaultColor,
                                        enabledBt: enabledBt,
                                        isAllChecked: isAllChecked
                                    })
                                } else {
                                    this.setState({
                                        items: --this.state.items,
                                        rows: datas,
                                        totalPrice: this.state.totalPrice - item.item.totalMoney,
                                        defaultColor: defaultColor,
                                        enabledBt: enabledBt,
                                        isAllChecked: isAllChecked
                                    })
                                }

                            }}
                            isChecked={item.item.checked}
                            rightText={''}
                            rightTextStyle={styles.text}
                            checkedImage={<Image source={require('../../img/icon_buy_select.png')}
                                                 style={styles.image}/>}
                            unCheckedImage={<Image source={require('../../img/icon_buy_unselect.png')}
                                                   style={styles.image}/>}
                        />
                        <Text style={{paddingLeft: 5, color: '#333', fontSize: 15}}>{item.item.yearMonth}</Text>
                    </View>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        paddingRight: 10
                    }}>

                        <Text style={{
                            color: CommonStyle.themeColor,
                            padding: 3,
                            fontSize: 20
                        }}>¥{item.item.totalMoney}</Text>
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>

                </View>
            </TouchableView>

        )
    }

    onSubmit() {
        console.log(this.state.months)


        if (util.isArrayEmpty(this.state.months)){
            return
        }
        this.showLoading("生单中...");

        let param = {
            month:this.state.months
        };
        Request.post('/api/pay/chargeBatch', param).then(rep => {
            if (rep.code === 0 && rep.data) {
                this.navigate('PayCenter', {
                    id: rep.data.id,
                    totalPrice:rep.data.totalPrice,
                    orderno:rep.data.orderno,
                    type:3
                    // orderDetailList: orderDetailList,
                    // from: PAY_FROM_CREATE_ORDER
                }
                    )
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
    bottomIcon: {
        width: 15, height: 15, resizeMode: 'contain'
    },
    bottomView: {
        flexDirection: 'row', justifyContent: 'space-between', width: width, position: 'absolute',
        bottom: 0,
        height: 60,
        alignSelf: 'center'
    }
    ,
    bottomLeftBt: {
        alignItems: 'center',
        backgroundColor: CommonStyle.white,
        justifyContent: 'center',
        height: 60,
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
