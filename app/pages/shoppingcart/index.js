import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {BaseComponent} from "../../components/base/BaseComponent";
import TouchableView from "../../components/TouchableView";
import {CommonStyle} from "../../common/CommonStyle";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import Step from "../../components/Step";
const imageUrl=require('../../img/about_logo.png');

let {width, height} = Dimensions.get('window')

export default class ShoppingCart extends BaseComponent {
    navigationBarProps() {
        return {
            // hiddenLeftItem: true,
            title: '购物车',
        }
    }

    onNext = () => {
        this.navigate('Login', {isFirst: true});
    };

    canExitApp() {
        return true;
    }

    _render() {
        return (
            <GiftedListView
                style={{with: width, flex: 1}}
                rowView={this._renderRowView.bind(this)}
                onFetch={this.makeRemoteRequest.bind(this)}
                loadMore={false}
            />
        );
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {page: page - 1, pageSize: PAGE_SIZE};

        Request.post('api/goods/buycar', param,
            {
                mock: true,
                mockId: 1125450,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                // console.log(JSON.stringify(rep))
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    _renderRowView(item) {
        return (
            <TouchableView >
                <View style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5
                }}>
                    <Image
                        source={imageUrl}
                        style={{
                            width: 100,
                            height: 90,
                            marginLeft: 10,
                        }}
                    />
                    <View style={{flex: 1, marginLeft: 10,justifyContent:'flex-end'}}>
                        <Text style={{
                            fontSize: 13,
                            textAlign: 'left', color: '#666666'
                        }}>{item.goodsname}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',flex:1}}>
                            <Text style={{textAlign: 'left', color: CommonStyle.themeColor, fontSize: 13}}>{item.sellprice}</Text>
                            <Step/>
                        </View>
                    </View>
                </View>


            </TouchableView>

        )
    }

    onChange(value){
        console.log('changed',value)
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

