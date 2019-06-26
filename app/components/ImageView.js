import React from 'react';
import {Image, StyleSheet, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import util from "../utils/util";

class ImageView extends React.PureComponent {
    static propTypes = {
        // source: PropTypes.object,
        style: ViewPropTypes.style,
        defaultSource: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        var isNumber = util.isNumber(this.props.source);
        return (
            isNumber ?
                <Image style={[styles.imageDefStyle, this.props.style]}
                       defaultSource={this.props.defaultSource}/> :
                <Image style={[ styles.imageDefStyle, this.props.style]}
                       defaultSource={this.props.defaultSource}/>
        );
    }

}

const styles = StyleSheet.create({
    imageDefStyle: {resizeMode: Image.resizeMode.stretch}
});

export default ImageView;
