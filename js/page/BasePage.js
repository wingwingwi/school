import React, {Component} from 'react';

export default class BasePage extends Component<Props> {
    constructor(props, context) {
        super(props, context);
        this.timeout = undefined;
        this.interval = undefined;
    }

    /**即将挂载-处理参数*/
    componentWillMount() {
        this.pageState = true;
    }

    /**卸载*/
    componentWillUnmount() {
        this.pageState = false;
        this.timeout && clearTimeout(this.timeout)
        this.interval && clearTimeout(this.interval)
        this.setState = (state, callback) => {
            return;
        };
    }

}
