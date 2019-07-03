import React from "react";
import {Dimensions, Text, View} from "react-native";
import GiftedListView from "../../components/refreshList/GiftedListView";
import Request from "../../utils/Request";
import {PAGE_SIZE} from "../../constants/AppConstants";
import TouchableView from "../../components/TouchableView";
import ImageView from "../../components/ImageView";
import GridView from "../../components/GridView";
import {BaseComponent} from "../../components/base/BaseComponent";

/**
 * 话题帖子列表
 */
let {width, height} = Dimensions.get('window')

export default class TopicPostList extends BaseComponent {
    navigationBarProps() {
        return {
            title: this.props.navigation.state.params.title,
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            liked: false,
            id:this.props.navigation.state.params.id,
        };
    }

    makeRemoteRequest(page = 1, callback) {
        let param = {id: this.state.id, page: page - 1, pageSize: PAGE_SIZE};

        console.log(this.props)
        Request.post('/api/neighbour/invitation/list', param,
            {
                mock: false,
                mockId: 1095699,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                callback(rep.data.rows, {allLoaded: page * PAGE_SIZE >= rep.data.total})
            }else {
                this.showShort(rep.message);
                callback(null,{emptyTitle: rep.message})
            }
        }).catch(err => {
            callback(null,{emptyTitle: err})
        }).done(() => {
            this.hideLoading();
        })
    }

    _renderRowView(item) {
        return (
            <TouchableView style={{flex: 1}} onPress={()=>{
                this.navigate('PostDetail',{id:item.id})
            }}>
                <View style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 5
                }}>
                    <ImageView source={item.memberAvatar}
                               defaultSource={require("../../img/default_head.png")}
                               style={{
                                   width: 40,
                                   height: 40,
                                   resizeMode: "cover",
                                   overflow: "hidden",
                                   borderRadius: 20
                               }}/>
                    <View style={{flex: 1, marginLeft: 10, justifyContent: 'flex-end'}}>
                        <Text style={{
                            fontSize: 14,
                            textAlign: 'left', color: '#333'
                        }}>{item.memberName}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Text style={{
                                fontSize: 12,
                                textAlign: 'left', color: '#999'
                            }}>{item.gmtCreated}</Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <ImageView
                            defaultSource={require("../../img/neighbour_share.png")}
                            style={{
                                width: 11,
                                height: 11,
                                resizeMode: "cover",
                                overflow: "hidden",
                                marginRight: 8
                            }}/>
                        <Text style={{color: '#999', fontSize: 12}}>{item.topicName}</Text>
                    </View>
                </View>
                <Text style={{fontSize: 14, color: '#333', padding: 10}}>{item.content}</Text>
                {this._renderGridView(item.imageUrlList)}
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    padding: 10
                }}>
                    <ImageView
                        source={item.likeStatus === 0 ? require("../../img/unlike_icon.png") : require("../../img/like_icon.png")}
                        style={{
                            width: 18,
                            height: 15,
                            resizeMode: "cover",
                            marginRight: 10
                        }}/>

                    <Text style={{color: '#999', fontSize: 12, marginRight: 40}}>{item.likeCount}</Text>
                    <ImageView source={require("../../img/comment_icon.png")}
                               style={{
                                   width: 17,
                                   height: 15,
                                   resizeMode: "cover",
                                   marginRight: 10
                               }}/>
                    <Text style={{color: '#999', fontSize: 12,}}>{item.commentCount}</Text>
                </View>
            </TouchableView>

        )
    }


    _render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column'
            }}>
                <GiftedListView
                    style={{with: width, flex: 1}}
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this.makeRemoteRequest.bind(this)}
                    loadMore={false}
                />
            </View>
        );
    }

    _renderGridView(item) {
        return (
            <GridView
                style={{
                    flex: 1,
                    paddingBottom: 10,
                    marginTop: 10,
                    backgroundColor: '#fff',
                    marginRight: 10,
                    marginLeft: 10
                }}
                items={item}
                num={2}
                renderItem={this._renderGridItem.bind(this)}
            />
        );
    }


    _renderGridItem(item, index) {
        return (
            <ImageView source={item}
                       style={{
                           width: 175,
                           height: 131,
                           resizeMode: "contain",
                           padding: 5,
                       }}/>
        )
    }

}
;
