import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView, RefreshControl,
    InteractionManager,
    DeviceEventEmitter
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isNotEmpty, showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import NextView from "../../component/NextView";
import {postCache} from "../../utils/Resquest";
import {URL_ADD_ARCHIVES, URL_ARCHIVES_LIST, URL_MY_ARCHIVES} from "../../constant/Url";
import BottomCModel from "../../model/BottomCModel";
import BasePage from "../BasePage";

/**
 * @class
 */
export default class RecordList extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            list: [], refreshing: false
        }
        this.key = 0;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"个人档案"} onSelect={() => Actions.pop()}/>
                <ScrollView contentContainerStyle={{}} style={{flex: 1}}
                            refreshControl={<RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._renderRefresh}
                                title='刷新加载中...'
                                titleColor='#666'
                                colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                                progressBackgroundColor='#ffffff'
                            />}>
                    <View style={{width: size.width, height: 5}}/>
                    {this.state.list.length > 0 ? (this.state.list.map((item, idx) => this.itemView(item, idx))) :
                        <View
                            style={{width: size.width, alignItems: 'center', paddingTop: 70, justifyContent: 'center'}}>
                            <Image source={src.shangweitianjia_icon} style={{width: 70, height: 70}}/>
                            <Text style={{
                                color: '#a9a9a9',
                                fontSize: 14,
                                marginTop: 10
                            }}>{this.state.refreshing ? "正在加载" : "尚未添加个人档案"}</Text>
                        </View>}
                </ScrollView>
                <Button style={{position: 'absolute', bottom: 20, right: 20}}
                        onPress={() => Actions.record()}>
                    <Image source={src.xinjiandangan_btn}
                           style={{
                               width: 60,
                               height: 65
                           }}/>
                </Button>
            </View>);
    }


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.loadKey = showMsg("获取个人档案中...", 3)
            this.request();
        })
    }

    request() {
        postCache(URL_ARCHIVES_LIST, undefined, (data) => {
            showMsg('', this.loadKey)
            this.setState({list: data})
        }, false, (error) => {
            showMsg('', this.loadKey, 'error')
        })
    }

    itemView(item, idx) {
        return <View key={idx}>
            {NextView.getSettingImgItemTech(() => {
                Actions.record({id: item.id})
            }, item.moth, "", true, true, "")}
        </View>
    }

    /**下拉刷新*/
    _renderRefresh = () => {
        this.setState({refreshing: true})//开始刷新
        setTimeout(() => {
            this.setState({refreshing: false})//开始刷新
            this.request();
        }, 1000);

    };

    componentWillMount() {
        super.componentWillMount()
        this.listener = DeviceEventEmitter.addListener(eventType, (item) => {
        });
    }


    componentWillUnmount() {
        super.componentWillUnmount()
        this.listener && this.listener.remove();
    }


}

var chooseKey = ""
const eventType = 'recordList'
const styles = StyleSheet.create({
    leftText: {
        color: '#262626', fontSize: 17, marginLeft: 10
    }, titleText: {
        color: '#888', fontSize: 15, marginLeft: 10
    },
    itemView: {
        flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center'
    },
    editStyle: {
        padding: 15, color: '#666', fontSize: 17, textAlign: 'right', flex: 1
    },
    line: {width: null, height: 1, backgroundColor: '#F3F3F3'}
});