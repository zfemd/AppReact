'use strict';

import React, { Component } from 'react';
import {
    Navigator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import MyMessagesPage from './MyMessagesPage';

class MessagesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: 'China'
        };
    }
    
    render() {
        let defaultName = 'MyMessagesPage';
        let defaultComponent = MyMessagesPage;
        return (
            // <Navigator
            //     initialRoute={{ name: defaultName, component: defaultComponent, title:'登陆'}}
            //     configureScene={(route, routeStack) => {
            //             return Navigator.SceneConfigs.VerticalDownSwipeJump;
            //         }}
            //     renderScene={(route, navigator) => {
            //             let Component = route.component;
            //             return <Component {...route.params} navigator={navigator} />
            //         }}/>
            <MyMessagesPage navigator={this.props.navigator} />
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

export default MessagesPage;