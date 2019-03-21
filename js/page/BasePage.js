import React, {Component} from 'react';
import {showMsg} from "../utils/Util";

export default class BasePage extends Component<Props> {
    constructor(props, context) {
        super(props, context);
        this.timeout = undefined;
        this.interval = undefined;
        this.loadKey = undefined;
    }

    /**即将挂载-处理参数*/
    componentWillMount() {
        this.pageState = true;
    }

    componentDidMount() {

    }

    /**卸载*/
    componentWillUnmount() {
        this.pageState = false;
        this.timeout && clearTimeout(this.timeout)
        this.loadKey && showMsg('', this.loadKey)
        this.interval && clearTimeout(this.interval)
        this.setState = (state, callback) => {
            return;
        };
    }

}
