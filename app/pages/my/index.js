'use strict';
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    InteractionManager,
    Navigator,
    Text
} from 'react-native';
import Content from './content';
import Toolbar from '../../components/toolbar';
import SettingPage from '../settings';
import {Token} from '../../utils/common';
import AddFriends from '../addFriends';
import {fetchUserInfo} from '../../actions/user';
import { connect } from 'react-redux';

const addImg = require('../../assets/header/add.png');
const settingImg = require('../../assets/personal/setting.png');

class MyHomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        Token.getToken(navigator).then((token) => {
            let params = {
              token: token
            };
            dispatch(fetchUserInfo(params));
        });

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

    _onLeftIconClicked() {
        const { navigator } = this.props;
        Token.getToken(navigator).then((token) => {
            if (token) {
                InteractionManager.runAfterInteractions(() => {
                    navigator.push({
                        component: AddFriends,
                        name: 'AddFriends',
                        sceneConfigs: Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
                    });
                });
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar
                    title="我的主页"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    leftImg={addImg}
                    onLeftIconClicked={this._onLeftIconClicked.bind(this)}
                    rightImg={settingImg}
                    onRightIconClicked={this._onClickSettingIcon.bind(this)}
                    />
                <ScrollView>
                    <Content userInfo={this.props.user.userInfo}/>
                </ScrollView>


            </View>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

export default connect(mapStateToProps)(MyHomePage);