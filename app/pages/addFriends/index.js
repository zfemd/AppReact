'use strict';

import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Switch,
    ListView
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/toolbar/ImageButton.js';
import { naviGoBack, Token ,request } from '../../utils/common';
import Contacts from 'react-native-contacts';
import images from '../../constants/images';
import _ from 'lodash';
var backImg = require('../../assets/upload/rg_left.png');

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this._onLeftIconClicked = this._onLeftIconClicked.bind(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            trueSwitchIsOn: true,
            dataSource: this.ds.cloneWithRows([])

        };
    }

    _onLeftIconClicked() {
        const { navigator } = this.props;
        if (navigator) {
            naviGoBack(navigator);
        }
    }

    componentWillMount() {
        let the = this;
        new Promise((resolve, reject) => {
            Contacts.checkPermission((err, permission) => {
                // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
                if (permission === 'undefined') {
                    Contacts.requestPermission((err, permission) => {
                        resolve(true);
                    })
                }
                if (permission === 'authorized') {
                    resolve(true);
                }
                if (permission === 'denied') {
                    Contacts.requestPermission((err, permission) => {
                        resolve(true);
                    })
                }
            })
        }).then((res)=> {
                if (res)
                    return new Promise((resolve, reject) => {
                        Contacts.getAll((err, contacts) => {
                            if (err && err.type === 'permissionDenied') {
                                console.log('permissionDenied');
                            } else {
                                let array = [];
                                _.each(contacts, (list)=> {
                                    let obj = {
                                        name: list.givenName + ' ' + list.familyName,
                                        portrait: list.thumbnailPath,
                                        phone: list.phoneNumbers[0].number.replace(/\s/g, '')
                                            .replace(/\(/g, '')
                                            .replace(/\)/g, '')
                                            .replace(/\-/g, ''),
                                        hasRegistered: false,
                                        hasBeFollowed: false
                                    };
                                    array.push(obj);
                                });


                                Token.getToken(navigator).then((token) => {
                                    if (token) {
                                        let body = '';
                                        _.each(array, (list)=> {
                                            body += 'mobiles=' + list.phone + '&';
                                        });
                                        //body = 'mobiles=' + body;
                                        request('/user/mobile-contacts/status?' + body, 'GET', '', token)
                                            .then((res) => {
                                                if (res.resultCode === 0) {
                                                    _.each(res, (list)=> {
                                                        let contact = _.find(array, {phone: list.mobileNumber});
                                                        if (list.userId > 0)
                                                            contact.hasRegistered = true;
                                                        if (list.isFollowing)
                                                            contact.hasBeFollowed = true;
                                                    });
                                                    resolve(array)
                                                }
                                            }, function (error) {
                                                console.log(error);
                                            })
                                            .catch(() => {
                                                console.log('network error');
                                            });
                                    }
                                });

                            }
                        });
                    });
            }).then((res)=> {
                the.setState({dataSource: the.ds.cloneWithRows(res)});
            });


    }

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        if (!rowData.hasBeFollowed)
            return (
                <TouchableOpacity underlayColor="transparent" activeOpacity={0.5}>
                    <View>
                        <View style={styles.friendsRow}>
                            <Image style={styles.portrait}
                                   source={{uri: (rowData.portrait ? rowData.portrait : images.DEFAULT_PORTRAIT), width: 34, height: 34}}/>
                            <View style={styles.name}>
                                <Text>{rowData.name}</Text>
                            </View>
                            <View style={styles.invite}>
                                {
                                    rowData.hasRegistered ?
                                        <Image source={require('../../assets/invite/follow.png')}></Image>
                                        :
                                        <Image source={require('../../assets/invite/invite.png')}></Image>

                                }
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <ImageButton
                        source={backImg}
                        style={styles.back}
                        onPress={this._onLeftIconClicked}
                        />
                    <TextInput
                        style={styles.searchText}
                        placeholder={'搜索通讯录好友'}
                        placeholderTextColor='#bebebe'
                        multiline={false}
                        />
                    <Image style={styles.magnifier} source={require('../../assets/invite/search.png')}/>
                </View>
                <View style={styles.addressBook}>
                    <Text style={[styles.baseText,styles.addressText]}>允许通过手机通讯录加好友</Text>
                    <Switch
                        onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
                        style={styles.trueSwitchIsOn}
                        value={this.state.trueSwitchIsOn}
                        />
                </View>
                <View style={styles.listContainer}>
                    <ListView
                        contentContainerStyle={styles.friendsList}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        enableEmptySections={true}
                        />
                </View>

                <TouchableOpacity style={styles.float}>
                    <View >
                        <Text style={[styles.baseText,styles.floatText]}>
                            邀请所有人
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }
}

export default Friends;