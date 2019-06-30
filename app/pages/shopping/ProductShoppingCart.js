import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, StyleSheet, Text, View} from "react-native";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import Step from "../../components/Step";
import ImageView from "../../components/ImageView";
import CheckBox from "../../components/Checkbox";

let {width} = Dimensions.get('window')

export default class ProductShoppingCart extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            invoiceList: [],
            rows: [1, 1, 1, 1,],
            isLoading: false,
            isRefresh: true,
            num: '',
            isOneChecked: false,
        }
    }
    navigationBarProps() {
        return {
            title: '购物车',
        }
    }
    _render() {
        return (
            <View style={{flex: 1}}>

                <FlatList ref={(flatList) => this._flatList = flatList}
                          renderItem={this._renderRowView}
                          onRefresh={() => this.refreshing()}
                          refreshing={this.state.isLoading}
                          onEndReachedThreshold={0.1}
                          data={this.state.rows}
                          style={{marginBottom:65}}
                >
                </FlatList>
                <View style={styles.bottomView}>
                    <TouchableView style={[styles.bottomLeftBt, styles.bottomRow]}
                                   onPress={() => this.state.onButtonPress()}>
                        <CheckBox
                            style={styles.checkBox}
                            onClick={() => {
                                this.setState({
                                    isOneChecked: !this.state.isOneChecked
                                })
                            }}
                            isChecked={this.state.isOneChecked}
                            rightText={'全选'}
                            rightTextStyle={styles.text}
                            checkedImage={<Image source={require('../../img/selted.png')} style={styles.image}/>}
                            unCheckedImage={<Image source={require('../../img/selt.png')} style={styles.image}/>}
                        />
                        <Text style={{fontSize: 14, color: '#333'}}>全选</Text>
                    </TouchableView>
                    <View style={{height: 60, width: 0.5, backgroundColor: CommonStyle.lineColor,}}/>
                    <TouchableView style={[styles.bottomLeftBt, styles.centerBottomRow]} onPress={() => {
                        this.navigate('ShoppingCart')
                    }}>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end',}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Text style={{color: '#333', fontSize: 12, marginBottom: 2}}>共计:￥</Text>
                                <Text style={{color: '#FF3633', fontSize: 20}}>100</Text>
                            </View>
                        </View>
                    </TouchableView>
                    <TouchableView style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 60,
                        width: width / 3,
                    }} onPress={() => this.state.onButtonPress()}>
                        <Text style={{
                            color: CommonStyle.white,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: CommonStyle.themeColor,
                            backgroundColor: CommonStyle.themeColor,
                            paddingTop: 3,
                            paddingBottom: 3,
                            paddingRight: 8,
                            paddingLeft: 8,
                            fontSize: 12,
                        }}>结 算</Text>
                    </TouchableView>
                </View>
            </View>
        );
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {page: page - 1, pageSize: PAGE_SIZE};

        Request.post('api/goods/buycar', param,
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

    _renderRowView = (item) => {
        var isCheck = false

        return (
            <View style={{margin: 10}}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    height: 30,
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <CheckBox
                        style={{
                            backgroundColor: 'white',
                            marginTop: 1,
                            padding: 5,
                            justifyContent: 'center'
                        }}
                        onClick={() => {
                            this.setState({
                                isOneChecked: !this.state.isOneChecked
                            })
                            isCheck = !isCheck
                        }}
                        isChecked={this.state.isOneChecked}
                        rightText={''}
                        // rightTextStyle = {styles.text}
                        checkedImage={<Image source={require('../../img/selted.png')}
                                             style={{marginLeft: 16, width: 14, height: 14,}}/>}
                        unCheckedImage={<Image source={require('../../img/selt.png')}
                                               style={{marginLeft: 16, width: 14, height: 14,}}/>}
                    />
                    <ImageView
                        defaultSource={require("../../img/icon_cart_xiaodian.png")}
                        style={{
                            width: 13,
                            height: 13,
                            marginLeft: 11,
                            marginRight: 10
                        }}
                    />
                    <Text style={{fontSize: 13, color: '#333', marginLeft: 5}}>lilisya小店</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, flex:1}}/>

                <View style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                }}>

                    <CheckBox
                        style={{
                            backgroundColor: 'white',
                            marginTop: 1,
                            justifyContent: 'center'
                        }}
                        onClick={() => {
                            this.setState({
                                isOneChecked: !this.state.isOneChecked
                            })
                            isCheck = !isCheck
                        }}
                        isChecked={this.state.isOneChecked}
                        rightText={''}
                        // rightTextStyle = {styles.text}
                        checkedImage={<Image source={require('../../img/selted.png')}
                                             style={{marginLeft: 16, width: 14, height: 14,}}/>}
                        unCheckedImage={<Image source={require('../../img/selt.png')}
                                               style={{marginLeft: 16, width: 14, height: 14,}}/>}
                    />
                    <ImageView
                        source={'http://ww1.sinaimg.cn/large/61e6b52cly1g4be40k462j204s03smxl.jpg'}
                        // defaultSource={require("../../img/default_head.png")}
                        style={{
                            width: 100,
                            height: 90,
                            marginLeft: 10,
                            marginRight: 10
                        }}
                    />
                    <View style={{flex: 1, marginLeft: 10, justifyContent: 'flex-end'}}>
                        <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Text style={{
                                fontSize: 14,
                                textAlign: 'left', color: '#333'
                            }}>商品名称</Text>
                            <Text style={{
                                fontSize: 11,
                                textAlign: 'left', color: '#999'
                            }}>36码/M码</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            flex: 1
                        }}>
                            <View style={{
                                flex: 1,
                                height: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#ff3633',
                                    fontSize: 20,
                                    fontStyle: 'italic'
                                }}>￥299</Text>
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#999',
                                    textDecorationLine: 'line-through',
                                    fontSize: 10,
                                    marginTop: 3
                                }}>￥899</Text>
                            </View>
                            <Step/>
                        </View>
                    </View>
                </View>
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
        alignSelf: 'center', backgroundColor: '#fff'
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
    marginTop: {
        marginTop: 20
    }, checkBox: {
        backgroundColor: 'white',
        height: 56,
        marginTop: 1,
        justifyContent: 'center'
    },
    image: {
        marginLeft: 16,
        width: 14,
        height: 14,
    },
    bottomRow: {
        flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
    },
    centerBottomRow: {
        alignItems: 'flex-end',
        paddingRight: 5
    }
});

