import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Text, StyleSheet, View} from "react-native";
import Tabs from "antd-mobile-rn/es/tabs/index.native";

export default class RedPacket extends BaseComponent {

    onReady(e) {
        this.setTitle("红包")
    }

    _render() {
        const tabs = [
            {title: '未使用'},
            {title: '已使用'},
            {title: '已过期'},
        ];
        return (
            <Tabs tabs={tabs} initialPage={0} tabBarPosition="top">
                <View style={styles.style}>
                    <Text>Content of First Tab</Text>
                </View>
                <View style={styles.style}>
                    <Text>Content of Second Tab</Text>
                </View>
                <View style={styles.style}>
                    <Text>Content of Third Tab</Text>
                </View>
            </Tabs>

        )
    }
};
const styles = StyleSheet.create({
    style: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        backgroundColor: '#fff',
    }
});