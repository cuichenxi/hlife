
import {BaseComponent} from "../../../components/base/BaseComponent";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import React from "react";
import TouchableView from "../../../components/TouchableView";
import {Text, View} from "react-native";
import {FROMAUTH, PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";
import {CALL_BACK_PUBLISH_HOUSE, CALL_BACK_TEST} from "../../../constants/ActionTypes";
import util from "../../../utils/util";

/**
 * 单元列表
 */
export default class UnitList extends BaseComponent{
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.title,//上个页面传递的标题
        }
    }

    constructor(props) {
        super(props);
        this.state=({
            api:this.props.navigation.state.params.api,
            elementData:this.props.navigation.state.params.rowData,
            buildingId:this.props.navigation.state.params.buildingId,
            from:this.props.navigation.state.params.from,
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
        return(<TouchableView onPress={() => {
            if (this.state.from !== FROMAUTH) {
                this.push('RoomList', {
                    title:'选择房号',
                    api:'/api/user/selectroom',
                    unitId:rowData.id,
                    rowData:rowData,
                    buildingId:this.state.elementData.id
                })
            } else {
                this.sendEvent(CALL_BACK_PUBLISH_HOUSE,{elementName:this.state.elementData.name+'-'+rowData.name,unitId:rowData.id,buildingId:this.state.elementData.id})
                this.pop(2);
            }

        }}>
            <View style={{justifyContent: 'center',alignItems:'flex-start',height:40,width: '100%',backgroundColor:'#fff',paddingLeft:15}}>
                <Text>{rowData.name}</Text>
            </View>
        </TouchableView>)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {page: page - 1, pageSize: PAGE_SIZE,buildingId:this.state.elementData.id};

        Request.post('/api/user/selectunit',param,
            {
                mock: false,
                mockId: 1095629,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data)) {
                callback(rep.data)
            } else {
                callback(null,{emptyTitle: '暂无单元'})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

}
