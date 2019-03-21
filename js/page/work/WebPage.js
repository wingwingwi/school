import React, {Component} from "react";

import {
    View,
    Text, SafeAreaView,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image, WebView,
    TouchableOpacity,
    ImageBackground,
    NativeModules,
    StatusBar
} from "react-native";
import {Actions} from "react-native-router-flux";
import {isIos, isNotEmpty, showMsg, size} from "../../utils/Util";
import Button from "../../component/Button";
import NarBar from "../../component/Narbar";
import CWebView from "../../component/CWebView";
import {postCache} from "../../utils/Resquest";
import {URL_NEWS_DETAIL, URL_QUERY_COMMENT, URL_QUERY_PAGE, URL_THUMBS} from "../../constant/Url";
import src from "../../constant/Src";
import EditView from "../../component/EditView";
import BasePage from "../BasePage";

export default class WebPage extends BasePage {
    constructor(props) {
        super(props);
        var html = '<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>标题</title></head><body></body></html>'
        this.state = {
            isShow: false, height: size.height, url: {html: html}, titleName: '网页', list: [],
            look: '', time: '', thumbs: 0, isThumb: false
        }
    }

    render() {
        this.key = 1;
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
                <SafeAreaView style={{flex: 1}}>
                    <NarBar
                        title={this.state.titleName} isHasNotState={true}
                        onSelect={() => {
                            if (this.webView && this.webView.canGoBack) {
                                this.webView.goBack();
                            } else
                                Actions.pop();
                        }}
                    />
                    <ScrollView style={{flex: 1}}>
                        {this.props.id ? <View style={{padding: 10}}>
                            <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}
                                  numberOfLines={1}>{this.state.titleName}</Text>
                            <View style={{
                                marginTop: 5,
                                width: size.width - 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{color: '#0099FF', fontSize: 10}}>卫生安全<Text
                                    style={{color: '#a9a9a9', fontSize: 10}}>{'|阅读量' + this.state.look}</Text></Text>
                                <Text style={{color: '#a9a9a9', fontSize: 10}}>{'发布时间：' + this.state.time}</Text>
                            </View>
                        </View> : null}
                        {this.state.isShow ? <CWebView
                            style={{height: this.state.height, width: size.width}}
                            url={this.state.url}
                            ref={ref => (this.webView = ref)}
                            loadFinish={() => {
                                showMsg('', this.loadKey)
                            }}
                            scrollEnabled={false}
                            setHeight={(height) => {
                                this.setState({height: height})
                            }}
                        /> : null}
                        {this.props.id ? <View
                            style={{width: size.width, padding: 10, alignItems: 'center', justifyContent: 'center'}}
                            key={this.key++}>
                            <Button style={{
                                width: 120,
                                height: 33,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 16,
                                borderColor: '#0099FF',
                                borderWidth: 1,
                            }} onPress={() => {
                                this.dianZan()
                            }}><Image source={this.state.isThumb ? src.dianzan_highlight_btn : src.dianzan1_normal_btn}
                                      style={{width: 20, height: 20}}/>
                                <Text style={{
                                    color: '#0099FF',
                                    fontSize: 12,
                                    marginLeft: 5
                                }}>{this.state.thumbs + "人点赞"}</Text></Button>
                        </View> : null}
                    </ScrollView>
                </SafeAreaView></View>
        );
    }


    request() {
        this.loadKey = showMsg('加载中...', 3)
        postCache(URL_NEWS_DETAIL, {id: this.props.id}, (data) => {
            var html = h1 + data.cnts + h2
            this.setState({
                titleName: data.title, isShow: true,
                url: isIos ? {html: html} : {html: html, baseUrl: ''},
                look: data.look, time: data.createTime.substring(0, 10), thumbs: data.thumbs
            })
        }, false, (error => showMsg('', this.loadKey, error)))
        postCache(URL_QUERY_COMMENT, {id: this.props.id}, (data) => {

        })
    }

    dianZan() {
        postCache(URL_THUMBS, {id: this.props.id}, undefined, false, (err) => showMsg(err))
        this.setState({isThumb: !this.state.isThumb, thumbs: this.state.thumbs + (this.state.isThumb ? -1 : 1)})
    }


    comment() {

    }

    /**已经挂载-处理耗时操作*/
    componentDidMount() {
        if (isNotEmpty(this.props.url))
            this.interval = setTimeout(() => {
                this.setState({isShow: true, url: {uri: this.props.url}})
                this.interval && clearTimeout(this.interval)
            }, 150);
        else if (this.props.id) {
            this.request();
        }
    }

    /**卸载*/
    componentWillUnmount() {
        super.componentWillUnmount()
        this.webView = undefined
        this.setState = (state, callback) => {
            return;
        };
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

/**测试信息* */
const runFirst = `
    setTimeout(function() { 
    var height = document.body.scrollHeight;
    window.ReactNativeWebView.postMessage(height) }, 100);
    true; 
  `;