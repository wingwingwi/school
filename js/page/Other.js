import React, {Component} from 'react';

import {
    View, Text, StyleSheet, ScrollView, RefreshControl, Image,
    TouchableOpacity, ImageBackground, NativeModules
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import NarBar from "../component/Narbar";
import BListView from "../component/BListView";
import Button from "../component/Button";
import {size, showMsg} from '../utils/Util'
import src from '../constant/Src'

/**
 *
 *
 * @export
 * @class Other
 * @extends {Component<Props>}
 */
export default class Other extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false, list: [{img: src.gerenxiaoxi_btn, title: '个人消息', text: '您尚未认证学生信息，为了不影响您继续使用，请...'},
                {img: src.banzhurenxiaoxi_btn, title: '班主任消息', text: '昼夜温差太大，注意保暖及卫生，希望王大锤同学...'},
                {img: src.xitongxiaoxi_btn, title: '系统消息', text: '您尚未认证学生信息，为了不影响您继续使用，请...'}]
        }; //定义属性
    }

    render() {
        return <View style={{flex: 1, backgroundColor: '#fff'}}>
            <NarBar title={'消息'}/>
            <BListView
                ref={ref => (this.listView = ref)}
                ListEmptyComponent={this._listEmptyComponent}
                list={this.state.list}
                renderRefresh={() => this._get(false)}
                itemView={this._renderItem}
            />
        </View>
    }

    /**空数据时候展示*/
    _listEmptyComponent = () => {
        return (
            <View
                style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text style={{color: "#999", fontSize: 15, marginTop: 50}}>
                    暂无数据
                </Text>
            </View>
        );
    };
    /**item view */
    _renderItem = item => {
        return (
            <Button onPress={() => {
                Actions.message();
            }}>
                <View style={{width: size.width, padding: 10, flexDirection: 'row'}}>
                    <Image style={{width: 44, height: 44}} source={item.img}/>
                    <View style={{height: 44, flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                        <Text style={{color: '#333', fontSize: 15,fontWeight:'bold'}}>{item.title}</Text>
                        <Text style={{color: '#888', fontSize: 12, marginTop: 5}} numberOfLines={1}>{item.text}</Text>
                    </View>
                </View>
                <View style={{width: size.width, height: 1, backgroundColor: '#eee'}}/>
            </Button>
        );
    };

    /**头部请求*/
    _get(isShow) {
        setTimeout(() => {
            this.listView.setRefreshing(false);
        }, 1000);
    }

    /**即将挂载-处理参数*/
    componentWillMount() {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    }
});
