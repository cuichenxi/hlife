import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Text, View} from "react-native";
import {CommonStyle} from "../../../common/CommonStyle";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";
import TouchableView from "../../../components/TouchableView";
import {SwipeAction} from "antd-mobile-rn";
import ToastUtil from "../../../utils/ToastUtil";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import util from "../../../utils/util";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Font = {
    Ionicons,
    FontAwesome
}
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

    onReady(e){
        this.setState({
            from: e.from
        })
    }
    _render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1,marginTop: 10}}>
                    <GiftedListView
                        onRef={(ref)=>{
                            this.listRef = ref;
                        }}
                        style={{ flex: 1}}
                        rowView={this.renderItem.bind(this)}
                        onFetch={this.fetchData.bind(this)}
                        loadMore={false}
                        pagination={false}
                    />
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
                    this.navigate('AddBillInfo',{},
                         (data) => {
                            ToastUtil.showShort(data);
                            //刷新列表
                            // this.fetchData()
                            this.listRef._refresh();
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
    renderItem (item,sectionId,index){
        console.log(index)
        return (
            <SwipeAction style={{
                backgroundColor: 'transparent',
            }} autoClose={true} onOpen={() => {

            }}
                         onClose={() => console.log('close')}
                         onPress={() => {
                             this.navigate('AddBillInfo', {invoice: item})
                         }}
                         right={[
                             {
                                 text: '删除',
                                 onPress: () => {
                                     this.deleteData(item.id,index)
                                 },
                                 style: {backgroundColor: 'red', color: 'white'},
                             },
                         ]}
            >
                <TouchableView onPress={()=>{
                    if (this.state.from === 1) {
                        this.goBack(item);
                    } else {
                        this.navigate('AddBillInfo', {invoice: item,},(data) => {
                                this.listRef._refresh();
                            })
                    }
                }}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor: 'white',}}>
                        <View style={{
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
                        <Font.Ionicons style={{marginRight: 10}} name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>

                </TouchableView>


            </SwipeAction>
        )
    }


    fetchData(page = 1,callback) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/invoiceList', param,
            {
                mock: false,
                mockId: 1125915,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {

                /*this.setState({
                    rows: rep.data.rows
                })*/
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null,{emptyTitle: '暂无发票'})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    deleteData(id) {
        let param = { id: id};

        Request.post('/api/user/invoicedel', param,
            {
                mock: false,
                mockId: 1125915,
            }).then(rep => {
            if (rep.code == 0 ) {
                // console.log(JSON.stringify(rep))
                // let list = this.state.rows
                // // 删除指定位置元素
                // list.splice(index, 1)
                // console.log(list)
                // //todo 删除逻辑
                // this.setState({row: list})
                this.listRef._refresh();

            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
    }

}
