import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {CommonStyle} from "../../common/CommonStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Font = {
    Ionicons,
    FontAwesome
}
let {width, height} = Dimensions.get('window')

export default class BillDetail extends BaseComponent{

    _render() {
        return (
            <View>
                <View style={styles.titleLine}>


                    <Image source={require('../../img/bill_info.png')}
                           style={{ width: 20, height: 20, resizeMode: 'contain'}}/>
                    <Text style={{
                        color: CommonStyle.textGrayColor,
                        padding: 3,
                        fontSize: 16
                    }}>收费信息</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={styles.contentItem}>


                    <Text style={styles.contentText}>收费信息</Text>
                    <Text style={styles.contentText}>收费信息</Text>
                </View>
                <View style={styles.contentItem}>


                    <Text style={styles.contentText}>收费地址</Text>
                    <Text style={styles.contentText}>收费信息</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={styles.titleLine}>


                    <Image source={require('../../img/bill_detail.png')}
                           style={{ width: 20, height: 20, resizeMode: 'contain'}}/>
                    <Text style={{
                        color: CommonStyle.textGrayColor,
                        padding: 3,
                        fontSize: 16
                    }}>收费详情</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: width}}/>
                <View style={styles.contentItem}>


                    <Text style={styles.contentText}>收费信息</Text>
                    <Text style={styles.contentText}>收费信息</Text>
                </View>
                <View style={styles.contentItem}>


                    <Text style={styles.contentText}>收费地址</Text>
                    <Text style={styles.contentText}>收费信息</Text>
                </View>
                <View style={styles.contentItem}>


                    <Text style={styles.contentText}>收费信息</Text>
                    <Text style={styles.contentText}>收费信息</Text>
                </View>
                <View style={styles.contentItem}>


                    <Text style={styles.contentText}>收费地址</Text>
                    <Text style={styles.contentText}>收费信息</Text>
                </View>
                <View style={styles.contentItem}>


                    <Text style={styles.contentText}>收费信息</Text>
                    <Text style={styles.contentText}>收费信息</Text>
                </View>
                <View style={styles.contentItem}>


                    <Text style={styles.contentText}>收费地址</Text>
                    <Text style={styles.contentText}>收费信息</Text>
                </View>
                <View style={styles.contentItem}>


                    <Text style={styles.contentText}>收费信息</Text>
                    <Text style={styles.contentText}>收费信息</Text>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    titleLine:{
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 10,
        backgroundColor:'#fff'
    },
    contentItem:{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        backgroundColor:'#fff'
    },
    contentText:{
        color: CommonStyle.textGrayColor,
        padding: 3,
        fontSize: 14
    }
})
