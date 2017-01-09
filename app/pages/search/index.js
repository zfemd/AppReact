'use strict';

import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    DeviceEventEmitter,
    Platform
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/toolbar/ImageButton.js';
import * as common from '../../utils/common';
import { connect } from 'react-redux';
var backImg = require('../../assets/upload/rg_left.png');

class Search extends React.Component {
    constructor(props) {
        super(props);
        this._onLeftIconClicked = this._onLeftIconClicked.bind(this);

    }

    _onLeftIconClicked() {
        const { navigator } = this.props;
        if (navigator) {
            common.naviGoBack(navigator);
        }
    }

    _search(text) {

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
                        onSubmitEditing={(text) => this._search({text})}
                        />
                </View>
            </View>
        )

    }
}

//function mapStateToProps(state) {
//    const { search } = state;
//    return {
//        search
//    };
//}
//
//export default connect(mapStateToProps)(Search);
export default Search;