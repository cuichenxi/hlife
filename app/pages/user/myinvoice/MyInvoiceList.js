import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Text, View} from "react-native";
import {CommonStyle} from "../../../common/CommonStyle";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";
import TouchableView from "../../../components/TouchableView";
import {SwipeAction} from "antd-mobile-rn";
import ToastUtil from "../../../utils/ToastUtil";

let {width, height} = Dimensions.get('window')


export default class MyInvoiceList extends BaseComponent {
    navigationBarProps() {
        return {
            title: '我的发票',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            invoiceList: [],
            rows:[],
            isLoading: false,
            isRefresh: true,
        }
    }

    componentWillMount(){
        this.fetchData()
    }

    _render() {
        const {rows} = this.state
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1,marginTop: 10}}>
                    <FlatList ref={(flatList) => this._flatList = flatList}
                              ItemSeparatorComponent={this._separator}
                              renderItem={this._renderItem}

                              onRefresh={() => this.refreshing()}
                              refreshing={this.state.isLoading}

                              onEndReachedThreshold={0.1}
                        // onEndReached={
                        //     () => this._onLoadMore()
                        // }

                              data={rows}>

                    </FlatList>
                </View>
                <TouchableView style={{
                    backgroundColor: 'white',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // padding: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                }} onPress={() => {
                    this.navigate('AddBillInfo',{
                        callback: (data) => {
                            ToastUtil.showShort(data);
                            //刷新列表
                            this.fetchData()
                        }
                    })
                }}>
                    <Text style={{textAlign: 'center', color: CommonStyle.themeColor, fontSize: 13}}>+添加发票抬头</Text>
                </TouchableView>
            </View>
        )
    }

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray}}/>;
    }

    _renderItem =(item) =>{
        return (
            <SwipeAction style={{
                backgroundColor: 'transparent',
            }} autoClose={true} onOpen={() => {

            }}
                         onClose={() => console.log('close')}
                         onPress={() => {
                             this.navigate('AddBillInfo', {invoice: item.item})
                         }}
                         right={[
                             {
                                 text: '删除',
                                 onPress: () => {
                                     this.deleteData(item.item.id,item.index)
                                 },
                                 style: {backgroundColor: 'red', color: 'white'},
                             },
                         ]}
            >
                <TouchableView onPress={()=>{
                    this.navigate('AddBillInfo', {invoice: item.item,callback:(data) => {
                            ToastUtil.showShort(data);
                            this.fetchData()
                        }})
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        height: 60,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        // padding: 10,
                        paddingLeft: 30,
                        paddingRight: 30,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: CommonStyle.textBlockColor,
                            fontSize: 14,
                            flex: 1,
                            marginTop: 10
                        }}>{item.item.name}</Text>
                        <Text style={{
                            textAlign: 'center',
                            color: CommonStyle.textGrayColor,
                            fontSize: 14,
                            flex: 1
                        }}>税号：{item.item.no}</Text>
                    </View>
                </TouchableView>


            </SwipeAction>
        )
    }


    fetchData(page = 1) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/invoiceList', param,
            {
                mock: false,
                mockId: 1125915,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState({
                    rows: rep.data.rows
                })
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
    }

    deleteData(id,index) {
        let param = { id: id};

        Request.post('/api/user/invoicedel', param,
            {
                mock: false,
                mockId: 1125915,
            }).then(rep => {
            if (rep.code == 0 ) {
                // console.log(JSON.stringify(rep))
                let list = this.state.rows
                // 删除指定位置元素
                list.splice(index, 1)
                console.log(list)
                //todo 删除逻辑
                this.setState({row: list})
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
    }

}
