/**
 *https://www.jianshu.com/p/2f575cc35780
 */
import {createBottomTabNavigator, createStackNavigator, StackViewTransitionConfigs} from 'react-navigation';
import {Image, StyleSheet} from 'react-native'
import Splash from './pages/Splash';
import Web from './pages/web/index';
import Shopping from './pages/shopping/index';
import UserCenter from './pages/user/UserCenter';
import Login from './pages/user/Login';
import Feedback from "./pages/Feedback/Feedback";
import Push from "./pages/About/Push";
import React from 'react';
import GiftedListDemo from "./components/refreshList/demo/GiftedListDemo";
import GiftedListDemoFree from "./components/refreshList/demo/GiftedListDemoFree";
import GiftedListDemoNet from "./components/refreshList/demo/GiftedListDemoNet";
import UserInfo from "./pages/user/UserInfo";
import AboutPage from "./pages/About/AboutPage";
import CodePushPage from "./pages/About/CodePush";
import BarcodePage from "./pages/witget/BarcodePage";
import PayCenter from "./pages/witget/PayCenter";
import ContactList from "./pages/contactlist/ContactList";
import Register from "./pages/user/Register";
import RedPacket from "./pages/user/redpacket/RedPacket";
import Housekeeper from "./pages/housekeeper";
import ReportMatter from "./pages/housekeeper/ReportMatter";
import Neighbour from "./pages/neighbour/Neighbour";
import MyAddressWithTab from "./pages/user/myaddress/MyAddressWithTab";
import AddHousingAddress from "./pages/user/myaddress/AddHousingAddress";
import HousingAddressList from "./pages/user/myaddress/HousingAddressList";
import ElementList from "./pages/user/myaddress/ElementList";
import UnitList from "./pages/user/myaddress/UnitList";
import ModifyHousingAddress from "./pages/user/myaddress/ModifyHousingAddress";
import MyVisitor from "./pages/user/myvisitor/MyVisitor";
import MyCollection from "./pages/user/MyCollection";
import AddBillInfo from "./pages/user/myinvoice/AddBillInfo";
import MyInvoiceList from "./pages/user/myinvoice/MyInvoiceList";
import MyAddress from "./pages/user/myaddress/MyAddress";
import MyShippingAddress from "./pages/user/myaddress/MyShippingAddress";
import AddShippingAddress from "./pages/user/myaddress/AddShippingAddress";
import MySetting from "./pages/user/MySetting";
import AuthPage from "./pages/user/AuthPage";
import MessageDetail from "./pages/main/MessageDetail";
import ProductDetail from "./pages/shopping/ProductDetail";
import GiveAdvice from "./pages/housekeeper/GiveAdvice";
import RepairsSelect from "./pages/housekeeper/RepairsSelect";
import CommitInfo from "./pages/housekeeper/CommitInfo";
import GuestPassKey from "./pages/housekeeper/GuestPassKey";
import TrafficPermit from "./pages/housekeeper/TrafficPermit";
import LivingPayment from "./pages/housekeeper/LivingPayment";
import LivingPaymentDetail from "./pages/housekeeper/LivingPaymentDetail";
import BillDetail from "./pages/housekeeper/BillDetail";
import WaterElectricityPayment from "./pages/housekeeper/WaterElectricityPayment";
import UsefulPhone from "./pages/housekeeper/UsefulPhone";
import Payment from "./pages/housekeeper/Payment";
import MyIntegral from "./pages/user/myintegral/MyIntegral";
import MyWallet from "./pages/user/MyWallet";
import HouseSellRent from "./pages/housekeeper/HouseSellRent";
import PublishHouseInfo from "./pages/housekeeper/PublishHouseInfo";
import HouseholdServerList from "./pages/shopping/HouseholdServerList";
import HouseholdServer from "./pages/shopping/HouseholdServer";
import OrderList from "./pages/shopping/myorder/OrderList";
import {CommonStyle} from "./common/CommonStyle";
import PublishPost from "./pages/neighbour/PublishPost";
import TopicTypeList from "./pages/neighbour/TopicTypeList";
import Message from "./pages/main/Message";
import PostDetail from "./pages/neighbour/PostDetail";
import scanInfo from "./pages/main/scanInfo";
import RepairRecordList from "./pages/user/RepairRecordList";
import goodsList from "./pages/shopping/goodsList";
import ElectronicKey from "./pages/housekeeper/ElectronicKey";
import goodsSearch from "./pages/shopping/goodsSearch";
import RoomList from "./pages/user/myaddress/RoomList";
import activeDetail from "./pages/housekeeper/activeDetail";
import ModifyPhone from "./pages/user/ModifyPhone";
import TopicPostList from "./pages/neighbour/TopicPostList";
import PublishComment from "./pages/neighbour/PublishComment";
import PaymentVerification from "./pages/user/paymentmanager/PaymentVerification";
import PaymentCodeCommit from "./pages/user/paymentmanager/PaymentCodeCommit";
import OrderDetail from "./pages/shopping/OrderDetail";
import MyPaymentRecord from "./pages/user/MyPaymentRecord";
import OrderConfirm from "./pages/shopping/OrderConfirm";
import About from "./pages/user/About";
import BuyCar from "./pages/shopping/BuyCar";
import IntegralExplain from "./pages/user/myintegral/IntegralExplain";
import demorouter from "./pages/demorouter";
import Main from "./pages/main";
import RechargeRecord from "./pages/user/RechargeRecord";
import PublishActivity from "./pages/housekeeper/PublishActivity";
import RedPacketExplain from "./pages/user/redpacket/RedPacketExplain";
import RepairOrderDetail from "./pages/user/RepairOrderDetail";
import ComplaintList from "./pages/user/ComplaintList";
import ComplaintDetail from "./pages/user/ComplaintDetail";
import ProductInfo from "./pages/shopping/ProductInfo";
import {ImageStyle} from "./common/ImageStyle";
import LivingBillDetail from "./pages/housekeeper/LivingBillDetail";
import HouseSellRentInfo from "./pages/housekeeper/HouseSellRentInfo";
import SuggestList from "./pages/user/SuggestList";
import SuggestDetail from "./pages/user/SuggestDetail";
import ActiveList from "./pages/housekeeper/ActiveList";

const TabContainer = createBottomTabNavigator(
    {
        Main: {
            screen: Main, navigationOptions: {
                title: '首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image style={styles.tabIcon} source={focused ? require("./img/tab_press_sy.png") : require("./img/tab_unpress_sy.png")}/>
                )
            }
        },

        shopping: {
            screen: Shopping, navigationOptions: {
                title: '生活',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image style={styles.tabIcon} source={focused ? require("./img/tab_press_sh.png") : require("./img/tab_unpress_sh.png")}/>
                )
            }
        },
        housekeeper: {
            screen: Housekeeper, navigationOptions: {
                title: '管家',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image style={styles.tabIcon} source={focused ? require("./img/tab_press_gj.png") : require("./img/tab_unpress_gj.png")}/>
                )

            }
        },
        // Neighbour: {
        //     screen: Neighbour, navigationOptions: {
        //         title: '邻里',
        //         tabBarIcon: ({focused, tintColor}) => (
        //             <Image style={styles.tabIcon} source={focused ? require("./img/tab_press_ll.png") : require("./img/tab_unpress_ll.png")}/>
        //         )
        //
        //     }
        // },
        UserCenter: {
            screen: UserCenter, navigationOptions: {
                title: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image style={styles.tabIcon} source={focused ? require("./img/tab_press_my.png") : require("./img/tab_unpress_my.png")}/>
                )

            }
        },
    },{
        lazy: true,
        tabBarPosition: 'bottom',
        backBehavior: "none",
        tabBarOptions: {
            activeTintColor: CommonStyle.themeColor,
            inactiveTintColor: '#666',
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
        Main: {screen: Main},
        Neighbour: {screen: Neighbour},
        UserCenter: {screen: UserCenter},
        GiftedListDemo: {screen: GiftedListDemo},
        GiftedListDemoFree: {screen: GiftedListDemoFree},
        GiftedListDemoNet: {screen: GiftedListDemoNet},
        UserInfo: {screen: UserInfo},
        AboutPage: {screen: AboutPage},
        CodePushPage: {screen: CodePushPage},
        BarcodePage: {screen: BarcodePage},
        PayCenter: {screen: PayCenter},
        ContactList: {screen: ContactList},
        RedPacket: {screen: RedPacket},
        ReportMatter: {screen: ReportMatter},
        MyAddressWithTab:{screen:MyAddressWithTab},
        MyAddress:{screen:MyAddress},
        MyShippingAddress:{screen:MyShippingAddress},
        AddHousingAddress:{screen:AddHousingAddress},//新增小区地址
        AddShippingAddress:{screen:AddShippingAddress},//新增收货地址
        HousingAddressList:{screen:HousingAddressList},
        ElementList:{screen:ElementList},//单元楼列表
        UnitList:{screen:UnitList},//单元-室
        ModifyHousingAddress:{screen:ModifyHousingAddress},//修改小区地址
        MyVisitor:{screen:MyVisitor},//我的访客
        MyCollection:{screen:MyCollection},//我的收藏
        AddBillInfo:{screen:AddBillInfo},//增加发票
        MyInvoiceList:{screen:MyInvoiceList},//我的发票
        MySetting:{screen:MySetting},//我的设置
        AuthPage:{screen:AuthPage},//认证
        messageDetail:{screen:MessageDetail},//消息详情
        ProductDetail:{screen:ProductDetail},//商品详情
        GiveAdvice:{screen:GiveAdvice},//咨询建议
        RepairsSelect:{screen:RepairsSelect},//报修报事
        CommitInfo:{screen:CommitInfo},//提交报修报事
        GuestPassKey:{screen:GuestPassKey},//访客通行
        TrafficPermit:{screen:TrafficPermit},//访客通行证页面
        LivingPayment:{screen:LivingPayment},//生活缴费
        LivingPaymentDetail:{screen:LivingPaymentDetail},//生活缴费明细
        BillDetail:{screen:BillDetail},//生活缴费详情
        WaterElectricityPayment:{screen:WaterElectricityPayment},//水电缴费
        UsefulPhone:{screen:UsefulPhone},//常用电话
        Payment:{screen:Payment},//生活缴费付款页面
        MyIntegral:{screen:MyIntegral},//我的积分
        MyWallet:{screen:MyWallet},//我的钱包
        HouseSellRent:{screen:HouseSellRent},//服务租售
        PublishHouseInfo:{screen:PublishHouseInfo},//发布房源
        HouseholdServerList:{screen:HouseholdServerList},//家政服务列表
        HouseholdServer:{screen:HouseholdServer},//家政服务详情
        OrderList:{screen:OrderList},//我的订单
        PublishPost:{screen:PublishPost},//发布帖子
        TopicTypeList:{screen:TopicTypeList},//话题列表
        Message:{screen:Message},//通知消息列表
        PostDetail:{screen:PostDetail},//帖子详情
        scanInfo:{screen:scanInfo},//设备详情
        RepairRecordList:{screen:RepairRecordList},//工单记录
        goodsList:{screen:goodsList},//商品列表
        goodsSearch:{screen:goodsSearch},//商品搜索
        ElectronicKey:{screen:ElectronicKey},//电子钥匙
        RoomList:{screen:RoomList},//房号列表
        activeDetail:{screen:activeDetail},
        ModifyPhone:{screen:ModifyPhone},//修改手机号
        TopicPostList:{screen:TopicPostList},//话题帖子列表
        PublishComment:{screen:PublishComment},//写评论
        PaymentVerification:{screen:PaymentVerification},//支付密码获取验证码
        PaymentCodeCommit:{screen:PaymentCodeCommit},//支付密码提交
        OrderDetail:{screen:OrderDetail},//订单详情
        MyPaymentRecord:{screen:MyPaymentRecord},//我的缴费记录
        OrderConfirm:{screen:OrderConfirm},//订单确认
        SuggestList:{screen:SuggestList},//订单确认
        About:{screen:About},//关于
        BuyCar:{screen:BuyCar},//购物车
        IntegralExplain:{screen:IntegralExplain},//积分说明
        demorouter:{screen:demorouter},//购物车
        RechargeRecord:{screen:RechargeRecord},//充值记录
        PublishActivity:{screen:PublishActivity},//发布活动
        RedPacketExplain:{screen:RedPacketExplain},//红包说明
        RepairOrderDetail:{screen:RepairOrderDetail},//工单记录详情
        ComplaintList:{screen:ComplaintList},//投诉表扬
        ComplaintDetail:{screen: ComplaintDetail},//投诉表扬详情
        SuggestDetail:{screen: SuggestDetail},//投诉表扬详情
        ActiveList:{screen: ActiveList},//投诉表扬详情
        ProductInfo:{screen: ProductInfo},//投诉表扬详情
        LivingBillDetail:{screen: LivingBillDetail},//单条缴费明细
        HouseSellRentInfo:{screen: HouseSellRentInfo},//房屋详情
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
const styles = StyleSheet.create({
    tabIcon: {
        width: 18,
        height: 18,
        resizeMode: ImageStyle.contain
    },
})
export default App;
