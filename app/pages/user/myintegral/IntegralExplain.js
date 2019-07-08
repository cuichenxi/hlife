import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Text, View} from "react-native";

export default class IntegralExplain extends BaseComponent{
    navigationBarProps() {
        return {
            title: '积分说明',
        }
    }
    _render() {
        return (
            <View>
                <Text>积分说明页</Text>
            </View>
        );
    }

}
