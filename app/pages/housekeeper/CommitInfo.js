import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {ActionSheet} from "antd-mobile-rn";
import ImagePicker from "react-native-image-crop-picker";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";

export default class CommitInfo extends BaseComponent {

    constructor(props) {
        super(props);
        this.state={
            images:[]
        }
    }

    _render() {
        return (
            <View>
                <TextInput
                    ref="login_name"
                    placeholder='您对我们的工作有什么建议'
                    style={{width: '100%', backgroundColor: '#fff', height: 100, marginBottom: 20}}
                    multiline={true}
                    maxLength={100}
                    underlineColorAndroid="transparent"/>
                <TouchableView onPress={() => {
                    this._onSelectImage()
                }}>
                    <View style={{backgroundColor:'#fff'}}>
                        <Image style={{alignItems: 'center', justifyContent: 'center', height: 67, width: 67}}
                               source={require('../../img/plus.png')}/>
                    </View>
                </TouchableView>
                <View >
                    {this._renderBottomItem(this.state.images)}
                </View>

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
            </View>
        )
    }

    _renderBottomItem = (data) => {
        if (data.length >0){
            return data.map((item, i) => {
                return (<TouchableOpacity style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5
                }}>
                    <Image
                        source={item.imageUrl}
                        // source={{uri: banner}}
                        style={{
                            width: 67,
                            height: 67,
                            resizeMode: 'contain'
                        }}
                    />
                </TouchableOpacity>)
            })
        }

    };


    _onSelectImage() {
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
                        width: 300,
                        height: 300,
                        cropping: true,
                        // multiple: true,
                        // maxFiles: 4
                    }).then(image => {
                        let files = [
                            {
                                filePath: image.path,
                                fileType: image.mime,
                            }
                        ]
                        this._uploadHeader(files);
                        console.log(image);
                        // this.setState({
                        //     images: image.path
                        // })
                    });
                } else if (buttonIndex == 1) {
                    ImagePicker.openCamera({
                        width: 300,
                        height: 300,
                        cropping: true
                    }).then(image => {
                        console.log(image);
                    });
                }
            },
        );
    }

}
