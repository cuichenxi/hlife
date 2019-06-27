import React from "react";
import {Dimensions, ImageBackground, StyleSheet, Text, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import TouchableView from "../../../components/TouchableView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {CommonStyle} from "../../../common/CommonStyle";

export default class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        };
    }

    componentDidMount() {
        // this.showLong("index=" + this.state.index);
    }

    _onFetch(page = 1, callback) {
        console.log('page' + page);
        // this.showInDLoading()
        let param = {status: this.state.index, page: page - 1, pageSize: PAGE_SIZE,};
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
        let index = this.state.index
        if (index === 0){//未使用
            return (
                <ImageBackground
                    style={{ alignItems: 'center', justifyContent: 'center', height: 90,marginLeft: 10,marginRight: 10}}
                    source={require('../../../img/jifen_bg.png')}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <View style={{marginLeft: 20}}>
                            <Text style={{fontSize:24,color:'#FF5D5D'}}>{rowData.price}</Text>
                            <Text style={{color:'#FF5D5D'}}>{rowData.title}</Text>

                        </View>
                        <View style={{height: 90, with: 0.5, backgroundColor: CommonStyle.lightGray}}>
                        </View>
                        <View style={{flex: 1,paddingLeft:20}}>
                            <Text style={{color:'#FF5D5D'}}>{rowData.des}</Text>
                            <View style={{flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',}}>
                            <Text>{rowData.validity}</Text>
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
                            <Text style={{marginTop:3,fontSize:11,color:'#999'}}>使用说明:{rowData.instructions}</Text>
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
                            <Text style={{fontSize:24,color:'#666'}}>{rowData.price}</Text>
                            <Text>{rowData.title}</Text>

                        </View>
                        <View style={{height: 90, with: 0.5, backgroundColor: CommonStyle.lightGray}}>
                        </View>
                        <View style={{flex: 1,paddingLeft:20}}>
                            <Text>{rowData.des}</Text>
                            <Text>{rowData.validity}</Text>
                            {/*<View style={{height: 0.5,  backgroundColor: CommonStyle.lightGray}}/>*/}
                            <Text style={{marginTop:3,fontSize:11,color:'#999'}}>使用说明:{rowData.instructions}</Text>
                        </View>
                    </View>
                </ImageBackground>
            );
        }

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
