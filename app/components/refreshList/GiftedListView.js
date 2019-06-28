import PropTypes from 'prop-types';
import React from 'react';

import {
    ListView,
    Platform,
    TouchableHighlight,
    View,
    Text,
    RefreshControl,
    ActivityIndicator, StyleSheet,
} from 'react-native';
import {CommonStyle} from "../../common/CommonStyle";


// small helper function which merged two objects into one
function MergeRowsWithHeaders(obj1, obj2) {
    for (var p in obj2) {
        if (obj1[p] instanceof Array && obj1[p] instanceof Array) {
            obj1[p] = obj1[p].concat(obj2[p])
        } else {
            obj1[p] = obj2[p]
        }
    }
    return obj1;
}

class GiftedListView extends React.Component {
    constructor(props) {
        super(props);
        this._setPage(1);
        this._setRows([]);

        var ds = null;
        if (this.props.withSections === true) {
            ds = new ListView.DataSource({
                rowHasChanged: this.props.rowHasChanged ? this.props.rowHasChanged : (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            });
            this.state = {
                dataSource: ds.cloneWithRowsAndSections(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'firstLoad',
                emptyTitle: this.props.emptyTitle,
            };
        } else {
            ds = new ListView.DataSource({
                rowHasChanged: this.props.rowHasChanged ? this.props.rowHasChanged : (row1, row2) => row1 !== row2,
            });
            this.state = {
                dataSource: ds.cloneWithRows(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'firstLoad',
                emptyTitle: this.props.emptyTitle,
            };
        }
    }

    static propTypes = {
        customStyles: PropTypes.object,
        initialListSize: PropTypes.number,
        firstLoader: PropTypes.bool,
        forceUpdate: PropTypes.bool,
        pagination: PropTypes.bool,
        refreshable: PropTypes.bool,
        refreshableColors: PropTypes.array,
        refreshableProgressBackgroundColor: PropTypes.string,
        refreshableSize: PropTypes.string,
        refreshableTitle: PropTypes.string,
        refreshableTintColor: PropTypes.string,
        renderRefreshControl: PropTypes.func,
        headerView: PropTypes.func,
        sectionHeaderView: PropTypes.func,
        scrollEnabled: PropTypes.bool,
        withSections: PropTypes.bool,
        onFetch: PropTypes.func,

        paginationFetchingView: PropTypes.func,
        paginationAllLoadedView: PropTypes.func,
        paginationWaitingView: PropTypes.func,
        emptyView: PropTypes.func,
        renderSeparator: PropTypes.func,

        rowHasChanged: PropTypes.func,
        onRef: PropTypes.func,
        distinctRows: PropTypes.func,

        spinnerSize: PropTypes.string,
        spinnerColor: PropTypes.string,
        emptyTitle: PropTypes.string,
    };
    static defaultProps = {
        customStyles: {},
        initialListSize: 20,
        firstLoader: true,
        forceUpdate: false,
        pagination: true,
        refreshable: true,
        loadMore: true,
        refreshableColors: undefined,
        refreshableProgressBackgroundColor: undefined,
        refreshableSize: undefined,
        refreshableTitle: undefined,
        refreshableTintColor: undefined,
        renderRefreshControl: null,
        headerView: null,
        sectionHeaderView: null,
        scrollEnabled: true,
        withSections: false,
        onFetch(page, callback, options) {
            callback([]);
        },
        onRef: null,
        paginationFetchingView: null,
        paginationAllLoadedView: null,
        paginationWaitingView: null,
        emptyView: null,
        emptyTitle: ' 对不起，没有要显示的内容',
        renderSeparator: null,
        rowHasChanged: null,
        distinctRows: null,

        spinnerSize: 'small',
        spinnerColor: '#3e9ce9',
    }


    _setPage(page) {
        this._page = page;
    }

    _getPage() {
        return this._page;
    }

    _setRows(rows) {
        this._rows = rows;
    }

    _getRows() {
        return this._rows;
    }


    paginationFetchingView() {
        if (this.props.paginationFetchingView) {
            return this.props.paginationFetchingView();
        }

        return (
            <View style={[styles.paginationView, this.props.customStyles.paginationView]}>
                <ActivityIndicator
                    animating={true}
                    size={this.props.spinnerSize}
                    color={this.props.spinnerColor}
                />
            </View>
        );
    }

    paginationAllLoadedView() {
        if (this.props.paginationAllLoadedView) {
            return this.props.paginationAllLoadedView();
        }

        return (
            <View style={[styles.paginationView, this.props.customStyles.paginationView]}>
                <Text style={[styles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    我是有底线的
                </Text>
            </View>
        );
    }

    paginationWaitingView(paginateCallback) {
        if (this.props.paginationWaitingView) {
            return this.props.paginationWaitingView(paginateCallback);
        }

        return (
            <TouchableHighlight
                underlayColor='#f8f8f8'
                onPress={paginateCallback}
                style={[styles.paginationView, this.props.customStyles.paginationView]}
            >
                <Text style={[styles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    更多
                </Text>
            </TouchableHighlight>
        );
    }

    headerView() {
        if (this.state.paginationStatus === 'firstLoad' || !this.props.headerView) {
            return null;
        }
        return this.props.headerView();
    }

    emptyView(refreshCallback) {
        if (this.props.emptyView) {
            return this.props.emptyView(refreshCallback);
        }

        return (
            <View style={[styles.defaultView, this.props.customStyles.defaultView]}>
                <Text style={[styles.defaultViewTitle, this.props.customStyles.defaultViewTitle]}>
                    {this.state.emptyTitle}
                </Text>

                <TouchableHighlight
                    underlayColor='#f8f8f8'
                    onPress={refreshCallback}>
                    <View style={{borderRadius: 12, borderWidth: 1, borderColor: CommonStyle.themeColor}}>
                        <Text style={{color: CommonStyle.themeColor, fontSize: 16, padding: 10}}>
                            点击刷新
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    _renderSeparatorView() {
        if (this.props.renderSeparator) {
            return this.props.renderSeparator();
        }

        return (
            <View style={[styles.separatorView, this.props.customStyles.separator]}/>
        );
    }


    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this)
        }
        this._mounted = true;
        if (!this.props.refreshable) {
            return;
        }
        this.props.onFetch(this._getPage(), this._postRefresh.bind(this), {firstLoad: true});
    }

    //state change refresh
    componentWillReceiveProps() {
        this._setPage(1);
        if (!this.props.refreshable) {
            return;
        }
        this.props.onFetch(this._getPage(), this._postRefresh.bind(this), {firstLoad: true});
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.forceUpdate) {
            this._setPage(1);
            this.props.onFetch(this._getPage(), this._postRefresh.bind(this), {});
        }
    }

    setNativeProps(props) {
        this.refs.listview.setNativeProps(props);
    }

    _refresh() {
        this._onRefresh(this, {external: true});
    }

    _onRefresh(options = {}) {
        if (this._mounted) {
            this.setState({
                isRefreshing: true,
            });
            this._setPage(1);
            this.props.onFetch(this._getPage(), this._postRefresh.bind(this), options);
        }
    }

    _postRefresh(rows = [], options = {}) {
        if (this._mounted) {
            this._updateRows(rows, options);
        }
    }

    _onPaginate() {
        if (this.state.paginationStatus === 'allLoaded') {
            return null
        } else {
            this.setState({
                paginationStatus: 'fetching',
            });
            this.props.onFetch(this._getPage() + 1, this._postPaginate.bind(this), {});
        }
    }

    _postPaginate(rows = [], options = {}) {
        this._setPage(this._getPage() + 1);
        var mergedRows = null;
        if (this.props.withSections === true) {
            mergedRows = MergeRowsWithHeaders(this._getRows(), rows);
        } else {
            mergedRows = this._getRows().concat(rows);
        }

        if (this.props.distinctRows) {
            mergedRows = this.props.distinctRows(mergedRows);
        }

        this._updateRows(mergedRows, options);
    }

    _updateRows(rows = [], options = {}) {
        if (rows !== null) {
            this._setRows(rows);
            if (this.props.withSections === true) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(rows),
                    isRefreshing: false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            } else {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(rows),
                    isRefreshing: false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            }
        } else {
            this.setState({
                isRefreshing: false,
                paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                emptyTitle: (options.emptyTitle !== null ? options.emptyTitle : this.state.emptyTitle),
            });
        }
    }

    _renderPaginationView() {
        if ((this.state.paginationStatus === 'fetching' && this.props.pagination === true) || (this.state.paginationStatus === 'firstLoad' && this.props.firstLoader === true)) {
            return this.paginationFetchingView();
        } else if (this.state.paginationStatus === 'waiting' && this.props.pagination === true && Object.values(this._getRows()).length > 0) {
            return this.paginationWaitingView(this._onPaginate.bind(this));
        } else if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true) {
            return this.paginationAllLoadedView();
        } else if (Object.values(this._getRows()).length === 0) {
            return this.emptyView(this._onRefresh.bind(this));
        } else {
            return null;
        }
    }

    renderRefreshControl() {
        if (this.props.renderRefreshControl) {
            return this.props.renderRefreshControl({onRefresh: this._onRefresh.bind(this)});
        }
        return (
            <RefreshControl
                onRefresh={this._onRefresh.bind(this)}
                refreshing={this.state.isRefreshing}
                // colors={this.props.refreshableColors}
                progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
                size={this.props.refreshableSize}
                tintColor={this.props.refreshableTintColor}
                title={this.props.refreshableTitle}
                colors={['#ff3e9ce9']}
            />
        );
    }

    render() {
        return (
            <ListView
                style={this.props.style}
                ref="listview"
                dataSource={this.state.dataSource}
                renderRow={this.props.rowView}
                renderSectionHeader={this.props.sectionHeaderView}
                renderHeader={() => this.headerView()}
                renderFooter={() => this._renderPaginationView()}
                onEndReached={this.props.loadMore ? () => this._onPaginate() : null}
                onEndReachedThreshold={10}
                automaticallyAdjustContentInsets={false}
                scrollEnabled={this.props.scrollEnabled}
                canCancelContentTouches={true}
                refreshControl={this.props.refreshable === true ? this.renderRefreshControl(this) : null}
                enableEmptySections={true}
                {...this.props}
                renderSeparator={() => this._renderSeparatorView()}
            />
        );
    }

}


const styles = StyleSheet.create({
    separatorView: {
        height: CommonStyle.lineWidth,
        backgroundColor: CommonStyle.lineColor
    },
    actionsLabel: {
        color: CommonStyle.themeColor,
        fontSize: 14,
    },
    paginationView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
    },
    defaultView: {
        marginTop: 160,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultViewTitle: {
        color: '#666666',
        fontSize: 16,
        marginBottom: 15,
    },
})
export default GiftedListView;
