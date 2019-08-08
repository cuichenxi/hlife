import {BaseComponent} from "../../components/base/BaseComponent";
import {View, WebView} from "react-native";
import React from "react";
import Request from "../../utils/Request";
import util from "../../utils/util";
import Text from "react-native-elements/src/text/Text";

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
                {
                    this.state.msgTitle && <Text style={{
                        fontSize: 16,
                        color: '#333',
                        marginTop: 10,
                        justifyContent: 'center'
                    }}>this.state.msgTitle</Text>
                }
                {
                    this.state.msgTime &&
                    <Text style={{fontSize: 10, color: '#666', marginLeft: 10, marginTop: 5}}>this.state.msgTime</Text>
                }
                <WebView
                    originWhitelist={['*']}
                    source={{html: html}}
                />
            </View>

        );
    }


}
