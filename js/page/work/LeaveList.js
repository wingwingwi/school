import React, {Component} from 'react';

import {
    View,
    Text, Alert,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ScrollView,
    InteractionManager, DeviceEventEmitter
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getArrStr, getDateTime, isNotEmpty, showMsg, size, upload} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import TextBar from "../../component/TextBar";
import NextView from "../../component/NextView";
import ImgsView from "../../component/ImgsView";
import CheckView from "../../component/CheckView";
import DateModel from "../../model/DateModel";
import ChooseIModel from "../../model/ChooseIModel";
import PickerModel from "../../model/PickerModel";
import {postCache} from "../../utils/Resquest";
import {
    URL_LEAVE_ILLNESS, URL_LEAVE_MATTER, URL_LIST_LEAVES, URL_QUERY_DISEASE, URL_QUERY_LEAVES,
    URL_UPLOAD
} from "../../constant/Url";
import BasePage from "../BasePage";
import BListView from "../../component/BListView";

/**
 * @class
 */
export default class LeaveList extends BasePage {
    constructor(props) {
        super(props);
        this.state = {//设置初值
            isLoading: true,
        };
        this.pics = [];
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"我要复课"} onSelect={() => Actions.pop()}/>
                <View style={{height: 1}}/>
                <BListView ref={ref => this.listView = ref}
                           ListEmptyComponent={this._listEmptyComponent}
                           list={this.state.list}
                           renderRefresh={() => this.requestList()}
                           itemView={this._renderItem}/>
            </View>);
    }

    componentWillMount() {
        super.componentWillMount()
        this.listener = DeviceEventEmitter.addListener(eventType, (item) => {
            this.requestList()
        });
    }


    componentWillUnmount() {
        super.componentWillUnmount()
        this.listener && this.listener.remove()
    }

    componentDidMount() {
        this.requestList()
    }

    requestList() {
        var param = undefined;
        if (this.props.resumeStatus)
            param = {resumeStatus: this.props.resumeStatus}
        postCache(URL_LIST_LEAVES, param, (data) => {
            this.listView.setRefreshing(false);
            this.setState({list: data, isLoading: false})
        }, false, err => {
            this.listView.setRefreshing(false);
        })
    }

    _listEmptyComponent = () => {
        return (<View
                style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <Text style={{color: "#999", fontSize: 15, marginTop: 50}}>
                    {this.state.isLoading ? "正在加载" : '暂无数据'}
                </Text>
            </View>
        );
    }
    _renderItem = item => {
        let name = `${item.lb == 1 ? "事假" : "病假"}-${item.startTime}`
        return <View>
            {NextView.getSettingImgItemTech(() => {
                if (item.resumeStatus == 0)
                    Actions.resumeStudy({lb: item.lb, id: item.id})
            }, name, item.resumeStatus == 0 ? '去复课' : '', true, true, "")}
        </View>
    }

}

const eventType = 'leavelist'