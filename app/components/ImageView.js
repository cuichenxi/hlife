import React from 'react';
import {Image, StyleSheet, View, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

class ImageView extends React.PureComponent {
    static propTypes = {
        source: PropTypes.object,
        style: ViewPropTypes.style,
        placeholderSource: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    render() {
        return (
            <View style={this.props.style}>
                <Image style={[this.props.style, styles.imageStyle]} source={this.props.source} onLoad={() => this.setState({loading: false})}/>
                {this.state.loading ? <Image style={[this.props.style, styles.imageStyle]} source={this.props.placeholderSource}/> : null}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    imageStyle: {position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}
});

export default ImageView;
