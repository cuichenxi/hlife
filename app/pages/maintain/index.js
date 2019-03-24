import React, {Component} from "react";
import {View, Text, FlatList, ActivityIndicator} from "react-native";
import {List, ListItem, SearchBar} from "react-native-elements";

import {BaseComponent} from '../../components/base/BaseComponent'
// import ListSeparator from '../../components/refreshList/ListSeparator';
// import ListHeader from "../../components/refreshList/ListHeader";
// import ListFoot from "../../components/refreshList/ListFoot";

export default class MaintainRecord extends BaseComponent {
    navigationBarProps() {
        return {
            title: '维修记录',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }


    onReady(param) {
        console.log('onReady')
        this.makeRemoteRequest();
        this.setNoBack(true);
    }

    makeRemoteRequest = () => {
        console.log("makeRemoteRequest");
        const {page, seed} = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({loading: true});

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                console.log('handleRefresh')
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                console.log('handleLoadMore')
                this.makeRemoteRequest();
            }
        );
    };

    renderSeparator = () => {
        return (<View style={{
            height: 1,
            width: "86%",
            backgroundColor: "#CED0CE",
            marginLeft: "14%"
        }}/>)
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round/>;
    };
    renderEmpty = () => {
        return <Text>数据为空</Text>;
    };
    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    _render() {
        return (
            <View style={{height: '100%'}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <ListItem
                            title={`${item.name.first} ${item.name.last}`}
                            subtitle={item.email}
                            avatar={{uri: item.picture.thumbnail}}
                            containerStyle={{borderBottomWidth: 0}}
                        />
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    ListEmptyComponent={this.renderEmpty}
                    onRefresh={() => this.handleRefresh()}
                    refreshing={this.state.refreshing}
                    onEndReached={() => this.handleLoadMore()}
                    onEndReachedThreshold={0.5}
                />
            </View>
        );
    }
}

