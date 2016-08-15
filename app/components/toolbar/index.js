'use strict';

import React, { PropTypes } from 'react';
import {
    StyleSheet,
    ToolbarAndroid,
    Platform,
    View,
    Text,
    Alert,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { naviGoBack } from '../../utils/common';
import ImageButton from './ImageButton';
import Button from './Button';

const arrowImg = require('../../assets/header/arrow.png');
var backImg = require('../../assets/upload/rg_left.png');
var {height, width} = Dimensions.get('window');

const propTypes = {
    title: PropTypes.string,
    actions: PropTypes.array,
    navigator: PropTypes.object,
    _onRightIconClicked: PropTypes.func,
    _onLeftIconClicked: PropTypes.func,
    navIcon: PropTypes.number,
    cate: PropTypes.object,
    leftImg: PropTypes.number,
    rightImg: PropTypes.number,
    onLeftIconClicked: PropTypes.func,
    hideDrop: PropTypes.bool,
    onRightIconClicked: PropTypes.func
};

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this._onLeftIconClicked = this._onLeftIconClicked.bind(this);
        this._onRightIconClicked = this._onRightIconClicked.bind(this);
        this._onArrowClicked = this._onArrowClicked.bind(this);
    }

    _onLeftIconClicked() {
        if (this.props.onLeftIconClicked) {
            //TODO
        } else {
            const {
                navigator
                } = this.props;
            if (navigator) {
                naviGoBack(navigator);
            }
        }
    }

    _onRightIconClicked() {
        this.props.onRightIconClicked();
    }

    _renderToolbarAndroid() {
        return (
            <ToolbarAndroid
                title={this.props.title}
                />
        );
    }

    _onArrowClicked() {
        if(!this.props.hideDrop){
            this.props.home.showFilter = !this.props.home.showFilter;
            this.props.showFilter();
        }
    }

    _renderToolbarIOS() {
        return (
            <View style={styles.toolbar}>
                <ImageButton
                    source={this.props.leftImg ? this.props.leftImg : backImg}
                    style={styles.leftIOS}
                    onPress={this._onLeftIconClicked}
                    />

                <View style={styles.titleViewIOS}>
                    <Text
                        style={styles.titleIOS}
                        onPress={this._onArrowClicked}
                        >
                        {this.props.title}
                    </Text>
                    {
                        !this.props.hideDrop?
                            <ImageButton
                            source={arrowImg}
                            style={styles.arrowIOS}
                            onPress={this._onArrowClicked}
                            /> : <View/>
                    }

                </View>

                <ImageButton
                    source={this.props.rightImg}
                    style={styles.rightIOS}
                    onPress={this._onRightIconClicked}
                    />
            </View>

        );
    }

    render() {
        let Toolbar = Platform.select({
            android: () => this._renderToolbarAndroid(),
            ios: () => this._renderToolbarIOS()
        });
        return <Toolbar />;
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 58,
        shadowOffset: {width: 0, height: .2,},
        shadowOpacity: .3,
        shadowColor: '#555',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 10
    },
    titleIOS: {
        textAlign: 'center',
        color: '#696969',
        fontWeight: 'bold',
        fontSize: 20,
    },
    leftIOS: {
        //height: 18,
        //width: 24,
        marginTop: 20,
        marginLeft: 10
    },
    rightIOS: {
        marginTop: 20,
        marginRight: 10,
        right: 0
    },
    arrowIOS: {
        marginLeft: 10,
        width: 10,
        height: 7
    },
    titleViewIOS: {
        flex: 2,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
});

Toolbar.propTypes = propTypes;

function mapStateToProps(state) {
    const { home } = state;
    return {
        home
    };
}

export default connect(mapStateToProps)(Toolbar);