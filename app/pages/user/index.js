'use strict';

import React  from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{backgroundColor: '#fc7d30', flex: 1}}>
                <Toolbar
                    title="用户"
                    navigator={navigator}
                    />
                <Text>detail</Text>
            </View>
        )

    }
}

export default User;