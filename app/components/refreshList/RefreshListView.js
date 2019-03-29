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
import {FlatList} from 'react-native';
import {CommonStyle} from '../../common/CommonStyle'

const propTypes = {
    keyExtractor: PropTypes.func,
    renderItem: PropTypes.func,
    ItemSeparatorComponent: PropTypes.func,
    ListHeaderComponent: PropTypes.func,
    ListFooterComponent: PropTypes.func,
    ListEmptyComponent: PropTypes.func,
    onRefresh: PropTypes.func,
    onEndReached: PropTypes.func,
    style: ViewPropTypes.style,
    data: PropTypes.number,
};

const RefreshListView = ({
                             data,
                             renderItem,
                             keyExtractor,
                             ItemSeparatorComponent,
                             ListHeaderComponent,
                             ListFooterComponent,
                             ListEmptyComponent,
                             onRefresh,
                             refreshing,
                             onEndReached,

                         }) => {
    return <FlatList style={[styles.listView, this.style]}
                     data={this.data}
                     renderItem={renderItem}
                     keyExtractor={keyExtractor}
                     ItemSeparatorComponent={ItemSeparatorComponent}
                     ListHeaderComponent={ListHeaderComponent}
                     ListFooterComponent={ListFooterComponent}
                     ListEmptyComponent={ListEmptyComponent}
                     onRefresh={onRefresh}
                     refreshing={refreshing}
                     onEndReached={onEndReached}
                     onEndReachedThreshold={50}
    />;
}
RefreshListView.propTypes = propTypes;

RefreshListView.defaultProps = {
    items: [],
    renderItem: null,
    style: undefined,
    itemsPerRow: 1,
    onEndReached: undefined
};

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        backgroundColor: CommonStyle.bgColor
    },
    text: {
        marginTop: 10,
        color: CommonStyle.textGrayColor,
        textAlign: 'center'
    }
});

export default RefreshListView;
