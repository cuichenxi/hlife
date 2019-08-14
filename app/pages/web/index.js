/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import {
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    WebView
} from 'react-native';

import * as WeChat from 'react-native-wechat';
import {SafeAreaView} from 'react-navigation';
import LoadingView from '../../components/LoadingView';
import {formatStringWithHtml} from '../../utils/FormatUtil';
import {BaseComponent} from '../../components/base/BaseComponent'
import DeviceInfo from "react-native-device-info/deviceinfo";

let canGoBack = false;
const shareIconWechat = require('../../img/share_icon_wechat.png');
const shareIconMoments = require('../../img/share_icon_moments.png');

class Index extends BaseComponent {
    // static navigationOptions = ({navigation}) => ({
    //     title: navigation.state.params.article.title,
    //     headerRight: (
    //         <Icon.TouchableView
    //             name="md-share"
    //             backgroundColor="transparent"
    //             underlayColor="transparent"
    //             activeOpacity={0.8}
    //             onPress={() => {
    //                 navigation.state.params.handleShare();
    //             }}
    //         />
    //     )
    // });
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.article.title,
            rightTitle: (
                this.props.navigation.state.params.article.title !== '隐私政策'?'分享':''
            ),
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isShareModal: false
        };
    }

    //
    // componentDidMount() {
    //     // this.props.navigation.setParams({handleShare: this.onActionSelected});
    //     BackHandler.addEventListener('hardwareBackPress', this.goBack);
    // }
    //
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    // }

    onRightPress = () => {
        this.setState({
            isShareModal: true
        });
    };

    onNavigationStateChange = (navState) => {
        canGoBack = navState.canGoBack;
        this.setTitle(navState.title)
    };

    goBack() {
        if (this.state.isShareModal) {
            this.setState({
                isShareModal: false
            });
            return true;
        } else if (canGoBack) {
            this.webview.goBack();
            return true;
        } else {
            this.props.navigation.goBack();
        }
        return false;
    };

    renderLoading = () => <LoadingView/>;

    renderSpinner = () => {
        const {params} = this.props.navigation.state;
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState({
                        isShareModal: false
                    });
                }}
            >
                <View key="spinner" style={styles.spinner}>
                    <View style={styles.spinnerContent}>
                        <Text
                            style={[styles.spinnerTitle, {fontSize: 20, color: 'black'}]}
                        >
                            分享到
                        </Text>
                        <View style={styles.shareParent}>
                            <TouchableOpacity
                                style={styles.base}
                                onPress={() => {
                                    WeChat.isWXAppInstalled().then((isInstalled) => {
                                        if (isInstalled) {
                                            WeChat.shareToSession({
                                                title: formatStringWithHtml(params.article.title),
                                                description: '分享自:' + DeviceInfo.getApplicationName(),
                                                thumbImage: params.article.contentImg,
                                                type: 'news',
                                                webpageUrl: params.article.url
                                            }).catch((error) => {
                                                this.showShort(error.message, true);
                                            });
                                        } else {
                                            this.showShort('没有安装微信软件，请您安装微信之后再试', true);
                                        }
                                    });
                                }}
                            >
                                <View style={styles.shareContent}>
                                    <Image style={styles.shareIcon} source={shareIconWechat}/>
                                    <Text style={styles.spinnerTitle}>微信</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.base}
                                onPress={() => {
                                    WeChat.isWXAppInstalled().then((isInstalled) => {
                                        if (isInstalled) {
                                            WeChat.shareToTimeline({
                                                title: formatStringWithHtml(`[@幸福宜居]${params.article.title}`),
                                                thumbImage: params.article.contentImg,
                                                type: 'news',
                                                webpageUrl: params.article.url
                                            }).catch((error) => {
                                                this.showShort(error.message, true);
                                            });
                                        } else {
                                            this.showShort('没有安装微信软件，请您安装微信之后再试', true);
                                        }
                                    });
                                }}
                            >
                                <View style={styles.shareContent}>
                                    <Image style={styles.shareIcon} source={shareIconMoments}/>
                                    <Text style={styles.spinnerTitle}>朋友圈</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    _render() {
        const {params} = this.props.navigation.state;
        console.log('web url',params.article.url)
        return (
            <View style={styles.container}>

                <WebView
                    ref={(ref) => {
                        this.webview = ref;
                    }}
                    style={styles.base}
                    source={{uri: params.article.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={() => {
                        const shouldStartLoad = true;
                        return shouldStartLoad;
                    }}
                    onNavigationStateChange={this.onNavigationStateChange}
                    renderLoading={this.renderLoading}
                />
                <Modal
                    animationType="fade"
                    visible={this.state.isShareModal}
                    transparent
                    onRequestClose={() => {
                        this.setState({
                            isShareModal: false
                        });
                    }}
                >
                    {this.renderSpinner()}
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },
    spinner: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    spinnerContent: {
        justifyContent: 'center',
        width: Dimensions.get('window').width * (7 / 10),
        height: Dimensions.get('window').width * (7 / 10) * 0.68,
        backgroundColor: '#fcfcfc',
        padding: 20,
        borderRadius: 5
    },
    spinnerTitle: {
        fontSize: 18,
        color: '#313131',
        textAlign: 'center',
        marginTop: 5
    },
    shareParent: {
        flexDirection: 'row',
        marginTop: 20
    },
    shareContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareIcon: {
        width: 40,
        height: 40
    }
});

export default Index;
