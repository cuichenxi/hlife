/**
 * Created by guangqiang on 2017/8/27.
 */
import React, {Component} from 'react'
import {View, BackHandler, StyleSheet} from 'react-native'
// import NavigationBar from '../common/navigationBar/navigationBar'
import {CommonStyle} from '../../common/CommonStyle'
import {Toast, Modal} from 'antd-mobile-rn';
import {
    StackNavigator,
    SafeAreaView,
    createStackNavigator,
    createDrawerNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator, NavigationActions
} from 'react-navigation';

// import {Actions} from "react-native-router-flux"
class BaseComponent extends Component {
    _didFocusSubscription;
    _willBlurSubscription;

    constructor(props) {
        super(props)
        this.state = {
            lastBackPressed: null,
            isLoading: false,
            canBack: true
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackPressAndroid)
        );
        // this.navigationBarProps = this.navigationBarProps.bind(this)
        // this._render = this._render.bind(this)
        // this.onLeftPress = this.onLeftPress.bind(this)
        // this.onRightPress = this.onRightPress.bind(this)
    }

    navigationBarProps() {
        return null
    }


    superFunc(data) {
        alert(`在子类中调用了父类的函数，${data}`)
    }

    onLeftPress() {
        Actions.pop()
    }

    onRightPress() {
        return null
    }

    showLoading(content) {
        this.isLoading = true;
        Toast.loading(content, 0, () => {
        }, true)
    }

    showDLoading() {
        this.showLoading('加载中...')
    }

    hideLoading() {
        Toast.hide();
    }

    showShort(content) {
        Toast.info(content, 1, () => {
        }, true)
    }

    showLong(content) {
        Toast.info(content, 3, () => {}, true)
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackPressAndroid)
        );
    }


    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    onBackPressAndroid = () => {
        if (this.isLoading) {
            this.hideLoading();
            this.isLoading = false;
            return true;
        }
        if (!this.canBack) {
            return true;
        }
        const {dispatch, state} = this.props.navigation;
        if (state.routeName  === 'Home') {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                dispatch({type: 'ExitApp'})//将state设置成第一次启动一致，避免从哪个界面退出，启动时显示哪个界面的bug（杀掉进程启动无该问题）
                return false
            }
            this.showShort('再按一次退出!');
            this.lastBackPressed = Date.now();
            return true;
        }
        dispatch(NavigationActions.back());
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
        return null
    }

    // render() {
    //   return (
    //     <View style={[styles.container, this.props.style]}>
    //       {this.renderNavigationBar()}
    //       {this._render()}
    //     </View>
    //   )
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CommonStyle.white
    }
})

export {BaseComponent}