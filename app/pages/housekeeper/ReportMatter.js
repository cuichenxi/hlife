import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TextInput, View} from "react-native";
import {ActionSheet} from "antd-mobile-rn";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import ImagePicker from "react-native-image-crop-picker";
import Request from "../../utils/Request";
// 一些常量设置
let {width, height} = Dimensions.get('window')

const cols = 4; // 列数
const left = 10; // 左右边距
const top = 10; // 上下边距
const ImageWH = (width - (cols + 1) * left) / cols; // 图片大小

export default class ReportMatter extends BaseComponent {
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.title,
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            images: ['add'],
            contentValue:'',
            type:1,
            uploadImages:[],
            title:this.props.navigation.state.params.title,
            repairType:this.props.navigation.state.params.repairType,
            titleInput:'',
            phone:'',
            address:'',

        }
    }



    _render() {
        const {hideUpload} = this.state
        return (
            <View>
                <View style={[styles.inputRow,styles.marginTop]}>
                    <Text style={styles.leftItemText}>标题</Text>
                    <TextInput
                        style={styles.inputItem}
                        underlineColorAndroid="transparent"
                        placeholder='填写标题'
                        onChangeText={(text) => this.setState({titleInput: text})}
                        value={this.state.titleInput ? this.state.titleInput : ''}
                    />
                </View>
                <View style={styles.lineStyle}/>
                <View style={styles.inputRow}>
                    <Text style={styles.leftItemText}>电话</Text>
                    <TextInput
                        style={styles.inputItem}
                        underlineColorAndroid="transparent"
                        placeholder='填写电话'
                        keyboardType='numeric'
                        maxLength={11}
                        onChangeText={(text) => this.setState({phone: text})}
                        value={this.state.phone ? this.state.phone : ''}
                    />
                </View>
                <View style={styles.lineStyle}/>
                <View style={styles.inputRow}>
                    <Text style={styles.leftItemText}>地点</Text>
                    <TextInput
                        style={styles.inputItem}
                        underlineColorAndroid="transparent"
                        placeholder='填写报修地点'
                        onChangeText={(text) => this.setState({address: text})}
                        value={this.state.address ? this.state.address : ''}
                    />
                </View>
                <View style={styles.lineStyle}/>
                <TextInput
                    placeholder='问题描述'
                    style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        height: 100,
                        marginBottom: 20,
                        marginTop: 10,
                        padding: 10,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        textAlign:'left',
                        textAlignVertical: 'top'
                    }}
                    multiline={true}
                    maxLength={100}
                    underlineColorAndroid="transparent"
                    onChangeText={(value) =>this.setState({contentValue:value})}
                    value={this.state.contentValue ? this.state.contentValue : ''}
                />

                {
                    !hideUpload?<FlatList
                        style={{backgroundColor: '#fff'}}
                        renderItem={this.renderRow.bind(this)}
                        data={this.state.images}
                        keyExtractor={this._keyExtractor}
                        numColumns={cols}
                        // columnWrapperStyle={styles.columnStyle}
                        horizontal={false}
                    />:<View/>
                }


                <TouchableView onPress={()=>{
                    this.commitInfo()
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
                        <Text style={{color: '#ffffff', fontSize: 14}}>确认提交</Text>
                    </View>
                </TouchableView>

            </View>
        )
    }

    _keyExtractor = (item, index) => {
        return item.uri + index
    }

    renderRow(rowData) {
        console.log('rowData', rowData)
        if (rowData.index === 0) {
            return (
                <TouchableView onPress={() => {
                    if (this.state.uploadImages.length <= 2){
                        this._onSelectImage()
                    } else {
                        this.showShort('最多只能选择3张图片')
                    }
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
                        this.showShort('shanchu')
                        console.log(this.state.images)
                        this.state.images.splice(rowData.index, 1)
                        this.setState({
                            images:this.state.images
                        })
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

    commitInfo() {

        Keyboard.dismiss();
        let {address,uploadImages,contentValue,phone,titleInput,repairType} = this.state;
        if (!titleInput.length) {
            this.showShort('请输入标题');
            return;
        }
        if (!phone.length ) {
            this.showShort('请输入电话');
            return;
        }
        if (!address.length ) {
            this.showShort('请输入地点');
            return;
        }
        if (!contentValue.length ) {
            this.showShort('请输入问题描述');
            return;
        }


        let param = {address:address,imageList:uploadImages,intro:contentValue,phone:phone,repairtype:repairType,title:titleInput };

        this.showDLoading()
        console.log(param)
        Request.post('/api/steward/repairs', param,
            {
                mock: false,
                mockId: 1095545,
            }).then(rep => {
            this.showShort(rep.message)
            if (rep.code == 0) {
                this.goBack()
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
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
    },
    marginTop:{
        marginTop:10
    }
});
