'use strict';

import React from 'react';
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import styles from './style';
import TabBar from './tab';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Toolbar from '../../components/toolbar';
import Flow from '../../components/flow';

class Home extends React.Component {
    constructor(props) {
        super(props);
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
                        <Flow/>
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
                        <View style={styles.card}>
                            <Text>4</Text>
                        </View>
                    </ScrollView>
                </ScrollableTabView>
            </View>

        );
    }
}


export default Home;