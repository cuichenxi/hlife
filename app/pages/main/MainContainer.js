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
import {BackAndroid, Platform} from 'react-native';
import {connect} from 'react-redux';
import CodePush from 'react-native-code-push';
import {bindActionCreators} from 'redux';
import * as readCreators from '../../actions/read';
import JPushModule from 'jpush-react-native';
import Main from "./index";
import {BaseComponent} from "../../components/base/BaseComponent";
import ADStore from "../../store/ADStore";

class MainContainer extends BaseComponent {

    constructor(props) {
        super(props)
        // this.onGetRegistrationIdPress = this.onGetRegistrationIdPress.bind(this)
        // this.onHasPermission = this.onHasPermission.bind(this)
        // this.jumpSecondActivity = this.jumpSecondActivity.bind(this)
        // this.setTag = this.setTag.bind(this)
        // this.setAlias = this.setAlias.bind(this)
    }
    //rOfQ8XGOt98_57EL3FJIogtaEFaL1847071a-a410-40be-8295-ea5fb8bf4b4a staging
    //Zuhm7813pnWp80Jxdy3_J07YWFJP1847071a-a410-40be-8295-ea5fb8bf4b4a test
    //K6yVS_qXUMNuWuppkSEpFyOVmB921847071a-a410-40be-8295-ea5fb8bf4b4a Production
    onReady(e) {
        // CodePush.sync({
        //     // deploymentKey: 'rOfQ8XGOt98_57EL3FJIogtaEFaL1847071a-a410-40be-8295-ea5fb8bf4b4a"',
        //     updateDialog: {
        //         optionalIgnoreButtonLabel: '稍后',
        //         optionalInstallButtonLabel: '后台更新',
        //         optionalUpdateMessage: '幸福宜居有新版本了，是否更新？',
        //         title: '更新提示'
        //     },
        //     installMode: CodePush.InstallMode.IMMEDIATE
        // });

        if (Platform.OS === 'android') {
            JPushModule.initPush()
            JPushModule.getInfo(map => {
                console.log('extras: ' + map)
            })
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {
                }
            })
        } else {
            JPushModule.setupPush()
        }
        // JPushModule.initPush();

        this.receiveCustomMsgListener = map => {
            console.log('android extras: ' + JSON.stringify(map));
            JPushModule.setBadge(1, success => {
            });
        }

        JPushModule.addReceiveCustomMsgListener(this.receiveCustomMsgListener)
        this.receiveNotificationListener = map => {
            // console.log('alertContent: ' + map.alertContent)
            console.log('ios extras: ' + JSON.stringify(map));
            if (Platform.OS === 'ios') {
                JPushModule.setBadge(map.aps.badge, success => {});
            }else {
                JPushModule.setBadge(1, success => {
                });
            }

        }
        JPushModule.addReceiveNotificationListener(this.receiveNotificationListener)

        this.openNotificationListener = map => {
            console.log('Opening notification!')
            console.log('map.extra: ' + map.extras)
            this.jumpSecondActivity()
            JPushModule.clearAllNotifications();
        }
        JPushModule.addReceiveOpenNotificationListener(this.openNotificationListener)

        this.getRegistrationIdListener = registrationId => {
            console.log('Device register succeed, registrationId ' + registrationId)
        }
        JPushModule.addGetRegistrationIdListener(this.getRegistrationIdListener)
        JPushModule.clearAllNotifications();

        ADStore.save({
            // imageUrl: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1544009388067/ad_t1.gif',
            imageUrl: 'https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/common/1544009356352/ad_t2.gif',
            active: 'https://reactnative.cn/docs/image/',
            times: 5,
        });
    }

    canExitApp(){
        return true;
    }
    onUnload() {
        JPushModule.removeReceiveCustomMsgListener(this.receiveCustomMsgListener)
        JPushModule.removeReceiveNotificationListener(this.receiveNotificationListener)
        JPushModule.removeReceiveOpenNotificationListener(this.openNotificationListener)
        JPushModule.removeGetRegistrationIdListener(this.getRegistrationIdListener)
        console.log('Will clear all notifications')
        JPushModule.clearAllNotifications()
    }


    onHasPermission () {
        JPushModule.hasPermission( res => console.log(`onHasPermission ${res}`) )
    }


    onGetRegistrationIdPress () {
        JPushModule.getRegistrationID(registrationId => {
            this.setState({
                registrationId: registrationId
            })
        })
    }
    jumpSecondActivity () {
        console.log('jump to SecondActivity')
        // JPushModule.jumpToPushActivityWithParams('SecondActivity', {
        //   hello: 'world'
        // })
        // this.props.navigation.navigate('AboutPage')
    }
    render() {
        return <Main {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const {read} = state;
    return {
        read
    };
};

const mapDispatchToProps = (dispatch) => {
    const readActions = bindActionCreators(readCreators, dispatch);
    return {
        readActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
