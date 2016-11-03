'use strict';

import React from 'react';
const ReactNative = require('react-native');
const {
    ScrollView,
    Text,
    View,
    InteractionManager,
    Navigator,
    TouchableOpacity
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

const addImg = require('../../assets/header/add.png');
const searchImg = require('../../assets/header/search.png');

class Home extends React.Component {
    constructor(props) {
        super(props);
        this._showFilter = this._showFilter.bind(this);
        this._onFilterClicked = this._onFilterClicked.bind(this);
        this._onLeftIconClicked = this._onLeftIconClicked.bind(this);
        this.state = {
            showToolbar: this.props.home.showToolbar,
            filterMounted: false
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
        if(this.props.home.showFilter){
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
        if (data.i == 3 || data.i == 4) {
            this.setState({showToolbar: false});
        } else {
            this.setState({showToolbar: true});
        }
    }

    _onLeftIconClicked() {
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: AddFriends,
                name: 'AddFriends',
                sceneConfigs: Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
            });
        });
    }

    render() {
        return (
            <View style={styles.container} visible='hidden'>
                {
                    this.state.showToolbar ? (
                        <Toolbar
                            title={this.props.home.isFollowed ? '关注的' : '剁手记'}
                            navigator={navigator}
                            showFilter={this._showFilter}
                            leftImg={addImg}
                            rightImg={searchImg}
                            onLeftIconClicked={this._onLeftIconClicked}
                            />
                    ) : null
                }

                <ScrollableTabView
                    scrollWithoutAnimation={true}
                    style={{marginTop: 0, }}
                    tabBarPosition='overlayBottom'
                    initialPage={0}
                    renderTabBar={() => <TabBar {...this.props}/>}
                    onChangeTab={this._onChangeTab.bind(this)}
                    >
                    <Flow tag='all' navigator={this.props.navigator} dispatch={this.props.dispatch}  tabLabel="ios-home-outline" style={styles.tabView}/>

                    <Channel navigator={this.props.navigator} tabLabel="ios-compass-outline" style={styles.tabView}></Channel>

                    <ScrollView tabLabel="md-camera" style={styles.tabView}>
                    </ScrollView>

                    <MessagesPage navigator={this.props.navigator} tabLabel="ios-mail-outline" style={styles.tabView}/>
                    <MyPage navigator={this.props.navigator} tabLabel="ios-person-outline" style={styles.tabView}/>
                </ScrollableTabView>
                {
                    this.props.home.showFilter ?  <HomeFilter navigator={this.props.navigator}  click={this._onFilterClicked} key=''/> : <View></View>

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