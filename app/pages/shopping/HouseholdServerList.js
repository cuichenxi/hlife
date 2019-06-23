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

    componentWillMount() {
        this.fetchData()
    }

    _render() {
        const {rows} = this.state
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }}>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                <GiftedListView
                    style={{with: width, flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>
        )
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        console.log(this.props)
        Request.post('api/life/housekeeping', param,
            {
                mock: true,
                mockId: 1095356,
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
            <TouchableView onPress={() => {
                this.navigate("HouseholdServer", {data: item})
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
                        <Image source={{uri: item.pic}} style={{
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


    fetchData(page = 1) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('api/user/invoiceList', param,
            {
                mock: true,
                mockId: 1125915,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                this.setState({
                    rows: rep.data.rows
                })
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

}
