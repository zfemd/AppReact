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
let prefetchedHeight = 0;

class PrefetchImage extends React.Component {

    constructor(props) {
        super(props);
        this._onPrefetchComplete = this._onPrefetchComplete.bind(this);
        this._onPrefetchStart = this._onPrefetchStart.bind(this);
        this._hasPrefetched = this._hasPrefetched.bind(this);
        const _hasPrefetched = this._hasPrefetched();

        this.state = {
            events: [],
            isLoading: false,
            prefetchTask: _hasPrefetched ? null : Image.prefetch(this.props.imageUri),
            height: prefetchedHeight ? prefetchedHeight : this.props.height
        };

    }

    componentWillMount () {
        this._onPrefetchStart();
    }

    _hasPrefetched ()  {
        const images = this.props.prefetchedImages.images;
        const currentImage = this.props.imageUri;
        var index = _.findIndex(images, { 'uri': currentImage });
        if(index > -1) {
            const scaleHeight = (images[index].height / images[index].width) * this.props.width;
            prefetchedHeight = scaleHeight;
            return true;
        } else {
            return false;
        }
    }

    _onPrefetchComplete (width, height)  {
        const scaleHeight = (height / width) * this.props.width;
        if(this.props.height){
            this.setState({height: this.props.height});
        } else {
            this.setState({height: scaleHeight});
        }
        this.setState({isLoading: false });
        if (!this._hasPrefetched){
            this.props.dispatch(prefetchImageAction(this.props.imageUri, width, height));
        }

    }

    _onPrefetchStart ()  {
        if (this.state.prefetchTask) {
            this.setState({isLoading: true });
            this.state.prefetchTask.then(() => {
                Image.getSize(this.props.imageUri, (width, height) => {
                    this._onPrefetchComplete(width, height);
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