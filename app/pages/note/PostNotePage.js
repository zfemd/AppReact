/**
 * Created by lyan2 on 16/8/21.
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
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import SelectPhotoPage from './index';
import styles from './style';
import Home from '../home';

class PostNotePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: 'China'
        };
    }

    _onCancel() {
        const { navigator } = this.props;

        if(navigator) {
            navigator.pop();
        }
    }

    componentDidMount() {
    }

    _addMorePhoto() {
        const { navigator } = this.props;

        if(navigator) {
            navigator.push({
                name: 'SelectPhotoPage',
                component: SelectPhotoPage
            })
        }
    }

    _sendNote() {
        let data = {title: this.state.nodeTitle, content: this.state.nodeContent};

        //fetch('https://mywebsite.com/endpoint/', {
        //    method: 'POST',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //    },
        //    body: JSON.stringify(data)
        //}).then((response) => response.json())
        //    .then((responseJson) => {
        //        return responseJson.movies;
        //    })
        //    .catch((error) => {
        //        console.error(error);
        //    });

        const { navigator } = this.props;

        if(navigator) {
            navigator.push({
                name: 'Home',
                component: Home
            })
        }
    }

    _onTitleEndEditing(event) {
        this.state.nodeTitle = event.nativeEvent.text;
    }

    _onContentEndEditing(event) {
        this.state.nodeContent = event.nativeEvent.text;
    }

    _renderPhotosRow(photos, photosPerRow, fromIndex) {

        if (photos != null && photos.length > 0) {
            console.log(photos.slice(fromIndex, fromIndex + photosPerRow));
            return photos.slice(fromIndex, fromIndex + photosPerRow);
        }

        return null;
    }

    _renderSelectedPhotos() {
        let morePhoto = (
            <TouchableHighlight style={styles.morePhotoBox} onPress={this._addMorePhoto.bind(this)}>
                <Icon size={16} name="plus"/>
            </TouchableHighlight>
        );

        let { draftPhotos } = this.props.notePhotos;
        let photos = [];
        let photoRows = [];
        let photosPerRow = 4;
        let rowIndex = 0;

        if (draftPhotos != null && draftPhotos.length > 0) {
            draftPhotos.forEach(function(photo){
                let image = <Image key={photo.uri} source={photo} style={styles.uploadAvatar} width={80} height={80} />
                photos.push(image);
            });
        }

        photos.push(morePhoto);

        rowIndex = Math.ceil(photos.length / photosPerRow) - 1;
        for(let i = 0; i <= rowIndex; i++) {
            let row = <View style={{flexDirection:'row'}}>{this._renderPhotosRow(photos, photosPerRow, i * photosPerRow)}</View>;
            photoRows.push(row);
        }

        return photoRows;
    }

    render() {
        let {height, width} = Dimensions.get('window');

        return (
            <View style={[styles.container, {height: height - 21}]}>
                <View style={styles.navigator}>
                    <TouchableHighlight onPress={this._onCancel.bind(this)} style={styles.leftContainer}>
                        <Text style={styles.navigatorText}>取消</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex:2}}>
                        <View style={styles.navigatorTitle} >
                            <Text style={styles.navigatorText}>发布笔记</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.rightContainer}>
                        <Text style={[styles.navigatorText]}></Text>
                    </View>
                </View>
                <View style={{borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', padding: 10}}>
                    <TextInput placeholder='添加标题' maxLength={30} style={{flex:1}} onEndEtiting={this._onTitleEndEditing.bind(this)}/>
                    <Text>30</Text>
                </View>
                <View style={{flexDirection: 'row', padding: 10}}>
                    <TextInput placeholder='说点你的新得吧' multiline={true} onEndEditing={this._onContentEndEditing.bind(this)}
                               style={{flex:1, height: 80}}/>
                </View>
                <View style={[styles.uploadAvatarContainer, {borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10}]}>
                    {this._renderSelectedPhotos()}
                </View>
                <TouchableHighlight onPress={this._sendNote.bind(this)}
                    style={{padding: 10, justifyContent:'center', backgroundColor: '#f00', flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0}}>
                    <Text style={{color: '#fff'}}>发布</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

// get selected photos from store.state object.
function mapStateToProps(state) {
    const { notePhotos } = state;
    return {
        notePhotos
    };
}

export default connect(mapStateToProps)(PostNotePage);