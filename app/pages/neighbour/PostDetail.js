import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import ImageView from "../../components/ImageView";
import TouchableView from "../../components/TouchableView";
import Request from "../../utils/Request";
import {CommonStyle} from "../../common/CommonStyle";
import GiftedListView from "../../components/refreshList/GiftedListView";
import {PAGE_SIZE} from "../../constants/AppConstants";

let {width, height} = Dimensions.get('window')

export default class PostDetail extends BaseComponent {
    navigationBarProps() {
        return {
            // hiddenLeftItem: true,
            title: '和谐邻里',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {
                commentCount: 0,
                content: "",
                gmtCreated: null,
                id: null,
                imageUrlList: [],
                likeCount: 0,
                memberAvatar: null,
                memberId: null,
                memberName: "",
                title: "",
                topicId: null,
                topicName: "",
                comment: []
            },
            id: this.props.navigation.state.params.id,
            like: false,
        }
    }


    onReady(){
        this.makeRemoteRequest()
    }

    _render() {
        const {data, like} = this.state
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    <View style={{
                        backgroundColor: 'white',
                        // height:50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 5
                    }}>
                        <ImageView source={data.memberAvatar}
                                   defaultSource={require("../../img/default_head.png")}
                                   style={{
                                       width: 40,
                                       height: 40,
                                       // resizeMode: "cover",
                                       overflow: "hidden",
                                       borderRadius: 20
                                   }}/>
                        <View style={{flex: 1, marginLeft: 10, justifyContent: 'flex-end'}}>
                            <Text style={{
                                fontSize: 14,
                                textAlign: 'left', color: '#333'
                            }}>{data.memberName}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Text style={{
                                    fontSize: 12,
                                    textAlign: 'left', color: '#999'
                                }}>{data.gmtCreated}</Text>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <ImageView
                                defaultSource={require("../../img/neighbour_share.png")}
                                style={{
                                    width: 11,
                                    height: 11,
                                    // resizeMode: "cover",
                                    overflow: "hidden",
                                    marginRight: 8
                                }}/>
                            <Text style={{color: '#999', fontSize: 12}}>{data.topicName}</Text>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: 14,
                        color: '#333',
                        padding: 10,
                        backgroundColor: '#fff'
                    }}>{data.content}</Text>
                    {data.imageUrlList?this._rendrImage(data.imageUrlList):<View/>}

                    <View style={{
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // padding: 10,
                        backgroundColor: '#fff',
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            backgroundColor: '#fff'
                        }}>
                            <Image source={require('../../img/theme_label.png')}
                                   style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                            <Text style={{textAlign: 'center', color: '#333', fontSize: 15}}>评论留言</Text>
                        </View>
                        {/*<Text style={{textAlign: 'center', color: '#333', fontSize: 15}}>评论留言</Text>*/}
                        <Text style={{marginRight: 5, fontSize: 14, color: '#999'}}>共有{data.commentCount}条评论</Text>
                    </View>

                    <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>

                    <GiftedListView
                        style={{ flex: 1}}
                        rowView={this.renderComment.bind(this)}
                        onFetch={this.makeCommentRequest.bind(this)}
                        loadMore={false}
                        // refreshable={}
                        // renderRefreshControl={}
                    />

                </ScrollView>
                <View style={styles.bottomView}>
                    <TouchableView style={{
                        alignItems: 'center',
                        backgroundColor: CommonStyle.white,
                        justifyContent: 'center',
                        height: 40,
                        width: width / 2,
                    }} onPress={() => {
                        this.clickLike()
                    }}>
                        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                            <Image
                                source={like === true ? require('../../img/like_icon.png') : require('../../img/unlike_icon.png')}
                                style={styles.bottomIcon}/>
                            <Text style={{color: '#333', fontSize: 16, marginLeft: 10}}>点赞</Text>
                        </View>
                    </TouchableView>
                    <View style={{
                        height: 40,
                        width: 0.5,
                        backgroundColor: CommonStyle.lineColor,
                        marginTop: 10,
                        marginBottom: 10
                    }}/>

                    <TouchableView style={{
                        alignItems: 'center',
                        backgroundColor: CommonStyle.white,
                        justifyContent: 'center',
                        height: 40,
                        width: width / 2,
                    }} onPress={() => {
                        this.navigate('PublishComment', {
                            id: data.id,},
                             (message) => {
                                console.log('=======go back======' + message)
                                this.makeRemoteRequest()
                        })
                    }
                    }>
                        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                            <Image source={require('../../img/comment_icon.png')}
                                   style={styles.bottomIcon}/>
                            <Text style={{color: '#333', fontSize: 16, marginLeft: 10}}>评论</Text>
                        </View>
                    </TouchableView>
                </View>
            </View>
        );
    }


    _renderItem = (item) => {
        return (
            <ImageView source={item.item.imageUrl}
                       style={{
                           width: width - 20,
                           height: 213,
                           // resizeMode: "cover",
                           marginLeft: 10,
                           marginRight: 10
                       }}/>
        )
    }

    _rendrImage = (images) => {
        return images.map((item, i) => {
            return (
                <ImageView source={item} key={i}
                           style={{
                               width: width,
                               height: 213,
                               // resizeMode: "contain",//contain 等比例缩放 cover 模式只求在显示比例不失真的情况下填充整个显示区域。
                               // marginLeft: 10,
                               // marginRight:10,
                               justifyContent: 'center',
                               alignItems: 'center'
                           }}/>
            )
        })
    }

    renderComment (item){
        return(
            <View style={{}}>
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
                                height: 0,
                                resizeMode: "cover",
                                overflow: "hidden",
                                marginRight: 8
                            }}/>
                        <Text style={{color: '#999', fontSize: 0}}>爱分享</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
                    <View style={{width: 40, height: 40}}/>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 14, color: '#333', padding: 5}}>{item.content}</Text>
                        <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                    </View>
                </View>
            </View>
        )
    }


    makeRemoteRequest() {
        let param = {id: this.state.id};

        this.showDLoading()
        Request.post('/api/neighbour/invitation/detail', param,
            {
                mock: false,
                mockId: 1095701,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                //todo
                this.setState({
                    data: rep.data
                })
                if (rep.data.likeStatus === 1) {
                    this.setState({
                        like: true
                    })
                } else if (rep.data.likeStatus === 0) {
                    this.setState({
                        like: false
                    })
                }
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading()
        })
    }

    makeCommentRequest(page = 1, callback) {
        let param = {id: this.state.id, page: page - 1, pageSize: PAGE_SIZE};

        Request.post('/api/neighbour/comment/list', param,
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

    clickLike() {
        console.log(this.state.like)
        this.state.like = !this.state.like

        let param = {id: this.state.id, type: this.state.like === true ? 1 : 0};

        Request.post('/api/neighbour/like', param,
            {
                mock: false,
                mockId: 1095701,
            }).then(rep => {
            if (rep.code === 0) {
                //失败 将值置回原来值
                this.setState({
                    like: this.state.like
                })
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 68,
    },
    bottomIcon: {
        width: 15, height: 15, resizeMode: 'contain'
    },
    bottomView: {
        flexDirection: 'row', justifyContent: 'space-between', width: width, position: 'absolute',
        bottom: 0,
        height: 40,
        alignSelf: 'center',
    }
    ,
    bottomLeftBt: {
        alignItems: 'center',
        backgroundColor: CommonStyle.white,
        justifyContent: 'center',
        height: 40,
        width: width / 4,
    },
    marginBottom: {
        marginBottom: 20
    },
    marginTop: {
        marginTop: 20
    }
});
