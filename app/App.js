/**
 *https://www.jianshu.com/p/2f575cc35780
 */
import {
    createStackNavigator,
    createBottomTabNavigator,
    StackViewTransitionConfigs
} from 'react-navigation';
import {Animated, Easing} from 'react-native'
import Splash from './pages/Splash';
import MainContainer from './pages/main/MainContainer';
import Web from './pages/web/index';
import Shopping from './pages/shopping/index';
import ShoppingCart from './pages/shoppingcart/index';
import UserCenter from './pages/user/UserCenter';
import Login from './pages/user/Login';
import Feedback from "./pages/Feedback/Feedback";
import Push from "./pages/About/Push";
import QIcon from "./components/icon/index";
import React from 'react';
import Main from "./pages/main";
import MaintainRecord from "./pages/maintain";
import GiftedListDemo from "./components/refreshList/demo/GiftedListDemo";
import GiftedListDemoFree from "./components/refreshList/demo/GiftedListDemoFree";
import GiftedListDemoNet from "./components/refreshList/demo/GiftedListDemoNet";
import UserInfo from "./pages/user/UserInfo";
import AboutPage from "./pages/About/AboutPage";
import CodePushPage from "./pages/About/CodePush";
import BarcodePage from "./pages/witget/BarcodePage";
import PayPage from "./pages/witget/payPage";
import ContactList from "./pages/contactlist/ContactList";
import Register from "./pages/user/Register";

const TabContainer = createBottomTabNavigator(
    {
        Main: {
            screen: MainContainer, navigationOptions: {
                title: '首页',
                tabBarIcon: ({tintColor}) => (
                    <QIcon name="icon-home" size={21} color={tintColor}/>
                )
            }
        },

        shopping: {
            screen: Shopping, navigationOptions: {
                title: '商城',
                tabBarIcon: ({tintColor}) => (
                    <QIcon name="icon-shopping" size={22} color={tintColor}/>
                )
            }
        },
        shoppingCart: {
            screen: ShoppingCart, navigationOptions: {
                title: '购物车',
                tabBarIcon: ({tintColor}) => (
                    <QIcon name="icon-shopping-cart" size={23} color={tintColor}/>
                )
            }
        },
        UserCenter: {
            screen: UserCenter, navigationOptions: {
                title: '我的',
                tabBarIcon: ({tintColor}) => (
                    <QIcon name="icon-mine" size={22} color={tintColor}/>
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
        Web: {screen: Web},
        Login: {screen: Login},
        Register: {screen: Register},
        Shopping: {screen: Shopping},
        Push: {screen: Push},
        Feedback: {screen: Feedback},
        MainIndex: {screen: Main},
        MaintainRecord: {screen: MaintainRecord},
        GiftedListDemo: {screen: GiftedListDemo},
        GiftedListDemoFree: {screen: GiftedListDemoFree},
        GiftedListDemoNet: {screen: GiftedListDemoNet},
        UserInfo: {screen: UserInfo},
        AboutPage: {screen: AboutPage},
        CodePushPage: {screen: CodePushPage},
        BarcodePage: {screen: BarcodePage},
        PayPage: {screen: PayPage},
        ContactList: {screen: ContactList},
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
        gesturesEnabled: true,
        gestureDirection: 'right-to-left',
        transitionConfig: () => ({
            transitionSpec: StackViewTransitionConfigs.SlideFromRightIOS.transitionSpec,
            screenInterpolator: StackViewTransitionConfigs.SlideFromRightIOS.screenInterpolator,
            containerStyle: {
                backgroundColor: '#000'
            }
        }),
    }
);

export default App;
