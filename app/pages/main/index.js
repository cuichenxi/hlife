import React from 'react';
import {
    DeviceEventEmitter,
    TouchableHighlight, ScrollView, ListView, StyleSheet,
    Image, View, Text, Dimensions
} from "react-native";
import Swiper from 'react-native-swiper'
import {BaseComponent} from "../../components/base/BaseComponent";
import GridView from "../../components/GridView";
import TouchableView from "../../components/TouchableView";
// import ImageUtil from "../../utils/ImageUtil";

const {width, height} = Dimensions.get('window')

export default class Main extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '首页',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            banners: [
                {
                    title: '百度',
                    url: 'http://www.baidu.com',
                    imagePath: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png'
                },
                {
                    title: 'weex',
                    url: 'https://weexjs.github.io/weex-plugins/#/others/%E8%B5%84%E6%BA%90/',
                    imagePath: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png'
                }
            ],
            types: [
                {
                    name: '维修',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '送水',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '租房',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '家政',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '缴费',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '超市',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '周边',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '电话',
                    imageUrl: require('../../img/about_logo.png'),
                    active: 'Login'
                }
            ],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            typeIds: [],
            typeList: {}
        };
    }

    onReady(param) {

    }

    _loadWeb(title, url) {
        this.push('Web', {article: {title: title, url: url}})
    }

    _renderBanner() {
        return (
            <Swiper style={styles.banner} paginationStyle={{bottom: 10}}
                    dotStyle={{backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6}}
                    activeDotStyle={{backgroundColor: 'rgba(0,0,0,.5)', width: 6, height: 6}} showsButtons={false}
                    autoplay={true} showsPagination={true}>
                {this.state.banners.map((banner, i) => {
                    return (
                        <TouchableHighlight key={i} onPress={() => {
                            this._loadWeb(banner.title, banner.url)
                        }}>
                            <Image style={[styles.slide,]} source={{uri: banner.imagePath}}></Image>
                        </TouchableHighlight>
                    );
                })}
            </Swiper>
        );
    }

    _jumpRouter(typeItem) {
        this.navigate(typeItem.active);
    }

    _renderGridView() {
        return (
            <GridView
                style={{
                    flex: 1, paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: '#fff'
                }}
                items={this.state.types}
                num={4}
                renderItem={this._renderGridItem.bind(this)}
            />
        )
    }

    _renderGridItem(item, index) {
        return (
            <TouchableView style={{flex: 1}} key={index} onPress={() => {
                this._jumpRouter(item)
            }}>
                <View style={[{flex: 1}, styles.typesItem]}>
                    <Image source={item.imageUrl} style={{width: 35, height: 35, marginTop: 6}}/>
                    <Text style={{fontSize: 12, color: "#666", marginTop: 6}}>{item.name}</Text>
                </View>
            </TouchableView>
        )
    }

    _render() {
        return (
            <ScrollView style={styles.container}>
                {this._renderBanner()}
                {this._renderGridView()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 68,
    },
    card: {
        backgroundColor: "#fff",
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    banner: {height: 125,},
    slide: {
        height: 125,
        resizeMode: Image.resizeMode.stretch,
    },
    typesItem: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
})