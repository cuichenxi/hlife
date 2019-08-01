import React from 'react'
import {BackHandler, DeviceEventEmitter, StyleSheet, View} from 'react-native'
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
        this.subscriptions = {};
        this.subEvents = {};
    }


    componentWillMount() {

    }

    componentWillUpdate() {

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressAndroid)
        this.addNavigationListener('willFocus', this.onWillFocus.bind(this))
        this.addNavigationListener('didFocus', this.onDidFocus.bind(this))
        this.addNavigationListener('willBlur', this.onWillBlur.bind(this))
        this.addNavigationListener('didBlur', this.onDidBlur.bind(this))
        this.onReady(this.props.navigation.state.params);
        this.setState({
            gesturesEnabled: this.canBack()
        })
    }

    onWillFocus(payload) {
        // console.debug('onWillFocus', payload);
    }

    onDidFocus(payload) {
        // console.debug('didFocus', payload);
        this.onShow(payload.state.params);
    }

    onWillBlur(payload) {
        // console.debug('willBlur', payload);
        this.onHide();
    }

    onDidBlur(payload) {

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressAndroid)
        this.removeNavigationListener('willFocus');
        this.removeNavigationListener('didFocus');
        this.removeNavigationListener('willBlur');
        this.removeNavigationListener('didBlur');
        this.removeAllEventLister()
        this.onUnload();
    }

    /**
     * 注册监听
     * @param eventName
     * @param listener
     */
    addEventListener(eventName, listener) {
        console.log('addEventListener', eventName);
        this.subEvents[eventName] = DeviceEventEmitter.addListener(eventName, (param) => {
            if (listener) {
                listener(param)
            }
        });
    }

    /**
     * 移除监听
     * @param event
     */
    removeEventLister(eventName) {
        if (this.subEvents && this.subEvents[eventName]) {
            console.log(eventName, ":", this.subEvents[eventName]);
            this.subEvents[eventName].remove();
        }
    }

    /**
     * 移除全部监听
     * @param event
     */
    removeAllEventLister() {
        if (this.subEvents) {
            for (var eventName in this.subEvents) {
                console.log(eventName, ":", this.subEvents[eventName]);
                this.subEvents[eventName].remove();
            }
        }
    }

    /**
     * 生命周期监听
     * @param eventName
     * @param listener
     */
    addNavigationListener(eventName, listener) {

        if (listener) {
            this.subscriptions[eventName] = this.props.navigation.addListener(
                eventName,
                listener
            );
        }
    };

    /**
     *
     * @param eventName
     */
    removeNavigationListener(eventName) {

        if (this.subscriptions[eventName]) {
            this.subscriptions[eventName].remove();
            this.subscriptions[eventName] = undefined;
        }
    };

    sendEvent(eventType, params) {
        DeviceEventEmitter.emit(eventType, params);
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
     * navigate('pageScreen',{xx:xxx,callback:()=>{}})
     * @param screenName
     * @param params
     */
    navigate(screenName, params = {}, callback) {
        this.state.callback = callback;
        if (callback) {
            params = Object.assign(params, {callback: callback});
        }
        this.props.navigation.navigate(screenName, params);
    }

    push(screenName, params = {}, callback) {
        this.state.callback = callback;
        if (callback) {
            params = Object.assign(params, {callback: callback});
        }
        this.props.navigation.push(screenName, params);
    }

    reset(screenName) {
        NavigationUtil.reset(this.props.navigation, screenName);
    }

    pop(index) {
        NavigationUtil.pop(this.props.navigation, index);
    }

    goBack(params) {
        if (params && this.props.navigation.state.params && this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(params);
        }
        this.props.navigation.goBack();
    }

    callback(params) {
        console.debug('callback', params);
    }

    onLeftPress() {
        this.goBack();
    }

    onRightPress() {
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
            this.onLeftPress()
            return true;
        }
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
                {that.state.isLoading ? <Loading loadProps={{
                    visible: that.state.isLoading, loadingText: that.state.loadingText, onRequestClose: () => {
                        this.hideLoading()
                    }
                }}/> : null}
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
