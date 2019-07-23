import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {CommonStyle} from "../../common/CommonStyle";
import RadioModal from "../../components/RadioModal";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";
import {ActionSheet} from "antd-mobile-rn";
import ImagePicker from "react-native-image-crop-picker";
import {CALL_BACK_PUBLISH_HOUSE,} from "../../constants/ActionTypes";

let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}
const cols = 4; // 列数
const left = 10; // 左右边距
const top = 10; // 上下边距
const ImageWH = (width - (cols + 1) * left) / cols; // 图片大小
export default class PublishHouseInfo extends BaseComponent {
    navigationBarProps() {
        return {
            title: '发布房源'
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            titleInput: '',
            initItem: '房屋出租',
            initId: '1',
            housetype: '',
            rentInfo: '',
            name: '',
            no: '',
            address: '',
            phone: '',
            housesize: '',
            addressDetail: '',
            imageList: [],
            files2: [],
            housingAddress: '',
            housingId: '',

            images: ['add'],
            content: '',
            uploadImages: [],
            communityId: '',
            price: 0,
            square: '',
            roomId: '',
            base: '',
            keyboardHeight: 0
        }
        this.registerCallBack(CALL_BACK_PUBLISH_HOUSE,(e)=>{
            if (e) {
                this.setState({
                    elementName: e.elementName,
                    roomId: e.roomId
                });
            }
        })
    }


    _render() {
        return (
            <ScrollView ref={component => this._scrollView = component}>

                <View style={[styles.inputRow, styles.marginTop]}>
                    <Text style={styles.leftItemText}>标题</Text>
                    <TextInput
                        ref="input_title"
                        style={styles.inputItem}
                        underlineColorAndroid="transparent"
                        placeholder='填写标题'
                        onChangeText={(text) => this.setState({titleInput: text})}
                        value={this.state.titleInput ? this.state.titleInput : ''}
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
                            radioWidth={90}
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
                        onChangeText={(text) => this.setState({base: text})}
                        value={this.state.base ? this.state.base : ''}
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
                        placeholder='填写具体费用'
                        keyboardType='numeric'
                        maxLength={8}
                        onChangeText={(text) => this.setState({price: text})}
                        value={this.state.price ? this.state.price : ''}
                    />
                    <Text style={[styles.leftItemText, styles.paddingRight]}>元</Text>
                </View>
                <View style={styles.lineStyle}/>
                <View style={styles.inputRow}>
                    <Text style={styles.leftItemText}>联系方式</Text>
                    <TextInput
                        ref="phone"
                        style={styles.inputItem}
                        underlineColorAndroid="transparent"
                        placeholder='请填写您的联系方式'
                        keyboardType='numeric'
                        maxLength={11}
                        onChangeText={(text) => this.setState({phone: text})}
                        value={this.state.phone ? this.state.phone : ''}
                    />
                </View>
                <View style={styles.lineStyle}/>
                <View style={styles.inputRow}>
                    <Text style={styles.leftItemText}>房屋面积</Text>
                    <TextInput
                        ref="size"
                        style={{
                            height: 40,
                            paddingLeft: 10,
                            flex: 1,
                            fontSize: 15,
                            marginTop: 2, marginBottom: this.state.keyboardHeight
                        }}
                        underlineColorAndroid="transparent"
                        placeholder='请输入房屋面积'
                        keyboardType='numeric'
                        maxLength={4}
                        onChangeText={(text) => this.setState({square: text})}
                        value={this.state.square ? this.state.square : ''}
                    />
                    <Text style={[styles.leftItemText, styles.paddingRight]}>平方米</Text>
                </View>
                <View style={styles.lineStyle}/>

                <TouchableView onPress={() => {
                    this.navigate('HousingAddressList', {
                        title: '我的小区',
                        api: '/api/user/mycommunityList',},
                         (data) => {
                            // ToastUtil.showShort(data.name);
                            console.log(data)
                            this.setState({
                                housingAddress: data.communityName,
                                housingId: data.communityId,
                                elementName: data.roomName,
                                roomId: data.roomId,
                            })
                    })
                }}>
                    <View style={styles.inputRow}>
                        <Text style={styles.leftItemText}>所属小区</Text>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            height: 40,
                            paddingLeft: 10,
                            flex: 1,
                        }}>
                            <Text
                                style={{fontSize: 15,}}>{this.state.housingAddress ? this.state.housingAddress : '您所属的小区名称'}</Text>
                        </View>
                    </View>
                </TouchableView>
                <View style={styles.lineStyle}/>

                <TextInput
                    ref="commit_info"
                    placeholder='简单描述一下您的房源...'
                    style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        height: 100,
                        padding: 10,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        textAlignVertical: 'top'
                    }}
                    multiline={true}
                    maxLength={100}
                    underlineColorAndroid="transparent"
                    value={this.state.content}
                    onChangeText={(value) => {
                        this.setState({
                            content: value
                        })
                    }}
                />

                <FlatList
                    style={{backgroundColor: '#fff'}}
                    renderItem={this.renderRow.bind(this)}
                    data={this.state.images}
                    keyExtractor={this._keyExtractor}
                    numColumns={cols}
                    // columnWrapperStyle={styles.columnStyle}
                    horizontal={false}
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
                    this.publishHouseInfo()
                }}>
                    <Text style={{color: '#ffffff', fontSize: 14}}>确认提交</Text>
                </TouchableView>
                <View style={{alignItems: 'center', justifyContent: 'center',marginTop:5,marginBottom:37}}>
                    <Text style={{color: '#999', fontSize: 12}}>提交房源信息后，我们会在一个工作日内核实你的申请</Text>
                </View>

            </ScrollView>

        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    _keyboardDidShow(e) {
        console.log(e)
        // this.setState({
        //     keyboardHeight:e.endCoordinates.height
        // })
        this._scrollView.scrollTo({x: 0, y: e.endCoordinates.height, animated: true})

    }

    _keyboardDidHide(e) {
        // this.setState({
        //     keyboardHeight:0
        // })
        this._scrollView.scrollTo({x: 0, y: 0, animated: true})
    }

    _keyExtractor = (item, index) => {
        return item.uri + index
    }

    renderRow(rowData) {
        let that = this
        console.log('rowData', rowData)
        if (rowData.index === 0) {
            return (
                <TouchableView onPress={() => {
                    if (this.state.uploadImages.length <= 2) {
                        this._onSelectImage()
                    } else {
                        this.showShort('最多只能选择3张图片')
                    }
                }}>
                    <View style={{
                        width: ImageWH,
                        height: ImageWH,
                        marginLeft: left,
                        marginTop: top,
                        // 文字内容居中对齐
                        alignItems: 'center',

                    }}>
                        <Image source={require('../../img/icon_add_image.png')} style={{
                            width: ImageWH,
                            height: ImageWH,
                        }}/>
                    </View>
                </TouchableView>
            );
        } else {
            return (
                <View style={{
                    width: ImageWH,
                    height: ImageWH,
                    marginLeft: left,
                    marginTop: top,
                    // 文字内容居中对齐
                    alignItems: 'center'
                }}>
                    <Image source={{uri: rowData.item}} style={{
                        width: ImageWH,
                        height: ImageWH,
                    }}/>
                    <TouchableView onPress={() => {
                        console.log(this.state.images)
                        this.state.images.splice(rowData.index, 1)
                        this.setState({
                            images: this.state.images
                        })
                    }} style={{
                        position: 'absolute',
                        top: 0,
                        right: 0
                    }}>
                        <Image source={require('../../img/icon_delete.png')} style={{
                            width: 10,
                            height: 10,

                        }}/>
                    </TouchableView>

                </View>
            );
        }

    }


    _onSelectImage() {
        const {images} = this.state
        const BUTTONS = [
            '相册',
            '相机',
            '取消',
        ];
        ActionSheet.showActionSheetWithOptions(
            {
                options: BUTTONS,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    ImagePicker.openPicker({
                        multiple: false,
                        compressImageQuality: CommonStyle.compressImageQuality,
                    }).then(image => {
                        let files = [
                            {
                                filePath: image.path,
                                fileType: image.mime,
                            }
                        ]
                        console.log(image)
                        this.updateFile(files);
                        images.push(image.path)
                        this.setState({
                            images: images
                        })
                    });
                } else if (buttonIndex == 1) {
                    ImagePicker.openCamera({
                        // width: 300,
                        // height: 300,
                        compressImageQuality: CommonStyle.compressImageQuality,
                        cropping: false
                    }).then(image => {
                        let files = [
                            {
                                filePath: image.path,
                                fileType: image.mime,
                            }
                        ]
                        console.log(image)
                        this.updateFile(files);
                        images.push(image.path)
                        this.setState({
                            images: images
                        })
                    });
                }
            },
        );
    }

    publishHouseInfo() {
        Keyboard.dismiss();
        let {titleInput, initId, price, housingId, content, uploadImages, phone, square, roomId, base} = this.state;

        if (!titleInput.length) {
            this.showShort('请输入标题');
            return;
        }
        if (!base.length) {
            this.showShort('请输入如几室几厅几卫，第多少层');
            return;
        }
        if (!price.length) {
            this.showShort('请输入面议or填写具体标准，是否包含物业费');
            return;
        }
        if (!phone.length) {
            this.showShort('请输入联系方式');
            return;
        }

        if (!square.length) {
            this.showShort('请输入房屋面积');
            return;
        }
        // if (!housingId.length ) {
        //     this.showShort('请选择小区');
        //     return;
        // }

        let param = {
            title: titleInput,
            communityId: housingId,
            content: content,
            imageList: uploadImages,
            phone: phone,
            price: price,
            square: square,
            type: initId,
            base: base
        };

        console.log(param)
        Request.post('/api/steward/publishhousing', param,
            {
                mock: false,
                mockId: 1095647,
            }).then(rep => {
            if (rep.code == 0) {
                this.goBack()
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    /**
     * /api/user/batchUpdateImage
     * /api/user/updateImage
     * @param files
     */
    updateFile(files) {
        const {uploadImages} = this.state
        this.showLoading('上传中...')
        Keyboard.dismiss();
        Request.uploadFile('/api/user/batchUpdateImage', files)
            .then(rep => {
                if (rep.code === 0) {
                    for (var i = 0; i < rep.data.length; i++) {
                        uploadImages.push(rep.data[i])
                    }

                    console.log('=======上传结果=======')
                    console.log(uploadImages)
                }
            }).catch(err => {
        }).done(() => {
            this.hideLoading();
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
        fontSize: 15,
        marginTop: 2
    },
    lineStyle: {
        height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'
    },
    inputRow: {
        flexDirection: 'row', height: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
        paddingLeft: 15,
    },
    leftItemText: {
        textAlign: 'center', color: '#333', fontSize: 15
    },
    marginTop: {
        marginTop: 10
    },
    paddingRight: {
        paddingRight: 10
    }
});
