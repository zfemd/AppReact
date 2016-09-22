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
import Flow from '../../components/flow';
import ScrollableTabView  from 'react-native-scrollable-tab-view';
import ChannelTabBar from '../../components/channelTabBar';

class Channel extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <ScrollableTabView
                scrollWithoutAnimation={true}
                tabBarPosition="top"
                renderTabBar={() =>
                          <ChannelTabBar
                            underlineHeight={2}
                            textStyle={{ fontSize: 14, marginTop: 8 }}
                            style={styles.toolbar}
                          />
                        }
                tabBarBackgroundColor="rgba(255,255,255,0.9)"
                tabBarUnderlineColor="#fc7d30"
                tabBarActiveTextColor="#fc7d30"
                tabBarInactiveTextColor="#9b9b9b"
                >
                <View
                    key={'1'}
                    tabLabel={'全部'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'2'}
                    tabLabel={'美人志'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'3'}
                    tabLabel={'男人装'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'4'}
                    tabLabel={'宝贝货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'5'}
                    tabLabel={'宝贝货好hh宝贝货好hh宝贝货好hh'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'6'}
                    tabLabel={'宝贝1货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'7'}
                    tabLabel={'宝贝3货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'8'}
                    tabLabel={'宝贝4货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'10'}
                    tabLabel={'宝贝5货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'11'}
                    tabLabel={'宝贝6货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'12'}
                    tabLabel={'宝贝7货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'13'}
                    tabLabel={'宝贝8货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'14'}
                    tabLabel={'宝贝9货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'15'}
                    tabLabel={'宝贝11货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>
                <View
                    key={'16'}
                    tabLabel={'宝贝10货'}
                    style={{ flex: 1 }}
                    >
                    <Flow navigator={this.props.navigator}/>
                </View>


            </ScrollableTabView>

        );
    }
}


export default Channel;