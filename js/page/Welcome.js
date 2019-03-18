import React, {Component} from 'react';

import {
    View, Text, StyleSheet, ScrollView, RefreshControl, Image,
    TouchableOpacity, ImageBackground, NativeModules, StatusBar, DeviceEventEmitter, InteractionManager
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {post, showMsg} from '../utils/Util'
import {postCache} from '../utils/Resquest'

import Button from '../component/Button';
import NarBar from '../component/Narbar';
import BListView from "../component/BListView";
import Swiper from 'react-native-swiper'
import src from '../constant/Src'
import {size} from '../utils/Util'
import {URL_LIST, URL_BANNERS, URL_QUERY_PAGE} from "../constant/Url";
import BasePage from "./BasePage";

/**
 *
 *
 * @export
 * @class Main
 * @extends {Component<Props>}
 */
export default class Welcome extends BasePage {
    constructor(props) {
        super(props);
    }

    render() {
        return <Image style={{width: size.width, height: size.height}} source={src.qidongye_pic}/>
    }
    componentWillMount() {
        super.componentWillMount();
    }
}