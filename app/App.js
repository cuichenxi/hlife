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
import UserCenter from './pages/user/UserCenter';
import Login from './pages/user/Login';
import Feedback from "./pages/Feedback/Feedback";
import Push from "./pages/About/Push";
import QIcon from "./components/icon/index";
import React from 'react';
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
import RedPacket from "./pages/user/redpacket/RedPacket";
import Housekeeper from "./pages/housekeeper";
import ReportMatter from "./pages/housekeeper/ReportMatter";
import Steward from "./pages/steward/Steward";
import Neighbour from "./pages/neighbour/Neighbour";
import ShoppingCart from "./pages/shoppingCart/index";
import MyAddress from "./pages/user/myaddress/MyAddress";

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
                title: '生活',
                tabBarIcon: ({tintColor}) => (
                    <QIcon name="icon-shopping" size={22} color={tintColor}/>
                )
            }
        },
        housekeeper: {
            screen: Housekeeper, navigationOptions: {
                title: '管家',
                tabBarIcon: ({tintColor}) => (
                    <QIcon name="icon-shopping-cart" size={23} color={tintColor}/>
                )
            }
        },
        Neighbour: {
            screen: Neighbour, navigationOptions: {
                title: '邻里',
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
        MainIndex: {screen: MainContainer},
        Steward: {screen: Steward},
        Neighbour: {screen: Neighbour},
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
        RedPacket: {screen: RedPacket},
        ReportMatter: {screen: ReportMatter},
        ShoppingCart:{screen:ShoppingCart},
        MyAddress:{screen:MyAddress}
    },
    {
        // initialRouteName: 'Splash',
        headerMode: 'screen',
        // mode: Platform.OS === 'ios' ? 'modal' : 'card',
        navigationOptions: {
            headerBackTitle: null,
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
