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
import ToastUtil from "../../utils/ToastUtil";
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
            topicId:''
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
                            ToastUtil.showShort(data.name);
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
                        this.showShort('shanchu')
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

    publishPost() {
        Keyboard.dismiss();
        let {content, images,topicId} = this.state;
        if (!content.length) {
            this.showLong('请输入内容');
            return;
        }
        images.splice(0, 1)
        let param = {content: content, imageUrlList: images, type: topicId,title: 'test'};

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

    updateFile(files) {
        Keyboard.dismiss();
        let param = [{fileType:files[0].fileType, filePath: files[0].filePath}];
        Request.uploadFile('/api/user/updateImage', param,{})
            .then(rep => {
                console.log(rep)
                // this.showLong(rep.bstatus.desc);
            }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })

    }
}
