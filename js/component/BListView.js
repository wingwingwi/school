import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';

export default class BListView extends React.Component {
    static propTypes = {
        itemView: PropTypes.any,//添加数据view
        renderRefresh: PropTypes.func,//是否添加下拉刷新
        list: PropTypes.array,//传入数组
    }

    /**初始化数据*/
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
        this.pageNum = 1;
    }

    componentDidMount() {
    }

    render() {
        return <FlatList
            style={this.props.style}
            data={this.props.list}
            onScroll={this.props.onScroll}
            ListHeaderComponent={this.props.ListHeaderComponent}
            refreshing={this.props.renderRefresh != undefined ? this.state.refreshing : undefined}
            onRefresh={this.props.renderRefresh != undefined ? this._renderRefresh : undefined}
            ListEmptyComponent={this.props.ListEmptyComponent}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
        />
    }

    /**获取页码*/
    getPageNum() {
        return this.pageNum;
    }

    /**设置页码*/
    setPageNum(pageNum) {
        this.pageNum = pageNum;
    }

    /**下拉刷新*/
    _renderRefresh = () => {
        this.setState({refreshing: true})//开始刷新
        setTimeout(()=>{
            this.props.renderRefresh();//处理刷新信息
        },500);

    };

    /**设置当前的属性*/
    setRefreshing(isRefresh) {
        this.setState({refreshing: isRefresh != undefined && isRefresh});
    }

    /**item-view*/
    _renderItem = ({item}) => {
        return this.props.itemView(item);
    };

    /**给数组添加下标，一般使用下标时候添加*/
    _keyExtractor = (item, index) => (item.index = index.toString());
}