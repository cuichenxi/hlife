import React from 'react'
import {Dimensions, Text, View} from 'react-native'
import {BaseComponent} from "../components/base/BaseComponent";
import TouchableView from "../components/TouchableView";
import {CALL_BACK_TEST} from "../constants/ActionTypes";

export default class demorouter extends BaseComponent {
    navigationBarProps() {
        return {
            title: 'Router'
        }
    }

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    onShow(p){
        alert(JSON.stringify(p));
    }

    callback(p){
        alert(JSON.stringify(p));
    }

    _render() {
        return (
            <View>
                <TouchableView onPress={() => {
                    this.goBack({test:'123'})
                    this.sendCallback(CALL_BACK_TEST,{text: 'nis'})
                }}>
                    <Text>goBack</Text>
                </TouchableView>
                <TouchableView onPress={() => {
                    this.pop(1);
                    this.sendCallback(CALL_BACK_TEST,{text: 'nis'})
                }}>
                    <Text>pop</Text>
                </TouchableView>
                <TouchableView onPress={() => {
                    this.push('demorouter', {test: '123'});
                }}>
                    <Text>push</Text>
                </TouchableView>
            </View>
        )
    }
};
