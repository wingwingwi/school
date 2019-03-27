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
import {size, showMsg, isIos, isNotEmpty} from "../utils/Util";

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
                        }}>清除</Text>
                    <Text
                        style={{padding: 10, paddingRight: 15, color: "#0099FF", fontSize: 15}}
                        onPress={() => this.sure()}>确认</Text>
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
                onPress={() => this.changeList(index)}>
                <Text style={{paddingTop: 5, paddingBottom: 5, fontSize: 13, color: item.isC ? '#fff' : '#888'}}
                      numberOfLines={1}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    changeList(index) {
        var list = this.state.list;
        list[index].isC = !list[index].isC;
        // if (!isNotEmpty(list[index].id) && list[index].isC) {//清空其他
        //     for (var i = 0; i < list.length; i++) {
        //         if (index != i)
        //             list[i].isC = false
        //     }
        // } else {
        //     for (var i = 0; i < list.length; i++) {
        //         if (!isNotEmpty(list[index].id))
        //             list[i].isC = false
        //     }
        // }
        this.setState({list: list})
    }

    sure() {
        var name = ''
        var id = ''
        var isHasOther = false
        var list = this.state.list
        for (var i = 0; i < list.length; i++) {
            if (list[i].isC) {
                if (!isNotEmpty(list[i].id)) {
                    isHasOther = true
                } else {
                    name = !isNotEmpty(name) ? list[i].name : `${name},${list[i].name}`
                    id = !isNotEmpty(id) ? list[i].id : `${id},${list[i].id}`
                }
            }
        }
        console.log('name=' + name)
        console.log('id=' + id)
        if (isNotEmpty(name)) {
            this.props.closeModal({name: name, id: id, isHasOther: isHasOther})
        }else if(isHasOther){
            this.props.closeModal({name: '', id: '', isHasOther: isHasOther})
        } else showMsg('请选择')
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
            if (isNotEmpty(list[list.length - 1].id))
                list.push({name: '其他', id: ''})
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
