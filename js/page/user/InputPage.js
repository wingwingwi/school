import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showMsg, size} from '../../utils/Util';
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
                <NarBar title={"编辑"} onSelect={() => Actions.pop()} rightText={'确认'} onRight={()=>{Actions.pop()}}/>
                <View style={{height: 5}}/>
                <EditView style={{padding: 10,backgroundColor:'#fff'}}
                          ref={ref => (this.editView = ref)}/>
            </View>);
    }
}