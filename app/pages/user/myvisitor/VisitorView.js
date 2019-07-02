import React from "react";
import {Dimensions, Text, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {CommonStyle} from "../../../common/CommonStyle";

/**
 * 访客view
 */
let {width, height} = Dimensions.get('window')

export default class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        };
        console.log(this.props)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {status: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/visitor', param,
            {
                mock: false,
                mockId: 1095607,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null,{emptyTitle: rep.message})
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


    _render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
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
        );
    }

}
;
