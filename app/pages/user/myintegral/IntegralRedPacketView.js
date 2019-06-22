import React from "react";
import {Dimensions, Image, ImageBackground, Text, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {CommonStyle} from "../../../common/CommonStyle";
import CheckBox from "../../../components/Checkbox";
import TouchableView from "../../../components/TouchableView";

/**
 * 红包
 */
let {width, height} = Dimensions.get('window')

export default class IntegralRedPacketView extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            isOneChecked:false,
        };
        console.log(this.props)
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {statusBODY: this.state.index, page: page - 1, pageSize: PAGE_SIZE};

        console.log('==========')
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
            <ImageBackground style={{flexDirection: 'row',alignItems:'center',justifyContent:'space-between',height:90}} source={require('../../../img/jifen_bg.png')}>
                <Image source={require('../../../img/hongbao_icon.png')} style={{width:41,
                    height:44, alignItems:'center',marginLeft: 30}} resizeMode='cover'/>
                <View style={{alignItems:'flex-start',justifyContent:'center'}}>

                    <Text style={{textAlign: 'center', color: '#333',fontSize:16}}>商城5元无门槛红包</Text>
                    <Text style={{textAlign: 'center', color: '#888', fontSize: 11}}>500积分可兑换</Text>
                </View>
                <CheckBox
                    style={{backgroundColor:'white',
                        height:56,
                        marginTop:1,
                        justifyContent:'center',marginRight: 30}}
                    onClick={()=>{
                        this.setState({
                            isOneChecked:!this.state.isOneChecked
                        })
                    }}
                    isChecked={this.state.isOneChecked}
                    // rightText={''}
                    checkedImage = {<Image source = {require('../../../img/checked.png')} style = {{marginLeft:16,
                        width:20,
                        height:20,}}/>}
                    unCheckedImage = {<Image source = {require('../../../img/uncheck.png')} style = {{marginLeft:16,
                        width:20,
                        height:20,}}/>}
                />
            </ImageBackground>


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
                    renderSeparator={() => {return (null);}}
                />
                <TouchableView style={{
                    height: 40,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    marginBottom:10,
                    borderRadius: 30,
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=>{
                    this.showShort('红包兑换')
                }}>
                    <Text style={{color: '#ffffff', fontSize: 14}}>确认兑换</Text>
                </TouchableView>
            </View>
        );
    }

}
;
