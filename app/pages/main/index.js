import React from 'react';
import {
    DeviceEventEmitter,
    TouchableHighlight, ScrollView, ListView, StyleSheet,
    Image, View, Text, Dimensions
} from "react-native";
import Swiper from 'react-native-swiper'
import {BaseComponent} from "../../components/base/BaseComponent";
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
                    imageUrl:require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '送水',
                    imageUrl:require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '租房',
                    imageUrl:require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '家政',
                    imageUrl:require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '缴费',
                    imageUrl:require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '超市',
                    imageUrl:require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '周边',
                    imageUrl:require('../../img/about_logo.png'),
                    active: 'Login'
                }, {
                    name: '电话',
                    imageUrl:require('../../img/about_logo.png'),
                    active: 'Login'
                },
            ],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            typeIds: [],
            typeList: {}
        };
    }

    componentDidMount() {
        super.componentDidMount()
        // this.showInDLoading()
    }

    componentWillUnmount() {
        super.componentWillUnmount();

    }

    _loadWeb(title, url) {
        this.props.navigation.navigate('Web', {article: {title: title, url: url}})
    }

    _renderBanner() {
        var thiz = this;
        return (
            <Swiper style={styles.banner} paginationStyle={{bottom: 10}}
                    dotStyle={{backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6}}
                    activeDotStyle={{backgroundColor: 'rgba(0,0,0,.5)', width: 6, height: 6}} showsButtons={false}
                    autoplay={true} showsPagination={true}>
                {this.state.banners.map((banner, i) => {
                    return (
                        <TouchableHighlight key={i} onPress={() => {
                            thiz._loadWeb(banner.title, banner.url)
                        }}>
                            <Image style={[styles.slide,]} source={{uri: banner.imagePath}}></Image>
                        </TouchableHighlight>
                    );
                })}
            </Swiper>
        );
    }

    _renderTypes() {
       var thiz = this;
        const w = width / 4, h = w * .6 + 10
        return (
            <View style={styles.typesView}>
                {
                    this.state.types.map((item, i) => {
                        let render = (
                            <View style={[{width: w, height: h}, styles.typesItem]}>
                                <Image source={item.imageUrl} style={{width: w * .4, height: w * .4,marginTop:6}}/>
                                <Text style={{fontSize: 12, color: "#666",marginTop:6}}>{item.name}</Text>
                            </View>
                        )
                        return (
                            <TouchableHighlight style={{width: w, height: h}} key={i} onPress={() => {
                                thiz._jumpRouter(item)
                            }}>{render}</TouchableHighlight>
                        )
                    })
                }
            </View>)
    }
    _jumpRouter(typeItem){
        this.navigate(typeItem.active);
    }

    _render() {
        return (
            <ScrollView style={styles.container}>
                {this._renderBanner()}
                {this._renderTypes()}
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
    typesView: {
        paddingBottom: 10,
        paddingTop: 10,
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    typesItem: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
})