import React, {Component} from "react";
import {Image, Modal, Text, TouchableWithoutFeedback, View} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from "prop-types";
import Button from "../component/Button";
import {isIos, isNotEmpty, size} from "../utils/Util";
import {Icon} from '@ant-design/react-native';
import TextBar from "../component/TextBar";
import BListView from "../component/BListView";
import {postCache} from "../utils/Resquest";
import {URL_QUERY_AREA, URL_QUERY_SCHOOL} from "../constant/Url";

const tabTest = ["省", "市", "区", "街道"]
export default class ChooseAreaModel extends Component {
    static propTypes = {
        show: PropTypes.bool, closeModal: PropTypes.func
    };

    /**初始化数据*/
    constructor(props) {
        super(props);
        this.state = {isVisible: false, tab: 0, list: []};

    }

    /**主布局部分*/
    renderDialog() {
        return <View style={{width: size.width, height: size.width, backgroundColor: '#fff'}}>
            <View style={{
                width: null,
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    padding: 10,
                    paddingLeft: 15,
                    fontSize: 15,
                    color: "#333"
                }} onPress={() => this.closeModal()}>取消</Text>
                <Text style={{
                    padding: 10,
                    paddingRight: 15,
                    color: "#0099FF",
                    fontSize: 15
                }} onPress={() => {
                    this.props.closeModal({
                        areaId: this.area ? this.area.val : undefined,
                        cityId: this.city ? this.city.val : undefined,
                        streetId: this.street ? this.street.val : undefined
                    })
                }}>确认</Text>
            </View>
            <View style={{width: null, height: 1, backgroundColor: "#eee"}}/>
            <TextBar list={tabTest} changeTab={(tab) => this.changeTab(tab)}
                     ref={ref => this.textbar = ref}/>
            <BListView ref={ref => this.listView = ref}
                       list={this.state.list}
                       itemView={this._renderItem}/>
        </View>
    }

    changeTab(tab) {
        if (tab == 0) {
            if (this.provinces) this.setState({list: this.provinces})
        } else if (tab == 1) {
            if (this.citys) this.setState({list: this.citys})
        } else if (tab == 2) {
            if (this.areas) this.setState({list: this.areas})
        } else if (tab == 3) {
            if (this.streets) this.setState({list: this.streets})
        }
    }

    request(id, level) {
        postCache(URL_QUERY_AREA, {id: id, level: level}, data => {
            if (level == 1) {
                this.provinces = data;
            } else if (level == 2) {
                this.citys = data;
            } else if (level == 3) {
                this.areas = data;
            } else if (level == 4) {
                this.streets = data;
            }
            var tab = this.textbar ? this.textbar.tab() : 0
            this.setState({list: tab == 0 ? this.provinces : tab == 1 ? this.citys : tab == 2 ? this.areas : this.streets})
        })
    }

    querySchool(isShow) {
        postCache(URL_QUERY_SCHOOL, undefined, (data) => {
            this.school = data;
        })
    }

    _renderItem = item => {
        const tab = this.textbar ? this.textbar.tab() : 0;
        var isChoose = tab == 0 ? (this.province && this.province.val == item.val) : tab == 1 ? (this.city && this.city.val == item.val) :
            tab == 2 ? (this.area && this.area.val == item.val) : (this.street && this.street.val == item.val);
        return <Text style={{padding: 10, paddingLeft: 20, color: isChoose ? "#0099FF" : '#999'}}
                     onPress={() => this.click(this.textbar ? this.textbar.tab() : 0, item)}>{item.name}</Text>
    }

    click(tab, item) {
        if (tab == 0) {
            this.request(item.val, tab + 2)
            this.province = item;
            this.city = undefined;
            this.area = undefined;
            this.street = undefined;
        } else if (tab == 1) {
            this.request(item.val, tab + 2)
            this.city = item;
            this.area = undefined;
            this.street = undefined;
        } else if (tab == 2) {
            this.request(item.val, tab + 2)
            this.area = item;
            this.street = undefined;
        } else if (tab == 3) {
            this.street = item;
            this.textbar.tab(tab)
        }
        this.textbar.setList([this.getTabName(this.province, tabTest[0]), this.getTabName(this.city, tabTest[1]),
            this.getTabName(this.area, tabTest[2]), this.getTabName(this.street, tabTest[3])]);
        if (tab != 3) {
            this.setState({list: [], tab: (tab + 1)})//清空数据
            this.textbar.tab(tab + 1)
        }
    }

    getTabName(item, str) {
        if (item && isNotEmpty(item.name))
            return item.name
        return str
    }


    render() {
        return (<Modal visible={this.state.isVisible} transparent={true} animationType={"fade"}
                       onRequestClose={() => this.setState({isVisible: false})}>
            <View
                style={{flex: 1, width: size.width, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                <TouchableWithoutFeedback style={{flex: 1}} onPress={() => this.closeModal()}>
                    <View style={{flex: 1}}/>
                </TouchableWithoutFeedback>
                <View>{this.renderDialog()}</View>
            </View>
        </Modal>);
    }

    /**关闭弹框*/
    closeModal() {
        if (this.state.isVisible) this.props.closeModal();
    }

    /**跟新状态*/
    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.setState({isVisible: nextProps.show});
            this.textbar && this.textbar.tab(0);
            this.textbar && this.textbar.setList(tabTest);//清空数据
            if (this.provinces) this.setState({list: this.provinces})
            this.city = undefined;
            this.citys = [];
            this.area = undefined;
            this.areas = [];
            this.street = undefined;
            this.streets = [];
        } else this.setState({isVisible: false});
    }

    componentWillMount() {
        this.request("", 1);//获取学校
    }
}