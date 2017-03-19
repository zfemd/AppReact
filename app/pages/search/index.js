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
    navigator,
    InteractionManager,
    AsyncStorage,
    ListView
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/toolbar/ImageButton.js';
import * as common from '../../utils/common';
import { connect } from 'react-redux';
var backImg = require('../../assets/upload/rg_left.png');
import { fetchItemSearchList } from '../../actions/search';
import SearchItem from '../../components/searchItem';
import Spinner from 'react-native-spinkit';
import ResultPage from './result';
import StorageKeys from '../../constants/StorageKeys';
import ScrollableTabView  from 'react-native-scrollable-tab-view';
import _ from 'lodash';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this._onLeftIconClicked = this._onLeftIconClicked.bind(this);
        this._jumpToResultPage = this._jumpToResultPage.bind(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            keyWord: '',
            searchItemHistory: [],
            searchNoteHistory: []
        };
    }

    _onLeftIconClicked() {
        const { navigator } = this.props;
        if (navigator) {
            common.naviGoBack(navigator);
        }
    }

    _search(text) {
        let the = this;
        text = text || this.state.keyWord;
        let searchItemHistory = [];
        AsyncStorage.getItem(StorageKeys.SEARCH_ITEM, (error, result) => {
            if (error) {
                console.error("Error happened when to get token: " + error);
            }
            searchItemHistory = result && result !== '' ? result : '[]';

            searchItemHistory = JSON.parse(searchItemHistory);
            searchItemHistory.push(text);
            searchItemHistory = JSON.stringify(searchItemHistory);
            AsyncStorage.setItem(StorageKeys.SEARCH_ITEM, searchItemHistory);
            AsyncStorage.setItem(StorageKeys.SEARCH_NOTE, searchItemHistory);

            the._jumpToResultPage(text);
        });

    }

    _jumpToResultPage(text) {

        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ResultPage,
                name: 'ResultPage',
                text: text
            });
        });
    }

    componentDidMount() {
        const the = this;
        AsyncStorage.getItem(StorageKeys.SEARCH_ITEM, (error, result) => {
            the.setState({searchItemHistory: JSON.parse(result)});
        });
        AsyncStorage.getItem(StorageKeys.SEARCH_NOTE, (error, result) => {
            the.setState({searchNoteHistory: JSON.parse(result)});
        });

    }

    _historyFrame() {
        var rows = [];
        _.each(this.state.searchItemHistory, (v, k) => {
            if (typeof v === 'string')
                rows.push(
                    <TouchableOpacity style={styles.historyItem} key={k} onPress={() => this._search(v)}>
                        <View >
                            <Text style={[styles.historyItemFont,styles.baseText]}>{v}</Text>
                        </View>
                    </TouchableOpacity>
                );
        });
        return (
            <View style={styles.historyC}>
                <View style={styles.delete}>
                    <Icon
                        name='md-trash'
                        size={26}
                        color={'#aaa'}
                        />
                </View>
                <View style={styles.history}>
                    {
                        rows
                    }
                </View>
            </View>

        )
    }

    render() {
        return (
            <View style={[styles.container, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <View style={styles.searchHeader}>
                    <ImageButton
                        source={backImg}
                        style={styles.back}
                        onPress={this._onLeftIconClicked}
                        />
                    <TextInput
                        style={styles.searchText}
                        placeholder={'搜索笔记或商品'}
                        placeholderTextColor='#bebebe'
                        multiline={false}
                        underlineColorAndroid='transparent'
                        returnKeyType='go'
                        onChangeText={(text) => {this.setState({keyWord:text})}}
                        value={this.state.keyWord}
                        onSubmitEditing={(event) => this._search(event.nativeEvent.text)}
                        />
                    <TouchableOpacity style={styles.sButton} onPress={() => this._search()}>
                        <Text style={styles.sButtonFont}>搜索</Text>
                    </TouchableOpacity>
                </View>
                <ScrollableTabView
                    scrollWithoutAnimation={true}
                    tabBarPosition="top"
                    tabBarBackgroundColor="rgba(255,255,255,0.9)"
                    tabBarActiveTextColor="#fc7d30"
                    tabBarInactiveTextColor="#9b9b9b"
                    tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                    >
                    <View
                        key='item'
                        tabLabel='商品'
                        style={{ flex: 1 }}
                        >
                        {this._historyFrame()}
                    </View>
                    <View
                        key='note'
                        tabLabel='笔记'
                        style={{ flex: 1 }}
                        >
                        {this._historyFrame()}
                    </View>
                </ScrollableTabView>
                <View style={styles.searchBody}>


                </View>
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

export default connect(mapStateToProps)(Search);