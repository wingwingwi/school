import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, DeviceEventEmitter, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isNotEmpty, showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import BListView from "../../component/BListView";

/**
 * @class
 */
export default class InputPage extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"编辑"} onSelect={() => Actions.pop()} rightText={'确认'} onRight={() => {
                    var text = this.editView.text();
                    if (isNotEmpty(text)) {
                        var item = {}
                        var eventName = this.props.eventName ? this.props.eventName : 'name'
                        item[`${eventName}`] = text
                        item.key = eventName;
                        item.text = text
                        DeviceEventEmitter.emit(this.props.event, item)
                        Actions.pop()
                    }
                }}/>
                <View style={{height: 5}}/>
                <EditView style={{padding: 10, backgroundColor: '#fff', textAlign: 'auto'}}
                          placeholder={'请输入编辑内容'}
                          ref={ref => (this.editView = ref)}/>
            </View>);
    }

    componentDidMount() {
        this.editView && this.editView.text(isNotEmpty(this.props.text) ? `${this.props.text}` : '')
    }
}