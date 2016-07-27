'use strict';

import React, { Component } from 'react';
import {
    Navigator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import MyHomePage from './MyHomePage';

class MyPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: 'China'
        };
    }
    
    render() {
        let defaultName = 'MyHomePage';
        let defaultComponent = MyHomePage;
        return (
            // <Navigator
            //     initialRoute={{ name: defaultName, component: defaultComponent, title:'登陆', rightButtonTitle:'取消'}}
            //     configureScene={(route, routeStack) => {
            //             return Navigator.SceneConfigs.VerticalDownSwipeJump;
            //         }}
            //     renderScene={(route, navigator) => {
            //             let Component = route.component;
            //             return <Component {...route.params} navigator={navigator} />
            //         }}/>
            <MyHomePage />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default MyPage;