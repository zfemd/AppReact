'use strict';

import React  from 'react';
import {
    View,
    Text,
    ScrollView,
    Platform
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Content from '../my/content';
import {Token} from '../../utils/common';
import {fetchUserInfo} from '../../actions/user';
import { connect } from 'react-redux';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch ,route } = this.props;
        Token.getToken(navigator).then((token) => {
            let params = {
                token: token,
                userId: route.userId
            };
            dispatch(fetchUserInfo(params));
        });

    }

    render() {
        return(
            <View style={[{flex: 1},Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="Ta的主页"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />
                <ScrollView>
                    <Content userInfo={this.props.user.userInfo}/>
                </ScrollView>
            </View>
        )

    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

export default connect(mapStateToProps)(User);