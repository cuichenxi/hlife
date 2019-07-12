import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {ScrollView, Text, View} from "react-native";

export default class IntegralExplain extends BaseComponent {
    navigationBarProps() {
        return {
            title: '积分说明',
        }
    }

    _render() {
        var text = '一、如何获得积分\n' +
            '1）新认证并通过业主信息核实\n' +
            '2）邀请家人邻居\n' +
            '3）在APP当中购买商品\n' +
            '4）在APP中缴纳物业费\n' +
            '5）邀请访客使用访客通行\n' +
            '6）使用在线报修、在线咨询等功能\n' +
            '二、积分有什么用？\n' +
            '积分兑换红包\n' +
            '三、备注\n' +
            '1）积分兑换标准及兑换规则均以兑换当时最新活动公告为准，公告如有有效期的，逾期则不得兑换\n' +
            '2）部分兑换商品有数量限制，兑完为止\n' +
            '3）利用系统漏洞或以其他方式恶意赚取积分的，经查证后，将追缴相关积分，并保留追究相关法律责任的权利；\n' +
            '\n' +
            '4）若申请退货，订单中包含以积分兑换的服务，则积分不予返还；\n' +
            '\n' +
            '5）若因个人填写的联系方式、收货地址等信息有误，并经三次联系未果，无法发放或无法寄送的，视同自动放弃兑换产品的资格，不再补发；\n' +
            '\n' +
            '6）我方保留对积分细则的解释权，并有权根据需要对积分细则予以修订和废除。'
        return (
            <ScrollView style={{flex: 1, padding: 15}}>
                <Text>{text}</Text>
            </ScrollView>
        );
    }

}
