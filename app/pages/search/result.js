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
    TouchableWithoutFeedback,
    Image
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
import { naviGoBack } from '../../utils/common';
import ScrollableTabView  from 'react-native-scrollable-tab-view';

class SearchResult extends React.Component {
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

    componentDidMount() {
        const { dispatch, route } = this.props;
        let the = this;
        this.setState({searching: true});
        const params = {
            text: route.text,
            loadingMore: false,
            currentPage: 1
        };
        dispatch(fetchItemSearchList(params)).then(() =>{
            the.setState({searching: false});
        });
    }

    _goBack() {
        const { navigator } = this.props;
        naviGoBack(navigator);

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
                    <TouchableWithoutFeedback  onPress={()=> this._goBack()}>
                        <TextInput
                            style={styles.searchText}
                            placeholder={'搜索笔记或商品'}
                            placeholderTextColor='#bebebe'
                            multiline={false}
                            underlineColorAndroid='transparent'
                            returnKeyType='go'
                            value={this.props.route.text}
                            onFocus= {()=> this._goBack()}
                            onSubmitEditing={(event) => this._search(event.nativeEvent.text)}
                            />
                    </TouchableWithoutFeedback>



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
                        {
                            this.state.searching ?
                                <View style={[styles.center,{marginTop: 40}]}>
                                     <Image source={require('../../assets/gif/loading.gif')}/>
                                </View> :
                                <SearchItem text={this.props.route.text}/>
                        }
                    </View>
                    <View
                        key='note'
                        tabLabel='笔记'
                        style={{ flex: 1 }}
                        >
                        {
                            this.state.searching ?
                                <View style={[styles.center,{marginTop: 40}]}>
                                    <Image source={require('../../assets/gif/loading.gif')}/>
                                </View> :
                                <SearchItem text={this.props.route.text}/>
                        }
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

export default connect(mapStateToProps)(SearchResult);