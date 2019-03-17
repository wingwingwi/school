import React, {Component} from 'react';

import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import BasePage from "../BasePage";
import Swiper from 'react-native-swiper'

/**
 * @class
 */
export default class ImageList extends BasePage {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(JSON.stringify(this.props.imgs))
        return (
            <View style={{flex: 1, backgroundColor: '#000'}}>
                <Swiper style={{}}>
                    {this.props.imgs && this.props.imgs.map((item, idx) => {
                        console.log(JSON.stringify(item))
                        return <TouchableOpacity activeOpacity={1} onPress={() => {
                            this.closePage()
                        }} key={idx}>
                            <Image style={{width: size.width, height: size.height}} source={{uri: item.fileUrl}}
                                   resizeMode={'contain'}/>
                        </TouchableOpacity>
                    })}
                </Swiper>
            </View>);
    }

    closePage() {
        var date = new Date();
        console.log(date.getTime() + '')
        if (this.time && this.time - date.getTime() < 300) {
            console.log(this.time + '')
            this.isNotClose = true
        }
        setTimeout(() => {
            if (this.isNotClose) {
                this.isNotClose = false
            } else Actions.pop()
        }, 500)
        this.time = date.getTime()
    }
}