import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Image, Keyboard, StyleSheet, Text, TextInput, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import {ActionSheet} from "antd-mobile-rn";
import ImagePicker from "react-native-image-crop-picker";
import Request from "../../utils/Request";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import List from "antd-mobile-rn/es/list/index.native";
import DatePicker from "antd-mobile-rn/es/date-picker/index.native";
import Picker from "antd-mobile-rn/es/picker/index.native";
import CheckBox from "../../components/Checkbox";
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
export default class PublishActivity extends BaseComponent {

    navigationBarProps() {
        return {
            title: '发布活动',
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
            uploadImages:[],
            activityName:'',
            activityDate:'',
            activityAddress:'',
            date: undefined,
            datetime: '',
            limiting:false,
            persons:0

        }
    }

    onRightPress(){
        this.publishActivity()
    }

    _render() {
        const {images,activityName,activityDate,activityAddress,limiting,persons} = this.state
        return (
            <View style={{flex: 1}}>
                <View style={[styles.inputRow,styles.marginTop]}>
                    <Text style={{textAlign: 'center'}}>活动标题</Text>
                    <TextInput
                        ref="tax_file_num"
                        style={styles.inputItem}
                        underlineColorAndroid="transparent"
                        placeholder='请输入活动标题'
                        maxLength={20}
                        onChangeText={(text) => this.setState({activityName: text})}
                        value={activityName}
                    />
                </View>

                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={{backgroundColor: '#ffffff'}}>
                    <List>
                        <DatePicker
                            title={'选择活动时间'}
                            value={this.state.date}
                            mode="date"
                            minDate={new Date()}
                            maxDate={new Date(2026, 11, 3)}
                            onChange={this.onChange}
                            format="YYYY-MM-DD"
                            extra=' '
                            onOk={() => {
                                this.props.extra = ' '
                            }}
                            itemStyle={{alignItems: 'center', justifyContent: 'center'}}
                        >
                            <List.Item arrow="horizontal" extra={' '}><Text>活动时间</Text></List.Item>
                        </DatePicker>
                    </List>

                </View>

                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={styles.inputRow}>
                    <Text style={{textAlign: 'center'}}>活动地点</Text>
                    <TextInput
                        ref="tax_file_num"
                        style={styles.inputItem}
                        underlineColorAndroid="transparent"
                        placeholder='请输入活动地点'
                        maxLength={100}
                        onChangeText={(text) => this.setState({activityAddress: text})}
                        value={activityAddress}
                    />
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={styles.inputRow}>
                    <Text style={{textAlign: 'center'}}>人数</Text>
                    <TextInput
                        ref="tax_file_num"
                        style={styles.inputItem}
                        underlineColorAndroid="transparent"
                        placeholder='请输入活动人数'
                        maxLength={3}
                        keyboardType='numeric'
                        onChangeText={(text) => {
                            const newText = text.replace(/[^\d]+/, '');
                            this.setState({persons: newText})
                        }}
                        value={persons}
                    />
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={styles.inputRow}>
                    <Text style={{textAlign: 'center'}}>限制人数</Text>
                    <CheckBox
                        style={{backgroundColor: 'white',
                            marginRight:10,
                            justifyContent: 'center'}}
                        onClick={() => {
                            this.setState({
                                limiting : !limiting
                            })
                        }}
                        isChecked={limiting}
                        rightText={''}
                        checkedImage={<Image source={require('../../img/checked.png')}
                                             style={styles.image}/>}
                        unCheckedImage={<Image source={require('../../img/uncheck.png')}
                                               style={styles.image}/>}
                    />
                </View>

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

    onChange = (value) => {
        console.log(value)
        this.setState({datetime: this.dateToString(value)})
        this.setState({date: value});
    }

    dateToString(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString();
        var day = (date.getDate()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        var dateTime = year + "-" + month + "-" + day;
        console.log(dateTime)
        return dateTime;
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
                        mediaType: "photo",
                        compressImageQuality: CommonStyle.compressImageQuality
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

    publishActivity() {
        Keyboard.dismiss();
        let {content, uploadImages,activityName,datetime,limiting,persons,activityAddress} = this.state;

        if (!activityName.length) {
            this.showShort('请输入活动名称');
            return;
        }
        if (!datetime.length) {
            this.showShort('请选择活动时间');
            return;
        }
        if (!activityAddress.length) {
            this.showShort('请输入活动地点');
            return;
        }
        if (!persons.length) {
            this.showShort('请输入活动人数');
            return;
        }



        if (!content.length) {
            this.showShort('请输入内容');
            return;
        }
        let param = {content: content, imageUrl: uploadImages, activityName: activityName,activityDate: datetime,isLimit:limiting?1:0,persons:persons,place:activityAddress};

        this.showDLoading()
        Request.post('/api/neighbour/activity', param,
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
        // paddingLeft: 10,
        marginLeft:10,
        flex: 1,
        fontSize: 16,
        alignItems:'flex-end',
        justifyContent:'flex-end',
        padding: 0,
        textAlign:'right',
        marginRight: 10
    },
    lineStyle: {
        height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'
    },
    inputRow: {
        flexDirection: 'row', height: 40, backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'center',
        paddingLeft: 15,
        width:'100%'
    },
    marginTop:{
        marginTop:10
    },
    image: {
        marginLeft: 16,
        width: 14,
        height: 14,
    },
});
