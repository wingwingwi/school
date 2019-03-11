import React from "react";
import {
  ViewBase,
  Platform,
  View,
  ProgressBarAndroid,
  ProgressViewIOS
} from "react-native";
import { WebView } from "react-native-webview";
import { size, showMsg } from "../utils/Util";
import ProgressView from "./ProgressView";

/**点击button*/
export default class CWebView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadEnd: false };
  }

  /** 加载信息*/
  _loadProgress(num) {
    if (this.progressview && this.progressview.progressNum)
      this.progressview.progressNum(num);
  }

  render() {
    return (
      <View style={{ flex: 1, width: null }}>
        <WebView
          source={{ html }}
          onLoadProgress={({ nativeEvent }) =>
            this._loadProgress(nativeEvent.progress)
          }
          onLoad={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            this.url = nativeEvent.url;
            this.canGoBack = nativeEvent.canGoBack;
          }}
          onLoadEnd={syntheticEvent => {
            this.setState({ loadEnd: true });
          }}
          onMessage={event => {
            showMsg(event.nativeEvent.data);
            setTimeout(() => {
              this.webView.injectJavaScript(runFirst);
            }, 5000);
          }}
          ref={ref => (this.webView = ref)}
        />
        <View style={{ position: "absolute" }}>
          {this.state.loadEnd ? null : (
            <ProgressView ref={ref => (this.progressview = ref)} />
          )}
        </View>
      </View>
    );
  }
  /***返回上一个URL*/
  goBack() {
    this.webView&& this.webView.goBack();
  }
  /**刷新*/
  reload() {
    this.webView&&this.webView.reload();
  }
  /**停止加载*/
  stopLoading() {
    this.webView&&this.webView.stopLoading();
  }
  /**注入*/
  injectJavaScript(str) {
    this.webView&&this.webView.injectJavaScript(str);
  }
  /**是否还有栈*/
  canGoBack() {
    if (this.webView&&this.webView.canGoBack) return this.webView.canGoBack;
    return false;
  }
  /**卸载*/
  componentWillUnmount() {
    this.webView=undefined
    this.setState = (state, callback) => {
        return;
    };
}
}
/**测试信息* */
const html = `
      <html>
      <head>
      <script> 
          function toast(str){
            window.ReactNativeWebView.postMessage(str)
          }
        </script>
      </head>
      <body>
        <script>
          setTimeout(function () {
            window.ReactNativeWebView.postMessage("Hello!")
          }, 3000) 
        </script>
        <h1>HTML 3秒 向RN发送一条信息</h1>
        <h1>内容填写</h1>
        <button type="button" onclick="toast('HTML 3秒 向RN发送一条信息')">Try it</button>
      </body>
      </html>
    `;

const color = "green";

/**测试信息* */
const runFirst = `
    document.body.style.backgroundColor = '${color}';
    setTimeout(function() { window.ReactNativeWebView.postMessage("RN=>Html=>RN") }, 2000);
    true; // note: this is required, or you'll sometimes get silent failures
  `;

const runSound = `
  javascript:toast("RN——》HTML-》RN");
  true; // note: this is required, or you'll sometimes get silent failures
`;
