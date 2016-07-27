'use strict';
import React, { Component } from 'react';
import {
    Flex,
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

export default class MyHomePage extends Component {
    constructor(props) {
        super(props);

        this.user = {
            name: '天才小熊猫',
            gender: 'women',
            income: 32,
            summary: {
                noteNum: 32,
                transNum: 38,
                watcherNum: 29,
                fansNum: 28
            }
        }

        this.notes = {notes:
        {'noteId1': {
            user: {
                name: '天才小熊猫'
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
                name: '天才小熊猫',
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
        }}};

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
            dataSource: ds.cloneWithRowsAndSections(this.notes)
        }
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

    _getUserData() {
        fetch('https://mywebsite.com/endpoint/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson.movies;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    _onDataArrived(newData) {
        this._notes = this._notes.concat(newData);
        this.setState({
            datasource: this.state.ds.cloneWithRows(this._notes)
        });
    }

    _renderNotesHeader() {
        return (
            <View style={styles.myNotesTitle}>
                <Text style={{fontSize:16}}>我的笔记</Text>
            </View>
        );
    }

    _renderNote(rowData, sectionID, rowID, highlightRow) {
        return (
            <View style={styles.myNote}>
                <View style={styles.noteUserBox}>
                    <View style={[styles.portrait, {borderRadius:31}]}>
                        <Image source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 31, height: 31}} />
                    </View>
                    <View style={styles.noteUserMsgBox}>
                        <Text style={styles.noteUserTitle}>{rowData.user.name}</Text>
                        <Text style={styles.noteCreateTime}>{rowData.detail.createTime}</Text>
                    </View>
                </View>
                <TouchableHighlight style={styles.noteThumbBox}>
                    <Image style={styles.noteThumb} source={THUMB_URLS[0]} height={191} width={191}/>
                </TouchableHighlight>
                <Text style={styles.noteTitle}>{rowData.detail.title}</Text>
                <View style={styles.noteAssets}>
                    <View style={styles.noteAsset}>
                        {zanIcon}
                        <Text style={[styles.text, {marginLeft:5}]}>{rowData.summary.zanNum}</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.noteAsset}>
                        {commentIcon}
                        <Text style={[styles.text, {marginLeft:5}]}>{rowData.summary.commentNum}</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.noteAsset}>
                        {shoppingCartIcon}
                        <Text style={[styles.text, {marginLeft:5}]}>({rmbIcon} {rowData.summary.income})</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.noteAsset}>
                        <Text style={[styles.text]}>...</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <View key={sectionID + '_' + rowID}
                style={{height: 1, backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#ccc'}}/>
        );
    }

    render() {
        return (
            <View>
                <View style={styles.userContainer}>
                    <View style={styles.portrait}>
                        <Image source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 45, height: 45}} />
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
                    <View style={styles.separator} />
                    <View style={styles.asset}>
                        <Text style={styles.count}>{this.user.summary.transNum}</Text>
                        <Text style={[styles.text, styles.assetText]}>交易</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.asset}>
                        <Text style={styles.count}>{this.user.summary.watcherNum}</Text>
                        <Text style={[styles.text, styles.assetText]}>关注</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.asset}>
                        <Text style={styles.count}>{this.user.summary.fansNum}</Text>
                        <Text style={[styles.text, styles.assetText]}>粉丝</Text>
                    </View>
                </View>

                <ListView dataSource={this.state.dataSource}
                          renderHeader={this._renderNotesHeader}
                          renderRow={this._renderNote}
                          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                          renderSeparator={this._renderSeperator} />

            </View>
        );
    }
}

