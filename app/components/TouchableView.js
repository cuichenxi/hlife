/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
    View,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';

export default class TouchableView extends Component {
  constructor(props){
    super(props)
  }
  render(){
    // return Platform.OS === 'ios'?(
    //   <TouchableOpacity underlayColor='#00000000' {...this.props} key={this.props.index}>{this.props.children}</TouchableOpacity>
    // ):(
    //   <View {...this.props}><TouchableNativeFeedback underlayColor='#00000000' key={this.props.index} onPress={this.props.onPress}>{this.props.children}</TouchableNativeFeedback></View>
    // )
      return (
          <TouchableOpacity underlayColor='#00000000' {...this.props}
                            key={this.props.index}>{this.props.children}</TouchableOpacity>);

  }
}
