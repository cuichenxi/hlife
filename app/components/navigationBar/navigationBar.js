/**
 * Created by guangqiang on 2017/8/27.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {CommonStyle} from '../../common/CommonStyle'
import QIcon from '../icon/index'

const barBtnWidth = 80
const defaultNavigationBarProps = {
    hiddenNav: false,
    hiddenLeftItem: false,
    hiddenRightItem: false,
    leftIcon: {
        name: 'icon-back',
        size: 25,
        color: '#333'
    }
}

/**
 * NavigationBar 配置项
 * @type {{navigationBarProps: (*), onLeftPress: *, onRightPress: *, hiddenNav: (*), navBarStyle, navContentStyle, hiddenLeftItem: (*), leftIcon, leftTitle, leftTitleStyle, leftItemStyle, titleStyle, title, subTitleStyle, subTitle, hiddenRightItem: (*), rightIcon, rightTitle, rightTitleStyle, rightItemStyle}}
 */
const navBarConfig = {
    navigationBarProps: {},
    onLeftPress: () => {
    },
    onRightPress: () => {
    },
    hiddenNav: false,
    navBarStyle: {},
    navContentStyle: {},
    hiddenLeftItem: false,
    leftIcon: {},
    leftTitle: '',
    leftTitleStyle: {},
    leftItemStyle: {},
    titleStyle: {},
    title: '',
    subTitleStyle: {},
    subTitle: '',
    hiddenRightItem: false,
    rightIcon: {},
    rightTitle: '',
    rightTitleStyle: {},
    rightItemStyle: {}
}

export default class NavigationBar extends Component {

    constructor(props) {
        super(props)
        this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, props.navigationBarProps)
    }

    componentWillReceiveProps(nextProps) {
        this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, nextProps.navigationBarProps)
    }

    renderLeftItem() {
        let tempComponent
        if (this.navigationBarProps.hiddenLeftItem) {
            return <View style={{width: barBtnWidth}}/>
        }
        const {onLeftPress} = this.props
        if (this.navigationBarProps.leftIcon) {
            let icon = this.navigationBarProps.leftIcon
            tempComponent = (
                <QIcon name={icon.name} size={icon.size} color={icon.color}/>
            )
        } else if (this.navigationBarProps.leftTitle && this.navigationBarProps.leftTitle !== '') {
            tempComponent = (
                <Text numberOfLines={1}
                      style={[styles.leftTitleStyle, this.navigationBarProps.leftTitleStyle]}>{this.navigationBarProps.leftTitle}</Text>
            )
        } else {
            tempComponent = (
                <QIcon name={'nav_back_o'} size={18} color={CommonStyle.iconGray}/>
            )
        }
        return (
            <TouchableOpacity
                style={[styles.leftItemStyle, this.navigationBarProps.leftItemStyle]}
                onPress={onLeftPress}>
                {tempComponent}
            </TouchableOpacity>
        )
    }

    renderTitle() {
        return (
            <View style={[styles.titleContainer]}>
                <Text
                    style={[styles.titleStyle, this.navigationBarProps.titleStyle]}>{this.navigationBarProps.title}</Text>
                {
                    this.navigationBarProps.subTitle ? <Text
                        style={[styles.subTitleStyle, this.navigationBarProps.subTitleStyle]}>{this.navigationBarProps.subTitle}</Text> : null
                }
            </View>
        )
    }

    renderRightItem() {
        let tempComponent
        if (this.navigationBarProps.hiddenRightItem) {
            return <View style={{width: barBtnWidth}}/>
        }
        const {onRightPress} = this.props
        if (this.navigationBarProps.rightIcon) {
            let icon = this.navigationBarProps.rightIcon
            tempComponent = (
                <QIcon name={icon.name} size={icon.size} color={icon.color}/>
            )
        } else if (this.navigationBarProps.rightTitle && this.navigationBarProps.rightTitle !== '') {
            tempComponent = (
                <Text numberOfLines={1}
                      style={[styles.rightTitleStyle, this.navigationBarProps.rightTitleStyle]}>{this.navigationBarProps.rightTitle}</Text>
            )
        } else {
            tempComponent = (
                <View style={{width: barBtnWidth}}/>
            )
        }
        return (
            <TouchableOpacity
                style={[styles.rightItemStyle, this.navigationBarProps.rightItemStyle]}
                onPress={onRightPress}>
                {tempComponent}
            </TouchableOpacity>
        )
    }

    render() {
        if (this.navigationBarProps.hiddenNav) {
            return <View/>
        }
        return (
            <View style={[styles.navBarStyle, this.navigationBarProps.navBarStyle]}>
                <View style={[styles.navContentStyle, this.navigationBarProps.navContentStyle]}>
                    {this.renderLeftItem()}
                    {this.renderTitle()}
                    {this.renderRightItem()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navBarStyle: {
        height: CommonStyle.navHeight,
        backgroundColor: CommonStyle.navThemeColor,
        // borderBottomWidth: 0.5,
        // borderBottomColor: CommonStyle.lineColor,
    },
    navContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: CommonStyle.navStatusBarHeight,
        height: CommonStyle.navContentHeight,
        marginHorizontal: 8,
    },
    leftImageStyle: {
        width: CommonStyle.navImageWidth,
        height: CommonStyle.navImageHeight,
    },
    leftItemStyle: {
        justifyContent: 'center',
        width: barBtnWidth,
    },
    leftTitleStyle: {
        fontSize: CommonStyle.navLeftTitleFont,
        color: CommonStyle.navLeftTitleColor
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    titleStyle: {
        fontSize: CommonStyle.navTitleFont,
        color: CommonStyle.navTitleColor,
        textAlign: 'center',
        // fontWeight: 'bold'
    },
    subTitleStyle: {
        fontSize: 11,
        marginTop: 5
    },
    rightImageStyle: {
        width: CommonStyle.navImageWidth,
        height: CommonStyle.navImageHeight
    },
    rightItemStyle: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: barBtnWidth,
    },
    rightTitleStyle: {
        fontSize: CommonStyle.navRightTitleFont,
        color: CommonStyle.navRightTitleColor
    }
})
