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
import Toast from 'react-native-root-toast';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Toolbar from '../../components/toolbar';
import PhoneLib from '../../components/camera/PhoneLib';
import StoreActions from '../../constants/actions';
import PhotoEditPage from './PhotoEditPage';
import ImageButton from '../../components/toolbar/ImageButton';
const arrowImg = require('../../assets/header/arrow.png');
import styles from './style';

class SelectPhotoPage extends Component {
    constructor(props, context) {
        super(props);

        this.state = {};

        this.cameraOptions = {
            title: '选择照片',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        this.phoneLibOptions = {
            title: '选择照片',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
    }

    _onPressCamera() {
        // The first arg is the options object for customization (it can also be null or omitted for default options),
        // Launch Camera:
        ImagePicker.launchCamera(this.cameraOptions, (response)  => {
            console.log('Response = ', response);

            if (response.didCancel) {
            } else if (response.error) {
                Toast.show(response.error, {duration:Toast.durations.SHORT, position:Toast.positions.CENTER});
            } else if (response.customButton) {
            } else {
                // You can display the image using either data...
                //let source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                this.setState({
                    avatarSource: response
                });
            }
        });
    }

    _onPressImageLib() {

        // Open Image Library:
        ImagePicker.launchImageLibrary(this.phoneLibOptions, (response)  => {
            console.log('Response = ', response);

            if (response.didCancel) {
            } else if (response.error) {
                Toast.show(response.error, {duration:Toast.durations.SHORT, position:Toast.positions.CENTER});
            } else if (response.customButton) {
            } else {
                // You can display the image using either data...
                //let source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                this.setState({
                    avatarSource: response
                });
            }
        });
    }
    
    _onPressImage(imageNode) {
        console.log(imageNode);

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

    _onCancel() {
        const { navigator } = this.props;

        if(navigator) {
            navigator.pop();
        }
    }

    _onContinue() {
        const { navigator, dispatch } = this.props;

        dispatch({type:StoreActions.ADD_NOTE_PHOTO, photo: this.state.avatarSource});

        if(navigator) {
            navigator.push({
                name: 'PhotoEditPage',
                component: PhotoEditPage,
                params: {photo:this.state.avatarSource}
            })
        }
    }

    componentDidMount() {
        // only fetch JPEG images.
        var fetchParams: Object = {
            first: 1,
            groupTypes: 'SavedPhotos',
            assetType: "Photos",
            mimeTypes: ['image/jpeg']
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
                <Toolbar
                    title="所有照片"
                    onTitlePress = {this._onPressImageLib.bind(this)}
                    navigator={this.props.navigator}
                    hideDrop={true}
                    rightText='继续'
                    rightImgPress={this._onContinue.bind(this)}
                    />
                <View>
                    <Image source={this.state.avatarSource} style={styles.uploadAvatar} width={width} height={200} />
                </View>
                <PhoneLib ref={(component) => this.phoneLib = component} navigator={this.props.navigator} onPressCamera={this._onPressCamera} onPressImage={this._onPressImage.bind(this)} />

            </View>
        );
    }
}

// get selected photos from store.state object.
function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(SelectPhotoPage);