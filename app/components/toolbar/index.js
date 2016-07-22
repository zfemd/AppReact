'use strict';

import React, { PropTypes } from 'react';
import {
    StyleSheet,
    ToolbarAndroid,
    Platform,
    View,
    Text
} from 'react-native';

import { naviGoBack } from '../../utils/common';
import ImageButton from './ImageButton';
import Button from './Button';

let showActionButton = false;
const addImg = require('../../assets/header/add.png');
const searchImg = require('../../assets/header/search.png');
const arrowImg = require('../../assets/header/arrow.png');

const propTypes = {
    title: PropTypes.string,
    actions: PropTypes.array,
    navigator: PropTypes.object,
    onActionSelected: PropTypes.func,
    onIconClicked: PropTypes.func,
    navIcon: PropTypes.number
};

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.onIconClicked = this.onIconClicked.bind(this);
        this.onActionSelected = this.onActionSelected.bind(this);
    }

    onIconClicked() {
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

    onActionSelected() {
        this.props.onActionSelected();
    }

    renderToolbarAndroid() {
        return (
            <ToolbarAndroid

                title={this.props.title}
                />
        );
    }

    renderToolbarIOS() {
        const action = this.props.actions[0];
        showActionButton = action !== undefined;
        return (
            <View style={styles.toolbar}>
                <ImageButton
                    containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    source={addImg}
                    style={styles.leftIOS}
                    onPress={this.onIconClicked}
                    />
                <Text
                    style={[styles.titleIOS,
                            showActionButton ? { paddingLeft: 0 } : { paddingLeft: -35 }]}
                    >
                    {this.props.title}
                </Text>


                <ImageButton
                    containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    source={searchImg}
                    style={styles.rightIOS}
                    onPress={this.onIconClicked}
                    />

            </View>
        );
    }

    render() {
        let Toolbar = Platform.select({
            android: () => this.renderToolbarAndroid(),
            ios: () => this.renderToolbarIOS()
        });
        return <Toolbar />;
    }
}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 58,
        shadowOffset: {width: 0, height: .2,},
        shadowOpacity: .3,
        shadowColor: '#555',
    },
    titleIOS: {
        flex: 1,
        textAlign: 'center',
        color: '#696969',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },
    leftIOS: {
        height: 18,
        width: 24,
        marginTop: 20,
        marginLeft: 20
    },
    rightIOS: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginRight: 10
    },
    arrowIOS: {
        marginTop: 20,
        marginLeft: 0,
    }

});

Toolbar.propTypes = propTypes;

Toolbar.defaultProps = {
    onActionSelected() {
    },
    title: '',
    actions: []
};

export default Toolbar;
