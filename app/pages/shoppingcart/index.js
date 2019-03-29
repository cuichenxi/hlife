import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BaseComponent} from "../../components/base/BaseComponent";

export default class ShoppingCart extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '购物车',
        }
    }

    onNext = () => {
        this.navigate('Login', {isFirst: true});
    };

    canExitApp() {
        return true;
    }

    _render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textInput} onPress={this.onNext}>点击</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    textInput: {
        width: 200,
        height: 100,
        fontSize: 18,
        padding: 15,
    }
});

