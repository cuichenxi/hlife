import React from "react";
import {Dimensions, Text, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {CommonStyle} from "../../../common/CommonStyle";
import util from "../../../utils/util";

/**
 * 积分明细
 */

export default class IntegralDetailView extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        };
        console.log(this.props)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        console.log('==========')
        console.log(this.props)
        Request.post('/api/user/integralList', param,
            {
                mock: false,
                mockId: 1095607,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null, {emptyTitle: '暂无积分,签到可获取哦'})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
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
                <Text style={{textAlign: 'center', color: '#333',fontSize:17}}>+{item.score}</Text>
                <Text style={{textAlign: 'center', color: '#333', fontSize: 15}}>{item.type === 1?'签到积分':'分享积分'}</Text>
                <Text style={{textAlign: 'center', color: '#999', fontSize: 11}}>{item.createtime}</Text>
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
                <GiftedListView
                    style={{ flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>
        );
    }

}
;
