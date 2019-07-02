import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {CommonStyle} from "../../../common/CommonStyle";
import VisitorView from "./VisitorView";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";
import {Dimensions, Text, View} from "react-native";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import util from "../../../utils/util";

let {width, height} = Dimensions.get('window')

/**
 *我的访客
 */
export default class MyVisitor extends BaseComponent {
    navigationBarProps() {
        return {
            title: '我的访客',
        }
    }


    _render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <View style={{
                    height:40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'space-between',
                    // padding: 10,
                    backgroundColor:CommonStyle.bgColor,
                    paddingLeft: 30,
                    paddingRight: 30,
                }}>
                    <Text style={{textAlign: 'center', color: CommonStyle.textGrayColor,fontSize:13}}>到访日期</Text>
                    <Text style={{textAlign: 'center', color: CommonStyle.textGrayColor, fontSize: 13}}>姓名</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray, width: width}}/>
                <GiftedListView
                    style={{with: width, flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>

        )
    }

    renderPage(tab,index){
        console.log(index)
        return(
            <VisitorView style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }} tab={tab} index={index}/>
        )
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {status: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/visitor', param,
            {
                mock: false,
                mockId: 1095607,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total});
            } else {
                callback(null, {emptyTitle: '暂无访客'});
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    _renderRowView(item) {
        return (
            <View style={{
                backgroundColor: 'white',
                height:40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-between',
                // padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
            }}>
                <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor,fontSize:13}}>{item.createdate}</Text>
                <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor, fontSize: 13}}>{item.name}</Text>
            </View>

        )
    }

}
