import {BaseComponent} from "../../../components/base/BaseComponent";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import React from "react";
import TouchableView from "../../../components/TouchableView";
import {Text, View} from "react-native";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";
import ToastUtil from "../../../utils/ToastUtil";

/**
 * 选择苑、栋列表
 */
export default class ElementList extends BaseComponent{
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.title,//上个页面传递的标题
        }
    }

    constructor(props) {
        super(props);
        this.state=({
            api:this.props.navigation.state.params.api,
            housingId:this.props.navigation.state.params.housingId,
            from:this.props.navigation.state.params.from
        })
    }

    _render(){
        return(
            <GiftedListView
                style={{width:'100%'}}
                rowView={this._renderRowView.bind(this)}
                onFetch={this.makeRemoteRequest.bind(this)}
                loadMore={false}
            />
        )
    }

    _renderRowView(rowData){
        return(<TouchableView onPress={() => {
            this.push('UnitList', {
                title:'选择单元',
                api:'/api/user/selectunit',
                buildingId:this.state.housingId,
                rowData:rowData,
                from:this.state.from,
            })
        }}>
            <View style={{justifyContent: 'center',alignItems:'flex-start',height:40,width: '100%',backgroundColor:'#fff',paddingLeft:15}}>
                <Text>{rowData.name}</Text>
            </View>
        </TouchableView>)
    }

    makeRemoteRequest(page = 1,callback) {
        let param = {page: page - 1, pageSize: PAGE_SIZE,communityId:this.state.housingId};

        Request.post('/api/user/selectelement',param,
            {
                mock: false,
                mockId: 1095629,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data,)
            }
        }).catch(err => {

        }).done(() => {
        })
    }

}
