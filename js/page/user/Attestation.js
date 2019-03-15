import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, DeviceEventEmitter, InteractionManager} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isNotEmpty, showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import NextView from "../../component/NextView";
import BottomCModel from "../../model/BottomCModel";
import PickerModel from "../../model/PickerModel";
import {postCache} from "../../utils/Resquest";
import {URL_LIST, URL_MY_DATA, URL_QUERY_CLASS, URL_QUERY_SCHOOL} from "../../constant/Url";

/**
 * @class
 */
export default class Attestation extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            showType: 0,
            showModel: false,
            schoolName: '',
            className: '',
            ageName: '',
            sexName: '',
            userName: ''
        }
        this.attestationItem = {schoolId: '', classId: '', ageId: '', sexId: ''};
        this.school = [];
        this.classes = []
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"认证学生"} onSelect={() => Actions.pop()}/>
                {NextView.getSettingImgItemS(() => Actions.inputPage({
                    event: eventType, eventName: eventName,
                    text: this.state.userName
                }), "姓名", this.state.userName, true, true, "请输入学生真实姓名")}
                {NextView.getSettingImgItemS(() => this.showModal(1, this.school), "学校", this.state.schoolName, true, true, "请选择学生学校")}
                {NextView.getSettingImgItemS(() => this.showModal(2, this.classes), "班级", this.state.className, true, true, "请选择学生班级")}
                {NextView.getSettingImgItemS(() => this.showModal(3, this.ages), "年龄", this.state.ageName, true, true, "请选择")}
                {NextView.getSettingImgItemS(() => this.showModal(4, this.sex), "性别", this.state.sexName, true, true, "请选择")}
                <PickerModel list={this.state.list} closeModal={(index) => {
                    if (index) {
                        var idx = parseInt(index)
                        if (this.state.showType == 1) {
                            this.setState({schoolName: this.school[idx].name, chassName: '', showModel: false});
                            this.attestationItem.schoolId = this.school[idx].id
                            this.queryClass(false, this.attestationItem.schoolId)
                        } else if (this.state.showType == 2) {
                            this.setState({chassName: this.classes[idx].name, showModel: false});
                            this.attestationItem.classId = this.classes[idx].id
                        } else if (this.state.showType == 3) {
                            this.setState({ageName: this.ages[idx].name, showModel: false});
                            this.attestationItem.ageId = this.ages[idx].value
                        } else if (this.state.showType == 4) {
                            this.setState({sexName: this.sex[idx].name, showModel: false});
                            this.attestationItem.sexId = this.sex[idx].value
                        } else this.setState({showModel: false})
                    } else this.setState({showModel: false})
                }} show={this.state.showModel}/>
            </View>);
    }

    componentWillMount() {
        this.ages = [];
        for (var i = 5; i < 20; i++) {
            this.ages.push({name: `${i}周岁`, value: `${i}`});
        }
        this.sex = [{name: '男', value: '1'}, {name: '女', value: '2'}]
    }

    showModal(type, list) {
        if (list && list.length > 0) {
            this.setState({showModel: true, list: list, showType: type})
        } else {
            if (type == 1) this.querySchool(true)
            if (type == 2) this.queryClass(true, this.attestationItem.schoolId)
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.querySchool(false)
        })
        this.listener = DeviceEventEmitter.addListener(eventType, (item) => {
            this.setState({userName: item[eventName]})
        });
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }

    querySchool(isShow) {
        postCache(URL_QUERY_SCHOOL, undefined, (data) => {
            this.school = data;
            this.classes = [];
            if (isShow) {
                this.setState({showType: 1, list: data})
            }
        }, true)
    }

    queryClass(isShow, id) {
        if (!isNotEmpty(id)) {
            showMsg("请选择学校后选择班级")
        } else {
            if (isShow)
                this.loadKey = showMsg("正在查询...", 3)
            postCache(URL_QUERY_CLASS, {schoolId: id}, (data) => {
                if (isShow)
                    showMsg("", this.loadKey)
                if (data.list.length > 0) {
                    this.setState({showType: 2, list: data, showModel: true})
                } else showMsg("尚未查询到班级信息")
            }, false, (error) => {
                showMsg("", this.loadKey, error)
            })
        }
    }
}
const eventType = 'Attestation'
const eventName = 'name'
