import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Image, ImageBackground, RefreshControl, ScrollView, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import {COMPLAINTPRAISE, GIVEADVICE, PAGE_SIZE} from "../../constants/AppConstants";
import UserStore from "../../store/UserStore";
import util from "../../utils/util";
import Request from "../../utils/Request";
import {ImageStyle} from "../../common/ImageStyle";

export default class GiveAdvice extends BaseComponent {
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.title,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.title,
            firstType: this.props.navigation.state.params.title === '咨询建议' ? '发表建议' : '我要投诉',
            secondType: this.props.navigation.state.params.title === '咨询建议' ? '我要咨询' : '我要表扬',
            commitType: this.props.navigation.state.params.title === '咨询建议' ? GIVEADVICE : COMPLAINTPRAISE,
            headerUrl: '',
            userName: '',
            userPhone: '',
            rows:[],
            address:''
        }
    }

    onReady(param) {
        let userInfo = UserStore.get();
        this.setState({
            headerUrl: util.stringValue(userInfo.avatar),
            userName: userInfo.userName,
            userPhone: userInfo.phone,
        })

        this.fetchData()
    }

    _render() {
        const {userName, userPhone,address} = this.state
        return (
            <ScrollView style={{
                flex: 1,
                paddingBottom: 68,
            }} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />}>

                <View>
                    <View style={{
                        backgroundColor: 'white',
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Image source={require('../../img/default_head.png')}
                               style={{width: 37, height: 37, resizeMode: ImageStyle.contain}}/>
                        <Text></Text>
                        <View style={{flex: 1, marginLeft: 10}}>
                            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'left', color: '#666666'
                                }}>{userName}</Text>
                                <Text style={{color: '#999999', fontSize: 15}}>{userPhone}</Text>
                            </View>

                            <Text style={{
                                fontSize: 17,
                                textAlign: 'left', color: '#666666'
                            }}>地址:{address}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20,
                        height: 50, alignItems: 'center', paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff'
                    }}>
                        <Image source={require('../../img/advice_type.png')}
                               style={{width: 18, height: 15, resizeMode: ImageStyle.contain}}/>
                        <Text style={{color:'#333',fontSize:16,marginLeft:5}}>您要选择的类型是？</Text>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <View>
                        {this._rendCardView()}
                    </View>

                </View>
            </ScrollView>

        )
    }

    _rendCardView() {
        const {firstType, secondType,commitType} = this.state
        return (

            <View style={{flexDirection: 'row', flex: 1, paddingTop: 20, paddingBottom: 20, backgroundColor: '#fff'}}>
                <TouchableView onPress={() => {
                    this.navigate('CommitInfo', {title: firstType, hideUpload: true,commitType:commitType})
                }}>
                    <ImageBackground style={{alignItems: 'center', justifyContent: 'center', height: 67, width: 107,}}
                                     source={require('../../img/theme_color_bg.png')}>
                        <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginBottom: 5
                        }}>{firstType}</Text>
                    </ImageBackground>
                </TouchableView>
                <TouchableView onPress={() => {
                    this.navigate('CommitInfo', {title: secondType, hideUpload: true,commitType:commitType})
                }}>
                    <ImageBackground style={{alignItems: 'center', justifyContent: 'center', height: 67, width: 107}}
                                     source={require('../../img/white_bg.png')}>
                        <Text style={{
                            color: '#333',
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginBottom: 5
                        }}>{secondType}</Text>
                    </ImageBackground>
                </TouchableView>

            </View>

        )
    }

    fetchData(page = 1) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/user/mycommunityList', param,
            {
                mock: false,
                mockId: 1095864,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState({
                    rows: rep.data
                })
                for (var community of rep.data){
                    if (community.isAuth == 1) {
                        this.setState({
                            address:community.communityName+community.buildingName+community.unitName+community.roomName
                        })
                        break
                    }
                }
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

}
