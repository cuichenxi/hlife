import React from 'react';
import {StyleSheet, Image, Text, Linking, View} from 'react-native';

import DeviceInfo from 'react-native-device-info';

const SHOW_API = 'http://qfant.com/main/contact.htm';

const aboutLogo = require('../../img/about_logo.png');
import {BaseComponent} from '../../components/base/BaseComponent'
import Button from "../../components/Button";
import CodePush from 'react-native-code-push';
import ItemArrow from "../../components/ItemArrow";
import {CommonStyle} from "../../common/CommonStyle";

export default class AboutPage extends BaseComponent {

    navigationBarProps() {
        return ({
            title: '关于'
        })
    }


    constructor(props) {
        super(props)
        this.state = {
            reactV: ''
        };
    }

    ready() {
        this.getUpdateMetadata();
    }

    checkUpdate() {
        let mes = DeviceInfo.getApplicationName() + '新版本了，是否更新？';
        CodePush.sync({
            updateDialog: {
                optionalIgnoreButtonLabel: '稍后',
                optionalInstallButtonLabel: '后台更新',
                optionalUpdateMessage: mes,
                title: '更新提示'
            },
            installMode: CodePush.InstallMode.IMMEDIATE
        });
    }

    getUpdateMetadata() {
        CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
            .then((metadata) => {
                console.log('meta:=' + JSON.stringify(metadata));
                this.setState({
                    reactV: metadata ? metadata.label : '',
                    description: metadata ? metadata.description : '',
                    syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version",
                    progress: false
                });

            }, (error) => {
                this.setState({syncMessage: "Error: " + error, progress: false});
            });
    }

    _render() {
        return (
            <View style={styles.content}>
                <View style={styles.center}>
                    <Image style={styles.logo} source={aboutLogo}/>
                    <Text style={styles.title}>{DeviceInfo.getApplicationName()}</Text>

                    <View style={{width: '100%', marginTop: 20}}>
                        <ItemArrow style={{marginTop: 10}}
                                   {...{
                                       name: "当前版本",
                                       first: true,
                                       subName: `v${DeviceInfo.getVersion()}` + (this.state.reactV ? '_' + this.state.reactV : ''),
                                       disable: true,
                                   }}/>
                        <ItemArrow
                            {...{
                                name: "检查更新",
                                // subName: (this.state.reactV ? '有' : '无') + '新版本',
                                onPress: () => {
                                    this.checkUpdate();
                                }
                            }}/>
                    </View>

                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.disclaimerContent}>
                        <Text style={[styles.disclaimer, {color: '#999999'}]}>
                            免责声明：所有内容均来自:
                        </Text>
                        <Button
                            style={[styles.disclaimer, {color: CommonStyle.themeColor}]}
                            text={SHOW_API}
                            onPress={() => Linking.openURL(SHOW_API)}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 10
    },
    center: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: 110,
        height: 110,
        marginTop: 50
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: '#313131',
        marginTop: 10
    },
    disclaimerContent: {
        flexDirection: 'column'
    },
    disclaimer: {
        fontSize: 14,
        textAlign: 'center'
    },
    bottomContainer: {
        marginBottom: 100,
        alignItems: 'center'
    }
});

