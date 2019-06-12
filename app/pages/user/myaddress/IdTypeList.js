import {BaseComponent} from "../../../components/base/BaseComponent";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import React from "react";
import TouchableView from "../../../components/TouchableView";
import {Text, View} from "react-native";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";

/**
 * 身份列表
 */
export default class IdTypeList extends BaseComponent{
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
                style={{width:'100%'}}
                rowView={this._renderRowView.bind(this)}
                onFetch={this.makeRemoteRequest.bind(this)}
                loadMore={true}
            />
        )
    }

    _renderRowView(rowData){
        return(<TouchableView onPress={() => {this.goBack(rowData)}}>
            <View style={{justifyContent: 'center',alignItems:'flex-start',height:40,width: '100%',backgroundColor:'#fff',paddingLeft:15}}>
                <Text>{rowData.name}</Text>
            </View>
        </TouchableView>)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('api/user/idList',param,
            {
                mock: true,
                mockId: 1095629,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data.rows,{allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
        })
    }

}
