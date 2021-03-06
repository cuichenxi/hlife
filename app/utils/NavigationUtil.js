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
import {NavigationActions, StackActions} from 'react-navigation';
let _navigator
reset = (navigation, routeName, params = {}) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName, params})]
    });
    navigation.dispatch(resetAction);
};

resetGo = (navigation, routeNames = [], params = {}) => {
    var actions = [];
    routeNames.map((routeName, index) => {
        if (index === routeNames.length - 1) {
            actions.push(NavigationActions.navigate({routeName, params}));
        } else {
            actions.push(NavigationActions.navigate({routeName}));
        }
    });
    const resetAction = StackActions.reset({
        index: routeNames.length-1,
        actions: actions
    });
    navigation.dispatch(resetAction);
};

pop = (navigation, index) => {
    const popAction = StackActions.pop({
        n: index,
    });
    navigation.dispatch(popAction);
};

navigate = (navigation,routeName, params = {}) => {
    navigation.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
};
goTo = (routeName, params = {}) => {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
};
init=(navigator)=>{
    _navigator = navigator;
}


export default {
    init,
    reset,
    resetGo,
    pop,
    navigate,
    goTo
};
