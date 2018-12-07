import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native'
import {BaseComponent} from "../base/BaseComponent";
import GiftedListView from "./GiftedListView";
import TouchableView from "../TouchableView";

export default class GiftedListDemo extends BaseComponent {
    navigationBarProps() {
        return {
            title: 'GiftedListDemo',
        }
    }

    /**
     * Will be called when refreshing
     * Should be replaced by your own logic
     * @param {number} page Requested page to fetch
     * @param {function} callback Should pass the rows
     * @param {object} options Inform if first load
     */
    _onFetch(page = 1, callback, options) {
        console.log('page' + page);
        setTimeout(() => {
            var rows = ['row ' + ((page - 1) * 3 + 1), 'row ' + ((page - 1) * 3 + 2), 'row ' + ((page - 1) * 3 + 3)];
            if (page === 10) {
                callback(rows, {
                    allLoaded: true, // the end of the list is reached
                });
            } else {
                callback(rows);
            }
        }, 1000); // simulating network fetching
    }


    /**
     * When a row is touched
     * @param {object} rowData Row data
     */
    _onPress(rowData) {
        console.log(rowData + ' pressed');
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData) {
        return (
            <TouchableView
                style={styles.row}
                onPress={() => this._onPress(rowData)}>
                <Text>{rowData}</Text>
            </TouchableView>
        );
    }

    _render() {
        return (
            <View style={styles.container}>
                <GiftedListView
                    style={{
                        height: '100%',
                        backgroundColor: '#FFF',
                    }}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this._onFetch.bind(this)}
                    firstLoader={true} // display a loader for the first fetching
                    pagination={true} // enable infinite scrolling using touch to load more
                    refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    withSections={false} // enable sections
                    loadMore={false} // enable loadMore
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFF',
    },
    row: {
        padding: 10,
        height: 44,
    },
});