import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  ImageBackground,
  NativeModules,
  StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import { showMsg } from "../../utils/Util";
import Button from "../../component/Button";
import NarBar from "../../component/Narbar";
import CWebView from "../../component/CWebView";

export default class WebPage extends Component<Props> {
  constructor(props) {
    super(props); 
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NarBar
          title={"网页"}
          onSelect={() => { 
            if (this.webView.canGoBack) {
              this.webView.goBack();
            } else Actions.pop();
          }}
        />
        <CWebView
          url={{ uri: "http://www.google.cn/maps" }}
          ref={ref => (this.webView = ref)}
        /> 
      </View>
    );
  }
   /**即将挂载-处理参数*/
   componentWillMount() {
     setTimeout(() => {
      this.setState({isShow:true})
     }, 100);
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
