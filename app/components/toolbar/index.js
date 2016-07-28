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

let showActionButton = false;
const addImg = require('../../assets/header/add.png');
const searchImg = require('../../assets/header/search.png');
const arrowImg = require('../../assets/header/arrow.png');
var {height, width} = Dimensions.get('window');

const propTypes = {
    title: PropTypes.string,
    actions: PropTypes.array,
    navigator: PropTypes.object,
    _onActionSelected: PropTypes.func,
    _onIconClicked: PropTypes.func,
    navIcon: PropTypes.number,
    cate: PropTypes.object,
};

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this._onIconClicked = this._onIconClicked.bind(this);
        this._onActionSelected = this._onActionSelected.bind(this);
        this._onArrowClicked = this._onArrowClicked.bind(this);
    }

    _onIconClicked() {
        if (this.props.onIconClicked) {
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

    _onActionSelected() {
        this.props.onActionSelected();
    }

    _renderToolbarAndroid() {
        return (
            <ToolbarAndroid

                title={this.props.title}
                />
        );
    }

    _onArrowClicked() {
        this.props.home.showFilter = !this.props.home.showFilter;
        this.props.showFilter();
    }

    _renderToolbarIOS() {
        const action = this.props.actions[0];
        showActionButton = action !== undefined;
        return (
            <View style={styles.toolbar}>
                <ImageButton
                    source={addImg}
                    style={styles.leftIOS}
                    onPress={this._onIconClicked}
                    />

                <View style={styles.titleViewIOS}>
                    <Text
                        style={styles.titleIOS}
                        onPress={this._onArrowClicked}
                        >
                        {this.props.title}
                    </Text>
                    <ImageButton
                        source={arrowImg}
                        style={styles.arrowIOS}
                        onPress={this._onArrowClicked}
                        />
                </View>

                <ImageButton
                    source={searchImg}
                    style={styles.rightIOS}
                    onPress={this._onIconClicked}
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
        height: 18,
        width: 24,
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

Toolbar.defaultProps = {
    _onActionSelected() {
    },
    title: '',
    actions: []
};

function mapStateToProps(state) {
    const { home } = state;
    return {
        home
    };
}

export default connect(mapStateToProps)(Toolbar);