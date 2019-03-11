import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, ImageBackground, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showMsg, size} from '../../utils/Util';
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


/**
 * @class
 */
export default class ResumeStudy extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {//设置初值
            tab: 0,  inpatient: false
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"我要复课"} onSelect={() => Actions.pop()}/>
                <TextBar list={["事假", "病假"]} changeTab={(index) => {
                    this.setState({tab: index})
                }}/>
                {this.state.tab == 0 ? this.leave() : this.sickLeave()}
            </View>);
    }

    leave() {
        return <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
            <View style={{height: 10}}/>
            <View style={{width: size.width}}>
                {NextView.getSettingImgItemL(() => {
                }, "结束时间", undefined, "请选择", true, true)}
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemL(() => {
                }, "备注", undefined, "", true, false)}
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <EditView ref={ref => (this.mContent = ref)} style={styles.lineEdit} numberOfLines={4}
                          placeholder={'请输入备注内容'} multiline={true}/>
            </View>
            <Button onPress={() => {
            }} style={{marginTop: 70, marginLeft: 15, marginRight: 15}}>
                <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={{
                                    height: 45,
                                    width: size.width - 30,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                    <Text style={{color: '#fff', fontSize: 18}}>提交</Text>
                </LinearGradient>
            </Button>
        </ScrollView>
    }

    sickLeave() {
        return <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
            <View style={{width: size.width}}>
                <CheckView title={"是否痊愈"} style={{padding: 10, marginTop: 5}}/>
                <CheckView title={"是否有医院证明"} style={{padding: 10,paddingTop:0,marginTop:5}}
                           changeCheck={(check) => this.setState({inpatient: check})}/>
                {this.state.inpatient ?
                    <Text style={{backgroundColor: '#fff', padding: 10, width: size.width}}>上传病例以及相关材料</Text> : null}
                {this.state.inpatient ? <ImgsView/> : null}
                <Text style={{color: '#E64340', fontSize: 12, padding: 10, lineHeight: 18}}>{notice}</Text>
                {NextView.getSettingImgItemL(() => {
                }, "备注", undefined, "", true, false)}
                <View style={{backgroundColor: '#fff'}}>
                    <EditView ref={ref => (this.mContent = ref)} style={styles.lineEdit} numberOfLines={4}
                              placeholder={'请输入备注内容'} multiline={true}/>
                </View>
            </View>
            <Button onPress={() => {
            }} style={{marginTop: 70, marginLeft: 15, marginRight: 15}}>
                <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={{
                                    height: 45,
                                    width: size.width - 30,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                    <Text style={{color: '#fff', fontSize: 18}}>提交</Text>
                </LinearGradient>
            </Button>
            <View style={{height: 20}}/>
        </ScrollView>
    }
}
const notice = '* 手足口为国家法定传染病，需持有校医（保健老师）出具的复课证需持有校医（保健老师）出具的复课证明或持有医院开具的痊愈证明方可复课明或持有医院开具的痊愈证明方可复课。'
const styles = StyleSheet.create({
    lineText: {
        fontSize: 17, color: '#333', width: 80, marginTop: 10, marginLeft: 10
    },
    lineEdit: {
        width: size.width,
        fontSize: 15,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 5,
        height: 100,
        lineHeight: 22,
        textAlign: 'left'
    }
});