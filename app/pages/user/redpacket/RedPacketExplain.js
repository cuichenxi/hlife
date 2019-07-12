import {BaseComponent} from "../../../components/base/BaseComponent";
import React from "react";
import {ScrollView, StyleSheet, Text} from "react-native";
import {CommonStyle} from "../../../common/CommonStyle";

export default class RedPacketExplain extends BaseComponent {

    _render() {
        return (
            <ScrollView>
                <Text>1.如何获得积分
                    1）新认证并通过业主信息核实
                    2）邀请家人邻居
                    3）在APP当中购买商品
                    4）在APP中缴纳物业费
                    5）邀请访客使用访客通行
                    6）使用在线报修、在线咨询等功能
                    二、积分有什么用？
                    积分兑换红包
                    三、备注
                    1）积分兑换标准及兑换规则均以兑换当时最新活动公告为准，公告如有有效期的，逾期则不得兑换
                    2）部分兑换商品有数量限制，兑完为止
                    3）利用系统漏洞或以其他方式恶意赚取积分的，经查证后，将追缴相关积分，并保留追究相关法律责任的权利；

                    4）若申请退货，订单中包含以积分兑换的服务，则积分不予返还；

                    5）若因个人填写的联系方式、收货地址等信息有误，并经三次联系未果，无法发放或无法寄送的，视同自动放弃兑换产品的资格，不再补发；

                    6）我方保留对积分细则的解释权，并有权根据需要对积分细则予以修订和废除。</Text>
            </ScrollView>

        );
    }


};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CommonStyle.bgColor,
    },
});
