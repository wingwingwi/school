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

/**
 * @class
 */
export default class Health extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <NarBar title={"健康教育"} onSelect={() => Actions.pop()}/>

            </View>);
    }
}