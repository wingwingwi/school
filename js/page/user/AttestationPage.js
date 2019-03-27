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
import {URL_ADD_STUDENT, URL_LIST, URL_MY_DATA, URL_QUERY_CLASS, URL_QUERY_SCHOOL} from "../../constant/Url";
import BasePage from "../BasePage";
import {save, getValue} from "../../utils/FileUtil";
import ChooseAreaModel from "../../model/ChooseAreaModel";

/**
 * @class
 */
export default class AttestationPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            showType: 0,
            showModel: false, showArea: false,
            schoolName: '',
            className: '',
            ageName: '',
            sexName: '',
            userName: ''
        }
        this.attestationItem = {schoolId: '', classId: '', gender: '', age: ''};
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
                <Button onPress={() => {
                    this.attestation()
                }} style={{marginTop: 70, marginLeft: 15, marginRight: 15}}>
                    <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={{
                                        height: 45,
                                        width: size.width - 30,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                        <Text style={{color: '#fff', fontSize: 18}}>提交认证</Text>
                    </LinearGradient>
                </Button>
                <PickerModel list={this.state.list} closeModal={(index) => {
                    if (index) {
                        var idx = parseInt(index)
                        if (this.state.showType == 1) {
                            this.setState({schoolName: this.school[idx].name, className: '', showModel: false});
                            this.attestationItem.schoolId = this.school[idx].id
                            this.queryClass(false, this.attestationItem.schoolId)
                        } else if (this.state.showType == 2) {
                            console.log(this.classes[idx].name + JSON.stringify(this.classes))
                            this.setState({className: this.classes[idx].name, showModel: false});
                            this.attestationItem.classId = this.classes[idx].id
                        } else if (this.state.showType == 3) {
                            this.setState({ageName: this.ages[idx].name, showModel: false});
                            this.attestationItem.age = this.ages[idx].value
                        } else if (this.state.showType == 4) {
                            this.setState({sexName: this.sex[idx].name, showModel: false});
                            this.attestationItem.gender = this.sex[idx].value
                        } else this.setState({showModel: false})
                    } else this.setState({showModel: false})
                }} show={this.state.showModel}/>
                <ChooseAreaModel show={this.state.showArea} closeModal={(data) => {
                    if (data) this.querySchool(true, data)
                    this.setState({showArea: false})
                }}/>
            </View>);
    }

    componentWillMount() {
        super.componentWillMount()
        this.ages = [];
        for (var i = 3; i < 15; i++) {
            this.ages.push({name: `${i}周岁`, value: `${i}`});
        }
        this.sex = [{name: '男', value: '男'}, {name: '女', value: '女'}]
    }

    showModal(type, list) {
        if (type == 1) this.setState({showArea: true})//this.querySchool(true)
        else if (list && list.length > 0) {
            this.setState({showModel: true, list: list, showType: type})
        } else {
            if (type == 2) this.queryClass(true, this.attestationItem.schoolId, type)
        }
    }

    componentDidMount() {
        // InteractionManager.runAfterInteractions(() => {
        //     this.querySchool(false)
        // })
        this.listener = DeviceEventEmitter.addListener(eventType, (item) => {
            this.setState({userName: item[eventName]})
        });
        getValue(eventType, (data) => {
            if (data) this.setData(JSON.parse(data))
            console.log(JSON.stringify(data))
        })
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.listener && this.listener.remove();
    }

    querySchool(isShow, formData) {
        postCache(URL_QUERY_SCHOOL, formData, (data) => {
            this.school = data;
            this.classes = [];
            if (data && data.length > 0) this.setState({showType: 1, showModel: true, list: data})
            else showMsg("还没有录入该地区学校")
        })
    }

    queryClass(isShow, id, isShowModal) {
        if (!isNotEmpty(id)) {
            showMsg("请选择学校后选择班级")
        } else {
            if (isShow)
                this.loadKey = showMsg("正在查询...", 3)
            postCache(URL_QUERY_CLASS, {schoolId: id}, (data) => {
                if (isShow)
                    showMsg("", this.loadKey)
                if (data && data.length > 0) {
                    this.classes = data
                    if (isShowModal)
                        this.setState({showType: 2, list: data, showModel: true})
                } else showMsg("尚未查询到班级信息")
            }, false, (error) => {
                showMsg("", this.loadKey, error)
            })
        }
    }

    attestation() {
        if (!isNotEmpty(this.attestationItem.schoolId)) {
            showMsg("选择学校")
        } else if (!isNotEmpty(this.attestationItem.classId)) {
            showMsg("选择班级")
        } else if (!isNotEmpty(this.attestationItem.age)) {
            showMsg("选择年龄")
        } else if (!isNotEmpty(this.attestationItem.gender)) {
            showMsg("选择性别")
        } else if (!isNotEmpty(this.state.userName)) {
            showMsg("输入姓名")
        } else {
            this.loadKey = showMsg("正在提交...", 3)
            this.attestationItem.realName = this.state.userName;
            postCache(URL_ADD_STUDENT, this.attestationItem, (data) => {
                this.attestationItem['schoolName'] = this.state.schoolName;
                this.attestationItem['className'] = this.state.className;
                this.attestationItem['ageName'] = this.state.ageName;
                this.attestationItem['sexName'] = this.state.sexName;
                save(eventType, JSON.stringify(this.attestationItem))
                showMsg("", this.loadKey, "提交成功")
                setTimeout(() => {
                    Actions.reset('root1')
                }, 800)
            }, false, (error) => {
                showMsg("", this.loadKey, error)
            })
        }
    }

    setData(data) {
        this.attestationItem = data;
        this.setState({
            schoolName: data.schoolName, userName: data.realName, className: data.className,
            ageName: data.ageName, sexName: data.sexName
        })
    }
}
const eventType = 'Attestation'
const eventName = 'name'
