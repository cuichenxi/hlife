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
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes} from 'react-native';

const propTypes = {
    items: PropTypes.array,
    renderItem: PropTypes.func,
    style: ViewPropTypes.style,
    num: PropTypes.number,
};

const GridView = ({
                      items,
                      renderItem,
                      style,
                      num,
                  }) => {
    const groupItems = (renderItems, num) => {
        const itemsGroups = [];
        let group = [];
        renderItems.forEach((item) => {
            if (group.length === num) {
                itemsGroups.push(group);
                group = [item];
            } else {
                group.push(item);
            }
        });
        if (group.length > 0) {
            itemsGroups.push(group);
        }
        return itemsGroups;
    };

    const renderGroup = (group, pIndex) => {
        const itemViews = group.map((item, index) => {
            const i = renderItem(item, index);
            return i;
        });
        return <View style={styles.group} key={pIndex}>{itemViews}</View>;
    };

    const groups = groupItems(items, num);

    return (
        <View style={[{flex: 1,}, style]}>{
            groups.map((item, index) => {
                return renderGroup(item, index);
            })
        }
        </View>
    );
};

const styles = StyleSheet.create({
    group: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

GridView.propTypes = propTypes;

GridView.defaultProps = {
    items: [],
    renderItem: null,
    style: undefined,
    num: 1,
};

export default GridView;
