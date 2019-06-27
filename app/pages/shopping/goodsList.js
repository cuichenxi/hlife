import React from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";
import {PAGE_SIZE} from "../../constants/AppConstants";
import {CommonStyle} from "../../common/CommonStyle";
import {BaseComponent} from "../../components/base/BaseComponent";
import ImageView from "../../components/ImageView";
let {width} = Dimensions.get('window')
export default class Index extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {

        };
    }

    onReady(e) {
        this.setTitle("商品列表")
    }

    _onFetch(page = 1, callback) {
        console.log('page' + page);
        // this.showInDLoading()
        let param = {status: this.state.index, page: page - 1, pageSize: PAGE_SIZE,};
        Request.post("/api/goods/basic", param,
            {
                mock: true,
                mockId: 1095476,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                if (rep.data.rows) {
                    var gridData = [];
                    var length=rep.data.rows.length;
                    for (var i=0; i< length; i=i+2) {
                        var item1 = rep.data.rows[i];
                        var item2
                        if (i < length) {
                            item2 = rep.data.rows[i + 1];
                        }
                        var item = {
                            item1: item1,
                            item2: item2
                        };
                        gridData.push(item)
                    }
                    callback(gridData, {allLoaded: page * PAGE_SIZE >= rep.data.total})
                }
            }
        }).catch(err => {

        }).done(() => {
            // this.hideLoading();
        })
    }

    _renderRowView(item) {
        return (
            <View style={{flexDirection: 'row'}}>
                {this._renderItemView(item.item1)}
                {item.item2 && this._renderItemView(item.item2)}
            </View>
        );
    }
    _renderItemView(item) {
        return (
            <TouchableView style={{
                width: (width - 30)/2, borderRadius: 3, backgroundColor: '#fff',
                borderColor: '#fff',
                borderWidth: .5,
                margin: 5
            }}  onPress={() => {
                this._jumpRouter(item)
            }}>
                <View style={[{flex: 1, borderRadius: 3, backgroundColor: '#fff',
                    borderColor: '#fff',
                    padding: 10,
                    borderWidth: .5,}]}>
                    <ImageView source={item.goodsImage} style={{alignSelf:'center',width: 100, marginTop:10, height: 100,}} defaultSource={require("../../img/default_image.png")}/>
                    <Text  ellipsizeMode={'tail'} numberOfLines={1} style={{flex:1,fontSize: 14, color: "#333", marginTop: 20,
                    }}>{item.goodsName}</Text>
                    <View style={{flex:1 ,flexDirection:'row', alignItems: "flex-end", marginTop: 10}}>
                        <Text style={{fontSize: 12, color: CommonStyle.themeColor}}>￥<Text style={{fontSize: 24, color: CommonStyle.themeColor,}}>{item.goodsPrice}</Text></Text>
                        <Text style={{fontSize: 12, color: '#666',marginLeft:5 , marginBottom: 5 }}>{`￥${item.marketPrice}`}</Text>
                    </View>
                </View>
            </TouchableView>
        )
    }
    _render() {
        return (
            <GiftedListView
                style={styles.container}
                rowView={this._renderRowView.bind(this)}
                onFetch={this._onFetch.bind(this)}
                loadMore={true}
                renderSeparator={() => {return (null);}}
            />
        );
    }
}
;
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
});
