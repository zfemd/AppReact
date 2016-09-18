'use strict';

import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/toolbar/ImageButton.js';
import { naviGoBack } from '../../utils/common';
var backImg = require('../../assets/upload/rg_left.png');

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this._onLeftIconClicked = this._onLeftIconClicked.bind(this);
    }

    _onLeftIconClicked() {
        const { navigator } = this.props;
        if (navigator) {
            naviGoBack(navigator);
        }
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
            </View>
        )

    }
}

export default Friends;