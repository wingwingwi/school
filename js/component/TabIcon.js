import React from 'react';
import PropTypes from 'prop-types';
import {
    Text, View, Image, StyleSheet
} from 'react-native';
import Src from '../constant/Src'

const propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string,
    focused: PropTypes.bool,
};

const TabIcon = (props) => {
    return <View style={styles.container}>
        <Image source={image(props)} style={styles.icon}></Image>
        <Text style={{color: props.focused ? '#0099FF' : '#333', fontSize: 11}}
        >{props.title}
        </Text>
    </View>
};

/**图片选择*/
const image = (props) => {
    if (props.title == '首页') {
        return props.focused ? Src.tab_down1 : Src.tab_up1;
    } else if (props.title == '消息') {
        return props.focused ? Src.tab_down2 : Src.tab_up2;
    } else if (props.title == '咨询') {
        return props.focused ? Src.tab_down3 : Src.tab_up3;
    } else if (props.title == '我的') {
        return props.focused ? Src.tab_down4 : Src.tab_up4;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    icon: {
        width: 25,
        resizeMode: 'stretch',
        marginBottom: 5,
        height: 25,
    }
});

TabIcon.propTypes = propTypes;

export default TabIcon;