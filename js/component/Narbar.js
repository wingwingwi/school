import React, {Component} from "react";
import PropTypes from "prop-types";
import {
    View,
    NativeModules,
    StyleSheet,
    Text,
    ViewPropTypes,
    Image,
    TouchableOpacity,
    StatusBar
} from "react-native";
import {size, isIos, showMsg} from "../utils/Util";
import Src from "../constant/Src";
import Theme from "../constant/Theme";

const {StatusBarManager} = NativeModules;

/**自定义页面头布局，用来显示标题和返回坐标*/
export default class NarBar extends Component<Props> {
    /**定义基本的数据类型，props，*/
    static propTypes = {
        //标记字体
        leftText: PropTypes.string,
        title: PropTypes.string,
        rightText: PropTypes.string,
        backgroundColor: PropTypes.string,
        //点击关联函数
        onText: PropTypes.func,
        onSelect: PropTypes.func,
        onRight: PropTypes.func,
        isHasNotState: PropTypes.bool,
        titleImg: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.state = {
            barHeight: isIos ? !this.props.isHasNotState ? 75 : 45 : 0 + 45,
            barTop: isIos ? !this.props.isHasNotState ? 25 : 0 : 0
        };
    }

    render() {
        return (
            <View style={[styles.bar_height, {height: this.state.barHeight}]}>
                <View style={[styles.bar_title, {marginTop: this.state.barTop}]}>
                    {this._getLeft()}
                    {this._getCenter()}
                    {this._getRight()}
                </View>
            </View>
        );
    }

    /**即将挂载-处理参数*/
    componentWillMount() {
        if (isIos && !this.props.isHasNotState) {
            StatusBarManager.getHeight(res => {
                this.setState({barHeight: res.height + 45, barTop: res.height});
            });
        }
    }

    /**左边显示控件*/
    _getLeft() {
        var w = 50; //左边控件的宽度
        if (this.props.leftImg) {
            return (
                <TouchableOpacity onPress={this.props.onSelect}>
                    <Image
                        source={this.props.leftImg}
                        style={{
                            width: 30,
                            height: 30,
                            marginLeft: 8,
                            resizeMode: "contain"
                        }}
                    />
                </TouchableOpacity>
            );
        }
        if (this.props.onSelect == undefined) {
            return <Text style={{width: w}}> </Text>;
        }
        if (this.props.leftText) {
            return (
                <TouchableOpacity onPress={this.props.onSelect}>
                    <View
                        style={{width: w, justifyContent: "center", alignItems: "center"}}
                    >
                        <Text style={{color: "#fff", fontSize: 15}}>
                            {this.props.leftText}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.onSelect();
                }}
            >
                <View
                    style={{width: w, justifyContent: "center", alignItems: "center"}}
                >
                    <Image
                        source={Src.backImg}
                        style={{width: 20, height: 20, resizeMode: "contain"}}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    /**title使用UI*/
    _getCenter() {
        //type 默认是显示title
        if (this.props.titleImg != undefined) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"
                    }}
                >
                    <Image
                        style={{width: 140, height: 19, marginRight: 0}}
                        source={this.props.titleImg}
                    />
                    {/*<Text style={{*/}
                    {/*color: color.color_grey_1,*/}
                    {/*fontSize: tv_size.dp36*/}
                    {/*}}>{this.props.title}</Text>*/}
                </View>
            );
        } else {
            return (
                <Text style={[styles.bar_text, {color: "#333", fontWeight: "bold"}]}numberOfLines={1}>
                    {this.props.title}
                </Text>
            );
        }
    }

    /**右边使用UI*/
    _getRight() {
        var w = 50;
        if (this.props.rightText) {
            return (
                <TouchableOpacity onPress={this.props.onRight}>
                    <View
                        style={{
                            width: w,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <View style={{flexDirection: "row", alignItems: "flex-end"}}>
                            <Text style={{color: "#333", fontSize: 15}}>
                                {this.props.rightText}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        } else if (this.props.rightImg) {
            //右边使用的图片
            return (
                <TouchableOpacity onPress={this.props.onRight}>
                    <View
                        style={{width: w, justifyContent: "center", alignItems: "center"}}
                    >
                        <Image
                            style={{width: 30, height: 30}}
                            source={this.props.rightImg}
                            resizeMode={"center"}
                        />
                    </View>
                </TouchableOpacity>
            );
        } else {
            return <Text style={{width: 50}}> </Text>;
        }
    }
}
const styles = StyleSheet.create({
    bar_height: {
        backgroundColor: "#fff"
    },
    bar_title: {
        height: 44.5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bar_text: {
        color: "#333",
        fontSize: 18,
        flex: 1,
        textAlign: "center"
    }
});
