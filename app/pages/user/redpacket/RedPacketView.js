import React from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import TouchableView from "../../../components/TouchableView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {CommonStyle} from "../../../common/CommonStyle";
import util from "../../../utils/util";

export default class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        };
    }


    _onFetch(page = 1, callback) {
        // this.showInDLoading()
        let param = {status: this.state.index, page: page - 1, pageSize: PAGE_SIZE,};
        Request.post("/api/user/redPacket", param
        ).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null,{emptyTitle: '暂无红包'})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        });
    }

    _renderRowView(item) {
        let index = this.state.index
        if (index === 0){//未使用
            return (
                <ImageBackground
                    style={{ alignItems: 'center', justifyContent: 'center', height: 90,marginLeft: 10,marginRight: 10}}
                    source={require('../../../img/jifen_bg.png')}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <View style={{marginLeft: 20}}>
                            <Text style={{fontSize:24,color:'#FF5D5D'}}>{item.price}</Text>
                            <Text style={{color:'#FF5D5D'}}>{item.title}</Text>

                        </View>
                        <View style={{height: 90, with: 0.5, backgroundColor: CommonStyle.lightGray}}>
                        </View>
                        <View style={{flex: 1,paddingLeft:20}}>
                            <Text style={{color:'#FF5D5D'}}>{item.des}</Text>
                            <View style={{flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',}}>
                                <Text>{item.validity}</Text>
                                <TouchableView style={{
                                    height: 17,
                                    borderRadius: 30,
                                    backgroundColor: '#F26565',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingLeft:5,
                                    paddingRight: 5,
                                    marginRight:20
                                }} onPress={()=>{
                                    this.showShort('去使用红包')
                                }}>
                                    <Text style={{color: '#ffffff', fontSize: 11}}>去使用</Text>
                                </TouchableView>
                            </View>
                            {/*<View style={{height: 0.5,  backgroundColor: CommonStyle.lightGray}}/>*/}
                            <Text style={{marginTop:3,fontSize:11,color:'#999'}}>使用说明:{item.instructions}</Text>
                        </View>

                    </View>
                </ImageBackground>
            );
        } else {
            return (
                <ImageBackground
                    style={{ alignItems: 'center', justifyContent: 'center', height: 90,marginLeft: 10,marginRight: 10}}
                    source={require('../../../img/jifen_bg.png')}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <View style={{marginLeft: 20}}>
                            <Text style={{fontSize:24,color:'#666'}}>{item.price}</Text>
                            <Text>{item.title}</Text>

                        </View>
                        <View style={{height: 90, with: 0.5, backgroundColor: CommonStyle.lightGray}}>
                        </View>
                        <View style={{flex: 1,paddingLeft:20}}>
                            <Text>{item.des}</Text>
                            <Text>{item.validity}</Text>
                            {/*<View style={{height: 0.5,  backgroundColor: CommonStyle.lightGray}}/>*/}
                            <Text style={{marginTop:3,fontSize:11,color:'#999'}}>使用说明:{item.instructions}</Text>
                        </View>
                    </View>
                </ImageBackground>
            );
        }

    }

    // _renderRowView(item) {
    //     return (
    //         <SwipeAction
    //             autoClose={true}
    //             style={{backgroundColor: 'transparent'}}
    //             right={[{
    //                 text: '删除',
    //                 onPress: () => {
    //                     ToastUtil.showShort(item.title)
    //                 },
    //                 style: {backgroundColor: 'red', color: 'white'},
    //             }]}
    //             onOpen={() => console.log('open')}
    //             onClose={() => console.log('close')}
    //             onPress={() => this.state.onItemPress(item)}
    //         >
    //             <Text>{item.title}</Text>
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
                pagination={false} // enable infinite scrolling using touch to load more
                renderSeparator={() => {return (null);}}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
});
