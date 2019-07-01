import React from 'react';
import {Image, Platform, StyleSheet, View, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import util from "../utils/util";

class ImageView extends React.PureComponent {
    static propTypes = {
        // source: PropTypes.object,
        style: ViewPropTypes.style,
        defaultSource: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    render() {
        var isNumber = util.isNumber(this.props.source);
        if (Platform.OS === 'ios'){
            return isNumber ?
                <Image style={[styles.imageDefStyle, this.props.style]}
                       source={Number(this.props.source)} defaultSource={this.props.defaultSource}/> :
                <Image style={[ styles.imageDefStyle, this.props.style]}
                       source={{uri: String(this.props.source)}} defaultSource={this.props.defaultSource}/>

        }else{
            return (
                <View style={[this.props.style,{}]}>
                    {isNumber ?
                        <Image style={[styles.imageAndStyle, this.props.style]}
                               source={Number(this.props.source)} defaultSource={this.props.defaultSource}onLoad={() => this.setState({loading: false})}/> :
                        <Image style={[ styles.imageAndStyle, this.props.style]}
                               source={{uri: String(this.props.source)}} defaultSource={this.props.defaultSource}onLoad={() => this.setState({loading: false})}/>}
                    {this.state.loading ? <Image style={[ styles.imageAndStyle,this.props.style]} source={this.props.defaultSource}/> : null}
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    imageDefStyle: {resizeMode: Image.resizeMode.contain ,},
    content: {},
    imageAndStyle: {position: 'absolute', top: 0, right: 0, left: 0, bottom: 0,resizeMode:Image.resizeMode.contain}
});

export default ImageView;
