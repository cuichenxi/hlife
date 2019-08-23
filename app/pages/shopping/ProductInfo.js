import React from "react";
import {View, WebView} from "react-native";
import {BaseComponent} from "../../components/base/BaseComponent";
import util from "../../utils/util";

export default class Index extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            htmlContent: ''
        };
    }

    onReady(e) {
        this.setTitle(e.title)
        this.setState({
            htmlContent: e.htmlContent
        })
    }


    _render() {
        var html = this.state.htmlContent;
        console.debug('html' + html);
        if (util.isEmpty(html)) {
            html = '无'
        }
        return (
            <WebView
                originWhitelist={['*']}
                source={{html: html,baseUrl:''}}
            />
        );
    }


}
