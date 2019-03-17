import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image, InteractionManager,
    TouchableOpacity,
    ImageBackground,
    NativeModules
} from "react-native"; //基本架构

import {Actions} from "react-native-router-flux"; //路由
import {showMsg, size} from "../../utils/Util"; //工具类
import Button from "../../component/Button";
import BasePage from "../BasePage";
import NarBar from "../../component/Narbar";
import BListView from "../../component/BListView";
import src from "../../constant/Src";
import EditView from "../../component/EditView";
import LinearGradient from "react-native-linear-gradient";
import {postCache} from "../../utils/Resquest";
import {URL_QUERY_NETE_TEMPLATE} from "../../constant/Url";

/**
 * @class Test 是例子
 */
export default class SendMsg extends BasePage {
    constructor(props) {
        super(props);
        this.state = {name: "测试", refreshing: false, list: []}; //定义属性
        this.key = 1;
    }

    render() {
        return <View style={{flex: 1}}>
            <NarBar title={'发送通知'} onSelect={() => Actions.pop()}/>
            <ScrollView>
                <View style={{width: size.width, backgroundColor: '#fff'}}>
                    <Text style={{padding: 15, color: '#000', fontSize: 17}}>标题</Text>
                    <View style={{width: size.width, height: 1, backgroundColor: '#eee'}}/>
                    <TouchableOpacity activeOpacity={1}
                                      style={{backgroundColor: '#fff', height: 120, padding: 15}}
                                      onPress={() => this.mContent.focus()}>
                        <EditView ref={ref => (this.mContent = ref)} style={styles.lineEdit}
                                  placeholder={'请输入通知内容'} multiline={true}/>
                    </TouchableOpacity>
                </View>
                <Text style={{padding: 12, color: '#0099FF', fontSize: 17}}>快捷模板</Text>
                {this.getCList()}
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
                        <Text style={{color: '#fff', fontSize: 18}}>发送</Text>
                    </LinearGradient>
                </Button>
                <View style={{height: 20}}/>
            </ScrollView>
        </View>
    }

    getCList() {
        var view = []
        if (this.state.list.length > 0) {
            this.state.list.map((item, idx) => {
                let index = idx;
                view.push(<View style={{width: size.width, padding: 15, flexDirection: 'row', alignItems: 'center'}}
                                key={this.key++}>
                    <Text style={{flex: 1, color: '#000', fontSize: 15}}>{item.title}</Text>
                    <Button style={{paddingLeft: 15}} onPress={() => {
                        var list = this.state.list;
                        list[index].isC = !list[index].isC
                        this.setState({list: list})
                        this.mContent.text(list[index].title)
                    }}>
                        {item.isC ? <Image style={{width: 22, height: 22}} source={src.gouxuan_btn}/> :
                            <View style={{width: 22, height: 22}}/>}
                    </Button>
                </View>)
                view.push()
            })
            return view;
        } else return null
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.requestList()
        })
    }

    requestList() {
        this.loadKey = showMsg("获取模版...", 3)
        postCache(URL_QUERY_NETE_TEMPLATE, undefined, (data) => {
            showMsg('', this.loadKey)
            this.setState({list: data})
        }, true, (error) => showMsg('', this.loadKey, error))
    }

}


const styles = StyleSheet.create({
    lineEdit: {
        width: size.width - 30,
        fontSize: 15,
        maxHeight: 90,
        lineHeight: 22,
        textAlign: 'auto'
    }
});