/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Modal,
    ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
const SIZES = ['small', 'large'];

const propTypes = {
    visible: PropTypes.bool,
    color: PropTypes.string,
    size:  PropTypes.string,
    overlayColor:  PropTypes.string,
    onRequestClose: PropTypes.func,
};
const defaultProps = {
    visible: false,
    color: 'white',
    size: 'large',
    loadingText: '数据加载中...',
    overlayColor: 'transparent',
    onRequestClose() {
    }
};
import React, {Component} from 'react';

// import {CommonStyle} from '../common/CommonStyle'

class Loading extends Component {
    constructor(props) {
        super(props)
        this.loadProps = Object.assign({}, defaultProps, props.loadProps)
    }
    render() {
        return (
            <Modal visible={this.loadProps.visible} transparent onRequestClose={this.loadProps.onRequestClose}>
                {this.loadProps.visible ? (
                    <View key="spinner" style={styles.container}>
                        <View style={[styles.background, {backgroundColor: this.loadProps.overlayColor}]}>
                            <View style={styles.loading}>
                                <ActivityIndicator size={this.loadProps.size} color={this.loadProps.color}/>
                                <Text style={styles.loadingText}>{this.loadProps.loadingText}</Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View key="spinner"/>
                )}
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        height: 110,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    loadingText: {
        marginTop: 10,
        textAlign: 'center',
        color: '#fcfcfc'
    }
});

Loading.propTypes = propTypes;

Loading.defaultProps = defaultProps;

export default Loading;
