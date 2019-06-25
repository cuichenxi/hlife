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
                {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850063210&di=b936ead7972601ea0c12e8648a8f1df0&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140403%2F0020033029624335_b.jpg'},
                {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850063216&di=0f4f9bbaaee6bafe24fab3e5f472c481&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201512%2F12%2F20151212120309_BduTC.jpeg'},
                {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850063214&di=f73de557becc9667bb105fdfecd39426&imgtype=0&src=http%3A%2F%2Fimgq.duitang.com%2Fuploads%2Fitem%2F201503%2F22%2F20150322171820_UtwMk.thumb.700_0.jpeg'},
                {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850063210&di=b936ead7972601ea0c12e8648a8f1df0&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140403%2F0020033029624335_b.jpg'},
                {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850063210&di=b936ead7972601ea0c12e8648a8f1df0&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140403%2F0020033029624335_b.jpg'},
                {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850155795&di=72f9878782ad4b80ea320111effe0b71&imgtype=0&src=http%3A%2F%2Fpic27.photophoto.cn%2F20130420%2F0005018421916914_b.jpg'},
                {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850155794&di=4efaecca3f367346ff49c42f8f89d9f2&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201206%2F26%2F20120626190359_MjB3s.thumb.700_0.jpeg'}
            ]
        }
    }

    _keyExtractor = (item, index) => {
        return item.uri + index
    }

    _render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground
                    style={{alignItems: 'center', justifyContent: 'center', height: 120, flexDirection: 'row'}}
                    source={require('../../img/about_logo.png')}>
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
                           style={{width: 10, height: 10, resizeMode: 'contain'}}/>
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
                           style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                    <Text style={{
                        color: CommonStyle.textBlockColor,
                        padding: 3,
                        fontSize: 16
                    }}>您可进行下列费用的缴纳</Text>
                </View>
                <FlatList
                    style={{backgroundColor: '#fff'}}
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
                        backgroundColor: CommonStyle.themeColor,
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
                height: ImageWH * 0.8 + 20,
                marginLeft: left,
                marginTop: top,
                // 文字内容居中对齐
                alignItems: 'center'
            }}>
                <Image source={{uri: rowData.item.uri}} style={{
                    width: ImageWH,
                    height: ImageWH * 0.8,
                }}/>
                <Text style={{color: CommonStyle.textBlockColor, fontSize: 13}}>水费</Text>
            </View>
        );
    }
}
