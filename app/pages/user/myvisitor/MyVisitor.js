import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import {CommonStyle} from "../../../common/CommonStyle";
import ToastUtil from "../../../utils/ToastUtil";
import VisitorView from "./VisitorView";


/**
 *我的访客
 */
export default class MyVisitor extends BaseComponent {
    navigationBarProps() {
        return {
            title: '我的访客',
        }
    }


    _render() {
        const tabs = [
            {title: '已到访客'},
            {title: '未到访客'},
        ];
        return (
            <Tabs style={{marginTop: 10}} tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor}  onChange={(tab,index)=>{
                // index
                ToastUtil.showShort("index = " + index);
            }}
                  tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor}} initialPage={0} tabBarPosition="top">

                {this.renderPage.bind(this)}
            </Tabs>

        )
    }

    renderPage(tab,index){
        console.log(index)
        return(
            <VisitorView style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }} tab={tab} index={index}
                                onItemPress={(item) => {
                                    // this.goBack(item)
                                    // this.navigate('ModifyHousingAddress',{address:item})
                                    // ToastUtil.showShort("index = " + index);
                                }}/>
        )
    }

}
