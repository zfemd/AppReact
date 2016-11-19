'use strict';

import React  from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Content from '../my/content';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <Toolbar
                    title="Ta的主页"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />
                <ScrollView>
                    <Content/>
                </ScrollView>
            </View>
        )

    }
}

export default User;