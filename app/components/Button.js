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
  TouchableNativeFeedback
} from 'react-native'

export default class Button extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return Platform.OS === 'ios'?(
      <TouchableHighlight underlayColor='#f8f8f8' {...this.props} key={this.props.index}>{this.props.children}</TouchableHighlight>
    ):(
      <View {...this.props}><TouchableNativeFeedback underlayColor='#f8f8f8' key={this.props.index} onPress={this.props.onPress}>{this.props.children}</TouchableNativeFeedback></View>
    )
  }
}
