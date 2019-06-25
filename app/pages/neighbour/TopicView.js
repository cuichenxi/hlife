import React from "react";
import {Dimensions, Image, ImageBackground, Text, View} from "react-native";
import {BaseView} from "../../components/base/BaseView";
import GiftedListView from "../../components/refreshList/GiftedListView";
import Request from "../../utils/Request";
import {PAGE_SIZE} from "../../constants/AppConstants";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import ImageView from "../../components/ImageView";
import GridView from "../../components/GridView";

/**
 * 话题view
 */
let {width, height} = Dimensions.get('window')

export default class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            liked: false
        };
        console.log(this.props)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {status: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        console.log('==========')
        console.log(this.props)
        Request.post('/api/neighbour/invitation/list', param,
            {
                mock: false,
                mockId: 1218198,
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
            <TouchableView >
                <View style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    padding: 5
                }}>
                    <Image
                        source={{uri:item.pic}}
                        style={{
                            width: 118,
                            height: 86,
                            marginLeft: 10,
                        }}
                    />
                    <View style={{flex: 1, marginLeft: 10,justifyContent:'flex-start',alignItems:'flex-start'}}>
                        <Text style={{
                            fontSize: 14,
                            textAlign: 'left', color: '#333'
                        }}>{item.name}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{
                                fontSize: 12,
                                textAlign: 'left', color: '#999'
                            }}>{item.des}</Text>
                        </View>


                    </View>
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

    _renderGridView(item) {
        return (
            <GridView
                style={{
                    flex: 1,
                    paddingBottom: 10,
                    marginTop: 10,
                    backgroundColor: '#fff',
                    marginRight: 10,
                    marginLeft: 10
                }}
                items={item}
                num={2}
                renderItem={this._renderGridItem.bind(this)}
            />
        );
    }


    _renderGridItem(item, index) {
        return (
            <ImageView source={{uri: item}}
                       style={{
                           width: 175,
                           height: 131,
                           resizeMode: "cover",
                           padding: 5,
                       }}/>
        )
    }

}
;
