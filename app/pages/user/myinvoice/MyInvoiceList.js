import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Text, View} from "react-native";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import {CommonStyle} from "../../../common/CommonStyle";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";
import TouchableView from "../../../components/TouchableView";


export default class MyInvoiceList extends BaseComponent{
    navigationBarProps() {
        return {
            title: '我的发票',
        }
    }
    _render(){
        return(
            <View>
                <GiftedListView
                    style={{with: width, flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
                <TouchableView style={{
                    backgroundColor: 'white',
                    height:40,
                    alignItems: 'center',
                    justifyContent:'center',
                    // padding: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                }} onPress={()=>{this.navigate('AddBillInfo')}}>
                    <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor,fontSize:13}}>+添加发票抬头</Text>
                </TouchableView>
            </View>
        )
    }

    _renderRowView(item) {
        return (
            <View style={{
                backgroundColor: 'white',
                height:60,
                alignItems: 'center',
                justifyContent:'center',
                // padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
            }}>
                <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor,fontSize:13}}>发票抬头</Text>
                <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor,fontSize:13}}>税号：387287387483844</Text>
            </View>

        )
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        console.log('==========')
        console.log(this.props)
        Request.post('api/user/visitor', param,
            {
                mock: true,
                mockId: 1095607,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }
}
