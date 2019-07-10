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
import {Text, StyleSheet, View} from 'react-native';
import {CommonStyle} from '../../common/CommonStyle'
import Icon from "react-native-vector-icons";

class ListEmpty extends Component {
    render() {
        if (!this.props.empty) return null;
        return (
            <View style={styles.container}>
                <Icon name="exclamation" size={25} color={CommonStyle.textGrayColor}/>
                <Text style={styles.text}>{this.props.text ? this.props.text : '空空如也 ~'}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CommonStyle.bgColor
    },
    text: {
        marginTop: 10,
        color: CommonStyle.textGrayColor,
        textAlign: 'center'
    }
});

export default ListEmpty;
