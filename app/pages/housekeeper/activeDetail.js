import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";

let {width, height} = Dimensions.get('window')

export default class Payment extends BaseComponent {
    navigationBarProps() {
        return {
            title: '活动详情',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isOneChecked: false,
            data: {
                imageUrl: "",
                activityName: "",
                activityDate: "",
                activityContent: "",
                activityNum: "",
                id: 0,
                status: "报名中"
            },
            // id:0,

        }
    }

    /**
     imageUrl activityName activityDate activityContent activityNum id
     */
    onReady(e) {
        this.setTitle(e.activityName);
        this.setState({
            data: e,
        })

        this.requestData(e.id)
    }

    requestData(id) {
        Request.post('/api/neighbour/activityInfo', {id:id},
            {
                mock: false,
                mockId: 1095640,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setData({
                    data:rep.data
                })
            }
        }).catch(err => {

        }).done(() => {
            this.setState({refreshing: false});
        })

    }

    onApply() {
        this.showShort("xx")
        // Request.post('/api/steward/basci', {},).then(rep => {
        //     if (rep.code == 0 && rep.data) {
        //         // this.setData(rep.data)
        //     }
        // }).catch(err => {
        //
        // }).done(() => {
        //     this.setState({refreshing: false});
        // })
    }

    _render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', paddingHorizontal: 15, marginTop: 15}}>
                    <Text style={{fontSize: 12, color: '#999', flex: 1}}>{this.state.data.activityDate}</Text>
                    <Text style={{fontSize: 12, color: '#999'}}>{this.state.data.status == 1 ? '报名中' : '活动已结束'}</Text>
                </View>
                <Text style={{fontSize: 18, color: '#666', padding: 15}}>{this.state.data.activityContent}</Text>
                {this.state.data.status === 1 &&
                <TouchableView style={{
                    position: CommonStyle.absolute,
                    bottom: 100,
                    height: 40,
                    left: 20,
                    right: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: CommonStyle.themeColor,
                    borderRadius: 20
                }} onPress={() => {
                    this.onApply();
                }}>
                    <Text style={{fontSize: 18, color: '#fff', padding: 15}}>报名</Text>
                </TouchableView>
                }
            </View>
        );
    }


}
