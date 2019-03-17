import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList, View, Text, StyleSheet, Image
} from 'react-native';
import Button from "./Button";
import src from "../constant/Src";

export default class CheckNetView extends React.Component {
    static propTypes = {
        checkNum: PropTypes.number,//添加数据view
        key: PropTypes.string,//是否添加下拉刷新
    }

    /**初始化数据*/
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            check: 0 //1是，2否，0从未选择
        };
        this.pageNum = 1;
    }

    render() {
        return <View style={{flexDirection: 'row'}}>
            <Button onPress={() => {
            }}><Image style={{width: 65, height: 25}}
                      source={this.state.check == '1' ? src.zhengchang_highlight_btn : src.zhengchang_normal_btn}/></Button>
            <Button onPress={() => {
            }}><Image style={{width: 65, height: 25, marginLeft: 10, marginRight: 10}}
                      source={this.state.check == '2' ? src.yichang_highlight_btn : src.yichang_normal_btn}/></Button>
        </View>
    }

    componentWillMount() {
        let key = this.props.key
        let checkNum = this.props.checkNum;
        this.setState({key: key, check: checkNum})
    }


    getKey() {
        return this.state.key;
    }

    getCheck() {
        return this.state.check;
    }

}