import {BaseComponent} from "../../components/base/BaseComponent";
import {Text, TextInput, View, StyleSheet} from "react-native";
import React from "react";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";
import NavigationUtil from "../../utils/NavigationUtil";
import UserStore from "../../store/UserStore";

export default class Register extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
            address: '',
            identity: '',
            code: '',
        };
    }

    onReady(param) {
        this.setTitle("注册")
    }

    submitRequest() {
        this.showLoading('提交审核...');
        Request.post('login.do',
            {phone: "15811508404", code: 123456},
            {mock: true, mockId: 672823})
            .then(rep => {
                if (rep.bstatus.code === 0) {
                    this.goBack()
                }
                this.showShort(rep.bstatus.desc);
            }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
    }

    _render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.item}>
                    <Text style={styles.itemTextLabel}>手机号</Text>
                    <TextInput
                        placeholder='请输入手机号'
                        style={styles.itemInput}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({mobile: text})}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemTextLabel}>验证码</Text>
                    <TextInput
                        placeholder='请输入验证吗'
                        style={styles.itemInput}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({code: text})}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemTextLabel}>密码</Text>
                    <TextInput
                        placeholder='请输入密码'
                        style={styles.itemInput}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({password: text})}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemTextLabel}>小区</Text>
                    <TextInput
                        placeholder='请输入小区'
                        style={styles.itemInput}
                        multiline="true"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({address: text})}/>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemTextLabel}>身份</Text>
                    <TextInput
                        placeholder='请输入身份(业主,租客,亲属,嘉宾)'
                        style={styles.itemInput}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({identity: text})}/>
                </View>
                <TouchableView style={{
                    backgroundColor: CommonStyle.themeColor,
                    padding: 10,
                    alignItems: 'center',
                    marginTop: 20,
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 3,
                }} onPress={this.submitRequest.bind(this)}>
                    <Text style={{
                        color: '#ffffff',
                        fontSize: 17,
                    }}>提交审核</Text>
                </TouchableView>
                <Text style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    color: '#666',
                    fontSize: 14,
                }}>提交小区地址申请后，我们会在一个工作日内核实你的申请</Text>
            </View>
        );
    }
};
const styles = StyleSheet.create(
    {
        item: {
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 15,
            alignItems: 'center',
            borderBottomColor: CommonStyle.lineColor,
            borderBottomWidth: CommonStyle.lineWidth
        },
        itemTextLabel: {
            color: "#333",
            fontSize: 16,
            marginRight: 5,
            width: 80
        },
        itemInput: {
            color: "#666",
            fontSize: 16,
        },
    }
)