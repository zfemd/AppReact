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
    constructor(props) {
        super(props);

        this.displayName = "Login"

    }
    render() {
        return( <LoginPage navigator={this.props.navigator} ></LoginPage>);
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