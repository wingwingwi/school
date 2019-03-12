import React, {Component} from "react";
import {
    View,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Dimensions,
    Modal,
    FlatList,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import {size, showMsg, isIos} from "../utils/Util";

export default class ChooseIModel extends Component {
    /**定义基本的数据类型，props，*/
    static propTypes = {
        closeModal: PropTypes.func, //关闭对话框监听方法
        show: PropTypes.bool,
        list: PropTypes.array
    };

    /**初始化数据*/
    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
            list: this.props.list
        };
        this.key = 1000;
    }

    /**主布局*/
    renderDialog() {
        return (
            <View style={{width: size.width}}>
                <View
                    style={{
                        width: null,
                        backgroundColor: "#fff",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text
                        style={{padding: 10, paddingLeft: 15, fontSize: 15, color: "#333"}}
                        onPress={() => {
                            var list = this.state.list;
                            list.map((item) => {
                                item.isC = false
                            })
                            this.setState({list: list});
                        }}
                    >
                        清除
                    </Text>
                    <Text
                        style={{padding: 10, paddingRight: 15, color: "#0099FF", fontSize: 15}}
                        onPress={() => this.closeModal()}
                    >
                        确认
                    </Text>
                </View>
                <View style={{width: null, height: 1, backgroundColor: "#eee"}}/>
                <View
                    style={{
                        width: size.width,
                        backgroundColor: "#fff",
                        maxHeight: 250,
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}
                >
                    {this._getViewList()}
                </View>
                <View style={{height: 30, backgroundColor: '#fff', width: null}}/>
            </View>
        );
    }

    /**获取列表*/
    _getViewList() {
        var view = [];
        if (this.state.list == undefined) {
            return;
        }
        this.state.list.map((item, idx) => {
            const index = idx;
            view.push(this.viewItem(item, index));
        });
        return view;
    }

    /**item 数据*/
    viewItem(item, index) {
        return (
            <TouchableOpacity
                style={{
                    width: (size.width - 45) / 3,
                    margin: 10,
                    marginTop: index > 2 ? 0 : 10,
                    marginLeft: index % 3 == 0 ? 10 : 0,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    borderWidth: 1,
                    backgroundColor: !item.isC ? "#fff" : '#0099FF',
                    borderColor: !item.isC ? "#eee" : '#0099FF'
                }}
                key={this.key++}
                onPress={() => {
                    var list = this.state.list;
                    list[index].isC = !list[index].isC;
                    this.setState({list: list});
                }}
            >
                <Text style={{padding: 8, fontSize: 13, color: item.isC ? '#fff' : '#888'}}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    /**配置布局*/
    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.isVisible}
                animationType={"fade"}
                onRequestClose={() => this.closeModal()}
            >
                <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                    <View
                        style={{
                            flex: 1,
                            width: size.width,
                            justifyContent: "flex-end",
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                    >
                        <TouchableWithoutFeedback>
                            {this.renderDialog()}
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    onChange = value => {
        console.log(value);
        this.setState({value});
    };

    /**关闭弹框*/
    closeModal() {
        if (this.state.isVisible) {
            this.props.closeModal();
        }
    }

    /**跟新状态*/
    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            var list = nextProps.list;
            if (list != undefined && list.length > 0) {
                this.setState({isVisible: nextProps.show, list: list});
            } else this.setState({isVisible: nextProps.show});
        } else {
            this.setState({isVisible: false});
        }
    }

    /**传入有效数据*/
    sureModal(isOk) {
        this.props.closeModal(isOk);
    }
}
