import React from 'react'
import {View, SafeAreaView, BackHandler, StyleSheet} from 'react-native'
import {CommonStyle} from '../../common/CommonStyle'
import {Toast} from 'antd-mobile-rn';
import NavigationBar from "../navigationBar/navigationBar";
import Loading from "../Loading";
import LoadingView from "../LoadingView";
import NavigationUtil from "../../utils/NavigationUtil";

export class BaseView extends React.Component {

    constructor(props) {
        super(props)
        //无用只是
        this.state = {
            isLoading: false,
            loadingText: '',
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
    }

    componentWillUnmount() {

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
        Toast.info(content, 3, () => {
        }, true)
    }

    _render() {
        return null;
    }

    render() {
        const that = this;
        return (
            <View style={[styles.baseContainer, that.props.style]}>
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
