import React from 'react';
import {StyleSheet,FlatList,TouchableHighlight, Text, View, Keyboard} from 'react-native';
import {BaseComponent} from '../../components/base/BaseComponent'

export default class Shopping extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '商城',
        }
    }

    onNext = () => {
        this.navigate('Login', {isFirst: true});
    };

    _render() {
        return (
            <View style={styles.container}>
                {/*<FlatList*/}
                    {/*ItemSeparatorComponent={Platform.OS !== 'android' && ({highlighted}) => (*/}
                        {/*<View style={[style.separator, highlighted && {marginLeft: 0}]} />*/}
                        {/*)}*/}
                    {/*data={[{title: 'Title Text', key: 'item1'}]}*/}
                    {/*renderItem={({item, separators}) => (*/}
                        {/*<TouchableHighlight*/}
                            {/*onPress={() => this._onPress(item)}*/}
                            {/*onShowUnderlay={separators.highlight}*/}
                            {/*onHideUnderlay={separators.unhighlight}>*/}
                            {/*<View style={{backgroundColor: 'white'}}>*/}
                                {/*<Text>{item.title}</Text>*/}
                            {/*</View>*/}
                        {/*</TouchableHighlight>*/}
                    {/*)}*/}
                {/*/>*/}
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

