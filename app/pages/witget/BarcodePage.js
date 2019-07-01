import React from 'react'
import {Alert, InteractionManager, View,} from 'react-native'

// import Barcode from 'react-native-smart-barcode'
import {BaseComponent} from "../../components/base/BaseComponent";
import Barcode from "../../components/Barcode";
// import TimerEnhance from 'react-native-smart-timer-enhance'

export default class BarcodePage extends BaseComponent {
    navigationBarProps() {
        return {
            title: '扫一扫',
        }
    }

    onReady(e) {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                viewAppear: true,
            })
        });
    }


    _onBarCodeRead = (e) => {
        console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan()
        this.goBack(e.nativeEvent.data.code);
    }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            viewAppear: false,
        };
    }

    _render() {
        return (
            <View style={{flex: 1, backgroundColor: '#000',}}>
                {this.state.viewAppear ? <Barcode style={{flex: 1,}}
                                                  ref={component => this._barCode = component}
                                                  onBarCodeRead={this._onBarCodeRead}/> : null}
            </View>
        )
    }


}
