'use strict'

import React from 'react';
import {
    TouchableHighlight,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Src from '../constant/Src'
import {isNotEmpty} from "../utils/Util";

export default class NextView {
    static getSettingItem(callBack, text) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View style={[styles.setting_item_container]}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={{color: '#666', fontSize: 14, marginLeft: 5}}>{text}</Text>
                    </View>
                    <Image source={Src.gengduo_btn}
                           style={[{
                               marginRight: 5,
                               height: 12,
                               width: 12,
                               alignSelf: 'center',
                               opacity: 1
                           }]}/>
                </View>
            </TouchableHighlight>
        )
    }

    static getSettingItemT(callBack, text, rightText, isLine, isNext) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View>
                    <View style={[styles.setting_item_container]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text
                                style={{color: '#333', fontSize: 15, marginLeft: 5}}>{text}</Text>
                        </View>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#999', fontSize: 14}}>{rightText}</Text>
                            {isNext ? <Image source={Src.next}
                                             style={{
                                                 marginRight: 5,
                                                 marginLeft: 5,
                                                 height: 12,
                                                 width: 12
                                             }}/> : null}</View>

                    </View>
                    {isLine ? <View style={{width: null, height: 1, backgroundColor: '#999'}}/> : null}
                </View>
            </TouchableHighlight>
        )
    }

    static getSettingImgItem(callBack, text, img) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View style={[styles.setting_item_container]}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Image source={img}
                               style={{width: 30, height: 30}}/>
                        <Text style={{color: '#6B7275', fontSize: 12, marginLeft: 5}}>{text}</Text>
                    </View>
                    <Image source={Src.gengduo_btn}
                           style={[{
                               marginRight: 5,
                               height: 12,
                               width: 12,
                               alignSelf: 'center',
                               opacity: 1
                           }]}/>
                </View>
            </TouchableHighlight>
        )
    }

    static getSettingImgItemL(callBack, text, img, rightText, isLine, isNext) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View>
                    <View style={[styles.setting_item_container]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            {img ? <Image source={img}
                                          style={{width: 20, height: 20}}/> : null}
                            <Text
                                style={{color: '#333', fontSize: 15, marginLeft: 5}}>{text}</Text>
                        </View>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#999', fontSize: 14}}>{rightText}</Text>
                            {isNext ? <Image source={Src.gengduo_btn}
                                             style={{
                                                 marginRight: 5,
                                                 marginLeft: 5,
                                                 height: 12,
                                                 width: 12
                                             }}/> : null}</View>

                    </View>
                    {isLine ? <View style={{width: null, height: 1, backgroundColor: '#eee'}}/> : null}
                </View>
            </TouchableHighlight>
        )
    }

    static getSettingImgItemS(callBack, text, rightText, isLine, isNext, defultValue) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View>
                    <View style={[styles.setting_item_container]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            {/*{img ? <Image source={img}*/}
                            {/*style={{width: 25, height: 25}}/> : null}*/}
                            <Text
                                style={{color: '#333', fontSize: 15, marginLeft: 5}}>{text}</Text>
                        </View>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{
                                color: isNotEmpty(rightText) ? '#333' : '#999',
                                fontSize: 14
                            }}>{isNotEmpty(rightText) ? rightText : defultValue}</Text>
                            {isNext ? <Image source={Src.gengduo_btn}
                                             style={{
                                                 marginRight: 5,
                                                 marginLeft: 5,
                                                 height: 12,
                                                 width: 12
                                             }}/> : null}</View>

                    </View>
                    {isLine ? <View style={{width: null, height: 1, backgroundColor: '#eee'}}/> : null}
                </View>
            </TouchableHighlight>
        )
    }
    static getSettingImgItemTech(callBack, text, rightText, isLine, isNext, defultValue) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View>
                    <View style={[styles.setting_item_container]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            {/*{img ? <Image source={img}*/}
                            {/*style={{width: 25, height: 25}}/> : null}*/}
                            <Text
                                style={{color: '#888', fontSize: 15, marginLeft: 5}}>{text}</Text>
                        </View>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{
                                color: isNotEmpty(rightText) ? '#333' : '#999',
                                fontSize: 14
                            }}>{isNotEmpty(rightText) ? rightText : defultValue}</Text>
                            {isNext ? <Image source={Src.gengduo_btn}
                                             style={{
                                                 marginRight: 5,
                                                 marginLeft: 5,
                                                 height: 12,
                                                 width: 12
                                             }}/> : null}</View>

                    </View>
                    {isLine ? <View style={{width: null, height: 1, backgroundColor: '#eee'}}/> : null}
                </View>
            </TouchableHighlight>
        )
    }

    static getSettingImgItemBig(callBack, img, rightText, isLine, isNext) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View>
                    <View style={[styles.setting_item_container, {height: 80}]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            {img ? <Image source={img}
                                          style={{width: 60, height: 60, borderRadius: 30}}/> : null}
                        </View>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#999', fontSize: 14}}>{rightText}</Text>
                            {isNext ? <Image source={Src.gengduo_btn}
                                             style={{
                                                 marginRight: 5,
                                                 marginLeft: 5,
                                                 height: 12,
                                                 width: 12
                                             }}/> : null}</View>

                    </View>
                    {isLine ? <View style={{width: null, height: 1, backgroundColor: '#eee'}}/> : null}
                </View>
            </TouchableHighlight>
        )
    }

}

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})
