'use strict';

import React from 'react';
const ReactNative = require('react-native');
const {
    Platform,
    ScrollView,
    Text,
    View,
    InteractionManager,
    Navigator,
    TouchableOpacity,
    AsyncStorage,
    StatusBar
    } = ReactNative;
import { connect } from 'react-redux';
import styles from './style';
import TabBar from './tab';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Toolbar from '../../components/toolbar';
import Flow from '../../components/flow';
import HomeFilter from '../../components/homeFilter';
import MyPage from '../my';
import MessagesPage from '../messages';
import CreateNotePage from '../note';
import Channel from '../channel';
import AddFriends from '../addFriends';
import {showorHideFilter} from '../../actions/home';
import {Token} from '../../utils/common';
import HomeContainer from './homeContainer';

const addImg = require('../../assets/header/add.png');
const searchImg = require('../../assets/header/search.png');
const settingImg = require('../../assets/personal/setting.png');

class Home extends React.Component {
    constructor(props) {
        super(props);
        this._showFilter = this._showFilter.bind(this);
        this._onFilterClicked = this._onFilterClicked.bind(this);
        this._onLeftIconClicked = this._onLeftIconClicked.bind(this);
        this._onRightIconClicked = this._onRightIconClicked.bind(this);
        this.state = {
            showToolbar: this.props.home.showToolbar,
            filterMounted: false,
            currentTab: 0,
            tabForRefresh: false
        }
    }

    static defaultProps = {
        tabTile: {
            0: '首页',
            1: '频道',
            2: '',
            3: '消息',
            4: '我的'
        },
        cameraPress: (navigator)=> {

            InteractionManager.runAfterInteractions(() => {
                navigator.push({
                    component: CreateNotePage,
                    name: 'CreateNotePage',
                    sceneConfigs: Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
                });
            });
        }

    };

    _showFilter() {
        const { dispatch} = this.props;
        if (this.props.home.showFilter) {
            dispatch(showorHideFilter(false));
        } else {
            dispatch(showorHideFilter(true));
        }

    }

    _onFilterClicked() {
        if (this.props.home.filterMounted) {
            //this.props.home.showFilter = !this.props.home.showFilter;
            this._showFilter();
        }
    }

    /**
     * Parameter data is a object {i:currentPage, ref:Component, from: prevPage}.
     * Properties 'i' and 'from' both are number.
     * @param data
     * @private
     */
    _onChangeTab(data) {
        if (data.i !== this.state.currentTab) {
            this.setState({currentTab: data.i});
        } else {
            this.setState({tabForRefresh: true});
            setTimeout(()=> {
                this.setState({tabForRefresh: false});
            }, 10)
        }
        if (data.i == 3 || data.i == 4) {
            setTimeout(()=> {
                this.setState({showToolbar: false});
            }, 2000)

        } else {
            this.setState({showToolbar: true});
        }
    }

    _onLeftIconClicked() {
        const { navigator } = this.props;
        Token.getToken(navigator).then((token) => {
            if (token) {
                InteractionManager.runAfterInteractions(() => {
                    navigator.push({
                        component: AddFriends,
                        name: 'AddFriends',
                        sceneConfigs: Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
                    });
                });
            }
        });
    }

    _onRightIconClicked() {
        const { navigator } = this.props;
        Token.getToken(navigator).then((token) => {
            if (token) {
                //todo
            }
        });
    }

    render() {
        return (
            <View style={[styles.container, Platform.OS === 'android' ? null : {marginTop: 21}]} visible='hidden'>
                {

                    //this.state.showToolbar ? (
                    //    <Toolbar
                    //        title={this.props.home.isFollowed ? '关注的' : '剁手记'}
                    //        navigator={navigator}
                    //        showFilter={this._showFilter}
                    //        leftImg={addImg}
                    //        rightImg={searchImg}
                    //        onLeftIconClicked={this._onLeftIconClicked}
                    //        onRightIconClicked={this._onRightIconClicked}
                    //        hideDrop={this.state.showToolbar}
                    //        />
                    //) :null
                }

                <ScrollableTabView
                    scrollWithoutAnimation={true}
                    style={{marginTop: 0, }}
                    tabBarPosition='overlayBottom'
                    initialPage={0}
                    renderTabBar={() => <TabBar {...this.props}/>}
                    onChangeTab={this._onChangeTab.bind(this)}
                    locked={true}
                    >
                    <HomeContainer tabLabel="ios-home-outline" style={styles.tabView} navigator={this.props.navigator}
                                   dispatch={this.props.dispatch}>
                        <Flow tabForRefresh={this.state.tabForRefresh}
                              tag='all'
                              navigator={this.props.navigator}
                              dispatch={this.props.dispatch}
                            />
                    </HomeContainer>


                    <HomeContainer tabLabel="ios-compass-outline" style={styles.tabView}
                                   navigator={this.props.navigator} dispatch={this.props.dispatch}>
                        <Channel navigator={this.props.navigator}></Channel>

                    </HomeContainer>

                    <ScrollView tabLabel="md-camera" style={styles.tabView}>
                    </ScrollView>

                    <MessagesPage navigator={this.props.navigator} tabLabel="ios-mail-outline" style={styles.tabView}/>
                    <MyPage navigator={this.props.navigator} tabLabel="ios-person-outline" style={styles.tabView}/>
                </ScrollableTabView>
                {
                    this.props.home.showFilter ?
                        <HomeFilter navigator={this.props.navigator} click={this._onFilterClicked} key=''/> :
                        <View></View>

                }


            </View>

        );
    }
}

function mapStateToProps(state) {
    const { home, flow } = state;
    return {
        home,
        flow
    };
}

export default connect(mapStateToProps)(Home);