import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {BaseView} from "../../../components/base/BaseView";
import GiftedListView from "../../../components/refreshList/GiftedListView";
import TouchableView from "../../../components/TouchableView";
import Request from "../../../utils/Request";
import {PAGE_SIZE} from "../../../constants/AppConstants";
import {CommonStyle} from "../../../common/CommonStyle";
import util from "../../../utils/util";
import ImageView from "../../../components/ImageView";
import NavigationUtil from "../../../utils/NavigationUtil";
import {PAY_FROM_ORDER_ORDER_LIST} from "../../../constants/ActionTypes";

export default class Index extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            ...props,
        };
    }
    _onFetch(page = 1, callback) {
        // this.showInDLoading()
        let param = {status: this.state.index + 1, page: page - 1, pageSize: PAGE_SIZE,};
        Request.post("/api/goods/orderList", param,(cacheRep)=>{
            if (cacheRep) {
                if (cacheRep.code == 0 && cacheRep.data && !util.isArrayEmpty(cacheRep.data.rows)) {
                    callback(cacheRep.data.rows, {allLoaded: page * PAGE_SIZE >= cacheRep.data.total})
                } else {
                    callback(null,{emptyTitle: '暂无订单'})
                }
            }
        }).then(rep => {
            if (rep.code == 0 && rep.data && !util.isArrayEmpty(rep.data.rows)) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            } else {
                callback(null,{emptyTitle: '暂无订单'})
            }
        }).catch(err => {
            callback(null, {emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        });
    }

    _renderRowView(item,index) {
        var statusStr = '待支付';
        switch (item.status) {
            case 0:
                statusStr = '待支付';
                break
            case 1:
                statusStr = '已取消';
                break
        }
        var totalPrice = 0;
      return(
          <TouchableView   style={{
              backgroundColor: '#fff',
              borderRadius:20,
              marginHorizontal:10,
              marginVertical:10,
              borderColor:CommonStyle.bgColor,
              borderBottomWidth: 0.5,
          }} onPress={()=>{
              NavigationUtil.navigate(this.props.navigation,'OrderDetail',{id:item.id})
          }}>
              <View style={{flexDirection:'row',height:44 ,borderColor:CommonStyle.lightGray, borderBottomWidth: 0.5,
                 justifyContent:'space-between', alignItems: 'center',paddingHorizontal:15
              }}>
                  <Text style={{fontSize:16,color:'#666',fontWeight: 'bold'}}>订单:{item.orderno}</Text>
                  <Text style={{fontSize:14,color:'#333'}}>{statusStr}</Text>
              </View>
              {item.goodsList && item.goodsList.map((item,index) => this._renderOrderItem(item,index))}
              <View style={{flexDirection:'row',height:50 ,
                  justifyContent:'space-between', alignItems: 'center',paddingHorizontal:15
              }}>
                  <Text style={{fontSize:15,color:'#333'}}>合计: {totalPrice}</Text>
                  <TouchableView style={{borderColor:CommonStyle.tomato,borderWidth:0.5,borderRadius:15,
                    height:30, width: 60,alignItems: 'center', justifyContent: 'center'
                  }} onPress={()=>{
                      NavigationUtil.navigate(this.props.navigation,'PayPage', {
                          id: item.id,
                          totalPrice:totalPrice,
                          orderno:item.orderno,
                          from: PAY_FROM_ORDER_ORDER_LIST})
                  }}>
                      <Text style={{fontSize:14,color:CommonStyle.tomato}}>付款</Text>
                  </TouchableView>
              </View>
          </TouchableView>
      )
    }
    _renderOrderItem(item ,index) {
        return (
            <View key={index} style={{
                paddingVertical: 8,
                marginHorizontal: 15,
                flexDirection: 'row',
                height: 86,
                flex: 1,
                borderColor: CommonStyle.lightGray, borderBottomWidth: 0.5,
            }}>
                <ImageView style={{height: 70, width: 70}}
                           source={this.state.imageUrl} defaultSource={require('../../../img/default_image.png')}/>
                <Text
                    style={{marginLeft: 15, flex: 1, fontSize: 16, color: '#333'}}>{item.goodName}</Text>
                <View style={{marginTop: 6, flexDirection: 'column'}}>
                    <Text style={{fontSize: 14, color: '#333'}}>￥{item.price}</Text>
                    <Text style={{marginTop: 6, fontSize: 14, color: '#333'}}>x{item.num}</Text>
                </View>
            </View>
        );
    }


    _render() {
        return (
            <GiftedListView
                style={styles.container}
                rowView={this._renderRowView.bind(this)}
                onFetch={this._onFetch.bind(this)}
                loadMore={true}
                pagination={false} // enable infinite scrolling using touch to load more
                renderSeparator={() => {return (null)}}
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
