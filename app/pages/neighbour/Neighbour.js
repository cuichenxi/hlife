import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BaseComponent} from '../../components/base/BaseComponent'
import {CommonStyle} from "../../common/CommonStyle";
import Tabs from "antd-mobile-rn/es/tabs/index.native";
import NewestView from "./NewestView";
import TopicView from "./TopicView";

export default class Neighbour extends BaseComponent {
    navigationBarProps() {
        return {
            hiddenLeftItem: true,
            title: '和谐邻里',
        }
    }

    onNext = () => {
        this.navigate('Login', {isFirst: true});
    };

    canExitApp(){
        return true;
    }
    _render() {
        const tabs = [
            {title: '最新'},
            {title: '话题'},
        ];
        return (
            <View style={styles.container}>
                <Tabs tabs={tabs} tabBarActiveTextColor={CommonStyle.themeColor}  onChange={(tab,index)=>{
                    // index
                }}
                      tabBarUnderlineStyle={{backgroundColor: CommonStyle.themeColor}} initialPage={0} tabBarPosition="top" swipeable={false}>

                    {this.renderPage.bind(this)}
                </Tabs>
            </View>
        );
    }

    renderPage(tab,index){
        console.log(index)
        if (index === 0){
            return(
                <NewestView style={{
                    flex: 1,
                    backgroundColor: 'white',
                    flexDirection: 'column'
                }} tab={tab} index={index} onButtonPress={() =>{
                    this.navigate('PublishPost')
                }
                }
                            onItemPress={(item)=>{
                                this.navigate('PostDetail',{id:item.id})
                            }}
                            onAuth={()=>{
                                this.navigate('AuthPage',{},(e)=>{
                                    this.setState({
                                        isAuth: e.isAuth
                                    })
                                });
                            }}
                            onRef={this.onRef}
                />
            )
        } else if (index === 1){
            return(
                <TopicView style={{
                    flex: 1,
                    backgroundColor: 'white',
                    flexDirection: 'column'
                }} tab={tab} index={index}
                           onItemPress={
                               (item) =>{
                                   this.navigate('TopicPostList',{id:item.id,title:item.name})
                               }
                           }
                />
            )
        }
    }

    onShow(){
        //父组件调用子组件方法，刷新列表
        this.child.refreshList()
    }

    onRef =(ref) =>{
        this.child=ref
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

