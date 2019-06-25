import {BaseComponent} from "../../components/base/BaseComponent";
import GiftedListView from "../../components/refreshList/GiftedListView";
import React from "react";
import TouchableView from "../../components/TouchableView";
import {Text, View} from "react-native";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";

/**
 * 话题列表列表
 */
export default class TopicTypeList extends BaseComponent{
    navigationBarProps() {
        return {
            title: '选择话题',//上个页面传递的标题
        }
    }

    constructor(props) {
        super(props);
        this.state=({

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
        return(<TouchableView onPress={() => {this.goBack(rowData)}}>
            <View style={{justifyContent: 'center',alignItems:'flex-start',height:40,width: '100%',backgroundColor:'#fff',paddingLeft:15}}>
                <Text>{rowData.name}</Text>
            </View>
        </TouchableView>)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/neighbour/topic',param,
            {
                mock: false,
                mockId: 1095629,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data)
            }
        }).catch(err => {

        }).done(() => {
        })
    }

}