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
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

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
                          <DefaultTabBar
                            underlineHeight={2}
                            textStyle={{ fontSize: 14, marginTop: 8 }}
                            style={{height:38}}
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

            </ScrollableTabView>

        );
    }
}


export default Channel;