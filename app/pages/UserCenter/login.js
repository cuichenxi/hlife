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
import React from 'react';
import {StyleSheet, Text, View, Keyboard} from 'react-native';

import AV from 'leancloud-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Request from '../../utils/Request';
import NavigationUtil from "../../utils/NavigationUtil";

let feedbackText;

class login extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '用户登录',
        headerBackTitle:'搜索',
        headerTitleStyle:{flex: 1,textAlign:'center'},
        headerRight: (
            <Icon.Button
                name="md-checkmark"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={() => {
                    navigation.state.params.handleCheck();
                }}
            />
        )
    });
    // static navigationOptions = ({navigation}) => ({
    //     title: '用户登录',
    //     tabBarIcon: ({tintColor}) => (
    //         <Icon name="md-thumbs-up" size={25} color={tintColor}/>
    //     ),
    //     headerRight: (
    //         <Icon.Button
    //             name="md-checkmark"
    //             backgroundColor="transparent"
    //             underlayColor="transparent"
    //             activeOpacity={0.8}
    //             onPress={() => {
    //                 navigation.state.params.handleCheck();
    //             }}
    //         />
    //     )
    // });

    componentDidMount() {
        feedbackText = '';
        this.props.navigation.setParams({handleCheck: this.onActionSelected});
    }

    onActionSelected = () => {
        // NavigationUtil.reset(this.props.navigation, 'Home');
        this.props.navigation.navigate('shopping', { isFirst: true });
        // alert('点击')
    };
    onNext = () => {
        // this.props.navigation.navigate('LoginPage', { isFirst: true });
        // this.props.navigation.navigate('Feedback', { isFirst: true });
        this.props.navigation.navigate('Feedback', {login_back_code: this.props.navigation.state.key,isFirst: true,
            callback: (data) => {
                alert(data);
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textInput}  onPress={this.onNext}>点击</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    textInput: {
        width: 200,
        height: 100,
        fontSize: 18,
        padding: 15,
    }
});

export default login;
