import React, {Component} from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import CheckBox from "../../components/Checkbox";
import {CommonStyle} from "../../common/CommonStyle";
import TouchableView from "../../components/TouchableView";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

let {width} = Dimensions.get('window')
const Font = {
    Ionicons,
    FontAwesome
}
export default class LivingPaymentItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.item != nextProps.item || this.props.select != nextProps.select);
    }

    render() {
        const {item,checked} = this.props
        return (
            <TouchableView
                onPress={this.props.onPress}
            >
                <View style={{
                    backgroundColor: 'white',
                    height: 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // padding: 10,
                }}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <CheckBox
                            style={styles.checkBox}
                            isChecked={item.checked}
                            rightText={''}
                            onClick={this.props.onItemChecked}
                            rightTextStyle={styles.text}
                            checkedImage={<Image source={require('../../img/icon_buy_select.png')}
                                                 style={styles.image}/>}
                            unCheckedImage={<Image source={require('../../img/icon_buy_unselect.png')}
                                                   style={styles.image}/>}
                        />
                        <Text style={{paddingLeft: 5, color: '#333', fontSize: 15}}>{item.startDate.substring(0, 10)}~{item.endDate.substring(0, 10)}</Text>
                    </View>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        paddingRight: 10
                    }}>

                        <Text style={{
                            color: CommonStyle.themeColor,
                            padding: 3,
                            fontSize: 17
                        }}>¥{item.totalMoney}</Text>
                        <Font.Ionicons name="ios-arrow-forward-outline" size={(18)}
                                       color="#bbb"/>
                    </View>
                </View>
            </TouchableView>
        );
    }
}

const styles = StyleSheet.create({
    checkBox: {
        backgroundColor: 'white',
        height: 56,
        marginTop: 1,
        justifyContent: 'center'
    },
    image: {
        marginLeft: 16,
        width: 14,
        height: 14,
    },


});
