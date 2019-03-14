import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Dimensions,
    Modal, FlatList,
    Text,
    Image, ScrollView,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import {size, showMsg, isIos} from '../utils/Util';


export default class BottomCModel extends Component {
    /**定义基本的数据类型，props，*/
    static propTypes = {
        closeModal: PropTypes.func,//关闭对话框监听方法
        show: PropTypes.bool,
        list: PropTypes.array,
    }

    /**初始化数据*/
    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
            list: this.props.list,
        }
        this.key = 1000;
    }

    /**主布局*/
    renderDialog() {
        return <View style={{width: size.width - 20, marginLeft: 10}}>
            <View style={{width: null, backgroundColor: '#fff', maxHeight: 250, borderRadius: 5}}>
                <ScrollView style={{width: null}}>
                    {this._getViewList()}
                </ScrollView>
            </View>
            <View style={{
                width: null, backgroundColor: '#fff', marginBottom: 15, marginTop: 10,
                alignItems: 'center', justifyContent: 'center', borderRadius: 5
            }}>
                <TouchableOpacity style={{
                    width: null, backgroundColor: '#fff',
                    alignItems: 'center', justifyContent: 'center', borderRadius: 5
                }} onPress={() => {
                    this.closeModal();
                }}>
                    <Text style={{padding: 15}}>取消</Text>
                </TouchableOpacity>

            </View>

        </View>
    }

    /**获取列表*/
    _getViewList() {
        var view = [];
        if (this.state.list == undefined) {
            return;
        }
        this.state.list.map((item, idx) => {
            view.push(this.viewItem(item, idx));
        });
        return view;
    }

    /**item 数据*/
    viewItem(item, idx) {
        return <View style={{width: null}} key={this.key++}><TouchableOpacity style={{
            width: null,
            alignItems: 'center', justifyContent: 'center'
        }} onPress={() => {
            this.props.closeModal(item)
        }}>
            <Text style={{padding: 15}}>{item.name}</Text>
        </TouchableOpacity>
            {idx != this.state.list.length ? <View style={{width: null, height: 1, backgroundColor: '#eee'}}/> : null}
        </View>
    }


    /**配置布局*/
    render() {
        return (<Modal
            transparent={true}
            visible={this.state.isVisible}
            animationType={'fade'}
            onRequestClose={() => this.closeModal()}>
            <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                <View style={{
                    flex: 1,
                    width: size.width,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <TouchableWithoutFeedback>
                        {this.renderDialog()}
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>);
    }

    onChange = (value) => {
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
            } else
                this.setState({isVisible: nextProps.show});
        } else {
            this.setState({isVisible: false});
        }
    }

    /**传入有效数据*/
    sureModal(isOk) {
        this.props.closeModal(isOk);
    }



}


