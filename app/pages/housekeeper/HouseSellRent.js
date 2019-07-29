import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {View} from "react-native";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import {CommonStyle} from "../../common/CommonStyle";
import HouseSellRentView from "./HouseSellRentView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";

export default class HouseSellRent extends BaseComponent {
    navigationBarProps() {
        return {
            title: '房屋租售',
            rightTitle:'发布房源'
        }
    }

    constructor(props) {
        super(props);
        this.state={
            communityId:''
        }
    }

    onReady(){
        this.fetchData()
    }


    onRightPress(){
        this.navigate('PublishHouseInfo');
    }
    _render() {

        const tabs = [
            {title: '出售'},
            {title: '出租'},
        ];
        const {communityId} = this.state
        if (communityId){
            return (
                <View style={{flex: 1}}>
                    <Tabs tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor} onChange={(tab, index) => {
                        // index
                    }} tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor,}} initialPage={0}
                          tabBarPosition="top"
                          swipeable={false}
                    >
                        {this.renderPage.bind(this)}

                    </Tabs>
                </View>
            );
        }
    }

    renderPage(tab, index) {
        return (
            <HouseSellRentView style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }} tab={tab} index={index}
                               onItemPress={(item,index) => {
                                   this.navigate('HouseSellRentInfo',{id:item.id,index:index})
                               }}
                               onButtonPress={() =>{
                                   this.navigate('PublishHouseInfo')
                               }}
                               communityId={this.state.communityId}
            />
        )
    }

    fetchData(page = 1) {
        let param = { page: page - 1, pageSize: PAGE_SIZE};
        this.showDLoading()
        Request.post('/api/user/mycommunityList', param,
            {
                mock: false,
                mockId: 1095864,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                this.setState({
                    rows: rep.data
                })
                for (var community of rep.data){
                    if (community.isAuth == 1) {
                        this.setState({
                            communityId:community.communityId
                        })
                        break
                    }
                }
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
    }

}

