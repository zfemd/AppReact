'use strict';
import React, { Component } from 'react';
import {
    AsyncStorage,
    Flex,
    InteractionManager,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    NavigatorIOS,
    RecyclerViewBackedScrollView
} from 'react-native';

import Toolbar from '../../components/toolbar';
import Button from '../../../app/components/button/Button';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import styles from './styles';
import StorageKeys from '../../constants/StorageKeys';
import {
    getToken
} from '../../utils/common'

var womanIcon = <Icon style={{marginLeft:3,alignItems:'center',color:'#FF0087'}} size={16} name="venus"/>;
var manIcon = <Icon style={{marginLeft:3,alignItems:'center',color:'#FF0087'}} size={16} name="mars"/>;
var rmbIcon = <Icon style={[styles.text, {marginLeft:3}]} size={12} name="rmb"/>;
var zanIcon = <Icon style={styles.noteAssetIcon} size={14} name="heart-o"/>;
var commentIcon = <Icon style={styles.noteAssetIcon} size={14} name="comment-o"/>;
var shoppingCartIcon = <Icon style={styles.noteAssetIcon} size={14} name="shopping-cart"/>;
var ellipsisIcon = <Icon style={styles.noteAssetIcon} size={14} name="ellipsis-h"/>;

var THUMB_URLS = [
    require('../../assets/test/test.png'),
    require('../../assets/test/test1.png')
];

const addImg = require('../../assets/header/add.png');
const settingImg = require('../../assets/personal/setting.png');

export default class MyHomePage extends Component {
    constructor(props) {
        super(props);

        /* we used the defaultGetRowData, this requires dataBlob has below structure:
         * dataBlob = {section:{rowID_1: rowData1, rowID_2: rowData2,...},...};
         *
         * Todo
         * We need to make sure rowID is noteID
         */
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 != s2
        });

        this.state = {
            dataSource: ds
        };
    }

    async componentWillMount () {
        // load old data to display
        await this._loadInitialState();
    }

    componentDidMount() {
        // refresh data from server
        InteractionManager.runAfterInteractions(() => {
            this.updateFromServer();
        });
    }

    async _loadInitialState() {
        try {
            await _getToken();

            let meDetail = await AsyncStorage.getItem(StorageKeys.ME_STORAGE_KEY);
            if (meDetail !== null){
                this.setState({user: JSON.parse(meDetail)});
            }

            let myNotes = await AsyncStorage.getItem(StorageKeys.MY_NOTES_STORAGE_KEY);
            if (myNotes !== null){
                this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(JSON.parse(myNotes))});
            }
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    async updateFromServer(){
        await this._getAboutMe();
        await this._getMyNotes();
    }

    _pressButton() {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            // navigator.push({
            //     name: 'ForgetPasswordPage',
            //     component: ForgetPasswordPage,
            // })
        }
    }

    async _getAboutMe () {
        // fetch('https://duoshouji.com/endpoint/aboutme', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         token: this.state.token
        //     })
        // }).then((response) => response.json())
        // .then((responseJson) => {
        //     this._updateUserSource(responseJson);
        // })
        // .catch((error) => {
        //     console.error(error);
        // });

        this._updateUserSource({
            name: '天才小熊猫',
            gender: 'women',
            income: 32,
            thumbUri: 'https://facebook.github.io/react/img/logo_small_2x.png',
            summary: {
                noteNum: 32,
                transNum: 38,
                watcherNum: 29,
                fansNum: 28
            }
        })
    }

    async _updateUserSource(source) {
        await AsyncStorage.setItem(StorageKeys.ME_STORAGE_KEY, JSON.stringify(source));
        this.setState({user:source});
    }

    async _updateNoteSource(source){
        await AsyncStorage.setItem(StorageKeys.MY_NOTES_STORAGE_KEY, JSON.stringify(source));
        this.state.notes = source.s1;
        this.setState({dataSource:this.state.dataSource.cloneWithRowsAndSections(source)});
    }

    async _getMyNotes() {
        // fetch('https://duoshouji.com/endpoint/aboutme', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         token: this.state.token
        //     })
        // }).then((response) => response.json())
        // .then((responseJson) => {
        //     this._updateUserSource(responseJson);
        // })
        // .catch((error) => {
        //     console.error(error);
        // });

        this._updateNoteSource({s1:
            {'noteId1': {
                user: {
                    name: '天才小熊猫',
                    thumbUri: 'https://facebook.github.io/react/img/logo_small_2x.png'
                },
                detail: {
                    title: '最新入手的羊毛线',
                    createTime: '05-28 08:29'
                },
                summary: {
                    zanNum: 28,
                    commentNum: 8,
                    income: 32
                }
            },'noteId2': {
                user: {
                    name: '天才小子',
                    thumbUri: 'https://facebook.github.io/react/img/logo_small_2x.png'
                },
                detail: {
                    title: '滚出',
                    createTime: '05-28 08:29'
                },
                summary: {
                    zanNum: 8,
                    commentNum: 8,
                    income: 3
                }
            }}});
    }

    async _getMoreNotes(){
        // fetch('https://duoshouji.com/endpoint/aboutme', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         token: this.state.token
        //     })
        // }).then((response) => response.json())
        // .then((responseJson) => {
        //     this._updateUserSource(responseJson);
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
        this._onDataArrived({'noteId3': {
            user: {
                name: '天才小熊猫2',
                thumbUri: 'https://facebook.github.io/react/img/logo_small_2x.png'
            },
            detail: {
                title: '最新入手羊毛线',
                createTime: '05-28 08:29'
            },
            summary: {
                zanNum: 28,
                commentNum: 8,
                income: 32
            }
        },'noteId4': {
            user: {
                name: '天才小子2',
                thumbUri: 'https://facebook.github.io/react/img/logo_small_2x.png'
            },
            detail: {
                title: '滚出',
                createTime: '05-28 08:29'
            },
            summary: {
                zanNum: 8,
                commentNum: 8,
                income: 3
            }
        }});
    }

    _onDataArrived(newData) {
        let _this = this;
        Object.keys(newData).forEach(function(key){
            _this.state.notes[key] = newData[key];
        });

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.notes)
        });

        // Image.getSize(this.props.source.uri, (width, height) => {
        //     this.setState({width, height});
        // });
    }

    /**
     * If dataBlob doesn't have sectionID, then the default sectionID is 's1'. So, this method will always be called.
     * @param sectionData
     * @param sectionID
     * @returns {XML}
     * @private
     */
    _renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.myNotesTitle}>
                <Text style={{fontSize:16}}>我的笔记</Text>
            </View>
        );
    }

    _renderNote(rowData, sectionID, rowID, highlightRow) {
        return (
            <View>
                <View style={styles.myNote}>
                    <View style={styles.noteUserBox}>
                        <View style={[styles.portrait, {borderRadius:31}]}>
                            <Image source={{uri: rowData.user.thumbUri, width: 31, height: 31}} />
                        </View>
                        <View style={styles.noteUserMsgBox}>
                            <Text style={styles.noteUserTitle}>{rowData.user.name}</Text>
                            <Text style={styles.noteCreateTime}>{rowData.detail.createTime}</Text>
                        </View>
                    </View>

                    <TouchableHighlight>
                        <View style={styles.noteThumbBox}>
                            <Image style={styles.noteThumb} source={THUMB_URLS[0]} resizeMode={Image.resizeMode.contain} />
                        </View>
                    </TouchableHighlight>

                    <Text style={styles.noteTitle}>{rowData.detail.title}</Text>
                    <View style={styles.noteAssets}>
                        <View style={styles.noteAsset}>
                            {zanIcon}
                            <Text style={[styles.text, {marginLeft:5}]}>{rowData.summary.zanNum}</Text>
                        </View>
                        <View style={styles.separatorVertical}></View>
                        <View style={styles.noteAsset}>
                            {commentIcon}
                            <Text style={[styles.text, {marginLeft:5}]}>{rowData.summary.commentNum}</Text>
                        </View>
                        <View style={styles.separatorVertical}></View>
                        <View style={styles.noteAsset}>
                            {shoppingCartIcon}
                            <Text style={[styles.text, {marginLeft:5}]}>({rmbIcon} {rowData.summary.income})</Text>
                        </View>
                        <View style={styles.separatorVertical}></View>
                        <View style={styles.noteAsset}>
                            <Text style={[styles.text]}>...</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <View key={sectionID + '_' + rowID}
                style={styles.separatorHorizontal}/>
        );
    }

    render() {
        if (this.state.user == null) {
            return null;
        }

        this.user = this.state.user;

        return (
            <View>
                <Toolbar
                    title="我的主页"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    leftImg={addImg}
                    rightImg={settingImg}
                    />

                <View style={styles.userContainer}>
                    <View style={styles.portrait}>
                        <Image source={{uri: this.user.thumbUri, width: 45, height: 45}} />
                    </View>
                    <View style={styles.user}>
                        <Text style={{fontSize:16}}>{this.user.name}</Text>
                        { this.user.gender == 'women' ? womanIcon : manIcon }
                    </View>
                    <View style={styles.income}>
                        <Text style={{fontSize:12}}>总收益:</Text>
                        {rmbIcon}
                        <Text style={{marginLeft:3, fontSize:12, color:'#FC4D30'}}>{this.user.income}</Text>
                    </View>
                </View>

                <View style={styles.summaryContainer}>
                    <View style={styles.asset}>
                        <Text style={styles.count}>{this.user.summary.noteNum}</Text>
                        <Text style={[styles.text, styles.assetText]}>笔记</Text>
                    </View>
                    <View style={styles.separatorVertical} />
                    <View style={styles.asset}>
                        <Text style={styles.count}>{this.user.summary.transNum}</Text>
                        <Text style={[styles.text, styles.assetText]}>交易</Text>
                    </View>
                    <View style={styles.separatorVertical} />
                    <View style={styles.asset}>
                        <Text style={styles.count}>{this.user.summary.watcherNum}</Text>
                        <Text style={[styles.text, styles.assetText]}>关注</Text>
                    </View>
                    <View style={styles.separatorVertical} />
                    <View style={styles.asset}>
                        <Text style={styles.count}>{this.user.summary.fansNum}</Text>
                        <Text style={[styles.text, styles.assetText]}>粉丝</Text>
                    </View>
                </View>

                <ListView dataSource={this.state.dataSource}
                          renderSectionHeader={this._renderSectionHeader}
                          renderRow={this._renderNote.bind(this)}
                          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                          renderSeparator={this._renderSeparator}
                          onEndReached={this._getMoreNotes.bind(this)}/>

            </View>
        );
    }
}

