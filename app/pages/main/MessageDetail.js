import {BaseComponent} from "../../components/base/BaseComponent";
import {View, WebView, Text} from "react-native";
import React from "react";
import Request from "../../utils/Request";
import util from "../../utils/util";

export default class MessageDetail extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            msgContent: '',
            msgTitle: '',
            msgTime: '',
        };
    }

    onReady(e) {
        this.setTitle("消息详情")
        this.requestData(e.id);
    }

    requestData(id) {
        this.showDLoading();
        let param = {id: id};
        Request.post('/api/home/messagedetail', param).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState({
                    msgContent: rep.data.message,
                    msgTitle: rep.data.title,
                    msgTime: rep.data.createtime
                })
            } else {
            }
        }).catch(err => {
        }).done(() => {
            this.hideLoading();
        })
    }

    _render() {
        var html = this.state.msgContent;
        console.debug('html' + html);
        if (util.isEmpty(html)) {
            html = '无'
        }
        return (
            <View>
                <Text style={{
                    fontSize: 18,
                    color: '#333',
                    marginTop: 10,
                    alignSelf:'center'
                }}>{this.state.msgTitle}</Text>
                <Text style={{fontSize: 10, color: '#666', marginLeft: 10, marginTop: 10}}>时间:{this.state.msgTime}</Text>
                <Text style={{fontSize: 16, color: '#666', marginHorizontal: 10, marginTop: 10}}>{html}</Text>
            </View>

        );
    }


}
/**
 * <WebView
 originWhitelist={['*']}
 source={{html: html}}
 />
 */

