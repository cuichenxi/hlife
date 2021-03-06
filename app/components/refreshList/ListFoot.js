/**
 *
 * Copyright 2015-present reading
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
import React, {Component} from 'react';
import {ActivityIndicator, Text, StyleSheet, View} from 'react-native';
import {CommonStyle} from '../../common/CommonStyle'

class ListFoot extends Component {
    render() {
        if (!this.props.loading) return null;
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="small" color={CommonStyle.themeColor}/>
                <Text style={styles.loadingText}>{this.props.text ? this.props.text : '加载中...'}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    loading: {
        flexDirection:'row',
        paddingVertical: 20,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CommonStyle.bgColor
    },
    loadingText: {
        marginTop: 10,
        color: CommonStyle.themeColor,
        textAlign: 'center'
    }
});

export default ListFoot;
