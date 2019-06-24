import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Dimensions, FlatList, Text, View} from "react-native";
import ImageView from "../../components/ImageView";
import TouchableView from "../../components/TouchableView";
import {PAGE_SIZE} from "../../constants/AppConstants";
import Request from "../../utils/Request";
import {CommonStyle} from "../../common/CommonStyle";
let {width, height} = Dimensions.get('window')

export default class PostDetail extends BaseComponent{
    navigationBarProps() {
        return {
            // hiddenLeftItem: true,
            title: '和谐邻里',
        }
    }

    constructor(props) {
        super(props);
        this.state={
            data:{
                title: "",
                content: "",
                author: "",
                authorHeadUrl: "",
                createDate: "",
                imageUrlList: [

                ],
                comment: [

                ],
                likeCount: 11
            },
            id:this.props.navigation.state.params.id
        }
    }
    componentWillMount(){
        this.makeRemoteRequest()
    }

    _render() {
        const {data} = this.state
        return (
            <View style={{flex: 1}}>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>
                <View style={{
                    backgroundColor: 'white',
                    // height:50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 5
                }}>
                    <ImageView source={{uri: data.authorHeadUrl}}
                               placeholderSource={require("../../img/default_head.png")}
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
                        }}>{data.author}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Text style={{
                                fontSize: 12,
                                textAlign: 'left', color: '#999'
                            }}>{data.createDate}</Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <ImageView
                            placeholderSource={require("../../img/neighbour_share.png")}
                            style={{
                                width: 11,
                                height: 11,
                                resizeMode: "cover",
                                overflow: "hidden",
                                marginRight: 8
                            }}/>
                        <Text style={{color: '#999', fontSize: 12}}>爱分享</Text>
                    </View>
                </View>
                <Text style={{fontSize: 14, color: '#333', padding: 10,backgroundColor:'#fff'}}>{data.content}</Text>
                <FlatList ref={(flatList) => this._flatList = flatList}
                          ItemSeparatorComponent={this._separator}
                          renderItem={this._renderItem}
                          onEndReachedThreshold={0.1}
                          data={this.state.data.imageUrlList}/>

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
                    <Text style={{textAlign: 'center', color: '#333', fontSize: 15}}>评论留言</Text>
                    <Text style={{marginRight: 5, fontSize: 14, color: '#999'}}>共有 条评论</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor, width: '100%'}}/>

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    padding: 10
                }}>
                    <TouchableView onPress={() => {
                        this.setState({
                            liked: !this.state.liked
                        })
                    }}>
                        <ImageView
                            source={this.state.liked ? require("../../img/unlike_icon.png") : require("../../img/like_icon.png")}
                            style={{
                                width: 18,
                                height: 15,
                                resizeMode: "cover",
                                marginRight: 10
                            }}/>
                    </TouchableView>

                    <Text style={{color: '#999', fontSize: 12, marginRight: 40}}>{data.likeCount}</Text>
                    <ImageView source={require("../../img/comment_icon.png")}
                               style={{
                                   width: 17,
                                   height: 15,
                                   resizeMode: "cover",
                                   marginRight: 10
                               }}/>
                    <Text style={{color: '#999', fontSize: 12,}}>{data.likeCount}</Text>
                </View>
            </View>
        );
    }

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: CommonStyle.lightGray}}/>;
    }

    _renderItem=(item) =>{
        return(
            <ImageView source={{uri: item.item.imageUrl}}
                       style={{
                           width: width-20,
                           height: 213,
                           resizeMode: "cover",
                           marginLeft: 10,
                           marginRight:10
                       }}/>
        )
    }

    makeRemoteRequest() {
        let param = {id: this.state.id};

        Request.post('/api/neighbour/detail',param,
            {
                mock: true,
                mockId: 1095701,
            }).then(rep => {
            if (rep.code == 0 && rep.data) {
                //todo
                this.setState({
                    data:rep.data
                })
            }
        }).catch(err => {

        }).done(() => {
        })
    }
}
