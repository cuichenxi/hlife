import React from "react";
import {Dimensions, Text, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import TouchableView from "../../../components/TouchableView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {CommonStyle} from "../../../common/CommonStyle";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from "react-native-vector-icons/Ionicons";

let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}

export default class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        };
        console.log(this.props)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        console.log('==========')
        console.log(this.props)
        Request.post('api/user/goodsaddresslist',param,
            {
                mock: true,
                mockId: 1095864,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows,{allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    _renderRowView(item){
        return (
            <TouchableView onPress={() => this.state.onItemPress(item)}>
                <View style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5
                }}>
                    <View style={{

                        paddingLeft: 10,
                        borderRadius: 5,
                        backgroundColor: CommonStyle.themeColor,
                        paddingRight: 10
                    }}>
                        <Text style={{
                            textAlign: 'center', color: 'white',
                        }}>审核</Text>
                    </View>
                    <View style={{flex:1,marginLeft:20}}>
                        <Text style={{textAlign: 'left', color: '#999999', fontSize: 13}}>{item.communityName}</Text>
                        <Text
                            style={{textAlign: 'left', color: '#999999', fontSize: 13, marginTop: 5}}>{item.unitName}</Text>
                    </View>
                    <Font.Ionicons style={{marginLeft: 10}} name="ios-arrow-forward-outline" size={(18)}
                                   color="#bbb"/>
                </View>

            </TouchableView>
        )
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
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }}>
                <GiftedListView
                    style={{with: width, flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />

                <TouchableView style={{
                    alignItems: 'center',
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    height: 40,
                    width: width,
                    // textAlign: 'center',
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center'
                }} onPress={() => this.state.onButtonPress()}>
                    <Text style={{color: 'white'}}>{this.state.index === 0?'新增小区地址':'新增收货地址'}</Text>
                </TouchableView>
            </View>
        );
    }

}
;
