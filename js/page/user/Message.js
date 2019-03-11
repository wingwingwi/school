import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity,
    ImageBackground,
    NativeModules
} from "react-native"; //基本架构

import {Actions} from "react-native-router-flux"; //路由
import {showMsg} from "../../utils/Util"; //工具类
import Theme from "../../constant/Theme"; //属性，颜色，字体大小
import ListView from "../../component/BListView"; //
import Button from "../../component/Button";
import NarBar from "../../component/Narbar";

/**
 * @class Message 消息中心
 */
export default class Message extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {isRefreshing: false, list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}; //定义属性
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"消息中心"} onSelect={() => Actions.pop()}/>
                <ListView
                    ref={ref => (this.listView = ref)}
                    ListEmptyComponent={this._listEmptyComponent}
                    list={this.state.list}
                    renderRefresh={() => this._get(false)}
                    itemView={this._renderItem}
                />
            </View>
        );
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
            <Button
                item={item}
                onPress={() => {
                }}
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    marginLeft: 10,
                    marginRight: 10,
                    padding: 10,
                    marginTop: item.index == 0 ? 10 : 0,
                    marginBottom: 10,
                    width: null,
                    elevation: 3,
                    shadowColor: '#333',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.18,
                    shadowRadius: 5,
                }}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: 4, height: 4, borderRadius: 2, backgroundColor: '#479BFA'}}/>
                    <Text style={{color: '#0099FF', fontSize: 15, flex: 1, marginLeft: 5}}>尚未认证</Text>
                    <Text style={{color: '#888', fontSize: 10}}>2019/02/22 16:20</Text>
                </View>
                <Text style={{color: '#333', fontSize: 12, marginTop: 5, lineHeight: 20}} multiline={true}>您尚未认证学生信息，为了不影响您继续使用，请尽快前去“我的-认证学生”认证。</Text>
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
