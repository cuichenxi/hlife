import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
import GiftedListView from "../../components/refreshList/GiftedListView";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImageView from "../../components/ImageView";
import util from "../../utils/util";

let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}

export default class HouseholdServerList extends BaseComponent {
    navigationBarProps() {
        return {
            title: '家政服务',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            invoiceList: [],
            rows: [],
            isLoading: false,
            isRefresh: true,
        }
    }

    /* componentWillMount() {
         this.fetchData()
     }*/

    _render() {
        const {rows} = this.state
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
                <GiftedListView
                    style={{ flex: 1, marginTop: 10}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>
        )
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {page: page - 1, pageSize: PAGE_SIZE};

        console.log(this.props)
        Request.post('/api/life/housekeeping', param,
            {
                mock: false,
                mockId: 1095356,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null,{emptyTitle: rep.message})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    _renderRowView(item) {
        return (
            <TouchableView onPress={() => {
                this.navigate("HouseholdServer", {id: item.id})
            }}>
                <View style={{
                    backgroundColor: 'white',
                    height: 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // padding: 10,
                }}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <ImageView source={item.pic}
                                   defaultSource={require("../../img/default_image.png")}
                                   style={{
                                       width: 37,
                                       height: 37, alignItems: 'center', marginLeft: 12
                                   }} resizeMode='cover'/>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 15}}>
                            <Text style={{
                                color: '#333',
                                padding: 3,
                                fontSize: 15
                            }}>{item.title}</Text>
                            <Text style={{
                                color: '#999',
                                padding: 3,
                                fontSize: 13
                            }}>业务简介:{item.intro}</Text>
                        </View>
                    </View>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        paddingRight: 10
                    }}>
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>

                </View>
            </TouchableView>

        )
    }

}
