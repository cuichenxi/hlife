import {BaseComponent} from "../../components/base/BaseComponent";
import GiftedListView from "../../components/refreshList/GiftedListView";
import React from "react";
import {StyleSheet, Text, View,Linking} from "react-native";
import QIcon from "../../components/icon";
import Request from "../../utils/Request";
import TouchableView from "../../components/TouchableView";
import {Modal} from "antd-mobile-rn/lib/index.native";
import UserStore from "../../store/UserStore";


export default class ContactList extends BaseComponent {

    onReady(param) {
        this.setTitle(param.title);
    }

    _onFetch(page = 1, callback, options) {
        Request.post('ContactList.do',
            {ContactListID: "ContactListID", 'page': page, 'pageSize': 10},
            {mock: true, mockId: 892430})
            .then(rep => {
                if (rep.bstatus.code === 0 && rep.data && rep.data.contactList) {
                    callback(rep.data.contactList, {
                        allLoaded: rep.data.total <= page * 10
                    });
                } else {
                    this.showShort(rep.bstatus.desc);
                }
            }).catch(err => {
                this.showShort(err);
            }
        ).done(() => {
            this.hideLoading();
        });
    }
    cellPhone(rowData) {
        Modal.alert('提示', '拨打:'+rowData.phone, [
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'}, {
                text: '确定', onPress: () => {
                    let url = 'tel: ' + rowData.phone;
                    Linking.canOpenURL(url).then(supported => {
                        if (!supported) {
                            console.log('Can\'t handle url: ' + url);
                        } else {
                            return Linking.openURL(url);
                        }
                    }).catch(err => console.error('An error occurred', err));
                }
            },
        ]);

    }
    _renderRowView(rowData) {
        return (
            <TouchableView onPress={()=>this.cellPhone(rowData)}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal:15,
                justifyContent: 'space-between',
                alignItems: 'center'
            }} >
                <View style={{flexDirection: 'column'}}>
                    <Text style={{color: "#333", fontSize: 16}}>{rowData.name}</Text>
                    <Text style={{color: "#666", fontSize: 14, marginTop: 8}}>{rowData.phone}</Text>
                </View>
                <QIcon style={styles.orderItemIcon} name={'icon-phone'} size={22}></QIcon>
            </View>
            </TouchableView>
        );
    }

    _render() {
        return (
            <View style={styles.container}>
                <GiftedListView style={{flex: 1}}
                                initialListSize={10}
                                rowView={this._renderRowView.bind(this)}
                                onFetch={this._onFetch.bind(this)}
                                firstLoader={true}
                                pagination={true}
                                refreshable={true}
                                loadMore={true}

                />
            </View>
        )
    }


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});