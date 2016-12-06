'use strict';

import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Switch
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/toolbar/ImageButton.js';
import { naviGoBack } from '../../utils/common';
import Contacts from 'react-native-contacts';
var backImg = require('../../assets/upload/rg_left.png');

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this._onLeftIconClicked = this._onLeftIconClicked.bind(this);
        this.state = {
            trueSwitchIsOn: true
        };
    }

    _onLeftIconClicked() {
        const { navigator } = this.props;
        if (navigator) {
            naviGoBack(navigator);
        }
    }

    componentWillMount() {
        Contacts.getAll((err, contacts) => {
            if(err && err.type === 'permissionDenied'){
                console.log('permissionDenied');
            } else {
                console.log(contacts)
            }
        })
    }


    render() {
        return(
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
                <View style={styles.friendsList}>
                </View>

                <TouchableOpacity style={styles.float}>
                    <View >
                        <Text style={[styles.baseText,styles.floatText]} >
                            邀请所有人
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }
}

export default Friends;