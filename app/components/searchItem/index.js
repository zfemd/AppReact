'use strict';

import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    DeviceEventEmitter,
    Platform,
    ListView,
    Image,
    ActivityIndicator
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/toolbar/ImageButton.js';
import * as common from '../../utils/common';
import { connect } from 'react-redux';
var backImg = require('../../assets/upload/rg_left.png');
import Taobao from 'react-native-taobao-baichuan-api';
import { fetchItemSearchList } from '../../actions/search';

class SearchItem extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.search.itemList)
        };
    }

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        return (
            <TouchableOpacity underlayColor="transparent" activeOpacity={0.5}
                              onPress={() => this._jumpToTaobaoPage(rowData.itemId.toString())}>
                <View style={styles.itemRow}>
                    <Image style={styles.pic}
                           source={{uri: (rowData.itemPicUrl ? rowData.itemPicUrl : images.DEFAULT_PORTRAIT), width: 100, height: 100}}/>
                    <View style={styles.itemContent}>

                        <View>
                            <Text style={[styles.baseText,styles.title]}>
                                {rowData.itemTitle}
                            </Text>
                        </View>

                        <View style={styles.itemDigit}>
                            <View style={styles.itemDigitP}>
                                <Text style={[styles.baseText,styles.price]}>
                                    ￥{rowData.itemPrice}
                                </Text>
                            </View>
                            <View style={styles.itemDigitO}>
                                <Text style={[styles.baseText,styles.dimText]}>
                                    佣金：{rowData.tkCommFee}
                                </Text>
                                <Text style={[styles.baseText,styles.dimText]}>
                                    月销：{rowData.biz30day}
                                </Text>
                            </View>

                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _jumpToTaobaoPage(itemId) {
        Taobao.jump(itemId);
    }

    _onScroll(event) {
        let the = this;
        const { dispatch, search } = this.props;
        let maxOffset = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
        let offset = event.nativeEvent.contentOffset.y;
        let params = {};
        if (offset > 0
            && Math.floor(maxOffset - offset) <= 0
            && !search.loadingMore) {

            params.loadingMore = true;
            params.currentPage = parseInt(search.currentPage) + 1;
            params.text = this.props.text;
            dispatch(fetchItemSearchList(params));
        }
    }

    _onEndReached() {
        let the = this;
        const { dispatch, search } = this.props;
        let params = {};
        if ( !search.loadingMore) {

            params.loadingMore = true;
            params.currentPage = search.currentPage + 1;
            params.text = this.props.text;
            dispatch(fetchItemSearchList(params)).then(()=>{
                the.setState({
                    dataSource: this.ds.cloneWithRows(this.props.search.itemList)
                });
            });
        }
    }

    _renderFooter() {
        if (this.props.search.loadingMore) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="small" color="#fc7d30"/>
                    <Text style={styles.loadingText}>
                        数据加载中……
                    </Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    contentContainerStyle={styles.itemList}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    onEndReached={() => this._onEndReached()}
                    onEndReachedThreshold={10}
                    scrollEventThrottle={200}
                    renderFooter={this._renderFooter}
                    />
            </View>
        )

    }
}

function mapStateToProps(state) {
    const { search } = state;
    return {
        search
    };
}

export default connect(mapStateToProps)(SearchItem);