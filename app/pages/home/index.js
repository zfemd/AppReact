'use strict';

import React from 'react';
import {
    ScrollView,
    Text,
    View,
    InteractionManager
} from 'react-native';
import styles from './style';
import TabBar from './tab';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Toolbar from '../../components/toolbar';
import Flow from '../../components/flow';
import MyPage from '../my';
import DetailPage from '../detail';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this._jumpToDetailPage = this._jumpToDetailPage.bind(this);
    }

    static defaultProps = {
        tabTile: {
            0: '首页',
            1: '频道',
            2: '',
            3: '消息',
            4: '我的'
        }

    };

    _jumpToDetailPage() {
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: DetailPage,
                name: 'DetailPage',
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    title="剁手记"
                    navigator={navigator}
                    />
                <ScrollableTabView
                    style={{marginTop: 0, }}
                    tabBarPosition='overlayBottom'
                    initialPage={0}
                    renderTabBar={() => <TabBar {...this.props}/>}
                    >
                    <ScrollView tabLabel="ios-home-outline" style={styles.tabView}>
                        <Flow
                            press={this._jumpToDetailPage}
                            />
                    </ScrollView>
                    <ScrollView tabLabel="ios-compass-outline" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>1</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="md-camera" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>2</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-mail-outline" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>3</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-person-outline" style={styles.tabView}>
                        <MyPage />
                    </ScrollView>
                </ScrollableTabView>
            </View>

        );
    }
}


export default Home;