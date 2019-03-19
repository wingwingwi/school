import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList, View, Text, StyleSheet, RefreshControl
} from 'react-native';

export default class BListView extends React.Component {
    static propTypes = {
        itemView: PropTypes.any,//添加数据view
        renderRefresh: PropTypes.func,//是否添加下拉刷新
        renderLoad: PropTypes.func,//是否添加上拉加载
        list: PropTypes.array,//传入数组
    }

    /**初始化数据*/
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false, isLoading: false, showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
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
            ListFooterComponent={this._renderFooter.bind(this)}
            refreshing={this.props.renderRefresh != undefined ? this.state.refreshing : undefined}
            onRefresh={this.props.renderRefresh != undefined ? this._renderRefresh : undefined}
            ListEmptyComponent={this.props.ListEmptyComponent}
            onEndReached={this._onEndReached.bind(this)}
            onEndReachedThreshold={1}
            removeClippedSubviews={false}
            renderItem={this._renderItem}
            refreshControl={<RefreshControl
                refreshing={this.props.renderRefresh != undefined ? this.state.refreshing : undefined}
                onRefresh={this.props.renderRefresh != undefined ? this._renderRefresh : undefined}
                title='刷新加载中...'
                titleColor='#666'
                colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                progressBackgroundColor='#ffffff'
            />}
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
        console.log('下拉刷新')
        this.setState({refreshing: true})//开始刷新
        setTimeout(() => {
            this.props.renderRefresh();//处理刷新信息
        }, 1000);

    };

    /**设置当前的属性*/
    setRefreshing(isRefresh) {
        this.setState({refreshing: isRefresh != undefined && isRefresh});
    }

    setLoading(isLoading) {
        this.setState({showFoot: isLoading ? 2 : 1});
    }

    setStopLoading() {
        this.setState({showFoot: 0});
    }


    /**item-view*/
    _renderItem = ({item}) => {
        return this.props.itemView(item);
    };

    /**如果是正在加载中或没有更多数据了，则返回*/
    _onEndReached() {
        if (this.state.showFoot != 0 && this.state.showFoot == 1) {
            return;
        }
        if (this.props.renderLoad)
            this.props.renderLoad()
    }

    /**底部数据相关*/
    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{height: 35, alignItems: 'center', justifyContent: 'center',}}>
                    <Text style={{color: '#666', fontSize: 12}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <Text style={{color: '#666', fontSize: 12}}>正在加载更多数据...</Text>
                </View>
            );
        } else if (this.state.showFoot === 0) {
            return null;
        }
    }

    /**给数组添加下标，一般使用下标时候添加*/
    _keyExtractor = (item, index) => (item.index = index.toString());

    /**卸载*/
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});