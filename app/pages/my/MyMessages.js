/**
 * Created by lyan2 on 16/7/27.
 */
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

var fileIcon = <Icon style={[styles.messageAssertIcon]} size={16} name="file-text-o"/>;
var userIcon = <Icon style={[styles.messageAssertIcon]} size={16} name="user"/>;
var commentIcon = <Icon style={[styles.messageAssertIcon]} size={16} name="comment-o"/>;
var chevronRightIcon = <Icon style={[styles.messageLinkIcon]} size={16} name="angle-right"/>;
var shoppingCartIcon = <Icon style={[styles.messageAssertIcon]} size={16} name="shopping-cart"/>;

export default class MyMessagesPage extends Component {
    constructor(props) {
        super(props);

        this.messages = {messages:
        {"message1":{
            title: '新的笔记',
            newCnt: 1,
            type: 'note'
        },"message2":{
            title: '新的交易',
            newCnt: 9,
            type: 'trans'
        },"message3":{
            title: '新的粉丝',
            newCnt: 1,
            type: 'fan'
        },"message4":{
            title: '新的评论',
            newCnt: 7,
            type: 'comment'
        }}};

        /* we used the defaultGetRowData, this requires dataBlob has below structure:
         * dataBlob = {section:{rowID_1: rowData1, rowID_2: rowData2,...},...};
         *
         * Todo
         * We need to make sure rowID is noteID
         */
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.newCnt !== r2.newCnt,
            sectionHeaderHasChanged: (s1, s2) => s1 != s2
        });

        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.messages)
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

    _getNewMessages() {
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

    _renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.messageHeader}>
                <Text style={styles.messageHeaderTitle}>消息</Text>
            </View>
        );
    }

    _renderMessage(rowData, sectionID, rowID, highlightRow) {
        function _getMessageIcon(type) {
            switch(type) {
                case 'note' :
                    return fileIcon;
                case 'comment':
                    return commentIcon;
                case 'trans' :
                    return shoppingCartIcon;
                case 'fan':
                    return userIcon;
            }
        }

        return (
            <TouchableHighlight>
                <View style={styles.messageRow}>
                    {_getMessageIcon(rowData.type)}
                    <Text style={styles.messageTitle}>{rowData.title}</Text>
                    <View style={styles.messageNewMark}>
                        <Text style={styles.messageNewNum}>{rowData.newCnt}</Text>
                    </View>
                    {chevronRightIcon}
                </View>
            </TouchableHighlight>
        );
    }

    _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <View key={sectionID + '_' + rowID}
                  style={styles.separatorHorizontal} />
        );
    }

    render() {
        return (
            <View>

                <ListView dataSource={this.state.dataSource}
                          renderSectionHeader={this._renderSectionHeader}
                          renderRow={this._renderMessage}
                          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                          renderSeparator={this._renderSeparator}
                          stickyHeaderIndices={[0]}/>

            </View>
        );
    }
}

