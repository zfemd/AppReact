'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import LoginPage from './LoginPage';

class Login extends Component {
    render() {
        //let defaultName = 'LoginPage';
        //let defaultComponent = LoginPage;
        //return (
        //    <Navigator
        //        initialRoute={{ name: defaultName, component: defaultComponent, title:'登陆', rightButtonTitle:'取消'}}
        //        configureScene={(route, routeStack) => {
        //                return Navigator.SceneConfigs.VerticalDownSwipeJump;
        //            }}
        //        renderScene={(route, navigator) => {
        //                let Component = route.component;
        //                return <Component {...route.params} navigator={navigator} />
        //            }}/>
        //);
        return( <LoginPage navigator={this.props.navigator} ></LoginPage>)
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Login;