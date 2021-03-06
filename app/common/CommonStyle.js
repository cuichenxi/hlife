/**
 * Created by guangqiang on 2017/8/27.
 */

/** 公共样式表 **/

import {Platform} from 'react-native'
import deviceInfo from '../utils/DeviceInfo'

export const CommonStyle = {

    /** color **/
    // 常用颜色
    red: '#FF0000',
    orange: '#FFA500',
    yellow: '#FFFF00',
    green: '#00FF00',
    cyan: '#00FFFF',
    blue: '#0000FF',
    purple: '#800080',
    black: '#000',
    color_333: '#333333',
    color_666: '#666666',
    color_999: '#999999',
    white: '#FFF',
    gray: '#808080',
    drakGray: '#A9A9A9',
    lightGray: '#D3D3D3',
    tomato: '#FF6347',
    PeachPuff: '#FFDAB9',
    clear: 'transparent',

    /** 主题色 **/
    themeColor: '#20C075',
    // 默认灰色字体颜色
    textGrayColor: '#989898',
    // 默认黑色字体颜色
    textBlockColor: '#262626',
    // 默认背景颜色
    bgColor: '#F8F8F8',
    // 默认分割线颜色
    lineColor: '#E6E6E6',
    // 默认placeholder颜色
    placeholderTextColor: '#c8c8cd',
    // borderColor
    borderColor: '#808080',
    // 导航title 颜色
    navTitleColor: '#333',
    // 导航左item title color
    navLeftTitleColor: '#333',
    // 导航右item title color
    navRightTitleColor: '#333',
    navThemeColor: '#fff',
    iconGray: '#989898',
    iconBlack: '#262626',

    /** space **/
    // 上边距
    marginTop: 10,
    // 左边距
    marginLeft: 10,
    // 下边距
    marginBotton: 10,
    // 右边距
    marginRight: 10,
    // 内边距
    padding: 10,
    // 导航的leftItem的左间距
    navMarginLeft: 15,
    // 导航的rightItem的右间距
    navMarginRight: 15,

    /** width **/
    // 导航栏左右按钮image宽度
    navImageWidth: 25,
    // 边框线宽度
    borderWidth: 1,
    // 分割线高度
    lineWidth: .8,

    /** height **/
    // 导航栏的高度
    navHeight: Platform.OS === 'ios' ? (deviceInfo.isIphoneX ? 98 : 74) : 74,
    // 导航栏顶部的状态栏高度
    navStatusBarHeight: Platform.OS === 'ios' ? (deviceInfo.isIphoneX ? 44 : 20) : 24,
    // 导航栏除掉状态栏的高度
    navContentHeight: Platform.OS === 'ios' ? 54 : 50,
    // tabBar的高度
    tabBarHeight: Platform.OS === 'ios' ? (deviceInfo.isIphoneX ? 83 : 49) : 49,
    // 底部按钮高度
    bottomBtnHeight: 44,
    // 通用列表cell高度
    cellHeight: 44,
    // 导航栏左右按钮image高度
    navImageHeight: 25,

    /** font **/
    // 默认文字字体
    textFont: 14,
    // 默认按钮文字字体
    btnFont: 15,
    btnFontSmall: 13,
    // 导航title字体
    navTitleFont: 18,
    // tabBar文字字体
    barBarTitleFont: 12,
    // 占位符的默认字体大小
    placeholderFont: 13,
    // 导航左按钮的字体
    navRightTitleFont: 15,
    // 导航右按钮字体
    navLeftTitleFont: 15,

    /** opacity **/
    // mask
    modalOpacity: 0.3,
    // touchableOpacity
    taOpacity: 0.1,

    /** 定位 **/
    absolute: 'absolute',
    relative: 'relative',

    /** flex **/
    around: 'space-around',
    between: 'space-between',
    center: 'center',
    row: 'row',
    /** row | row-reverse | column | column-reverse **/
    flexDirection: 'flex-direction',


    //justify-content属性定义了项目在主轴上的对齐方式。
    // justify-content: flex-start | flex-end | center | space-between | space-around
    // align-items属性定义项目在交叉轴上如何对齐。
//    align-items: flex-start | flex-end | center | baseline | stretch;
    compressImageQuality: 0.5
}




































