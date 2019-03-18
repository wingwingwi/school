import React, {Component} from "react";
import {Image, Modal} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from "prop-types";
import Button from "../component/Button";
import {isIos} from "../utils/Util";
import {Icon} from '@ant-design/react-native';

export default class ImagesModel extends Component {
    static propTypes = {
        show: PropTypes.bool,
        index: PropTypes.number,//第几个数字
        images: PropTypes.array
    };

    /**初始化数据*/
    constructor(props) {
        super(props);
        this.state = {isVisible: false, index: 0, images: []};
    }

    render() {
        return (<Modal visible={this.state.isVisible} transparent={true} animationType={"fade"}
                       onRequestClose={() => this.setState({isVisible: false})}>
            <ImageViewer imageUrls={this.state.images} enableImageZoom index={this.state.index}/>
            <Button style={{position: 'absolute', top: isIos ? 80 : 30, left: 15}} onPress={() => {
                this.setState({isVisible: false})
            }}><Icon name="close" size="lg" color="#ccc"/></Button>
        </Modal>);
    }

    /**跟新状态*/
    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            if (nextProps.images && nextProps.images.length > 0) {
                var list = []
                for (var i = 0; i < nextProps.images.length; i++) {
                    list.push({url: nextProps.images[i].fileUrl})
                }
                this.setState({
                    isVisible: nextProps.show,
                    index: nextProps.index ? nextProps.index : 0,
                    images: list
                });
            }
        } else {
            this.setState({isVisible: false});
        }
    }
}