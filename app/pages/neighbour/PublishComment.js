import {BaseComponent} from "../../components/base/BaseComponent";
import React from "react";
import {Keyboard, TextInput, View} from "react-native";
import Request from "../../utils/Request";

export default class PublishComment extends BaseComponent{
    navigationBarProps() {
        return {
            title: '评论',
            rightTitle:'发送',
            onRightPress:()=>{}
        }
    }

    constructor(props) {
        super(props);
        this.state={
            contentValue:'',
            invitationId:this.props.navigation.state.params.id,
        }
    }

    onRightPress(){
        this.commitInfo()
    }
    _render() {
        return (
            <View>
                <TextInput
                    placeholder='写评论'
                    style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        height: 100,
                        marginBottom: 20,
                        marginTop: 10,
                        padding: 10,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        textAlign:'left',
                        textAlignVertical: 'top'
                    }}
                    multiline={true}
                    maxLength={100}
                    underlineColorAndroid="transparent"
                    onChangeText={(value) =>this.setState({contentValue:value})}
                    value={this.state.contentValue ? this.state.contentValue : ''}
                />
            </View>
        );
    }

    commitInfo() {
        Keyboard.dismiss();
        let {contentValue,invitationId} = this.state;
        if (!contentValue.length) {
            this.showShort('请输入评论');
            return;
        }

        let param = {content: contentValue,invitationId:invitationId };

        console.log(param)
        Request.post('/api/neighbour/comment', param,
            {
                mock: false,
                mockId: 1095545,
            }).then(rep => {
            if (rep.code == 0 ) {
                this.goBack(rep.message)
            } else {
                this.showShort(rep.message)
            }
        }).catch(err => {

        }).done(() => {
            this.hideLoading();
        })
    }

}
