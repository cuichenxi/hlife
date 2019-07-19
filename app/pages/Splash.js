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
import {Animated, Dimensions, Image, Text, View} from 'react-native';
import {registerApp} from 'react-native-wechat';
import SplashScreen from 'react-native-splash-screen';
import UserStore from "../store/UserStore";
import {BaseComponent} from '../components/base/BaseComponent'
import ADStore from "../store/ADStore";
import {CommonStyle} from "../common/CommonStyle";
import TouchableView from "../components/TouchableView";

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../img/splash.png');

class Splash extends BaseComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1),
            ad: {
                imageUrl: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1544009388067/ad_t1.gif',
                active: 'https://reactnative.cn/docs/image/',
            },
            secondsElapsed: 0,
            hasAd: false,
            AdImageLoaded: false
        };
        //3e1157097a95a2f93c0548bdaf7fbcca
        registerApp('wxb4f5998bd885e481');
        // if (!AV.applicationId) {
        //     AV.init({
        //         appId: 'Tfi1z7dN9sjMwSul8sYaTEvg-gzGzoHsz',
        //         appKey: '57qmeEJonefntNqRe17dAgi4'
        //     });
        // }
    }

    onReady(param) {
        setTimeout(() => {
            let ADInfo = ADStore.get();
            this.setState({
                ad: {
                    imageUrl: ADInfo.imageUrl,
                    active: ADInfo.active,
                },
                hasAd: ADStore.isAD(),
                secondsElapsed: ADInfo.times
            })
            if (this.state.hasAd) {
                this.tickHandler();
            } else {
                this.timer = setTimeout(() => {
                    this._goPage()
                }, 1000);
                Animated.timing(this.state.bounceValue, {
                    toValue: 1.2,
                    duration: 1000
                }).start();
            }
        }, 1000);
    }

    _goPage() {
        SplashScreen.hide();
        if (UserStore.isLogin()) {
            this.reset('Home');
        } else {
            this.push('Login', {isFirst: true});
        }
    }

    _goAd() {
        SplashScreen.hide();
        this._goPage()
        this.navigate('Web', {article: {title: '', url: this.state.ad.active}})
    }

    onUnload() {
        clearTimeout(this.timer);
    }

    tickHandler() {
        var secondsElapsed = this.state.secondsElapsed - 1;
        if (secondsElapsed == 0) {
            this.setState({secondsElapsed: 0});
            this._goPage();
            return;
        }
        this.timer = setTimeout(
            () => {
                this.setState({secondsElapsed: secondsElapsed});
                this.tickHandler();
            },
            1000
        );
    }

    _renderADView() {
        var adTimeText = this.state.secondsElapsed == 0 ? '' : ('跳过 ' + this.state.secondsElapsed + ' s');
        return (
            <TouchableView style={{
                position: CommonStyle.absolute,
                width: maxWidth,
                height: maxHeight,
            }} onPress={() => this._goAd()}>
                <View style={{flex: 1}}>
                    <Image style={{
                        width: maxWidth,
                        height: maxHeight,
                    }} source={{uri: this.state.ad.imageUrl}} onLoad={() => this.setState({AdImageLoaded: true})}/>

                    {this.state.secondsElapsed > 0 &&
                    <TouchableView onPress={() => this._goPage()}>
                        <View style={{
                            position: CommonStyle.absolute,
                            right: 30,
                            bottom: 100,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: 5,
                            padding: 5
                        }}><Text style={{color: '#fff', fontSize: 14}}>{adTimeText}</Text>
                        </View>
                    </TouchableView>}
                    <View style={{
                        position: CommonStyle.absolute,
                        left: 20,
                        top: 40,
                        padding: 5
                    }}><Text style={{color: '#666666', fontSize: 14}}>广告</Text>
                    </View>

                </View>
            </TouchableView>);
    }

    render() {
        return (
            <View>
                <Animated.Image
                    style={{
                        width: maxWidth,
                        height: maxHeight,
                        transform: [{scale: this.state.bounceValue}]
                    }}
                    source={splashImg}
                />
                {this.state.hasAd && this._renderADView()}
            </View>
        );
    }
}

export default Splash;
