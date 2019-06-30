import React from "react";
import {TextInput, View} from "react-native";
import ImageView from "./ImageView";
import {BaseView} from "./base/BaseView";
import TouchableView from "./TouchableView";

export default class Step extends BaseView{

    constructor(props) {
        super(props);
        this.state={
            ...props,
            num:100
        }
    }
    onChangeInputText(text){
        this.state.num = text;
    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flex: 1,
                height: 15
            }}>
                <TouchableView onPress={()=>{
                    if (this.state.num >0){
                        var minusNum = --this.state.num
                        console.log(minusNum)
                        this.setState({
                            num:minusNum
                        })
                    }
                }}>
                    <ImageView defaultSource={require("../img/icon_cart_minus.png")}
                               style={{
                                   width: 14,
                                   height: 14,
                               }}
                    />
                </TouchableView>

                <TextInput
                    ref="input"
                    style={{
                        height: 15,
                        color: '#999',
                        fontSize: 11,
                        padding: 0,
                        borderWidth: 1,
                        borderColor: '#e6e6e6',
                        marginLeft: 5,
                        marginRight: 5,
                        textAlign: 'center'
                    }}
                    underlineColorAndroid="transparent"
                    placeholder=''
                    // value={this.state.num}
                    keyboardType='numeric'
                    maxLength={4}
                    onChangeText={this.onChangeInputText.bind(this)}
                >{this.state.num}</TextInput>
                <TouchableView onPress={()=>{
                    if (this.state.num >0){
                        var plusNum = ++this.state.num
                        console.log(plusNum)
                        this.setState({
                            num:plusNum
                        })
                    }
                }}>
                    <ImageView defaultSource={require("../img/icon_cart_plus.png")}
                               style={{
                                   width: 17,
                                   height: 17,
                               }}
                    />
                </TouchableView>

            </View>
        );
    }
}
