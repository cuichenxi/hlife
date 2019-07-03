import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, Keyboard, Text, TextInput, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import {ActionSheet} from "antd-mobile-rn";
import ImagePicker from "react-native-image-crop-picker";
import Request from "../../utils/Request";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// 一些常量设置
let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}
const cols = 4; // 列数
const left = 10; // 左右边距
const top = 10; // 上下边距
const ImageWH = (width - (cols + 1) * left) / cols; // 图片大小
export default class PublishPost extends BaseComponent {

    navigationBarProps() {
        return {
            title: '发布帖子',
            rightTitle:'发布',
            onRightPress:()=>{}
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            images: ['add'],
            content: '',
            topic:'',
            topicId:'',
            uploadImages:[]
        }
    }

    onRightPress(){
        this.publishPost()
    }

    _render() {
        const {images} = this.state
        return (
            <View style={{backgroundColor:'#fff',flex: 1}}>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <TouchableView onPress={() => {
                    this.navigate('TopicTypeList', {
                        callback: (data) => {
                            this.setState({
                                topic: data.name,
                                topicId: data.id,
                            })
                        }
                    })
                }}>
                    <View style={{
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // padding: 10,
                        backgroundColor: '#fff',
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}>
                        <Text style={{textAlign: 'center', color: '#333', fontSize: 15}}>选择发布到</Text>
                        <View
                            style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{marginRight: 5, fontSize: 14, color: '#999'}}>{this.state.topic === ''?'请选择':this.state.topic}</Text>
                            <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                           color="#bbb"/>
                        </View>
                    </View>
                </TouchableView>

                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>

                <TextInput
                    ref="commit_info"
                    placeholder='输入内容...'
                    style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        height: 100,
                        marginBottom: 20,
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


            </View>
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

    publishPost() {
        Keyboard.dismiss();
        let {content, uploadImages,topicId} = this.state;
        if (!content.length) {
            this.showLong('请输入内容');
            return;
        }
        let param = {content: content, imageUrlList: uploadImages, type: topicId,title: 'test'};

        console.log(param)
        Request.post('/api/neighbour/publishinvitation', param,
            {
                mock: false,
                mockId: 1095545,
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
