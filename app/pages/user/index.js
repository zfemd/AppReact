'use strict';

import React  from 'react';
import {
    View,
    Text
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
            <View>
                <Toolbar
                    title="Ta的主页"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />
                <Content></Content>
            </View>
        )

    }
}

export default User;