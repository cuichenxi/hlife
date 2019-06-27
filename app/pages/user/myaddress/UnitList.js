
import {BaseComponent} from "../../../components/base/BaseComponent";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import React from "react";
import TouchableView from "../../../components/TouchableView";
import {Text, View} from "react-native";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import Request from "../../../utils/Request";

/**
 * 单元室列表
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
            elementData:this.props.navigation.state.params.rowData
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
            // this.goBack(rowData)
            // this.push("AddHousingAddress",{elementName:this.state.elementData.name+rowData.name})
            // this.push("AuthPage",{elementName:this.state.elementData.name+rowData.name})
            // this.goBack("AddHousingAddress",{elementName:this.state.elementData.name+rowData.name})
            // this.props.navigation.goBack("AddHousingAddress");
            // this.props.navigation.goBack(null);
            this.pop(2,{elementName:this.state.elementData.name+rowData.name})
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
            if (rep.code == 0 && rep.data) {
                callback(rep.data)
            }
        }).catch(err => {

        }).done(() => {
        })
    }

}
