import React, {Component} from "react";

import {
    View,
    Text, SafeAreaView,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity,
    ImageBackground,
    NativeModules,
    StatusBar
} from "react-native";
import {Actions} from "react-native-router-flux";
import {showMsg, size} from "../../utils/Util";
import Button from "../../component/Button";
import NarBar from "../../component/Narbar";
import CWebView from "../../component/CWebView";

export default class WebPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {isShow: false, height: size.height}
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <NarBar
                    title={"网页"}
                    onSelect={() => {
                        if (this.webView.canGoBack) {
                            this.webView.goBack();
                        } else Actions.pop();
                    }}
                />
                <ScrollView style={{flex: 1}}>
                    {this.state.isShow ? <CWebView
                        style={{height: this.state.height, width: size.width}}
                        url={{uri: "http://www.google.cn/maps"}}
                        ref={ref => (this.webView = ref)}
                        injectJavaScript={injectedJavaScript}
                        setHeight={(height) => {
                            console.log(`height=${height}`)
                            this.setState({height: height})
                        }}
                    /> : null}
                </ScrollView>
            </SafeAreaView>
        );
    }

    /**即将挂载-处理参数*/
    componentWillMount() {
        this.interval = setTimeout(() => {
            this.setState({isShow: true})
            this.interval && clearTimeout(this.interval)
        }, 150);
    }

    /**已经挂载-处理耗时操作*/
    componentDidMount() {
    }

    /**卸载*/
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}


const injectedJavaScript =`
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