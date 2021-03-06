import {BaseComponent} from "../../../components/base/BaseComponent";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import React from "react";
import TouchableView from "../../../components/TouchableView";
import {Text, View} from "react-native";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";

/**
 * 选择小区
 */
export default class HousingAddressList extends BaseComponent{
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.title,//上个页面传递的标题
        }
    }

    constructor(props) {
        super(props);
        this.state=({
            api:this.props.navigation.state.params.api
        })
    }

    _render(){
        return(
            <GiftedListView
                style={{width:'100%',marginTop:10}}
                rowView={this._renderRowView.bind(this)}
                onFetch={this.makeRemoteRequest.bind(this)}
                loadMore={false}
                pagination={false}
            />
        )
    }

    _renderRowView(rowData){
        if (this.state.api === '/api/user/mycommunityList') {
            return(<TouchableView onPress={() => {this.goBack(rowData)}}>
                <View style={{justifyContent: 'center',alignItems:'flex-start',height:40,width: '100%',backgroundColor:'#fff',paddingLeft:15}}>
                    <Text>{rowData.communityName}</Text>
                </View>
            </TouchableView>)
        } else {
            return(<TouchableView onPress={() => {this.goBack(rowData)}}>
                <View style={{justifyContent: 'center',alignItems:'flex-start',height:40,width: '100%',backgroundColor:'#fff',paddingLeft:15}}>
                    <Text>{rowData.name}</Text>
                </View>
            </TouchableView>)
        }
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {page: page - 1, pageSize: PAGE_SIZE};

        console.log(this.state.api)
        Request.post(this.state.api,param,
            {
                mock: false,
                mockId: 1095630,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data)
            } else {
                callback(null,{emptyTitle: '暂无小区'})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

}
