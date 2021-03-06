import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Text, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import TouchableView from "../../components/TouchableView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";

export default class ElectronicKey extends BaseComponent{
    navigationBarProps() {
        return {
            title: '门锁',
        }
    }
    _render() {
        return (
            <GiftedListView
                style={{width:'100%',marginTop:10}}
                rowView={this._renderRowView.bind(this)}
                onFetch={this.makeRemoteRequest.bind(this)}
                loadMore={false}
                pagination={false}
            />
        );
    }
    _renderRowView(rowData){
        return(<TouchableView onPress={() => {this.makeElectronicKeyRequest(rowData.id)}}>
            <View style={{justifyContent: 'center',alignItems:'flex-start',height:40,width: '100%',backgroundColor:'#fff',paddingLeft:15}}>
                <Text>{rowData.name}</Text>
            </View>
        </TouchableView>)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/steward/lockList',param,
            {
                mock: false,
                mockId: 1095629,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data)
            } else {
                callback(null, {emptyTitle: rep.message})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
        }).done(() => {
            this.hideLoading()
        })
    }
    makeElectronicKeyRequest(lockId) {
        let param = {lockId: lockId};
        this.showDLoading()

        Request.post('/api/steward/electronicKey',param,
            {
                mock: false,
                mockId: 1095629,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.navigate('TrafficPermit', {data: rep.data,fromElectronKey:true})
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
        })
    }
}
