/**
 * Created by lyan2 on 16/8/2.
 */
import React, { Component } from 'react';
import {
    Navigator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import PhoneLib from '../../components/camera/PhoneLib';

class CreateNotePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: 'China'
        };
    }

    render() {
        let defaultName = 'PhoneLib';
        let defaultComponent = PhoneLib;
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
            <PhoneLib navigator={this.props.navigator} />
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

export default CreateNotePage;