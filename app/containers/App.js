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
import WebViewPage from '../pages/web/WebViewPage';
import shopping from '../pages/shopping/shopping';
import shoppingCart from '../pages/shoppingCart/shoppingCart';
import UserCenter from '../pages/UserCenter/UserCenter';
import LoginPage from '../pages/UserCenter/LoginPage';
import Feedback from "../pages/Feedback/Feedback";
import login from "../pages/UserCenter/login";
import Icon from 'react-native-vector-icons/Ionicons';
import Push from "../pages/About/Push";
import MainIndex from "../pages/MainPage/MainIndex";
import QIcon from "../components/icon";
import React from 'react';
const TabContainer = createBottomTabNavigator(
    {
        Main: {
            screen: MainContainer, navigationOptions: {
                title:'首页',
                tabBarIcon: ({tintColor}) => (
                    <QIcon name="icon-home" size={21} color={tintColor}/>
                )
            }
        },
        UserCenter: {
            screen: UserCenter, navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <QIcon name="icon-mine" size={22} color={tintColor}/>
                )
            }
        },
        shopping: {
            screen: shopping, navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <QIcon name="icon-shopping" size={22} color={tintColor}/>
                )
            }
        },
        shoppingCart: {
            screen: shoppingCart, navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <QIcon name="icon-shopping-cart" size={23} color={tintColor}/>
                )
            }
        },
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        backBehavior: "none",
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
        Feedback: {screen: Feedback},
        MainIndex: {screen: MainIndex}
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
        },
    }
);

export default App;
