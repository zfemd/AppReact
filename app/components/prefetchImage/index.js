'use strict';

import React from 'react';
var ReactNative = 'react-native';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';
import { connect } from 'react-redux';
import { prefetchImageAction } from '../../actions';

class PrefetchImage extends React.Component {

    constructor(props) {
        super(props);
        this._onPrefetchComplete = this._onPrefetchComplete.bind(this);
        this._onPrefetchStart = this._onPrefetchStart.bind(this);
        const hasPrefetched = this.hasPrefetched();

        this.state = {
            events: [],
            isLoading: true,
            prefetchTask: hasPrefetched ? null : Image.prefetch(this.props.imageUri),
            height: 200
        };

        this._onPrefetchStart()
    }

    hasPrefetched = () => {
        const images = this.props.prefetchedImages.images;
        const currentImage = this.props.imageUri;

        return _.indexOf(images, currentImage) > -1 ? true : false;
    }


    _onPrefetchComplete = () => {
        this.props.dispatch(prefetchImageAction(this.props.imageUri));
        this.setState({isLoading: false });
    }

    _onPrefetchStart = () => {
        if (this.state.prefetchTask) {
            this.state.prefetchTask.then(() => {
                Image.getSize(this.props.imageUri, (width, height) => {
                    const scaleHeight = (height / width) * ((Dimensions.get('window').width / 100) * 47);
                    this.setState({height: scaleHeight});
                    this._onPrefetchComplete();
                });
            }, error => {
                console.log('error fetching image', error);
            });
        }
    }

    render() {
        return (
            <Image
                source={{uri:this.props.imageUri}}
                resizeMode={this.props.resizeMode}
                style={[this.props.imageStyle, {height: this.state.height}]}
                >
                {this.state.isLoading ?
                    <View style={styles.container}>
                        <Spinner style={styles.spinner} isVisible size={40} type="ThreeBounce" color={'#C3CCDB'}/>
                    </View>
                    : null}
            </Image>

        );
    }
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});



function select({prefetchedImages}) {
    return {
        prefetchedImages
    };
}
module.exports = connect(select)(PrefetchImage);