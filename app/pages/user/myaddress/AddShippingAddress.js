import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from "react-native";
import {CommonStyle} from "../../../common/CommonStyle";
import Request from "../../../utils/Request";
import TouchableView from "../../../components/TouchableView";


/**
 * 新增收货地址
 */
export default class AddShippingAddress extends BaseComponent {
    navigationBarProps() {
        return {
            title: '新增收货地址',
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tel: '',
            detail: '',
        }
    }

    _render() {
        return (
            <View style={{flex: 1}}>
                <KeyboardAvoidingView behavior='position'>
                    <View style={styles.inputRow}>
                        <Image source={require('../../../img/icon_shouhuoren.png')}
                               style={styles.imgIcon}/>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{textAlign: 'center'}}>收货人</Text>
                        </View>
                        <TextInput
                            ref="shipping_name"
                            placeholder='收货人'
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({name: text})}
                            value={this.state.name ? this.state.name : ''}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Image source={require('../../../img/icon_dianhua.png')}
                               style={styles.imgIcon}/>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{textAlign: 'center'}}>电话</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                            placeholder='请输入电话'
                            maxLength={11}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({tel: text})}
                            value={this.state.tel ? this.state.tel : ''}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Image source={require('../../../img/icon_address.png')}
                               style={styles.imgIcon}/>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{textAlign: 'center', fontSize: 16,}}>收货地址</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                            placeholder='请输入楼号、门牌号'
                            onChangeText={(text) => this.setState({detail: text})}
                            value={this.state.detail ? this.state.detail : ''}/>
                    </View>

                    <TouchableView onPress={()=>{
                        this.addShippingAddress()
                    }}>
                        <View style={{
                            height: 40,
                            marginLeft: 30,
                            marginRight: 30,
                            marginTop: 20,
                            borderRadius: 30,
                            backgroundColor: CommonStyle.themeColor,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#ffffff', fontSize: 14}}>保存</Text>
                        </View>
                    </TouchableView>
                </KeyboardAvoidingView>
            </View>
        )
    }

    /**
     * 新增收货地址
     * @param page
     * @param callback
     */
    addShippingAddress(callback) {
        Keyboard.dismiss();
        let {name, tel, detail} = this.state;
        if (!name.length) {
            this.showLong('请输入收货人');
            return;
        }
        if (!tel.length) {
            this.showLong('请输入收货人电话');
            return;
        }
        if (!detail.length) {
            this.showLong('请输入收货人地址');
            return;
        }
        let param = {name: name, tel: tel, detail: detail,isDefault:0};

        console.log(param)
        Request.post('/api/user/shippingAddress', param,
            {
                mock: false,
                mockId: 1095545,
            }).then(rep => {
            if (rep.code == 0) {
                this.goBack(rep.message)
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }
}

const styles = StyleSheet.create(
    {
        inputRow: {
            flexDirection: 'row',
            height: 60,
            padding: 20, borderBottomWidth: .5,
            backgroundColor: '#fff',
            justifyContent: 'center', alignItems: 'center',
            borderBottomColor: CommonStyle.lineColor,
        },
        imgIcon: {
            width: 20, height: 20, resizeMode: 'contain',
            marginRight: 5
        },
        textInput: {
            height: 60,
            paddingLeft: 10,
            flex: 1,
            fontSize: 16,
            marginTop: 3
        }
    }
)
