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

class ListSeparator extends Component {
    render() {
        return (
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor: CommonStyle.lineColor,
                }}
            />
        );
    }

}

export default ListSeparator;
