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
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';
import rootSaga from './sagas/index';
import App from './App';
import AppSynStore from './store/AppSynStore';
import NavigationUtil from "./utils/NavigationUtil";
import Router from "./widget/Router";
import {Text} from "react-native";
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
console.disableYellowBox = true // 关闭全部黄色警告
AppSynStore.initData();

const store = configureStore();

// run root saga
store.runSaga(rootSaga);
// global.React = React;

class Root extends React.Component{
    constructor(props) {
        super(props)
        // console.debug('global=' + JSON.stringify(props));
        // global.globalProps={debug: true}
    }
    render() {
        return (
                <App ref={navigatorRef => {
                    // const router = Router(navigatorRef);
                    // global.$router = router;
                    // global.$router = ()=>{
                    //     alert("xxx")
                    // };
                    NavigationUtil.init(navigatorRef);
                }}/>
        );
    }
}
const RootView = () => (
    <Provider store={store}>
        <Text>xxxx</Text>
    </Provider>
);
export default Root;
