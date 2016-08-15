'use strict';

import React  from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
const shareImg = require('../../assets/note/transfer.png');

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    _onLeftIconClicked() {

    }

    render() {
        return(
            <View style={{backgroundColor: '#fc7d30', flex: 1}}>
                <Toolbar
                    title="笔记详情"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    onLeftIconClicked={this._onLeftIconClicked(0)}
                    rightImg={shareImg}
                    />
                <Text>detail</Text>
            </View>
        )

    }
}

export default Detail;