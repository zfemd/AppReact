'use strict';

import React  from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import MyPage from '../my'

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <MyPage></MyPage>
        )

    }
}

export default User;