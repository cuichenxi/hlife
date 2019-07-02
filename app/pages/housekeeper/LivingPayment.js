import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TouchableView from "../../components/TouchableView";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import CheckBox from "../../components/Checkbox";
let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}
/**
 * 物业缴费
 */
export default class LivingPayment extends  BaseComponent{
    navigationBarProps() {
        return {
            title: '物业缴费'
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            isOneChecked:false,
            isTwoChecked:false,
            isThreeChecked:false,
            communityinfo:'北京',
            isLoading: false,
            isRefresh: true,
            rows:[]
        }
    }

    onReady(){
        this.makeRemoteRequest()
    }
    refreshing = () => {

    }

    _render() {
        const {communityinfo,rows} = this.state
        return (
            <View style={styles.container}>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
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
                    <Text style={{color: CommonStyle.textBlockColor, fontSize: 15,paddingLeft:5}}>{communityinfo}</Text>
                </View>
                <ScrollView style={{
                    flex: 1,
                    height: 1000,
                    flexDirection: 'column'
                }} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />}>
                    {/*<GiftedListView
                        style={{with: width, flex: 1,marginLeft: 10,marginRight: 10}}
                        rowView={this._renderRowView.bind(this)}
                        onFetch={this.makeRemoteRequest.bind(this)}
                        loadMore={false}
                        renderSeparator={() => {return (null);}}
                    />*/}
                    <FlatList ref={(flatList) => this._flatList = flatList}
                              ItemSeparatorComponent={this._separator}
                              renderItem={this._renderItem}

                              onRefresh={() => this.refreshing()}
                              refreshing={this.state.isLoading}

                              onEndReachedThreshold={0.1}
                        // onEndReached={
                        //     () => this._onLoadMore()
                        // }


                              data={rows}>

                    </FlatList>
                </ScrollView>

                <View style={styles.bottomView}>
                    <TouchableView style={[styles.bottomLeftBt,styles.bottomRow]} onPress={() => this.state.onButtonPress()}>
                        <CheckBox
                            style={styles.checkBox}
                            onClick={()=>{
                                this.setState({
                                    isOneChecked:!this.state.isOneChecked
                                })
                            }}
                            isChecked={this.state.isOneChecked}
                            rightText={'全选'}
                            rightTextStyle = {styles.text}
                            checkedImage = {<Image source = {require('../../img/selted.png')} style = {styles.image}/>}
                            unCheckedImage = {<Image source = {require('../../img/selt.png')} style = {styles.image}/>}
                        />
                        <Text style={{fontSize:14,color:'#333'}}>全选</Text>
                    </TouchableView>
                    <View style={{height: 60, width: 0.5, backgroundColor: CommonStyle.lineColor,}}/>
                    <TouchableView style={[styles.bottomLeftBt,styles.centerBottomRow]} onPress={() => {this.navigate('ShoppingCart')}}>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end',}}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
                                <Text style={{color: '#333', fontSize: 12,marginBottom:2}}>共计:￥</Text>
                                <Text style={{color: '#FF3633', fontSize: 20}}>100</Text>
                            </View>
                            <Text style={{color: '#666666', fontSize: 11}}>已选0项</Text>
                        </View>
                    </TouchableView>
                    <TouchableView style={{
                        alignItems: 'center',
                        backgroundColor: CommonStyle.drakGray,
                        justifyContent: 'center',
                        height: 60,
                        width: width / 3,
                    }} onPress={() => this.state.onButtonPress()}>
                        <Text style={{color: 'white',fontSize:16}}>去缴费</Text>
                    </TouchableView>
                </View>
            </View>
        );
    }

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray}}/>;
    }

    makeRemoteRequest(page = 1) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};

        Request.post('api/steward/propertyfeepaylist', param,
            {
                mock: true,
                mockId: 1125376,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                this.setState({
                    rows:rep.data.rows
                })
                // callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    _renderItem=(item) => {
        var isCheck = false
        return (
            <View style={{
                backgroundColor: 'white',
                height:80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-between',
                marginBottom:12,
                paddingLeft: 24,
                paddingRight: 30,
            }}>
                <CheckBox
                    style={styles.checkBox}
                    onClick={()=>{
                        this.setState({
                            isOneChecked:!this.state.isOneChecked
                        })
                        isCheck = !isCheck
                    }}
                    isChecked={this.state.isOneChecked}
                    rightText={''}
                    rightTextStyle = {styles.text}
                    checkedImage = {<Image source = {require('../../img/selted.png')} style = {styles.image}/>}
                    unCheckedImage = {<Image source = {require('../../img/selt.png')} style = {styles.image}/>}
                />
                <View style={{alignItems:'flex-start',justifyContent:'center'}}>
                    <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor, fontSize: 14}}>{item.item.yearList.id}</Text>
                    <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor, fontSize: 17}}>待缴费</Text>
                </View>
                <TouchableView onPress={()=>{
                    this.navigate("LivingPaymentDetail",{yearId:item.item.yearList.id})
                }}>
                    <Text style={{
                        color: CommonStyle.themeColor,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: CommonStyle.themeColor,
                        paddingTop:5,
                        paddingBottom:5,
                        paddingRight:15,
                        paddingLeft:15,
                        fontSize: 14
                    }}>选择明细</Text>
                </TouchableView>

            </View>

        )
    }

    _renderRowView(item) {
        var isCheck = false
        return (
            <View style={{
                backgroundColor: 'white',
                height:80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-between',
                marginBottom:12,
                paddingLeft: 24,
                paddingRight: 30,
            }}>
                <CheckBox
                    style={styles.checkBox}
                    onClick={()=>{
                        this.setState({
                            isOneChecked:!this.state.isOneChecked
                        })
                        isCheck = !isCheck
                    }}
                    isChecked={this.state.isOneChecked}
                    rightText={''}
                    rightTextStyle = {styles.text}
                    checkedImage = {<Image source = {require('../../img/selted.png')} style = {styles.image}/>}
                    unCheckedImage = {<Image source = {require('../../img/selt.png')} style = {styles.image}/>}
                />
                <View style={{alignItems:'flex-start',justifyContent:'center'}}>
                    <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor, fontSize: 14}}>{item.yearList.id}</Text>
                    <Text style={{textAlign: 'center', color: CommonStyle.textBlockColor, fontSize: 17}}>待缴费</Text>
                </View>
                <TouchableView onPress={()=>{
                    this.navigate("LivingPaymentDetail")
                }}>
                    <Text style={{
                        color: CommonStyle.themeColor,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: CommonStyle.themeColor,
                        paddingTop:5,
                        paddingBottom:5,
                        paddingRight:15,
                        paddingLeft:15,
                        fontSize: 14
                    }}>选择明细</Text>
                </TouchableView>

            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    banner: {height: 180,},
    slide: {
        height: 180,
        resizeMode: Image.resizeMode.stretch,
    },
    bottomIcon: {
        width: 15, height: 15, resizeMode: 'contain'
    },
    bottomView: {
        flexDirection: 'row', justifyContent: 'space-between', width: width, position: 'absolute',
        bottom: 0,
        height: 60,
        alignSelf: 'center'
    }
    ,
    bottomLeftBt: {
        alignItems: 'center',
        backgroundColor: CommonStyle.white,
        justifyContent: 'center',
        height: 60,
        width: width / 3,
    },
    marginBottom: {
        marginBottom: 20
    },
    marginTop:{
        marginTop:20
    },checkBox:{
        backgroundColor:'white',
        height:56,
        marginTop:1,
        justifyContent:'center'
    },
    image:{
        marginLeft:16,
        width:14,
        height:14,
    },
    bottomRow:{
        flexDirection: 'row', justifyContent: 'flex-start',alignItems:'center'
    },
    centerBottomRow:{
        alignItems: 'flex-end',
        paddingRight: 5
    }
});
