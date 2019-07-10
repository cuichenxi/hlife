import React from "react";
import {Dimensions, Image, ImageBackground, Text, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {CommonStyle} from "../../../common/CommonStyle";
import CheckBox from "../../../components/Checkbox";
import TouchableView from "../../../components/TouchableView";
import util from "../../../utils/util";
import UserStore from "../../../store/UserStore";

/**
 * 红包
 */
let {width} = Dimensions.get('window')

export default class IntegralRedPacketView extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
            datas:[],
            redpacketIdList:[],
            // integralCount:0

        };
    }

    makeRemoteRequest(page = 1, callback) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/goods/redPacketList', param,
            {
                mock: false,
                mockId: 1095607,
            }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                this.state.datas = []
                for (var row of rep.data.rows){

                    row.checked = false
                    this.state.datas.push(row)
                }
                callback(this.state.datas, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null, {emptyTitle: rep.message})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    _renderRowView(item,sectionId,index) {
        return (
            <ImageBackground style={{flexDirection: 'row',alignItems:'center',justifyContent:'space-between',height:90}} source={require('../../../img/jifen_bg.png')}>
                <Image source={require('../../../img/hongbao_icon.png')} style={{width:41,
                    height:44, alignItems:'center',marginLeft: 30}} resizeMode='cover'/>
                <View style={{alignItems:'flex-start',justifyContent:'center'}}>

                    <Text style={{textAlign: 'center', color: '#333',fontSize:16}}>{item.title?item.title:''}</Text>
                    <Text style={{textAlign: 'center', color: '#888', fontSize: 11}}>{item.score?item.score:''}积分可兑换</Text>
                </View>
                <CheckBox
                    style={{backgroundColor:'white',
                        height:56,
                        marginTop:1,
                        justifyContent:'center',marginRight: 30}}
                    onClick={()=>{
                        var data = this.state.datas;
                        var redpacketIdList = this.state.redpacketIdList;

                        data[index].checked = !item.checked
                        if (data[index].checked){
                            redpacketIdList.push(item.id)
                        }
                        this.setState({
                            datas:data,
                            redpacketIdList:redpacketIdList
                        })

                    }}
                    isChecked={item.checked}
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
                    style={{ flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                    pagination={false}
                    renderSeparator={() => {return (null);}}
                    onRef={(ref)=>{
                        this.listRef = ref;
                    }}
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
                    this.exchangeRedPacket()
                }}>
                    <Text style={{color: '#ffffff', fontSize: 14}}>确认兑换</Text>
                </TouchableView>
            </View>
        );
    }

    exchangeRedPacket() {
        const {redpacketIdList,datas} = this.state

        if (util.isArrayEmpty(datas)){
            this.showShort('暂无数据')
            return
        }
        if (util.isArrayEmpty(redpacketIdList)) {
            this.showShort('请选择可兑换红包的积分')
            return
        }
        let param = { redpacketIdList: redpacketIdList};

        Request.post('/api/goods/exchangeRedPacket', param,
            {
                mock: false,
                mockId: 1095607,
            }).then(rep => {
            if (rep.code == 0 ) {
                // this.listRef._refresh();
                // this.state.onBackPress()
                this.showShort(rep.message)
                this.getHomeData()
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
    }

    getHomeData() {
        Request.post('/api/user/getuserinfo', {}).then(rep => {
            if (rep.code === 0 && rep.data) {
                UserStore.save({
                    redCount: rep.data.redCount,
                    integralCount: rep.data.integralCount,
                });

                this.state.onIntegralCountChange(rep.data.integralCount)

                this.listRef._refresh();
            }
        }).catch(err => {

        }).done(() => {
            this.setState({refreshing: false});
        })
    }

}
;
