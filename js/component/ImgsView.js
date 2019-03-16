import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View, ActivityIndicator, Text, Image, TouchableOpacity
} from 'react-native';
import {size, isIos, showMsg} from '../utils/Util'
import src from '../constant/Src'
import Button from "./Button";
import ImagePicker from 'react-native-image-picker';

var options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    customButtons: [
        {name: 'fb', title: '相册选择图片'},
    ],
    maxWidth: 600,
    maxHeight: 600,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

// noinspection JSAnnotator
export default class ImgsView extends Component<Props> {
    /**初始化数据*/
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
        this.key = 1;
    }

    render() {
        return <View style={[{
            flexDirection: 'row',
            paddingLeft: 10,
            flexWrap: 'wrap',
            paddingBottom: 10,
            backgroundColor: '#fff'
        }, this.props.style]}>
            {this._viewImg()}
        </View>
    }

    /**图片信息*/
    _viewImg() {
        var w = (size.width - 60) / 5;
        var view = <TouchableOpacity onPress={() => {
            this._choose()
        }} key={this.key++} style={{marginLeft: this.state.arr.length == 0 ? 0 : 10, marginTop: 10}}>
            <Image source={src.shangchuan_btn}
                   style={{width: w, height: w}}/>
        </TouchableOpacity>;
        var views = [];
        if (this.state.arr.length > 0) {
            this.state.arr.map((item, idx) => {
                let index = idx
                views.push(<View key={this.key++}
                                 style={{
                                     marginLeft: idx == 0 ? 0 : 10,
                                     marginTop: 10,
                                     width: w,
                                     height: w
                                 }}>
                    <Image source={item.img}
                           style={{width: w - 5, marginTop: 5, height: w - 5}}/>
                    <Button style={{position: 'absolute', right: 0}} onPress={() => {
                        var list = this.state.arr;
                        list.splice(index, 1)
                        this.setState({arr: list})
                    }}>
                        <Image source={src.shanchu_btn}
                               style={{width: 14, height: 14}}/>
                    </Button>
                </View>)
            });
        }
        if (this.state.arr.length < 5)
            views.push(view);
        return views;
    }

    _choose() {
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                showMsg('请开启拍照权限');
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};
                var arr = this.state.arr;
                arr.push({img: source});
                this.setState({arr: arr});
            }
        });
    }

    getPic() {
        return this.state.arr;
    }

    setPic(list) {
        this.setState({arr: list})
    }
}