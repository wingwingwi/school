import React from "react";
import {
    ViewBase,
    Platform,
    View,
    ProgressBarAndroid,
    ProgressViewIOS
} from "react-native";
import {WebView} from "react-native-webview";
import {size, showMsg} from "../utils/Util";
import ProgressView from "./ProgressView";

/**点击button*/
export default class CommentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
    }
    render(){
        return <View style></View>
    }
}