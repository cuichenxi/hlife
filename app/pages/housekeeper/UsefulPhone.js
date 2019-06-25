import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, Text, View,Linking} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
import Modal from "antd-mobile-rn/es/modal/index.native";


let {width, height} = Dimensions.get('window')

export default class UsefulPhone extends BaseComponent{
    navigationBarProps() {
        return {
            title: '常用电话',
        }
    }
    _render() {
        return (
            <View style={{flex:1}}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: '#fff'
                }}>
                    <Image source={require('../../img/telephone.png')}
                           style={{width: 16, height: 16, resizeMode: 'contain'}}/>
                    <Text style={{
                        color: CommonStyle.textGrayColor,
                        padding: 3,
                        fontSize: 10
                    }}>小区服务电话</Text>
                </View>
                <GiftedListView
                    style={{with: width, flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>
        );
    }

    onButtonClick = (tel) => {
        Modal.alert('提示', '是否拨打电话', [
            { text: '取消', onPress: () => {console.log('cancel')}, style: 'cancel' },
            { text: '确定', onPress: () => {
                console.log('ok')
                    Linking.openURL(`tel:${tel}`)
            } },
        ]);
    };

    _renderRowView(item) {
        return (
            <View style={{
                backgroundColor: 'white',
                height:60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-between',
                // padding: 10,
                paddingLeft: 10,
                paddingRight: 10,
            }}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../../img/head_icon.png')}
                           style={{width: 37, height: 37, resizeMode: 'contain'}}/>
                    <View style={{justifyContent:'center',alignItems:'flex-start',marginLeft: 10}}>
                        <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor,fontSize:14}}>{item.name}</Text>
                        <Text style={{textAlign: 'center', color: CommonStyle.textGrayColor,fontSize:13}}>{item.tel}</Text>
                    </View>
                </View>
                <TouchableView onPress={()=>{
                    this.onButtonClick(item.tel)
                }}>
                    <Image source={require('../../img/phone_icon.png')}
                           style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                </TouchableView>

            </View>

        )
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/life/contactList', param,
            {
                mock: false,
                mockId: 1184127,
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
