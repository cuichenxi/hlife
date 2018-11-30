/**
 * Created by guangqiang on 2017/8/27.
 */
import React from 'react'
import {View, BackHandler, StyleSheet} from 'react-native'
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
        headerLeft: null,
        gesturesEnabled: false
    });

    constructor(props) {
        super(props)
        this.state = {
            lastBackPressed: null,
            inSideLoading: false,
            isLoading: false,
            loadingText: '加载中...',
            canBack: true,
        }
        this.onLeftPress = this.onLeftPress.bind(this)
        this.onRightPress = this.onRightPress.bind(this)

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressAndroid)
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressAndroid)
    }

    navigationBarProps() {
        return {};
    }

    setCanBack(_canBack) {
        this.state.canBack = _canBack;
    }

    goBack() {
        this.props.navigation.goBack();
    }

    navigate(screenName, params = {}) {
        this.props.navigation.navigate(screenName, params);
    }

    push(screenName, params = {}) {
        this.props.navigation.push(screenName, params);
    }

    reset(screenName) {
        NavigationUtil.reset(this.props.navigation, screenName);
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
        // Toast.loading(content, 0, () => {
        // }, true)
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
        // Toast.hide();
    }

    showShort(content) {
        Toast.info(content, 1, () => {
        }, true)
    }

    showLong(content) {
        Toast.info(content, 3, () => {
        }, true)
    }


    onBackPressAndroid = () => {
        if (this.state.isLoading) {
            this.hideLoading();
            return true;
        }
        if (!this.state.canBack) {
            return true;
        }

        const {state} = this.props.navigation;
        if (state.routeName === 'MainContainer' || state.routeName === 'Home' || state.routeName === 'Main'
            || state.routeName === 'UserCenter' || state.routeName === 'shopping' || state.routeName === 'shoppingCart') {
            if (this.state.lastBackPressed && this.state.lastBackPressed + 2000 >= Date.now()) {
                // dispatch({type: 'ExitApp'});//将state设置成第一次启动一致，避免从哪个界面退出，启动时显示哪个界面的bug（杀掉进程启动无该问题）
                BackHandler.exitApp()
                return false
            }
            this.showShort('再按一次退出!');
            this.state.lastBackPressed = Date.now();
            return true;
        }
        return true;
    }

    renderNavigationBar() {
        let navigationBarProps = this.navigationBarProps()
        Object.assign(navigationBarProps, this.props)
        return (
            <NavigationBar
                navigationBarProps={navigationBarProps}
                onLeftPress={this.onLeftPress}
                onRightPress={this.onRightPress}
            />
        )
    }

    _render() {
        return null;
    }

    render() {
        thiz = this;
        return (
            <View style={[styles.baseContainer, this.props.style]}>
                {this.renderNavigationBar()}
                {this.state.inSideLoading ? <LoadingView loadingtext={this.state.loadingText}/> : this._render()}
                {this.state.isLoading ?
                    <Loading loadProps={{visible: this.state.isLoading, loadingText: this.state.loadingText}}/> : null}
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

export {BaseComponent}