import React from "react";
import {Text, StyleSheet, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import TouchableView from "../../../components/TouchableView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {SwipeAction} from "antd-mobile-rn";
import ToastUtil from "../../../utils/ToastUtil";

export default class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        };
    }

    _onFetch(page = 1, callback) {
        console.log('page' + page);
        // this.showInDLoading()
        var param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};
        Request.post("api/user/redPacket", param,
            {
                mock: true,
                mockId: 1095476,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    _renderRowView(rowData) {
        return (
            <TouchableView
                style={styles.row}
                onPress={() => this.state.onItemPress(rowData)}>
                <Text>{rowData.title}</Text>
            </TouchableView>
        );
    }

    // _renderRowView(rowData) {
    //     return (
    //         <SwipeAction
    //             autoClose={true}
    //             style={{backgroundColor: 'transparent'}}
    //             right={[{
    //                 text: '删除',
    //                 onPress: () => {
    //                     ToastUtil.showShort(rowData.title)
    //                 },
    //                 style: {backgroundColor: 'red', color: 'white'},
    //             }]}
    //             onOpen={() => console.log('open')}
    //             onClose={() => console.log('close')}
    //             onPress={() => this.state.onItemPress(rowData)}
    //         >
    //             <Text>{rowData.title}</Text>
    //         </SwipeAction>
    //     );
    // }

    _render() {
        return (
            <GiftedListView
                style={styles.container}
                rowView={this._renderRowView.bind(this)}
                onFetch={this._onFetch.bind(this)}
                loadMore={true}
            />
        );
    }
}
;
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    row: {
        padding: 10,
        height: 44,
    },
});