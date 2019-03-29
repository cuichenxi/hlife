import React, {Component} from 'react';
import {ActivityIndicator, Text, StyleSheet, View} from 'react-native';
import {CommonStyle} from "../../common/CommonStyle";

class ListHeader extends Component {

    render() {
        if (!this.props.loading) return null;
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={CommonStyle.themeColor}/>
        </View>
    }
}

const styles = StyleSheet.create({
    loading: {
        paddingVertical: 20,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CommonStyle.bgColor
    },
    loadingText: {
        marginTop: 10,
        color: CommonStyle.themeColor,
        textAlign: 'center'
    }
});
export default ListHeader;