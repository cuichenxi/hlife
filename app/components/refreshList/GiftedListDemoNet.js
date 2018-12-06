import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native'
import {BaseComponent} from "../base/BaseComponent";
import GiftedListView from "./GiftedListView";
import Button from "../Button";
import {ListItem} from "react-native-elements";
export default class GiftedListDemoNet extends BaseComponent {
    navigationBarProps() {
        return {
            title: 'GiftedListDemoNet',
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
        // console.log('page' + page);
        // setTimeout(() => {
        //     var rows = ['row ' + ((page - 1) * 3 + 1), 'row ' + ((page - 1) * 3 + 2), 'row ' + ((page - 1) * 3 + 3)];
        //     if (page === 10) {
        //         callback(rows, {
        //             allLoaded: true, // the end of the list is reached
        //         });
        //     } else {
        //         callback(rows);
        //     }
        // }, 1000); // simulating network fetching
        this.makeRemoteRequest(page, callback, options);
    }

    makeRemoteRequest(page = 1, callback, options) {
        console.log("makeRemoteRequest");
        const url = `https://randomuser.me/api/?seed=1&page=${page}&results=20`;
        fetch(url)
            .then(res => res.json())
            .then(res => {

                if (page === 2) {
                    callback(res.results, {
                        allLoaded: true, // the end of the list is reached
                    });
                } else {
                    callback(res.results);
                }
            })
            .catch(error => {
                this.showShort(error);
            });
    };

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
    _renderRowView(item) {
        return (
            <ListItem
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                avatar={{uri: item.picture.thumbnail}}
                containerStyle={{borderBottomWidth: 0}}
            />
        );
    }

    _render() {
        return (
            <View style={styles.container}>
                <GiftedListView
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this._onFetch.bind(this)}
                    firstLoader={true} // display a loader for the first fetching
                    pagination={true} // enable infinite scrolling using touch to load more
                    refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    withSections={false} // enable sections
                    loadMore={true} // enable loadMore
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFF',
    },
    row: {
        padding: 10,
        height: 44,
    },
});