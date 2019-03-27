/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {Platform, StyleSheet, Text, View, BackHandler} from 'react-native';
import {
    Scene, Router, Actions, Reducer, Overlay, Tabs, Modal,
    Drawer, Stack, Lightbox,
} from 'react-native-router-flux';
import {getValue} from './js/utils/FileUtil'
import Main from "./js/page/Main";
import Mine from "./js/page/Mine";
import Other from "./js/page/Other";
import More from "./js/page/More";
import TabIcon from "./js/component/TabIcon";
import Login from './js/page/user/Login';
import Test from './js/page/other/Test';
import Message from './js/page/user/Message';
import Log from './js/utils/Log';
import Util, {isNotEmpty} from './js/utils/Util';
import {Provider} from '@ant-design/react-native';
import Register from "./js/page/user/Register";
import SetPwd from "./js/page/user/SetPwd";
import AmendPwd from "./js/page/user/AmendPwd";
import Attestation from "./js/page/user/Attestation";
import Feedback from "./js/page/user/Feedback";
import UserInfo from "./js/page/user/UserInfo";
import AboutUs from "./js/page/user/AboutUs";
import Leave from "./js/page/work/Leave";
import Health from "./js/page/work/Health";
import Record from "./js/page/work/Record";
import WebPage from "./js/page/work/WebPage";
import ResumeStudy from "./js/page/work/ResumeStudy";
import InputPage from "./js/page/user/InputPage";
import {_token} from "./js/constant/Constants";
import {postCache} from "./js/utils/Resquest";
import TechPage from "./js/page/tech/TechPage";
import StudentList from "./js/page/tech/StudentList";
import LeaveInfo from "./js/page/tech/LeaveInfo";
import SendMsg from "./js/page/tech/SendMsg";
import Welcome from "./js/page/Welcome";
import ImageList from "./js/page/work/ImageList";
import RecordList from "./js/page/work/RecordList";
import LeaveList from "./js/page/work/LeaveList"; 
import AttestationPage from "./js/page/user/AttestationPage";

const prefix = Platform.OS === 'android' ? 'coustom://coustom/' : 'coustom://';//外部应用打开使用到的链接；

type Props = {};

export default class App extends Component<Props> {
    render() {
        return (<Provider><Router createReducer={reducerCreate}//初始化
                                  getSceneStyle={getSceneStyle}//适用于所有场景的Style（可选）
                                  backAndroidHandler={onBackPress}//android 返回使用到的函数
                                  uriPrefix={prefix}>
            <Overlay key="overlay">
                <Modal key="modal" hideNavBar>
                    <Scene key='root' title='' panHandlers={null} hideNavBar={true} initial={true}>
                        <Scene key='welcome' component={Welcome} title='' hideNavBar={true}/>
                    </Scene>
                    <Scene tabBarPosition="bottom" key="root1" hideNavBar initial={false}>
                        <Tabs key="tabbar" swipeEnabled={true} showLabel={false}
                              tabBarStyle={[styles.tabBarStyle, {backgroundColor: '#fff'}]}>
                            <Scene key="main" component={Main} title="首页" hideNavBar icon={TabIcon}/>
                            <Scene key="other" component={Other} title="消息" hideNavBar icon={TabIcon}/>
                            <Scene key="more" component={More} title="资讯" hideNavBar icon={TabIcon}/>
                            <Scene key="mine" component={Mine} title="我的" hideNavBar icon={TabIcon}/>
                        </Tabs>
                        <Scene key="aboutUs" component={AboutUs} hideNavBar={true}/>
                        <Scene key="amendPwd" component={AmendPwd} hideNavBar={true}/>
                        <Scene key="attestation" component={Attestation} hideNavBar={true}/>
                        <Scene key="feedback" component={Feedback} hideNavBar={true}/>
                        <Scene key="userInfo" component={UserInfo} hideNavBar={true}/>
                        <Scene key="message" component={Message} title="消息中心" hideNavBar={true}/>
                        <Scene key="leave" component={Leave} hideNavBar={true}/>
                        <Scene key="health" component={Health} hideNavBar={true}/>
                        <Scene key="record" component={Record} hideNavBar={true}/>
                        <Scene key="recordList" component={RecordList} hideNavBar={true}/>
                        <Scene key="leaveList" component={LeaveList} hideNavBar={true}/>
                        <Scene key="resumeStudy" component={ResumeStudy} hideNavBar={true}/>
                        <Scene key="webPage" component={WebPage} hideNavBar={true}/>
                        <Scene key="inputPage" component={InputPage} hideNavBar={true}/>
                        <Scene key="test" component={Test} title="测试中心" hideNavBar={false}/>
                    </Scene>
                    <Scene key='techPage' title='' hideNavBar={true}>
                        <Scene key='tech' component={TechPage} title='' hideNavBar={true}/>
                        <Scene key='studentList' component={StudentList} title='' hideNavBar={true}/>
                        <Scene key='leaveInfo' component={LeaveInfo} title='' hideNavBar={true}/>
                        <Scene key='sendMsg' component={SendMsg} title='' hideNavBar={true}/>
                        <Scene key='imageList' component={ImageList} title='' hideNavBar={true}/>
                    </Scene>
                    <Scene key='loginPage' title='' hideNavBar={true}>
                        <Scene key="login" component={Login} title="登录" hideNavBar={true}/>
                        <Scene key="register" component={Register} title="登录" hideNavBar={true}/>
                        <Scene key="setPwd" component={SetPwd} title="登录" hideNavBar={true}/>
                    </Scene>
                    <Scene key="attestations" component={AttestationPage} title="认证" hideNavBar={true}/>
                </Modal>
            </Overlay>
        </Router></Provider>);
    }

    componentWillMount() {
        getValue('tokenData', (data) => {
            setTimeout(() => {
                if (isNotEmpty(data) && data != '{}') {
                    console.log(data)
                    let tokens = JSON.parse(data)
                    if (isNotEmpty(tokens.token)) {
                        _token.t = tokens.token;
                        _token.isPerfect = tokens.isPerfect
                        _token.bySource = tokens.bySource
                        if (tokens.bySource == 2) {
                            Actions.reset('techPage')
                        } else Actions.reset('root1')
                    } else
                        Actions.reset('loginPage')
                } else {
                    Actions.reset('loginPage')
                }
            }, __DEV__ ? 1000 : 3000)
        });
    }

    componentDidMount() {
    }

    /**卸载*/
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.setState = (state, callback) => {
            return;
        };
    }

    /**动画效果*/
    ainm = () => ({
        transitionSpec: {
            duration: 500,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const {layout, position, scene} = sceneProps;
            const {index} = scene;
            const Width = layout.initWidth;
            //沿X轴平移
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [Width, 0, -(Width - 10)],
            });
            //透明度
            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });
            return {opacity, transform: [{translateX}]};
        }
    });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};
/**适用于所有场景的Style（可选）*/
const getSceneStyle = () => ({
    backgroundColor: '#f5f5f5',
    shadowOpacity: 1,
    shadowRadius: 3,
});

var lastBackPressed;//记录时间,Android返回时候使用
const onBackPress = () => {//返回监听，用于Android端物理返回健使用
    var index = Actions.state.routes[0].routes[0].index;
    Log.m(Actions.state.routes);
    if (index > 0) {//正常返回
    } else {
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
            BackHandler.exitApp();
            return false
        }
        lastBackPressed = Date.now();
        Util.showMsg('再次点击退出应用');
        return true;
    }
    Actions.pop();
    return true;
}