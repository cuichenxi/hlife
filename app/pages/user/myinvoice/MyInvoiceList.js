import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Text, View} from "react-native";
import GiftedListView from "../../../components/refreshList/GiftedListView";
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
            invoiceList: []
        }
    }


    _render() {
        return (
            <View style={{flex: 1}}>
                <GiftedListView
                    style={{with: width}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
                <TouchableView style={{
                    backgroundColor: 'white',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // padding: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                }} onPress={() => {
                    this.navigate('AddBillInfo')
                }}>
                    <Text style={{textAlign: 'center', color: CommonStyle.themeColor, fontSize: 13}}>+添加发票抬头</Text>
                </TouchableView>
            </View>
        )
    }

    _renderRowView(item,i) {

        return (
            <SwipeAction style={{
                backgroundColor: 'transparent',
            }} autoClose={true} onOpen={() => {
                this.navigate('AddBillInfo', {invoice: item})
            }}
                         onClose={() => console.log('close')}
                         onPress={() => {
                             this.navigate('AddBillInfo', {invoice: item})
                         }}
                         right={[
                             {
                                 text: '删除',
                                 onPress: () => {
                                     console.log('delete')
                                     console.log(item)
                                     console.log(i)
                                     let list = this.state.invoiceList

                                 },
                                 style: {backgroundColor: 'red', color: 'white'},
                             },
                         ]}
            >
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
                    }}>{item.name}</Text>
                    <Text style={{
                        textAlign: 'center',
                        color: CommonStyle.textGrayColor,
                        fontSize: 14,
                        flex: 1
                    }}>税号：{item.no}</Text>
                </View>

            </SwipeAction>

        )
    }

    deleteItem(item, callback) {
        let list = this.state.invoiceList
        list.filter((item, index) => {

        })
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('api/user/invoiceList', param,
            {
                mock: true,
                mockId: 1125915,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                /*this.setState({
                    invoiceList:rep.data.rows
                })*/
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }
}
