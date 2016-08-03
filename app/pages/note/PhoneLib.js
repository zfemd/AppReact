/**
 * Created by lyan2 on 16/8/2.
 */
import React, { Component } from 'react';
const ReactNative = require('react-native');
const {
    Navigator,
    StyleSheet,
    Text,
    View
} = ReactNative;
import CameraRollView from '../../components/camera/CameraRollView'

class PhoneLib extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: 'China'
        };
    }

    _renderImage(){
        return (
            <Text>Hello world</Text>
        );
    }

    render() {
        return (
            <CameraRollView
                batchSize={8}
                groupTypes="SavedPhotos"
                imagesPerRow={3}
                assetType="Photos"/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default PhoneLib;