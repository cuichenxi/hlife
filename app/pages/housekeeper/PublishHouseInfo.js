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

let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}
const cols = 4; // 列数
const left = 10; // 左右边距
const top = 10; // 上下边距
const ImageWH = (width - (cols + 1) * left) / cols; // 图片大小
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
            housingAddress:'',
            housingId:'',

            images: ['add'],
            content: '',
            uploadImages:[]
        }
        // let param = {bedroom: '', contact: '',  livingRoom:'',restRoom:'',


    }


    _render() {
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

                    <TouchableView onPress={() =>{
                        this.navigate('HousingAddressList', {
                            title: '我的小区',
                            api: '/api/user/mycommunityList',
                            callback: (data) => {
                                // ToastUtil.showShort(data.name);
                                this.setState({
                                    housingAddress: data.communityName,
                                    housingId: data.id
                                })
                            }
                        })
                    }}>
                    <View style={styles.inputRow}>
                        <Text style={styles.leftItemText}>所居住的小区</Text>
                        <View style={{justifyContent:'center',alignItems:'flex-start',height: 40, paddingLeft: 10, flex: 1,}}>
                            <Text style={{fontSize: 15,}}>{this.state.housingAddress ? this.state.housingAddress : '您所居住的小区名称'}</Text>
                        </View>
                    </View>
                    </TouchableView>
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

                    <TextInput
                        ref="commit_info"
                        placeholder='输简单描述一下您的房源...'
                        style={{
                            width: '100%',
                            backgroundColor: '#fff',
                            height: 100,
                            padding: 10,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            textAlign:'left',
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
                        this.addBillInfo()
                    }}>
                        <Text style={{color: '#ffffff', fontSize: 14}}>确认提交</Text>
                    </TouchableView>
                </KeyboardAvoidingView>
            </ScrollView>

        );
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
                    this._onSelectImage()
                }}>
                    <View style={{
                        width: ImageWH,
                        height: ImageWH ,
                        marginLeft: left,
                        marginTop: top,
                        // 文字内容居中对齐
                        alignItems: 'center',

                    }}>
                        <Image source={require('../../img/icon_add_image.png')} style={{
                            width: ImageWH,
                            height: ImageWH ,
                        }}/>
                    </View>
                </TouchableView>
            );
        } else {
            return (
                <View style={{
                    width: ImageWH,
                    height: ImageWH ,
                    marginLeft: left,
                    marginTop: top,
                    // 文字内容居中对齐
                    alignItems: 'center'
                }}>
                    <Image source={{uri: rowData.item}} style={{
                        width: ImageWH,
                        height: ImageWH ,
                    }}/>
                    <TouchableView onPress={()=>{
                        console.log(this.state.images)
                        this.state.images.splice(rowData.index, 1)
                        this.setState({
                            images:this.state.image
                        })
                        console.log('=======重新赋值======')
                        console.log(this.state.images)
                    }} style={{position: 'absolute',
                        top:0,
                        right:0}}>
                        <Image source={require('../../img/icon_delete.png')} style={{
                            width: 10,
                            height: 10 ,

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
                        cropping: false
                    }).then(image => {
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
        let { initId,housingId,content,uploadImages,phone,housesize} = this.state;

        let min = 0
        if (date) {
            this.setState({datetime: this.dateToString(date)})
        }


        if (!datetime.length) {
            this.showShort('请选择到访时间');
            return;
        }
        if (!validTime.length) {
            this.showShort('请选择有效时间');
            return;
        }
        if (validTime.join('') === '1小时') {
            min = 60
        } else if (validTime.join('') === '3小时'){
            min = 180
        } else if (validTime.join('') === '6小时'){
            min = 360
        }
        // let param = {title:this.state.title,bedroom: '', communityId: housingId, contact: datetime, content: content, imageList: uploadImages,livingRoom:'',phone:phone,restRoom:'',square:housesize,type:initId};
        let param = {title:this.state.title,communityId: housingId, content: content, imageList: uploadImages,livingRoom:'',phone:phone,restRoom:'',housesize:housesize,type:initId};

        console.log(param)
        Request.post('/api/steward/publishhousing', param,
            {
                mock: false,
                mockId: 1095647,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // this.goBack()
                // this.navigate('TrafficPermit', {data: rep.data})
                // this.reset('TrafficPermit')
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
                if (rep.code === 0){
                    for (var i=0;i<rep.data.length;i++){
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
        marginTop:2
    },
    lineStyle: {
        height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'
    },
    inputRow: {
        flexDirection: 'row', height: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
        paddingLeft: 15,
    },
    leftItemText:{
        textAlign: 'center',color:'#333',fontSize:15
    }
});
