import React from "react";
import {Text, TextInput, View} from "react-native";
import {CommonStyle} from "../common/CommonStyle";

export default class Step extends React.Component{

    render() {
        return (
            <View style={{flexDirection:'row',justifyContent: 'flex-end',alignItems: 'flex-end',flex: 1}}>
                <Text style={{borderRadius:50,borderColor:CommonStyle.lightGray,borderWidth: 1,with: 20,height:20}}>-</Text>
                <TextInput
                    ref="input"
                    style={{with:20,borderWidth: 1,borderColor:CommonStyle.lightGray}}
                    underlineColorAndroid="transparent"
                    placeholder=''
                />
                <Text style={{borderRadius:50,borderColor:CommonStyle.lightGray,borderWidth: 1,with: 20,height:20}}>+</Text>
            </View>
        );
    }
}
