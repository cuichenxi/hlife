import React from "react";
import {Dimensions, Image, Text, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import Request from "../../utils/Request";
import {PAGE_SIZE} from "../../constants/AppConstants";
import TouchableView from "../../components/TouchableView";
import {BaseView} from "../../components/base/BaseView";
import {CommonStyle} from "../../common/CommonStyle";

const imageUrl = require('../../img/about_logo.png');

/**
 * 房屋租售View
 */
let {width, height} = Dimensions.get('window')

export default class HouseSellRentView extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props
        };
        console.log(this.props)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        console.log(this.props)
        Request.post('api/user/visitor', param,
            {
                mock: true,
                mockId: 1095607,
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

    _renderRowView(item) {
        return (
            <TouchableView>
                <View style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'space-between',
                    padding: 5
                }}>
                    <Image
                        source={imageUrl}
                        style={{
                            width: 100,
                            height: 90,
                            marginLeft: 10,
                        }}
                    />
                    <View style={{ flex:1,marginLeft: 10, justifyContent: 'space-between',marginRight:30}}>

                        <Text style={{
                            fontSize: 15, color: '#333'
                        }}>世纪花苑</Text>
                        <View style={{
                            flexDirection: 'row',
                            // justifyContent: 'flex-start',
                            alignItems:'center',
                            justifyContent:'space-between',
                            flex:1
                        }}>
                            <Text style={{
                                fontSize: 13,
                                color: '#666666'
                            }}>世纪花苑</Text>
                            <Text style={{ fontSize: 13,
                                color: '#666666'}}>15分钟之前</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            flex: 1
                        }}>
                            <Text style={{color: CommonStyle.themeColor, fontSize: 15}}>$499</Text>
                            <Text style={{color: '#999', fontSize: 11}}>15分钟之前</Text>
                        </View>
                    </View>
                    <TouchableView style={{marginRight: 30}}
                        onPress={() => {
                        this.state.onButtonPress()
                    }}>
                        <Image source={require('../../img/bohao_icon.png')}
                               style={{width: 30, height: 30, resizeMode: 'contain'}}/>
                    </TouchableView>
                </View>


            </TouchableView>

        )
    }


    _render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }}>
                <GiftedListView
                    style={{with: width, flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>
        );
    }

}
;
