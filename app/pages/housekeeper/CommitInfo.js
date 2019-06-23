import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Image, Text, TextInput, View,} from "react-native";
import {ActionSheet} from "antd-mobile-rn";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import GridView from "../../components/GridView";

export default class CommitInfo extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }



    _render() {
        return (
            <View>
                <TextInput
                    ref="commit_info"
                    placeholder='您对我们的工作有什么建议'
                    style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        height: 100,
                        marginBottom: 20,
                        marginTop: 10,
                        padding: 10,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}
                    multiline={true}
                    maxLength={100}
                    underlineColorAndroid="transparent"/>
                <View style={{height: 100}}>
                    {this._renderGridView(this.state.images)}
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


    _renderGridView = (data) => {
        data.push('https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png')
        // data.push('https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png')
        // data.push('https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png')
        // data.push('https://gjscrm-1256038144.cos.ap-beijing.myqcloud.com/digitalstore/banner_1.png')
        return (
            <GridView
                style={{
                    flex: 1,
                    paddingBottom: 20,
                    backgroundColor: '#fff',
                    height: 100,
                    margin: 10
                }}
                items={data}
                num={4}
                renderItem={this._renderGridItem.bind(this)}
            />
        );
    }

    _renderGridItem(item, index) {
        return (
            <TouchableView style={{
                flex: 1, height: 100,
                // width:107
            }}>
                <View style={{
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center", flex: 1, height: 100,
                    // width:107
                }}>
                    {index === 0 ?
                        <Image style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 100,
                            // width: 107,
                            resizeMode: 'center'
                        }}
                               source={require('../../img/plus.png')}/> : <Image
                            source={{uri: item}}
                            style={{
                                width: 100,
                                height: 107,
                                resizeMode: 'center'
                            }}
                        />}
                </View>


            </TouchableView>
        )
    }


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
