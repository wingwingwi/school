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
export default class Record extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <NarBar title={"个人档案"} onSelect={() => Actions.pop()}/>
                <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
                    <Image style={{width: 100, height: 100, marginTop: 50, marginBottom: 30}}
                           source={src.banzhurenxiaoxi_btn}/>
                    <Text style={{color: '#262626', fontSize: 15, padding: 15, lineHeight: 30}}>安全教育是不能间断的工作，不仅是父母，学校、社会也要引起重视。在家里，父母要教育孩子诚实懂事，当然也要学会自我保护。父母需要注意的是不能溺爱孩子，父母保护得越好，孩子的自我保护能力就越差，如此孩子在面对危险时的自救能力也更弱。</Text>
                </ScrollView>
            </View>);
    }
}