import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Image, ImageBackground, RefreshControl, ScrollView, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";

export default class GiveAdvice extends BaseComponent {
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.title,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            // title: this.props.navigation.state.params.title,
            firstType: this.props.navigation.state.params.title === '咨询建议' ? '发表建议' : '我要投诉',
            secondType: this.props.navigation.state.params.title === '咨询建议' ? '我要咨询' : '我要表扬',
            types: [
                {
                    name: '居家报修',
                    active: 'Register'
                }, {
                    name: '小区报修',
                    active: 'lifePay'
                }, {
                    name: '小区卫生',
                    active: 'Login'
                }, {
                    name: '小区绿化',
                    // active: 'ContactList'
                    active: 'GiveAdvice'
                }, {
                    name: '小区安全',
                    active: 'Login'
                }, {
                    name: '小区安全',
                    active: 'Login'
                }
            ],
        }
    }

    _render() {
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
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Image source={require('../../img/address.png')}
                               style={{width: 37, height: 37, resizeMode: 'contain'}}/>
                        <Text></Text>
                        <View style={{flex: 1, marginLeft: 10}}>
                            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'left', color: '#666666'
                                }}>张三丰</Text>
                                <Text style={{color: '#999999', fontSize: 15}}>电话</Text>
                            </View>

                            <Text style={{
                                fontSize: 17,
                                textAlign: 'left', color: '#666666'
                            }}>地址北京八达岭长城</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20,
                        height: 50, alignItems: 'center', paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff'
                    }}>
                        <Image source={require('../../img/advice_type.png')}
                               style={{width: 18, height: 15, resizeMode: 'contain'}}/>
                        <Text>您要选择的类型是？</Text>
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
        const {firstType, secondType} = this.state
        return (

            <View style={{flexDirection: 'row', flex: 1, paddingTop: 20, paddingBottom: 20, backgroundColor: '#fff'}}>
                <TouchableView onPress={() => {
                    this.showShort(firstType)
                    this.navigate('CommitInfo',{title:firstType})
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
                    this.showShort(secondType)
                    this.navigate('CommitInfo',{title:firstType})
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

}
