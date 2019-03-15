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

/**
 * @class
 */
export default class AboutUs extends Component<Props> {
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
                {this.state.isShow ? <CWebView url={this.state.url}/> : null}
            </View>);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            getValue('aboutUs', (t) => {
                if (t)
                    this.setState({text: t})
            })
            post(URL_LIST, {type: '2'}, (data) => {
                var html = '<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>标题</title></head><body><div>' + data + '</div></body></html>'
                this.setState({isShow: true, url: isIos ? {html: html} : {html: html, baseUrl: ''}})
                // if (data != this.state.text) {
                //     this.setState({text: data})
                //     save('aboutUs', data)
                // }
            })
        })
    }
}