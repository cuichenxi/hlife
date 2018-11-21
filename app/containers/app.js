/**
 *https://www.jianshu.com/p/2f575cc35780
 */
import {
    StackNavigator,
    SafeAreaView,
    createStackNavigator,
    createDrawerNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import Splash from '../pages/Splash';
import {Platform} from 'react-native';
import CategoryContainer from '../containers/CategoryContainer';
import MainContainer from '../containers/MainContainer';
import WebViewPage from '../pages/ItemDetail/WebViewPage';
import shopping from '../pages/shopping/shopping';
import shoppingCart from '../pages/shoppingCart/shoppingCart';
import UserCenter from '../pages/UserCenter/UserCenter';
import LoginPage from '../pages/UserCenter/LoginPage';
import Feedback from "../pages/Feedback/Feedback";
import login from "../pages/UserCenter/login";
import Icon from 'react-native-vector-icons/Ionicons';
import Push from "../pages/About/Push";

const TabContainer = createBottomTabNavigator(
    {
        Main: {screen: MainContainer},
        UserCenter: {screen: UserCenter},
        shopping: {screen: shopping},
        shoppingCart: {screen: shoppingCart},
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    }
);

const App = createStackNavigator(
    {
        Splash: {screen: Splash},
        Home: {
            screen: TabContainer,
            navigationOptions: {
                title: '首页',
                header: null,
            }
        },
        Web: {screen: WebViewPage},
        LoginPage: {screen: LoginPage},
        Push: {screen: Push},
        Feedback: {screen: Feedback}
    },
    {
        // initialRouteName: 'Splash',
        headerMode: 'screen',
        // mode: Platform.OS === 'ios' ? 'modal' : 'card',
        navigationOptions: {
            headerBackTitle: null,
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerStyle: {
                backgroundColor: '#3e9ce9'
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20,
                flex: 1, textAlign: 'center'
            },
            headerTintColor: '#fff',
        }
    }
);

export default App;
