/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native'
import TouchableView from './TouchableView'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const itemHeight = 45

const Font = {
    Ionicons,
    FontAwesome
}

class ItemButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableView style={{marginTop: this.props.first ? 10 : 0}} onPress={this.props.onPress}>
                <View style={styles.button}>
                    <Text style={{color: this.props.color || "#f00"}}>{this.props.name}</Text>
                </View>
            </TouchableView>
        )
    }
}

export default class ItemArrow extends Component {
    constructor(props) {
        super(props)
    }

    // static propTypes = {
    //   icon: '',
    //   name: '',
    //   subName: '',
    //   color: '',
    //   first: false,
    //   avatar: 0,
    //   disable: false,
    //   iconSize: 0,
    //   font: '',
    //   onPress: ()=>{}
    // }
// <Icon name={icon} size={(iconSize || 20)} style={{width: 22, marginRight: 5,
//     marginTop: 4, textAlign: "center"}}
// color={color || "#4da6f0"}/>) : null}
    _render() {
        let {icon, iconSize, name, subName, color, first, avatar, disable, font, marginTop} = this.props;
        font = font || "Ionicons"
        const Icon = Font[font]
        return (
            <View style={[styles.listItem,{marginTop: marginTop}]}>
                {icon ? (
                    <Image style={{
                        width: 16,
                        height: 16,
                        resizeMode: 'contain',
                        marginRight: 12,
                    }} source={icon}/>): null}
                <View style={[styles.listInfo, {borderTopWidth: !first ? 1 : 0}]}>
                    <View style={{flex: 1}}><Text>{name}</Text></View>
                    <View style={styles.listInfoRight}>
                        {subName ? (<Text style={{color: "#aaa", fontSize: 12}}>{subName}</Text>) : null}
                        {avatar ? (<Image source={avatar} style={{
                            width: 36,
                            height: 36,
                            resizeMode: "cover",
                            overflow: "hidden",
                            borderRadius: 18
                        }}/>) : null}
                        {disable ? null : (
                            <Font.Ionicons style={{marginLeft: 10}} name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>)}
                    </View>
                </View>
            </View>
        )
    }

    render() {
        let {onPress, first, disable} = this.props;
        onPress = onPress || (() => {})
        return disable ?
            this._render() :
            <TouchableView style={{marginTop: first ? 10 : 0}} onPress={onPress}>{this._render()}</TouchableView>
    }
}
ItemArrow.Button = ItemButton
const styles = StyleSheet.create({
    listItem: {
        height: itemHeight,
        paddingLeft: 16,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        height: itemHeight,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    listInfo: {
        height: itemHeight,
        flex: 1,
        paddingRight: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopColor: "#f5f5f5"
    },
    listInfoRight: {
        flexDirection: "row",
        alignItems: "center"
    }
})
