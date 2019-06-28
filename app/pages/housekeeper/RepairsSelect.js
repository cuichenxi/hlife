import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {
    Dimensions, FlatList,
    Image,
    ImageBackground,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import Icon from "react-native-vector-icons/Ionicons";
import GridView from "../../components/GridView";
import UserStore from "../../store/UserStore";
import util from "../../utils/util";

let {width, height} = Dimensions.get('window')

// 一些常量设置
const cols = 3; // 列数
const left = 10; // 左右边距
const top = 10; // 上下边距
const ImageWH = (width - (cols + 1) * left) / cols; // 图片大小
export default class RepairsSelect extends BaseComponent {
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.title,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            // title: this.props.navigation.state.params.title,
            firstType: this.props.navigation.state.params.title === '咨询建议' ? '发表建议' : '我要投诉',
            secondType: this.props.navigation.state.params.title === '咨询建议' ? '我要咨询' : '我要表扬',
            types: [
                {
                    name: '居家报修',
                    active: 'Register'
                }, {
                    name: '小区报修',
                    active: 'lifePay'
                }, {
                    name: '小区卫生',
                    active: 'Login'
                }, {
                    name: '小区绿化',
                    // active: 'ContactList'
                    active: 'GiveAdvice'
                }, {
                    name: '小区安全',
                    active: 'Login'
                }
            ],
            headerUrl: '',
            userName: '',
            userPhone: '',
        }
    }

    onReady(param) {
        let userInfo = UserStore.get();
        this.setState({
            headerUrl: util.stringValue(userInfo.avatar),
            userName: userInfo.userName,
            userPhone: userInfo.phone,
        })
    }

    _render() {
        const {userName, userPhone} = this.state
        return (
            <ScrollView style={{
                flex: 1,
                paddingBottom: 68,
            }} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />}>

                <View>
                    <View style={{
                        backgroundColor: 'white',
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10
                    }}>
                        <Image source={require('../../img/address.png')}
                               style={{width: 37, height: 37, resizeMode: 'contain'}}/>
                        <Text></Text>
                        <View style={{flex: 1, marginLeft: 10}}>
                            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'left', color: '#666666'
                                }}>{userName}</Text>
                                <Text style={{color: '#999999', fontSize: 15}}>{userPhone}</Text>
                            </View>

                            <Text style={{
                                fontSize: 17,
                                textAlign: 'left', color: '#666666'
                            }}>地址</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20,
                        height: 50, alignItems: 'center', paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff'
                    }}>
                        <Image source={require('../../img/advice_type.png')}
                               style={{width: 18, height: 15, resizeMode: 'contain'}}/>
                        <Text style={{color:'#333',fontSize:16,marginLeft:5}}>您要选择的类型是？</Text>
                    </View>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <FlatList
                        style={{backgroundColor: '#fff', flex: 1}}
                        renderItem={this.renderRow}
                        data={this.state.types}
                        keyExtractor={this._keyExtractor}
                        numColumns={cols}
                        // columnWrapperStyle={styles.columnStyle}
                        horizontal={false}
                    />

                </View>
            </ScrollView>

        )
    }

    _keyExtractor = (item, index) => {
        return item.uri + index
    }

    // 返回cell
    renderRow(rowData) {
        console.log('rowData', rowData)
        return (
            <TouchableView onPress={() => {
                // this
                this.navigate('ReportMatter',{title: rowData.item.name})
            }}>
                <View style={{
                    width: ImageWH,
                    height: ImageWH - 20,
                    marginLeft: left,
                    marginTop: top,
                    // 文字内容居中对齐
                    alignItems: 'center'
                }}>

                    <ImageBackground style={{alignItems: 'center', justifyContent: 'center', height: 67, width: 107,}}
                                     source={require('../../img/theme_color_bg.png')}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>{rowData.item.name}</Text>
                    </ImageBackground>

                </View>
            </TouchableView>
        );
    }

}
