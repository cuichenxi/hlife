import React from 'react'
import {View, DeviceEventEmitter, BackHandler, StyleSheet} from 'react-native'
import {CommonStyle} from '../../common/CommonStyle'
import {Toast} from 'antd-mobile-rn';
import NavigationBar from "../navigationBar/navigationBar";
import Loading from "../Loading";
import LoadingView from "../LoadingView";
import NavigationUtil from "../../utils/NavigationUtil";


class BaseComponent extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
        headerTitle: '',
        title: '',
        rightTitle: '',
        headerLeft: null,
        gesturesEnabled: true

    });

    constructor(props) {
        super(props)
        //无用只是
        this.state = {
            lastBackPressed: null,
            inSideLoading: false,
            isLoading: false,
            loadingText: '',
            _noBack: false,
            hideHeader: false,
            ...props
        };
    }


    componentWillMount() {
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressAndroid)
        this.onReady(this.props.navigation.state.params);
        this.onShow(this.props.navigation.state.params);
        this.setState({
            gesturesEnabled: this.canBack()
        })
        this.addBackEvent();
    }

    componentWillUnmount() {
        if (this.state.subscription) {
            this.state.subscription.remove();
        }
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressAndroid)
        this.onHide();
        this.onUnload();
    }

    /**
     * 页面准备完成时。通过
     * 举例：从 A 页面打开 B 页面，此时 B 页面就准备完成了。
     */
    onShow(param) {

    }

    /**
     * 页面激活时。param 为来源页携带的参数。
     * 举例：B 页面是从 A 页面打开的，现在从 B 页面返回 A 页面，此时 A 页面就被激活了。
     * @param param
     */
    onReady(param) {

    }

    /**
     *  页面失活时。
     *  举例：从 A 页面打开 B 页面，此时 A 页面就失活了。
     */
    onHide() {

    }

    /**
     * 页面销毁时。
     *举例：B 页面是从 A 页面打开的，现在从 B 页面返回 A 页面，此时 B 页面就被销毁了。
     */
    onUnload() {

    }

    navigationBarProps() {
        return {};
    }

    hideHeader(hideHeader) {
        this.state.hideHeader = hideHeader;
    }

    /**
     * navigate('pageScreen',{prams:xxx,callback:()=>{}})
     * @param screenName
     * @param params
     */
    navigate(screenName, params = {},hasBackEvent) {
        this.hasBackEvent = hasBackEvent;
        this.props.navigation.navigate(screenName, params);
    }

    push(screenName, params = {},hasBackEvent) {
        this.hasBackEvent = hasBackEvent;
        this.props.navigation.push(screenName, params);
    }

    reset(screenName) {
        NavigationUtil.reset(this.props.navigation, screenName);
    }

    pop(index,param) {
        NavigationUtil.pop(this.props.navigation, index);
        this.sendBackParam(param);
    }

    goBack(params) {
        if (params && this.props.navigation.state.params && this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(params);
        }
        this.props.navigation.goBack();
        this.sendBackParam(params);
    }

    sendBackParam(param){
        DeviceEventEmitter.emit("BackEventType", param);
    }

    onBackParam(param){

    }

    addBackEvent(){
        // 这里的`param`可以不写
        this.state.subscription = DeviceEventEmitter.addListener("BackEventType", (param)=>{
            // 刷新界面等
            this.onShow(this.props.navigation.state.params);
            if (this.hasBackEvent) {
                this.onBackParam(param);
            }
        });
    }

    onLeftPress() {
        this.goBack();
    }


    onRightPress() {
        console.log('======right=')
        return null
    }

    showLoading(loadingText) {
        this.setState({
                isLoading: true,
                loadingText: loadingText
            }
        );
    }

    showDLoading() {
        this.showLoading('加载中...')
    }

    showInDLoading() {
        this.showInLoading('加载中...')
    }

    showInLoading(loadingText) {
        this.setState({
                inSideLoading: true,
                loadingText: loadingText
            }
        );
    }

    hideLoading() {
        this.setState({
                inSideLoading: false,
                isLoading: false
            }
        );
    }

    showShort(content) {
        Toast.info(content, 1, () => {
        }, true)
    }

    showLong(content) {
        Toast.info(content, 1, () => {
        }, true)
    }

    setTitle(title) {
        this.setState({
            title: title
        })
    }
    setRightTitle(rightTitle) {
        this.setState({
            rightTitle: rightTitle
        })
    }

    canExitApp() {
        return false;
    }

    canBack() {
        return true;
    }

    onBackPressAndroid = () => {
        if (this.state.isLoading) {
            this.hideLoading();
            return true;
        }
        if (!this.canBack()) {
            return true;
        }
        // const {state} = this.props.navigation;
        if (this.canExitApp()) {
            if (this.state.lastBackPressed && this.state.lastBackPressed + 2000 >= Date.now()) {
                // dispatch({type: 'ExitApp'});//将state设置成第一次启动一致，避免从哪个界面退出，启动时显示哪个界面的bug（杀掉进程启动无该问题）
                BackHandler.exitApp()
                return false
            }
            this.showShort('再按一次退出!');
            this.state.lastBackPressed = Date.now();
            return true;
        }
        this.goBack();
        return true;
    }

    renderNavigationBar() {
        let navigationBarProps = this.navigationBarProps()
        if (this.state.title) {
            Object.assign(navigationBarProps, {title: this.state.title})
        }
        if (this.state.rightTitle) {
            Object.assign(navigationBarProps, {rightTitle: this.state.rightTitle});
        }
        Object.assign(navigationBarProps, this.props)
        return (
            <NavigationBar
                navigationBarProps={navigationBarProps}
                onLeftPress={() => this.onLeftPress()}
                onRightPress={() => this.onRightPress()}
            />
        )
    }

    _render() {
        return null;
    }

    render() {
        const that = this;
        return (
            <View style={[styles.baseContainer, that.props.style]}>
                {that.state.hideHeader ? null : this.renderNavigationBar()}
                {that.state.inSideLoading ? <LoadingView loadingtext={that.state.loadingText}/> : this._render()}
                {that.state.isLoading ?
                    <Loading loadProps={{visible: that.state.isLoading, loadingText: that.state.loadingText}}/> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        backgroundColor: CommonStyle.bgColor
    }
})

export {BaseComponent};
