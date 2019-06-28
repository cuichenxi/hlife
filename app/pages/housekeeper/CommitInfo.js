import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, Keyboard, Text, TextInput, View} from "react-native";
import {ActionSheet} from "antd-mobile-rn";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import ImagePicker from "react-native-image-crop-picker";
import Request from "../../utils/Request";
import {COMPLAINTPRAISE, GIVEADVICE} from "../../constants/AppConstants";
// 一些常量设置
let {width, height} = Dimensions.get('window')

const cols = 4; // 列数
const left = 10; // 左右边距
const top = 10; // 上下边距
const ImageWH = (width - (cols + 1) * left) / cols; // 图片大小

export default class CommitInfo extends BaseComponent {
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
            communityId:'',
            uploadImages:[],
            title:this.props.navigation.state.params.title,
            hideUpload:this.props.navigation.state.params.hideUpload,
            commitType:this.props.navigation.state.params.commitType

        }
    }



    _render() {
        const {hideUpload} = this.state
        return (
            <View>
                <TextInput
                    placeholder='您对我们的工作有什么建议'
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
                        // this._uploadHeader(files);
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

    commitInfo() {
        Keyboard.dismiss();
        let {contentValue,title,commitType} = this.state;
        var type=1
        if (!contentValue.length) {
            this.showLong('请输入内容');
            return;
        }
        if (commitType === COMPLAINTPRAISE) {
            if (title == '我要投诉'){
                type=1
            } else if (title == '我要表扬') {
                type = 2
            }
        } else if (commitType === GIVEADVICE) {
            if (title == '发表建议'){
                type=1
            } else if (title == '我要咨询') {
                type = 2
            }
        }

        let param = {content: contentValue, type:type };

        console.log(param)
        Request.post(commitType === COMPLAINTPRAISE ?'/api/steward/complaintpraise':'/api/steward/consultsuggest', param,
            {
                mock: false,
                mockId: 1095545,
            }).then(rep => {
            if (rep.code == 0) {
                this.goBack()
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

}
