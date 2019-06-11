//报修报事
import {BaseComponent} from "../../components/base/BaseComponent";
import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";

export default class ReportMatter extends BaseComponent{
    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', flex: 1, marginRight: 5, marginLeft: 5}}>
                    <View style={styles.card}>
                        <Text>张三丰</Text>
                        <Text>安徽省亳州建设</Text>
                    </View>
                    <Text>137****0483</Text>
                </View>
            </View>
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
        paddingVertical: 16,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
});
