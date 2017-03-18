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
import { fetchItemSearchList } from '../../actions/search';
import SearchItem from '../../components/searchItem';
import Spinner from 'react-native-spinkit';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this._onLeftIconClicked = this._onLeftIconClicked.bind(this);
        this.state = {
            searching: false
        };
    }

    _onLeftIconClicked() {
        const { navigator } = this.props;
        if (navigator) {
            common.naviGoBack(navigator);
        }
    }

    _search(text) {
        const { dispatch } = this.props;
        let the = this;
        this.setState({searching: true});
        dispatch(fetchItemSearchList(text)).then(() =>{
            the.setState({searching: false});
        });
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
                        onSubmitEditing={(event) => this._search(event.nativeEvent.text)}
                        />

                </View>
                <View style={styles.searchTab}>
                    <View style={[styles.tab,styles.tabActive]}>
                        <Text>商品</Text>
                    </View>
                    <View style={styles.tab}>
                        <Text>笔记</Text>
                    </View>
                </View>
                <View style={styles.searchBody}>
                    {
                        this.state.searching ?
                            <View style={[styles.center,{marginTop: 40}]}><
                                Spinner style={styles.spinner} isVisible size={80} type="FadingCircleAlt"
                                        color={'#fc7d30'}/>
                            </View> :
                            <SearchItem />
                    }

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