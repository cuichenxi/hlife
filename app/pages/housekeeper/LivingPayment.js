import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import CheckBox from "../../components/Checkbox";
import util from "../../utils/util";
import {ORDER_TYPE_JF, PAY_FROM_JF} from "../../constants/ActionTypes";

let {width} = Dimensions.get('window')

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
            isLoading: false,
            rows: [],
            items: 0,
            totalPrice: 0,
            defaultColor: CommonStyle.drakGray,
            enabledBt: false,
            endDate: undefined,
            endDatetime: '',
            startDate: undefined,
            checkedItems:[],
            address:'',
            chargeTypeItem:{
                type:'',
                feeType:''
            }
        }
    }

    onReady() {
        this.fetchData()
        this.makeRemoteRequest(1)
    }

    refreshing(){
        this.makeRemoteRequest(1)
    }

    _render() {
        const {address, rows, items, totalPrice, defaultColor, enabledBt} = this.state
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
                        style={{color: CommonStyle.textBlockColor, fontSize: 15, paddingLeft: 5}}>{address}</Text>
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
                                    checkedItems.push(data)

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
                        {/*<Text style={{fontSize: 14, color: '#333'}}>全选</Text>*/}
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
                            this.onSubmit()
                        } else {
                            this.showShort('请至少选择一个交费项')
                        }
                    }}>
                        <Text style={{color: 'white', fontSize: 16}}>去缴费</Text>
                    </TouchableView>
                </View>
            </View>
        );

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
        return dateTime;
    }

    dateToNextYearString(date) {
        var year = date.getFullYear()+1;
        var month = (date.getMonth() + 1).toString();
        var day = (date.getDate()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        var dateTime = year + "-" + month + "-" + day;
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

    makeRemoteRequest(page= 1) {
        let param = {
            // page: page - 1,
            // pageSize: PAGE_SIZE,
            // endDate: this.dateToNextYearString(new Date()),
            // startDate: this.dateToString(new Date())
        };

        Request.post('/api/fee/totallist', param,
            {
                mock: false,
                mockId: 1125376,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data)) {
                var datas = []
                for (var row of rep.data) {
                    row.checked = false
                    datas.push(row)
                }
                if (datas.length>0){
                    this.setState({
                        rows: datas,
                    })
                }
                // callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                this.setState({
                    emptyTitle: rep.message
                })
                callback(null,{emptyTitle: '空空如也~'})
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

                        let checkedList = []
                        for (var i = 0; i < datas.length; i++) {
                            checkedList.push(datas[i].checked)
                        }
                        isSomeState = this.isAllEqual(checkedList)
                        if (isSomeState){
                            isAllChecked = checkedList[0]
                        }


                        if (datas[item.index].checked === true) {
                            this.state.checkedItems.push(datas[item.index])
                            this.setState({
                                items: ++this.state.items,
                                rows: datas,
                                totalPrice: item.item.fee + this.state.totalPrice,
                                defaultColor: defaultColor,
                                enabledBt: enabledBt,
                                isAllChecked: isAllChecked,
                            })
                        } else {
                            for (var i = 0; i < this.state.checkedItems.length; i++) {
                                if (this.isObjectValueEqual(this.state.checkedItems[i],datas[item.index])) {
                                    this.state.checkedItems.splice(i, 1)
                                }
                                /*if (this.state.checkedItems[i].year == parseInt(datas[item.index].year)) {
                                    this.state.checkedItems.splice(i, 1)
                                }*/
                            }

                            this.setState({
                                items: --this.state.items,
                                rows: datas,
                                totalPrice: this.state.totalPrice - item.item.fee,
                                defaultColor: defaultColor,
                                enabledBt: enabledBt,
                                isAllChecked: isAllChecked,
                            })
                        }

                    }}
                    isChecked={item.item.checked}
                    rightText={''}
                    rightTextStyle={styles.text}
                    checkedImage={<Image source={require('../../img/icon_buy_select.png')} style={styles.image}/>}
                    unCheckedImage={<Image source={require('../../img/icon_buy_unselect.png')} style={styles.image}/>}
                />
                <View style={{alignItems: 'flex-start', justifyContent: 'flex-start',flex:1.5}}>
                    <Text style={{
                        color: CommonStyle.themeColor,
                        fontSize: 17
                    }}>{item.item.feeTypeName}</Text>
                    <Text style={{ color: CommonStyle.textBlockColor, fontSize: 14}}>{item.item.name}</Text>
                </View>
                <TouchableView onPress={() => {
                    this.navigate("LivingPaymentDetail", {
                        address:this.state.address,feeType:item.item.feeType,type:item.item.type,checked:item.item.checked})
                }} style={{flex:1,display: 'flex',alignItems:'center',justifyContent:'center'}}>
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

    isObjectValueEqual (a, b) {
        //取对象a和b的属性名
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        //判断属性名的length是否一致
        if (aProps.length != bProps.length) {
            return false;
        }
        //循环取出属性名，再判断属性值是否一致
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
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
        // this.showLoading("生单中...");
        const checkedItems = this.state.checkedItems

        var chargeType=[]
        for (checkedItem of checkedItems){
            const chargeTypeItem = {
                // type:'',
                // feeType:''
            }
            // years.push(parseInt(checkedItem.year))
            chargeTypeItem.feeType = checkedItem.feeType
            chargeTypeItem.type = checkedItem.type
            chargeType.push(chargeTypeItem)
        }
        // console.log(years.sort())

        let param = {
            // startDate: checkedItems[0].startDate,
            // endDate: checkedItems[checkedItems.length-1].endDate
            chargeType:chargeType
        };
        console.log('checkedItems',checkedItems)
        console.log('chargeType',chargeType)
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

    fetchData(page = 1) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        this.showDLoading()
        Request.post('/api/user/mycommunityList', param,
            {
                mock: false,
                mockId: 1095864,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                for (var community of rep.data){
                    if (community.isAuth == 1) {
                        this.setState({
                            address:community.communityName+community.buildingName+community.unitName+community.roomName
                        })
                        break
                    }
                }
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    banner: {height: 180,},
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
        justifyContent: 'center',
        flex:1
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
