import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View,PermissionsAndroid,Platform} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {CommonStyle} from "../../common/CommonStyle";
import RadioModal from "../../components/RadioModal";
import TouchableView from "../../components/TouchableView";
import ImagePicker from "antd-mobile-rn/es/image-picker/index.native";
let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}
export default class PublishHouseInfo extends BaseComponent{
    navigationBarProps() {
        return {
            title: '发布房源'
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            initItem: '房屋出租',
            initId: '1',
            title:'',
            housetype:'',
            rentInfo:'',
            name: '',
            no: '',
            address: '',
            phone: '',
            housesize:'',
            addressDetail:'',
            imageList:[],
            files2: [],
        }
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': '需要访问相册',
                    'message': '需要访问相册',
                },
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({
                    granted: true,
                })
            } else {
                this.setState({
                    granted: false,
                })
            }
        } catch (err) {
            console.warn(err)
        }
    }
    async componentDidMount() {
        if (Platform.OS === 'android') {
            await this.requestCameraPermission();
        }

    }
    _render() {
        if (Platform.OS === 'android' && !this.state.granted) {
            return <Text>需要访问相册的权限</Text>;
        }
        return (
            <ScrollView>
                <KeyboardAvoidingView behavior='position'>
                    <View style={styles.inputRow}>
                        <Text style={styles.leftItemText}>标题</Text>
                        <TextInput
                            ref="input_title"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder='填写标题'
                            onChangeText={(text) => this.setState({title: text})}
                            value={this.state.title ? this.state.title : ''}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={{backgroundColor: '#ffffff'}}>
                        <Text style={{color: CommonStyle.textBlockColor, padding: 15}}>房源类型</Text>
                        <View style={{backgroundColor: '#ffffff', flexDirection: 'row'}}>
                            <RadioModal
                                selectedValue={this.state.initId}
                                onValueChange={(id, item) => {
                                    this.setState({initId: id, initItem: item})

                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 40,
                                    width: width,
                                    flex: 1,
                                    backgroundColor: CommonStyle.white,
                                }}
                            >
                                <Text value="1">房屋出租</Text>
                                <Text value="2">房屋出售</Text>
                            </RadioModal>
                        </View>
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={styles.leftItemText}>基本情况</Text>
                        <TextInput
                            ref="base_info"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder='如几室几厅几卫，第多少层'
                            onChangeText={(text) => this.setState({housetype: text})}
                            value={this.state.housetype ? this.state.housetype : ''}
                            placeholderTextColor={'#999'}

                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={styles.leftItemText}>租金信息</Text>
                        <TextInput
                            ref="rent_info"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder='面议or填写具体标准，是否包含物业费'
                            onChangeText={(text) => this.setState({rentInfo: text})}
                            value={this.state.rentInfo ? this.state.rentInfo : ''}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={styles.leftItemText}>联系方式</Text>
                        <TextInput
                            ref="phone"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder='请填写您的联系方式'
                            onChangeText={(text) => this.setState({phone: text})}
                            value={this.state.phone ? this.state.phone : ''}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={styles.leftItemText}>平方米</Text>
                        <TextInput
                            ref="size"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder='房屋面积'
                            onChangeText={(text) => this.setState({housesize: text})}
                            value={this.state.housesize ? this.state.housesize : ''}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={styles.leftItemText}>所居住的小区</Text>
                        <TextInput
                            ref="address"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder='您所居住的小区名称'
                            onChangeText={(text) => this.setState({address: text})}
                            value={this.state.address ? this.state.address : ''}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <View style={styles.inputRow}>
                        <Text style={styles.leftItemText}>苑、幢、单元室</Text>
                        <TextInput
                            ref="address_detail"
                            style={styles.inputItem}
                            underlineColorAndroid="transparent"
                            placeholder='请填写具体信息'
                            onChangeText={(text) => this.setState({addressDetail: text})}
                            value={this.state.addressDetail ? this.state.addressDetail : ''}
                        />
                    </View>
                    <View style={styles.lineStyle}/>
                    <ImagePicker
                        onChange={this.handleFileChange}
                        files={this.state.files2}
                        cancelText='取消'
                        title='照片'
                    />

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
                        <Text style={{color: '#ffffff', fontSize: 14}}>确认提交</Text>
                    </TouchableView>
                </KeyboardAvoidingView>
            </ScrollView>

        );
    }

    handleFileChange = (files2) => {
        this.setState({
            files2,
        });
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
        fontSize: 15,
    },
    lineStyle: {
        height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'
    },
    inputRow: {
        flexDirection: 'row', height: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
        paddingLeft: 15
    },
    leftItemText:{
        textAlign: 'center',color:'#333',fontSize:15
    }
});
