import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import glyphMap from './iconfont.json';

const QIcon = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default QIcon;

export const Button = QIcon.Button;
export const TabBarItem = QIcon.TabBarItem;
export const TabBarItemIOS = QIcon.TabBarItemIOS;
export const ToolbarAndroid = QIcon.ToolbarAndroid;
export const getImageSource = QIcon.getImageSource;