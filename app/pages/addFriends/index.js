'use strict';

import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Switch,
    ListView,
    Dimensions,
    Animated,
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/toolbar/ImageButton.js';
import { naviGoBack, Token ,request, toast, follow } from '../../utils/common';
import Contacts from 'react-native-contacts';
import images from '../../constants/images';
import _ from 'lodash';
const {height, width} = Dimensions.get('window');
var backImg = require('../../assets/upload/rg_left.png');

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this._invite = this._invite.bind(this);
        this._onLeftIconClicked = this._onLeftIconClicked.bind(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            trueSwitchIsOn: true,
            dataSource: this.ds.cloneWithRows([]),
            token: null,
            contacts: [],
            opacity: new Animated.Value(1),
            toLeft: new Animated.Value(width)
        };
    }

    _onLeftIconClicked() {
        const { navigator } = this.props;
        if (navigator) {
            naviGoBack(navigator);
        }
    }

    componentDidMount() {

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
                                        the.setState({token: token})
                                        let body = '';
                                        _.each(array, (list)=> {
                                            body += 'mobiles=' + list.phone + '&';
                                        });
                                        //body = 'mobiles=' + body;
                                        request('/user/mobile-contacts/status?' + body, 'GET', '', token)
                                            .then((res) => {
                                                if (res.resultCode === 0) {
                                                    _.each(res.resultValues, (list)=> {
                                                        let contact = _.find(array, {phone: list.mobile + ''});
                                                        contact.userId = list.userId;
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
                the.setState({contacts: res});
            });


    }

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        if (!rowData.hasBeFollowed)
            return (
                <TouchableOpacity underlayColor="transparent" activeOpacity={0.5}>
                    <Animated.View style={{opacity: this.state.opacity}}>
                        <View style={styles.friendsRow}>
                            <Image style={styles.portrait}
                                   source={{uri: (rowData.portrait ? rowData.portrait : images.DEFAULT_PORTRAIT), width: 34, height: 34}}/>
                            <View style={styles.name}>
                                <Text>{rowData.name}</Text>
                            </View>
                            <View style={styles.invite}>
                                {
                                    rowData.hasRegistered ?
                                        <TouchableOpacity onPress={()=>this._follow(rowData.userId)}>
                                            <Image source={require('../../assets/invite/follow.png')}></Image>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={()=>this._invite(rowData.phone)}>
                                            <Image source={require('../../assets/invite/invite.png')}></Image>
                                        </TouchableOpacity>

                                }
                            </View>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            );
        else
            return null;
    }

    _invite(mobile) {
        Animated.sequence([
            Animated.spring(
                this.state.opacity,
                {
                    toValue: 0.1,
                    friction: 1
                }
            ),
            Animated.timing(
                this.state.toLeft, {
                    toValue: 0,
                    friction: 1,
                    duration: 500
                }
            )
        ]).start();

        return true;
        let body = '';
        if (mobile) {
            body = {
                mobile: mobile
            };
            body = JSON.stringify(body);
        }
        else {
            body = '{';
            _.each(this.state.contacts, (list)=> {
                if (!list.hasRegistered)
                    body += '[mobile=' + list.phone + '],';
            });
            body += '}';
        }

        const token = this.state.token;
        request('/user/invitations', 'POST', body, token)
            .then((res) => {
                if (res.resultCode === 0) {
                    toast('邀请成功');
                }
            }, function (error) {
                console.log(error);
            })
            .catch(() => {
                console.log('network error');
            });
    }

    _follow(userId) {
        follow(userId, this.state.token).then((res) => {
            toast('关注成功');
            //let notes = _.filter(detail.note, {userId: userId});
            //_.each(notes, function (note) {
            //    note.isAuthorFollowedByVisitor = true;
            //});
            //this.setState({noteUpdated: true});
        });
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

                <TouchableOpacity style={styles.float} onPress={()=>this._invite()}>
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