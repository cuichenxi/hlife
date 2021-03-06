import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, Text, View} from "react-native";
import {CommonStyle} from "../../../common/CommonStyle";

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from "react-native-vector-icons/Ionicons";
import TouchableView from "../../../components/TouchableView";
import ToastUtil from "../../../utils/ToastUtil";
import Request from "../../../utils/Request";
import globalStore from "../../../store/globalStore";
import {CALL_BACK_PUBLISH_HOUSE} from "../../../constants/ActionTypes";


let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}

/**
 * 修改小区地址
 */
export default class ModifyHousingAddress extends BaseComponent {
    navigationBarProps() {
        return {
            title: '修改小区地址',
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            housingAddress: '选择你所居住的小区',
            element:'选择小区的苑、幢、单元室',
            idType:'选择身份',
            housingId:'',
            elementName:this.props.navigation.state.params.elementName,
            address:this.props.navigation.state.params.address
        }
    }

    onReady(p) {
        this.addEventListener(CALL_BACK_PUBLISH_HOUSE,(e)=>{
            if (e) {
                this.setState({
                    elementName: e.elementName,
                    roomId: e.roomId
                });
            }
        })
    }
    _render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: 40,
                    width: width,
                    textAlign: 'center',
                    flexDirection: 'row',
                    paddingLeft: 5,
                    paddingRight: 5
                }}>
                    <View style={{justifyContent:'center',alignItems:'center',marginLeft:9}}>
                        <Image source={require('../../../img/notice_icon.png')}
                               style={{width: 10, height: 10, resizeMode: 'contain'}}/>
                    </View>
                    <Text style={{color: CommonStyle.textBlockColor, fontSize: 12,marginLeft:9}}>请选择正确的小区地址，你可安全、便捷的使用各类生活服务</Text>
                </View>
                <View style={{backgroundColor: '#ffffff'}}>
                    <Text style={{color: CommonStyle.textBlockColor, padding: 10}}>所居住的小区</Text>
                    <TouchableView onPress={() => {
                        this.navigate('HousingAddressList', {
                            title: '选择小区',
                            api: '/api/user/selectCommunity',
                        },
                             (data) => {
                                this.setState({
                                    housingAddress: data.name,
                                    housingId:data.id
                                })
                        })
                    }}>
                        <View
                            style={{flexDirection: 'row', justifyContent: 'space-between', width: width, padding: 10}}>
                            <Text>{this.state.address.communityName}</Text>
                            <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>
                        </View>
                    </TouchableView>

                    <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray, width: width}}/>
                </View>
                <View style={{backgroundColor: '#ffffff'}}>
                    <Text style={{color: CommonStyle.textBlockColor, padding: 10}}>苑、栋、单元室</Text>
                    <TouchableView onPress={() => {
                        this.navigate('ElementList', {
                            title:'选择苑、幢',
                            api:'/api/user/selectelement',},
                             (data) => {
                                this.setState({
                                    element: data.name
                                })

                        })
                    }}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width, padding: 10}}>
                            <Text>{this.state.address.unitName}</Text>
                            <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>
                        </View>
                    </TouchableView>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray, width: width}}/>
                </View>


                <View style={{
                    height: 40,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 20,
                    borderRadius: 30,
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: '#ffffff', fontSize: 14}}>保存</Text>
                </View>
                <View style={{width: width, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                    <Text style={{fontSize: 12, color: CommonStyle.textGrayColor}}>提交小区地址之后，我们会在一个工作日内核实你的申请</Text>
                </View>

            </View>
        )
    }

    /**
     * 新增小区地址
     * @param page
     * @param callback
     */
    commitRequest(callback) {
        let param = {roomId: 2, identityId: 1};

        Request.post('api/user/addCommunity',param,
            {
                mock: false,
                mockId: 1095626,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data)
            }
        }).catch(err => {

        }).done(() => {
        })
    }
}
