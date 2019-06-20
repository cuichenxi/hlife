import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Text, TextInput, View,Keyboard} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RadioModal from "../../components/RadioModal";
import DatePicker from "antd-mobile-rn/es/date-picker/index.native";
import List from "antd-mobile-rn/es/list/index.native";
import Request from "../../utils/Request";


let {width, height} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}

export default class GuestPassKey extends BaseComponent {

    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.title
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            initItem: '男',
            initId: '1',
            date: undefined,
            time: '20:00',
            datetime: '',
            datetime1: '',
            communityId:'',
            name:''
        }
    }

    _render() {
        return (
            <View style={{flex: 1}}>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={{backgroundColor: '#fff', padding: 10}}>
                    <View style={{justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: 17,
                            textAlign: 'left', color: '#666666'
                        }}>张三丰</Text>
                        <Text style={{color: '#999999', fontSize: 15, marginLeft: 10}}>188****0000</Text>
                    </View>

                    <Text style={{
                        fontSize: 17,
                        textAlign: 'left', color: '#666666'
                    }}>地址北京八达岭长城</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={{backgroundColor: '#ffffff'}}>
                    <Text style={{color: CommonStyle.textBlockColor, padding: 10}}>访客姓名</Text>
                    <TextInput
                        style={{width: '100%', padding: 10}}
                        placeholder='请输入访客姓名'
                        maxLength={8}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({name: text})}
                        value={this.state.name ? this.state.name : ''}
                    />
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={{backgroundColor: '#ffffff'}}>
                    <Text style={{color: CommonStyle.textBlockColor, padding: 10}}>访客性别</Text>
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
                        >
                            <Text value="1">男</Text>
                            <Text value="2">女</Text>
                        </RadioModal>
                    </View>
                </View>

                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={{backgroundColor: '#ffffff'}}>
                    <Text style={{color: CommonStyle.textBlockColor, padding: 10}}>到访时间</Text>
                    <List>
                        <DatePicker
                            value={this.state.date}
                            mode="date"
                            minDate={new Date(2016, 6, 1)}
                            maxDate={new Date(2026, 11, 3)}
                            onChange={this.onChange}
                            format="YYYY-MM-DD"
                            extra=' '
                            onOk={()=>{
                                console.log('====onOk====')
                                this.props.extra=' '
                            }}
                            itemStyle={{alignItems:'center',justifyContent:'center'}}
                        >
                            <List.Item arrow="horizontal" extra={' '}><Text>{this.state.datetime}</Text></List.Item>
                        </DatePicker>
                    </List>


                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                </View>

                <TouchableView style={{
                    height: 40,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 20,
                    borderRadius: 30,
                    backgroundColor: CommonStyle.themeColor,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=>{
                    this.guestPass()
                }}>
                    <Text style={{color: '#ffffff', fontSize: 14}}>生成通行证</Text>
                </TouchableView>
                <View style={{
                    marginTop: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>通行证只在到访当天单次有效，逾期或超次需重新生成</Text>
                </View>

            </View>
        );
    }

    onChange = (value) => {
        console.log(value)
        this.setState({datetime:this.dateToString(value)})
        this.setState({ date:value });
    }

    dateToString(date){
        var year = date.getFullYear();
        var month =(date.getMonth() + 1).toString();
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


    guestPass() {
        Keyboard.dismiss();
        let {name, initId, date,communityId,datetime} = this.state;

        if (date) {
            this.setState({datetime:this.dateToString(date)})
        }

        if (!name.length) {
            this.showLong('请输入访客姓名');
            return;
        }

        if (!datetime.length) {
            this.showLong('请选择到访时间');
            return;
        }
        let param = {name: name, gender: initId, date: datetime,communityId:''};

        console.log(param)
        Request.post('api/steward/guestpass', param,
            {
                mock: true,
                mockId: 1095647,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // this.goBack()
                this.navigate('TrafficPermit',{data:rep.data})
                // this.reset('TrafficPermit')
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }
}