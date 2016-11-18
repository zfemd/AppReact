'use strict';
import React, { Component } from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import Content from './content';
import Toolbar from '../../components/toolbar';
import SettingPage from '../settings';

const addImg = require('../../assets/header/add.png');
const settingImg = require('../../assets/personal/setting.png');

export default class MyHomePage extends Component {
    constructor(props) {
        super(props);
    }

    _onClickSettingIcon() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'SettingPage',
                component: SettingPage
            })
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar
                    title="我的主页"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    leftImg={addImg}
                    rightImg={settingImg}
                    onRightIconClicked={this._onClickSettingIcon.bind(this)}
                    />
                <ScrollView
                    showsVerticalScrollIndicator = {false}
                    >
                    <Content/>
                </ScrollView>

            </View>
        );
    }
}