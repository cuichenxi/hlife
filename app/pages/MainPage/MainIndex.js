import React from 'react';
import {
    DeviceEventEmitter,
    TouchableHighlight, ScrollView, ListView, StyleSheet,
    Image, View
} from "react-native";
import Swiper from 'react-native-swiper'
import {BaseComponent} from "../../components/base/BaseComponent";
import LoadingView from "../../components/LoadingView";

class MainIndex extends BaseComponent {
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
                    imagePath: 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQE_8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyYXRKWVpGcVVjNG0xMDAwMGcwN0sAAgTsQ3VbAwQAAAAA'
                }
            ],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            typeIds: [],
            typeList: {}
        };
    }

    componentDidMount() {
        this.showInDLoading()
    }

    componentWillUnmount() {

    }

    _loadWeb(title, url) {
        this.props.navigation.navigate('Web', {article: {title: title, url: url}})
    }

    renderBanner() {
        thiz = this;
        return (
            <Swiper style={styles.banner} showsButtons={false} autoplay={true} height={125} showsPagination={false}>
                {this.state.banners.map(function (banner) {
                    return (
                        <TouchableHighlight onPress={() => {
                            thiz._loadWeb(banner.title, banner.url)
                        }}>
                            <Image style={[styles.slide,]} source={{uri: banner.imagePath}}></Image>
                        </TouchableHighlight>
                    );
                })}
            </Swiper>
        );
    }

    _randerHeader() {
        return (
            <View>
            </View>
        );
    }

    _render() {
        return (
            <View>
                <ScrollView style={[styles.container]}>
                    {this.renderBanner()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 68,
    },
    banner: {
        height: 125,
    },
    slide: {
        height: 125,
        resizeMode: Image.resizeMode.stretch,
    },
})
export default MainIndex;