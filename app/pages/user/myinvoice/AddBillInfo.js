import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";

import {CommonStyle} from "../../../common/CommonStyle";
import RadioModal from "../../../components/RadioModal";
import Request from "../../../utils/Request";
import TouchableView from "../../../components/TouchableView";


/**
 * 增加开票信息
 */
export default class AddBillInfo extends BaseComponent {
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.invoice ? '修改开票信息' : '增加开票信息',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            initItem: '个人',
            initId: '0',
            name: '',
            no: '',
            address: '',
            phone: '',
            bank: '',
            bankNo: '',
            invoice: this.props.navigation.state.params.invoice
        }
        console.log(this.state.invoice)
    }


    _render() {
        const {name,no,address,bank,bankNo,phone} = this.state
        return (
            <ScrollView>
                <KeyboardAvoidingView behavior='position'>
                    <View style={styles.content}>
                        <View style={{alignItems: "center", justifyContent: 'center', height: 50}}>
                            <Text style={{textAlign: 'center'}}>发票抬头</Text>
                        </View>
                        <RadioModal
                            selectedValue={this.state.initId}
                            onValueChange={(id, item) => {
                                this.setState({initId: id, initItem: item})

                            }}
                            style={{
                                flexDirection: 'row',
                                // flexWrap:'wrap',
                                alignItems: 'flex-start',
                                flex: 1,
                                backgroundColor: '#ffffff', padding: 5
                            }}
                        >
                            <Text value="0">个人</Text>
                            <Text value="1">企业</Text>
                        </RadioModal>
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={{textAlign: 'center'}}>发票抬头（必填）</Text>
                        <TextInput
                            ref="bill_name"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder=''
                            onChangeText={(text) => this.setState({name: text})}
                            value={this.state.invoice ? this.state.invoice.name : name}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={{textAlign: 'center'}}>税号</Text>
                        <TextInput
                            ref="tax_file_num"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder=''
                            onChangeText={(text) => this.setState({no: text})}
                            value={this.state.invoice ? this.state.invoice.no : no}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={{textAlign: 'center'}}>地址</Text>
                        <TextInput
                            ref="address"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder=''
                            onChangeText={(text) => this.setState({address: text})}
                            value={this.state.invoice ? this.state.invoice.address : address}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={{textAlign: 'center'}}>电话</Text>
                        <TextInput
                            ref="phone"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder=''
                            onChangeText={(text) => this.setState({phone: text})}
                            value={this.state.invoice ? this.state.invoice.phone : phone}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={{textAlign: 'center'}}>开户银行</Text>
                        <TextInput
                            ref="bank"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder=''
                            onChangeText={(text) => this.setState({bank: text})}
                            value={this.state.invoice ? this.state.invoice.bank : bank}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={{textAlign: 'center'}}>银行账户</Text>
                        <TextInput
                            ref="bank_num"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder=''
                            onChangeText={(text) => this.setState({bankNo: text})}
                            value={this.state.invoice ? this.state.invoice.bankNo : bankNo}
                        />
                    </View>
                    <View style={styles.lineStyle}/>

                    <TouchableView style={{
                        height: 40,
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        borderRadius: 30,
                        backgroundColor: CommonStyle.themeColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onPress={() => {
                        this.addBillInfo()
                    }}>
                        <Text style={{color: '#ffffff', fontSize: 14}}>{this.state.invoice ? '修改' : '添加'}</Text>
                    </TouchableView>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }

    addBillInfo(callback) {
        Keyboard.dismiss();
        let {initId, name, no, address, phone, bank, bankNo} = this.state;
        if (!name.length) {
            this.showLong('请输入发票抬头');
            return;
        }
        if (!no.length) {
            this.showLong('请输入税号');
            return;
        }
        let param = {type: initId, name: name, no: no, address: address, phone: phone, bank: bank, bankNo: bankNo};

        console.log(param)
        Request.post('/api/user/addInvoice', param,
            {
                mock: false,
                mockId: 1095545,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.goBack()
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        height: 50
    },
    radioContent: {
        borderWidth: 1, borderColor: CommonStyle.themeColor, margin: 10, borderRadius: 50
    },
    innerStyle: {
        height: 50
    },
    inputItem: {
        height: 40,
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
    },
    lineStyle: {
        height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'
    },
    inputRow: {
        flexDirection: 'row', height: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
        paddingLeft: 15
    }
});
