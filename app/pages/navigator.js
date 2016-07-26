'use strict';

import React from 'react';
import {
    StyleSheet,
    Navigator,
    StatusBar,
    BackAndroid,
    View
} from 'react-native';

import Splash from '../pages/splash';
import { naviGoBack } from '../utils/common';

let tempNavigator;
let isRemoved = false;

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this._renderScene = this._renderScene.bind(this);
        this._goBack = this._goBack.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._goBack);
        this.state = {
            animated: true,
            hidden: false
        }
    }

    _goBack() {
        return naviGoBack(tempNavigator);
    }

    _configureScene() {
        return Navigator.SceneConfigs.FloatFromRight;
    }

    _renderScene(route, navigator) {
        let Component = route.component;
        tempNavigator = navigator;
        return (
            <Component navigator={navigator} route={route}/>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    hidden = {this.state.hidden}
                    backgroundColor="#000"
                    barStyle="default"
                    />
                <Navigator
                    ref="navigator"
                    style={styles.navigator}
                    configureScene={this._configureScene}
                    renderScene={this._renderScene}
                    initialRoute={{
                        component: Splash,
                        name: 'Splash'
                      }}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});

export default Nav;