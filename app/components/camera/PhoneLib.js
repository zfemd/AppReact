/**
 * Created by lyan2 on 16/8/2.
 */
import React, { Component } from 'react';
const ReactNative = require('react-native');
const {
    Dimensions,
    Image,
    Navigator,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} = ReactNative;
import CameraRollView from './CameraRollView';
import Icon from 'react-native-vector-icons/FontAwesome';

var cameraIcon = <Icon name="camera" size={32}  />;

class PhoneLib extends Component {
    constructor(props) {
        super(props);

        this._touchableProps = {
            onPress : this.props.onPressImage
        };

        this.imageCount = 0;
    }

    _renderImage(asset){
        let {height, width} = Dimensions.get('window');
        let imageWidth = (width - 24) / 3;
        let imageHeight = imageWidth;
        this.imageCount += 1;
        return this.imageCount == 1 ? (
            <TouchableHighlight {...this._touchableProps}>
                {cameraIcon}
            </TouchableHighlight>
        ) : (
            <TouchableHighlight {...this._touchableProps}>
                <Image style={{margin:4}}
                    source={asset.node.image}
                    height={imageHeight} width={imageWidth}
                />
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <CameraRollView
                    batchSize={9}
                    groupTypes="SavedPhotos"
                    imagesPerRow={3}
                    assetType="Photos"
                    renderImage={this._renderImage.bind(this)}
                />
            </View>
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