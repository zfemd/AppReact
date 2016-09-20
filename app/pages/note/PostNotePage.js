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
import Geolocation from 'react-native/Libraries/Geolocation/Geolocation';
import { connect } from 'react-redux';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import StoreActions from '../../constants/actions';
import Toolbar from '../../components/toolbar';
import colors from '../../constants/colors';
import SelectPhotoPage from './index';
import PhotosReviewPage from './PhotosReviewPage';
import styles from './style';
import Home from '../home';

const locationImg = require('../../assets/upload/location_bubble.png');

class PostNotePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: '正在获取当前位置...',
            draftNote: this.props.draftNote
        };

        console.log('hello');
    }

    componentWillMount() {
    }

    componentDidMount() {
        let that = this;
        //Geolocation.getCurrentPosition(function(position){
        //    let {coords} = position;
        //
        //    //that.setState({position: '维度：' + coords.latitude + ',经度：' + coords.longitude});
        //    let url = 'http://apis.juhe.cn/geo/?lat=' + coords.latitude + '&lng=' + coords.longitude + '&type=&dtype=&key=a8c5e6bd35a994d9b56abd530c6e9e76';
        //
        //    fetch(url, {
        //        method: 'GET',
        //        }).then((response) => response.json())
        //        .then((responseJson) => {
        //            that.setState({position: responseJson.result.address});
        //        })
        //        .catch((error) => {
        //            console.error(error);
        //        });
        //
        //}, function(error){
        //    error.message;
        //}, {timeout: 20000,
        //    maximumAge: 1000,
        //    enableHighAccuracy: true});
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
        if (this.state.draftNote == null || this.state.draftNote.notePhotos == null) {
            return;
        }

        let data = {
            title: this.state.nodeTitle,
            content: this.state.nodeContent,
            photos: this.state.draftNote.notePhotos
        };

        fetch('https://mywebsite.com/endpoint/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson.movies;
            })
            .catch((error) => {
                console.error(error);
            });

        const { navigator, dispatch } = this.props;
        // remove draft note since it has been post to server.
        dispatch({type:StoreActions.RESET_DRAFT_NOTE});

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
            return photos.slice(fromIndex, fromIndex + photosPerRow);
        }

        return null;
    }

    _callbackFromPreview() {
        this.setState({remove: true});
    }

    _onPressPhoto(index) {
        const { navigator } = this.props;

        if(navigator) {
            navigator.push({
                name: 'PhotosReviewPage',
                component: PhotosReviewPage,
                params: {index: index},
                removeCallback: this._callbackFromPreview.bind(this)
            })
        }
    }

    _renderSelectedPhotos() {
        let {height, width} = Dimensions.get('window');
        let that = this;
        let morePhoto = (
            <TouchableHighlight key='morePhoto' style={styles.morePhotoBox} onPress={this._addMorePhoto.bind(this)}>
                <Icon size={16} name="plus" color={colors.gray} />
            </TouchableHighlight>
        );

        let { notePhotos } = this.state.draftNote;
        let photos = [];
        let photoRows = [];
        let photosPerRow = 4;
        let rowIndex = 0;
        let {imageWidth, imageHeight} = {imageWidth: (width - 60) / photosPerRow, imageHeight:80};

        if (notePhotos != null && notePhotos.length > 0) {
            notePhotos.forEach(function(notePhoto, index){
                let image = (
                    <TouchableHighlight key={notePhoto.photo.uri+index} onPress={() => that._onPressPhoto.call(that, index)} >
                        <Image source={notePhoto.photo} style={styles.uploadAvatar} width={imageWidth} height={imageHeight} />
                    </TouchableHighlight>
                );
                photos.push(image);
            });
        }

        photos.push(morePhoto);

        rowIndex = Math.ceil(photos.length / photosPerRow) - 1;
        for(let i = 0; i <= rowIndex; i++) {
            let row = <View key={i} style={{flexDirection:'row', paddingVertical: 5}}>{this._renderPhotosRow(photos, photosPerRow, i * photosPerRow)}</View>;
            photoRows.push(row);
        }

        return photoRows;
    }

    render() {
        let {height, width} = Dimensions.get('window');

        return (
            <View style={[styles.container, {minHeight: height}]}>
                <Toolbar
                    title="发布笔记"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    rightText='取消'
                    />

                <View style={{borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', paddingVertical:10, margin: 15}}>
                    <TextInput placeholder='添加标题' maxLength={30} style={{flex:1}} onEndEtiting={this._onTitleEndEditing.bind(this)}/>
                    <Text>30</Text>
                </View>
                <View style={{flexDirection: 'row', paddingVertical:10, marginHorizontal: 15}}>
                    <TextInput placeholder='说点你的新得吧' multiline={true} onEndEditing={this._onContentEndEditing.bind(this)}
                               style={{flex:1, height: 180}}/>
                </View>
                <View style={[{borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical:10, marginHorizontal: 15}]}>
                    {this._renderSelectedPhotos()}
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', padding:10, marginHorizontal: 15}}>
                    <Image source={locationImg} style={{marginRight: 10}} /><Text>发布于：</Text><Text style={{color: colors.orange}}>{this.state.position}</Text>
                </View>

                <TouchableHighlight onPress={this._sendNote.bind(this)}
                    style={{padding: 15, justifyContent:'center', backgroundColor: colors.orange, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0}}>
                    <Text style={{color: '#fff', fontSize:18}}>发布</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

// get selected photos from store.state object.
function mapStateToProps(state) {
    const { draftNote } = state;
    return {
        draftNote
    };
}

export default connect(mapStateToProps)(PostNotePage);