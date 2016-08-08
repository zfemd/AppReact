/**
 * Created by lyan2 on 16/8/2.
 */
import React, { Component } from 'react';
import {
    CameraRoll,
    Dimensions,
    Image,
    Navigator,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import PhoneLib from '../../components/camera/PhoneLib';
import ImageButton from '../../components/toolbar/ImageButton';
const arrowImg = require('../../assets/header/arrow.png');
import styles from './style';

class SelectPhotoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: 'China'
        };
    }

    _onPressCamera() {
        // More info on all the options is below in the README...just some common use cases shown here
        var options = {
            title: 'Select Avatar',
            customButtons: {
                'Choose Photo from Facebook': 'fb',
            },
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        // Launch Camera:
        ImagePicker.launchCamera(options, (response)  => {
            // Same code as in above section!
        });

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        // ImagePicker.showImagePicker(options, (response) => {
        //     console.log('Response = ', response);
        //
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     }
        //     else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     }
        //     else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //     }
        //     else {
        //         // You can display the image using either data...
        //         const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        //
        //         // or a reference to the platform specific asset location
        //         if (Platform.OS === 'ios') {
        //             const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        //         } else {
        //             const source = {uri: response.uri, isStatic: true};
        //         }
        //
        //         this.setState({
        //             avatarSource: source
        //         });
        //     }
        // });
    }
    
    _onPressImage(imageNode) {
        this.setState({
            avatarSource: imageNode.image
        });
    }

    _getFirstImage(data) {
        if (data != null) {
            let assets = data.edges;
            if (assets.length > 0) {
                this.setState({avatarSource: assets[0].node.image});
            }
        }
    }

    _onPressImageLib() {
        // More info on all the options is below in the README...just some common use cases shown here
        var options = {
            title: 'Select Avatar',
            customButtons: {
                'Choose Photo from Facebook': 'fb',
            },
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        // Open Image Library:
        ImagePicker.launchImageLibrary(options, (response)  => {
            // Same code as in above section!
        });
    }

    _onCancel() {
        const { navigator } = this.props;

        if(navigator) {
            navigator.pop();
        }
    }

    componentDidMount() {
        var fetchParams: Object = {
            first: 1,
            groupTypes: 'SavedPhotos',
            assetType: "Photos"
        };

        if (Platform.OS === 'android') {
            // not supported in android
            delete fetchParams.groupTypes;
        }

        CameraRoll.getPhotos(fetchParams)
            .then((data) => this._getFirstImage(data), (e) => logError(e));
    }

    render() {
        let {height, width} = Dimensions.get('window');
        
        return (
            <View style={styles.container}>
                <View style={styles.navigator}>
                    <TouchableHighlight onPress={this._onCancel.bind(this)}>
                        <Text>取消</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._onPressImageLib} style={{flex:2}}>
                        <View style={styles.navigatorTitle} >
                            <Text>所有照片</Text>
                            <ImageButton
                                source={arrowImg}
                                style={styles.arrowIOS}
                            />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text>继续</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.uploadAvatarContainer}>
                    <Image source={this.state.avatarSource} style={styles.uploadAvatar} width={width} height={200} />
                </View>
                <PhoneLib ref={(component) => this.phoneLib = component} navigator={this.props.navigator} onPressCamera={this._onPressCamera} onPressImage={this._onPressImage.bind(this)} />
            </View>
        );
    }
}

export default SelectPhotoPage;