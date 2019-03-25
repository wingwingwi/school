import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isNotEmpty, showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import {postCache} from "../../utils/Resquest";
import {URL_ADD_OPINION, URL_MY_DATA} from "../../constant/Url";
import BasePage from "../BasePage";
import TextBar from "../../component/TextBar";

/**
 * @class
 */
export default class ChooseArea extends BasePage {
    constructor(props) {
        super(props);
        this.state = {tabList: ["省", "市", "区"], list: []}
    }

    render() {
        return <View style={{flex: 1}}>
            <NarBar title={"认证学生"} onSelect={() => Actions.pop()}/>
            <TextBar list={this.state.tabList} changeTab={(tab) => {
            }}/>
        </View>
    }
}