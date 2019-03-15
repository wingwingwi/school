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
import {isIos, showMsg, size} from "../../utils/Util";
import Button from "../../component/Button";
import NarBar from "../../component/Narbar";
import CWebView from "../../component/CWebView";
import {postCache} from "../../utils/Resquest";
import {URL_NEWS_DETAIL} from "../../constant/Url";

export default class WebPage extends Component<Props> {
    constructor(props) {
        super(props);
        var html = '<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>标题</title></head><body></body></html>'
        this.state = {isShow: false, height: size.height, url: {html: html}, titleName: '网页'}
    }

    render() {
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
                <SafeAreaView style={{flex: 1}}>
                    <NarBar
                        title={this.state.titleName} isHasNotState={true}
                        onSelect={() => {
                            // if (this.webView.canGoBack) {
                            //     this.webView.goBack();
                            // } else
                            Actions.pop();
                        }}
                    />
                    {/*<ScrollView style={{flex: 1}}>*/}
                    {this.state.isShow ? this._getWeb() : null}
                    {/*{this.state.isShow ? this._getWeb() : null}*/}
                    {/*{this.state.isShow ? <CWebView*/}
                    {/*style={{height: this.state.height, width: size.width}}*/}
                    {/*url={this.state.url}*/}
                    {/*ref={ref => (this.webView = ref)}*/}
                    {/*setHeight={(height) => {*/}
                    {/*console.log(`height=${height}`)*/}
                    {/*this.setState({height: height})*/}
                    {/*}}*/}
                    {/*/> : null}*/}
                    {/*</ScrollView>*/}
                </SafeAreaView></View>
        );
    }

    _getWeb() {
        return isIos ? <WebView automaticallyAdjustContentInsets={false}
                                contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                                mediaPlaybackRequiresUserAction={false}
                                scalesPageToFit={true}
                                startInLoadingState={false}
                                originWhitelist={isIos ? ['*'] : undefined}
                                domStorageEnabled={false}
                                javaScriptEnabled={false}
                                mixedContentMode={'always'}
                                allowsInlineMediaPlayback={false}
                                bounces={false}
                                scrollEnabled={true}
                                onLoad={(e) => {
                                    console.log(e);
                                }}
                                onLoadEnd={(e) => {
                                    console.log(e);
                                    this.setState({show: false});
                                }}
                                renderError={() => {
                                    console.log(e);
                                    return <Text style={{marginTop: 30}}>网页错误</Text>
                                }}
                                style={{width: '100%', height: '100%'}}
                                source={this.state.url}
        /> : <WebView style={{width: '100%', height: '100%'}}
                      source={this.state.url}/>
    }

    /**即将挂载-处理参数*/
    componentWillMount() {
    }

    request() {
        this.loadKey = showMsg('加载中...', 3)
        postCache(URL_NEWS_DETAIL, {id: this.props.id}, (data) => {
            showMsg('', this.loadKey)
            var html = '<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>标题</title></head><body><div>' + data.cnts + '</div></body></html>'
            this.setState({
                titleName: data.title, isShow: true,
                url: isIos ? {html: html} : {html: html, baseUrl: ''}
            })
        }, false, (error => showMsg('', this.loadKey, error)))

    }

    /**已经挂载-处理耗时操作*/
    componentDidMount() {
        if (this.props.url)
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
        this.setState = (state, callback) => {
            return;
        };
    }
}


const injectedJavaScript = `
    (function () {
        var height = null;
        function changeHeight() {
          if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            if (window.postMessage) {
              window.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height,
              }))
            }
          }
        }
        setTimeout(changeHeight, 300);
    } ())
    `