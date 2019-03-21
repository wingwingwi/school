import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, ScrollView, InteractionManager} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isIos, post, showMsg, size} from '../../utils/Util';
import {save, getValue} from '../../utils/FileUtil';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import {URL_LIST} from "../../constant/Url";
import CWebView from "../../component/CWebView";
import BasePage from "../BasePage";

/**
 * @class
 */
export default class AboutUs extends BasePage {
    constructor(props) {
        super(props);
        var html = '<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>标题</title></head><body></body></html>'
        this.state = {text: '', url: {html: html}, isShow: false}

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <NarBar title={"关于我们"} onSelect={() => Actions.pop()}/>
                {/*<ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>*/}
                {/*<Image style={{width: 100, height: 100, marginTop: 50, marginBottom: 30}}*/}
                {/*source={src.banzhurenxiaoxi_btn}/>*/}
                {/*<Text style={{color: '#262626', fontSize: 15, padding: 15, lineHeight: 30}} multiline={true}>{this.state.text}</Text>*/}
                {/*</ScrollView>*/}
                {this.state.isShow ? <CWebView url={this.state.url} scrollEnabled={true}
                                               loadFinish={() => showMsg('', this.loadKey)}/> : null}
            </View>);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            getValue('aboutUs', (t) => {
                if (t)
                    this.setState({text: t})
            })
            this.loadKey = showMsg('加载中...', 3)
            post(URL_LIST, {type: '2'}, (data) => {
                var html = h1 + data.replace('<img', '<img width=200px height=200px') + h2
                this.setState({isShow: true, url: isIos ? {html: html} : {html: html, baseUrl: ''}})
            })
        })
    }
}

const h1 = '<!DOCTYPE html><html><head><meta charset=\"UTF-8\">' +
    '<meta name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">' +
    '<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />' +
    '<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\" />' +
    '<meta name=\"format-detection\" content=\"telephone=yes\" />' +
    '<meta name=\"msapplication-tap-highlight\" content=\"no\" />' +
    '<meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge，chrome=1\"><title>标题</title></head><body><div>'
const h2 = '</div></body></html>'