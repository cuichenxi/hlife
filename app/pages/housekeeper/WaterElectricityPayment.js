import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, ImageBackground, Linking, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";

let {width, height} = Dimensions.get('window')

// 一些常量设置
const cols = 4; // 列数
const left = 10; // 左右边距
const top = 10; // 上下边距
const ImageWH = (width - (cols + 1) * left) / cols; // 图片大小
import {LINK_APIPAYS_CZ, LINK_APIPAYS_EXPRESS, LINK_APIPAYS_JF} from "../../constants/UrlConstant";
import {ImageStyle} from "../../common/ImageStyle";
export default class WaterElectricityPayment extends BaseComponent {
    navigationBarProps() {
        return {
            title: '水电气缴费',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {uri: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4demz4797j203q03qmx0.jpg',type:'水费'},
                {uri: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4demz3xbcj203q03qq2s.jpg',type:'电费'},
                {uri: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4demz43fyj203q03qjr9.jpg',type:'燃气费'},
                {uri: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4demz7fuhj203r03rt8k.jpg',type:'有线电视'},
                {uri: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4demz7c2sj203q03qmx0.jpg',type:'固话'},
                {uri: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4demz4b5yj203q03qglh.jpg',type:'宽带'},
                {uri: 'http://ww1.sinaimg.cn/large/61e6b52cly1g4demz3ntaj203r03rq2s.jpg',type:'物业费'}
            ]
        }
    }

    _keyExtractor = (item, index) => {
        return item.uri + index
    }

    _render() {
        return (
            <View style={{flex: 1,backgroundColor:'#fff'}}>
                <ImageBackground
                    style={{alignItems: 'center', justifyContent: 'center', height: 120, flexDirection: 'row'}}
                    source={require('../../img/login_bg.png')}>
                    <Image source={require('../../img/yiju_logo.png')} style={{
                        width: 85,
                        height: 33, alignItems: 'center'
                    }} resizeMode='cover'/>
                    <Image source={require('../../img/connect_icon.png')} style={{
                        width: 20,
                        height: 20, alignItems: 'center'
                    }} resizeMode='cover'/>
                    <Image source={require('../../img/alipay_logo.png')} style={{
                        width: 111,
                        height: 33, alignItems: 'center'
                    }} resizeMode='cover'/>
                </ImageBackground>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: '#fff'
                }}>
                    <Image source={require('../../img/notice_icon.png')}
                           style={{width: 10, height: 10, resizeMode: ImageStyle.contain}}/>
                    <Text style={{
                        color: CommonStyle.textGrayColor,
                        padding: 3,
                        fontSize: 10
                    }}>该服务需要您跳转到支付宝-生活缴费页面</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: '#fff'
                }}>
                    <Image source={require('../../img/theme_label.png')}
                           style={{width: 20, height: 20, resizeMode: ImageStyle.contain}}/>
                    <Text style={{
                        color: CommonStyle.textBlockColor,
                        padding: 3,
                        fontSize: 16
                    }}>您可进行下列费用的缴纳</Text>
                </View>
                <FlatList
                    style={{backgroundColor: '#fff',flex:1}}
                    renderItem={this.renderRow}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    numColumns={cols}
                    // columnWrapperStyle={styles.columnStyle}
                    horizontal={false}
                />

                <TouchableView onPress={() => {
                    Linking.openURL(LINK_APIPAYS_JF).catch(err => this.showShort("未检测到支付宝"));
                }}>
                    <View style={{
                        height: 40,
                        marginLeft: 30,
                        marginRight: 30,
                        borderRadius: 5,
                        marginBottom:50,
                        backgroundColor: '#118be3',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{color: '#ffffff', fontSize: 14}}>立刻打开支付宝</Text>
                    </View>
                </TouchableView>

            </View>
        );
    }

    // 返回cell
    renderRow(rowData) {
        console.log('rowData', rowData)
        return (
            <View style={{
                width: ImageWH,
                height: ImageWH + 20,
                marginLeft: left,
                marginTop: top,
                // 文字内容居中对齐
                alignItems: 'center'
            }}>
                <Image source={{uri: rowData.item.uri}} style={{
                    width: ImageWH-20,
                    height: ImageWH-20,
                }}/>
                <Text style={{color: CommonStyle.textBlockColor, fontSize: 13,marginTop:5}}>{rowData.item.type}</Text>
            </View>
        );
    }
}
