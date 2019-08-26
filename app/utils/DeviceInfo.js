/**
 * Created by guangqiang on 2017/8/27.
 */

/** 设备信息 **/

import {Dimensions, Platform} from 'react-native'
// import AppJson from '../../app';
// import DeviceInfo from 'react-native-device-info'
export default deviceInfo = {
  // 设备宽度
  deviceWidth: Dimensions.get('window').width,
  // 设备高度
  deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24,
  isIphoneX: Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812,
  // 设备系统
  deviceOS: Platform.OS,
  // 当前config: debug \ release
  mode: __DEV__ ? 'debug' : 'release',
    // appName: AppJson.get('displayName')
}
// export function debug() {
//     const { scriptURL } = NativeModules.SourceCode
//     const devEvn = scriptURL.split('&')[1]
//     return devEvn === 'dev=true'
// }