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
import Toast from 'react-native-root-toast';
import Geolocation from 'react-native/Libraries/Geolocation/Geolocation';
import { connect } from 'react-redux';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import configs from '../../constants/configs';
import StoreActions from '../../constants/actions';
import Toolbar from '../../components/toolbar';
import colors from '../../constants/colors';
import SelectPhotoPage from './index';
import PhotosReviewPage from './PhotosReviewPage';
import styles from './style';
import Home from '../home';
import {
    Token
} from '../../utils/common';

const locationImg = require('../../assets/upload/location_bubble.png');

class PostNotePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '我的好东西',
            content: '好',
            address: '正在尝试获取当前位置...',
            draftNote: this.props.draftNote,
            token: null,
            posting: false,
            titleLength: 30
        };

        Token.getToken(navigator).then((token) => {
            this.state.token = token;
        });
    }

    componentWillMount() {
    }

    componentDidMount() {
        let that = this;
        Geolocation.getCurrentPosition(function (position) {
            let {coords} = position;
            let url = 'http://api.map.baidu.com/geocoder/v2/?output=json&ak=D8c7c1411571551ef8fe556f08c594bd&location=' + coords.latitude + ',' + coords.longitude;

            fetch(url, {method: 'GET'})
                .then((response) => response.json())
                .then((responseJson) => {
                    let address = responseJson.result.formatted_address;
                    if (!address) {
                        address = '定位失败';
                    }
                    that.setState({address: address, latitude: coords.latitude, longitude: coords.longitude});
                })
                .catch((error) => {
                    Toast.show('可能是网络问题，无法定位。', {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
                    that.setState({address: '定位失败'});
                });
        }, function (error) {
            that.setState({address: '定位失败'});
        }, {
            timeout: 20000,
            maximumAge: 1000,
            enableHighAccuracy: true
        });

        this._statCount(this.state.title);
    }

    _onCancel() {
        const { navigator, dispatch } = this.props;

        if (navigator) {
            // remove draft note since user canceled.
            dispatch({type: StoreActions.RESET_DRAFT_NOTE});
            navigator.popToTop();
        }
    }

    _addMorePhoto() {
        const { navigator } = this.props;

        if (navigator) {
            navigator.push({
                name: 'SelectPhotoPage',
                component: SelectPhotoPage
            })
        }
    }

    _sendPhotos(noteId) {
        const { navigator, dispatch } = this.props;

        let data = {
            images: this.state.draftNote.notePhotos
        };

        if (data.images.length <= 0) return;

        data.images = data.images.map(image => {
            return {"image": image.image, "marks": image.marks}
        });

        fetch(configs.imageServiceUrl + 'notes/' + noteId + '/images', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-App-Token': this.state.token
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            if (responseJson.resultCode == 0) {
                // remove draft note since it has been post to server.
                dispatch({type: StoreActions.RESET_DRAFT_NOTE});
                this.state.posting = false;

                if (navigator) {
                    navigator.popToTop();
                }
            } else {
                Toast.show('抱歉，笔记图片发布失败。', {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
                this.state.posting = false;
            }
        }).catch((error) => {
            console.error(error);
            this.state.posting = false;
        });

        Toast.show('笔记正在发布，图片数量不同，发送时间可长可短，请耐心等待。', {duration: Toast.durations.LONG, position: Toast.positions.CENTER});
    }

    _sendNote() {
        if (this.state.posting) return;
        this.state.posting = true;

        if (this.state.draftNote == null || this.state.draftNote.notePhotos == null) {
            Toast.show('发送笔记前，请先选择需要上传的图片。', {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
            return;
        }

        let data = {
            title: this.state.title,
            content: this.state.content,
            address: this.state.address,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        };

        console.log(data);

        if (!data.title || !data.content) {
            Toast.show('发布笔记需要您输入标题和内容。', {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
            return;
        }

        fetch(configs.serviceUrl + 'user/notes/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-App-Token': this.state.token
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((responseJson) => {
            if (responseJson && responseJson.resultCode == 0 && responseJson.resultValues) {
                this._sendPhotos(responseJson.resultValues.noteId);
            } else {
                Toast.show('发送笔记失败。', {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
                this.state.posting = false;
            }
        }).catch((error) => {
            Toast.show('发送失败，可能是网络中断。', {duration: Toast.durations.SHORT, position: Toast.positions.CENTER});
            this.state.posting = false;
        });
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

        if (navigator) {
            navigator.push({
                name: 'PhotosReviewPage',
                component: PhotosReviewPage,
                params: {index: index},
                removeCallback: this._callbackFromPreview.bind(this)
            })
        }
    }

    _statCount(title) {
        this.setState({titleLength: 30 - title.length});
        this.state.title = title;
    }

    _renderSelectedPhotos() {
        let {height, width} = Dimensions.get('window');
        let that = this;
        let morePhoto = (
            <TouchableHighlight key='morePhoto' style={styles.morePhotoBox} onPress={this._addMorePhoto.bind(this)}>
                <Icon size={16} name="plus" color={colors.gray}/>
            </TouchableHighlight>
        );

        let { notePhotos } = this.state.draftNote;
        let photos = [];
        let photoRows = [];
        let photosPerRow = 4;
        let rowIndex = 0;
        let {imageWidth, imageHeight} = {imageWidth: (width - 60) / photosPerRow, imageHeight: 80};

        if (notePhotos != null && notePhotos.length > 0) {
            notePhotos.forEach(function (notePhoto, index) {
                let image = (
                    <TouchableHighlight key={notePhoto.photo.image.uri+index}
                                        onPress={() => that._onPressPhoto.call(that, index)}>
                        <Image source={{uri:notePhoto.image}} style={styles.uploadAvatar} width={imageWidth}
                               height={imageHeight}/>
                    </TouchableHighlight>
                );
                photos.push(image);
            });
        }

        photos.push(morePhoto);

        rowIndex = Math.ceil(photos.length / photosPerRow) - 1;
        for (let i = 0; i <= rowIndex; i++) {
            let row = <View key={i}
                            style={{flexDirection:'row', paddingVertical: 5}}>{this._renderPhotosRow(photos, photosPerRow, i * photosPerRow)}</View>;
            photoRows.push(row);
        }

        return photoRows;
    }

    render() {
        let {height, width} = Dimensions.get('window');
        height -= 21;

        return (
            <View style={[styles.container, {minHeight: height}, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="发布笔记"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    rightText='取消'
                    onRightIconClicked={this._onCancel.bind(this)}
                    />

                <View
                    style={{borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', paddingVertical:10, margin: 15}}>
                    <TextInput ref='titleInput' placeholder='添加标题' defaultValue={this.state.title}
                               clearButtonMode='while-editing' underlineColorAndroid='transparent'
                               onChangeText={(value) => this._statCount(value)}
                               returnKeyType="next" maxLength={30} style={[styles.textInput, {flex:1}]}/>
                    <Text>{this.state.titleLength}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingVertical:10, marginHorizontal: 15,height: 100}}>
                    <TextInput ref='contentInput' placeholder='说点你的心得吧' defaultValue={this.state.content}
                               clearButtonMode='while-editing' underlineColorAndroid='transparent'
                               returnKeyType="next" multiline={true} numberOfLines={8}
                               style={[styles.textInput, {flex:1}]}
                               onChangeText={(value) => this.state.content = value}/>
                </View>
                <View
                    style={[{borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical:10, marginHorizontal: 15}]}>
                    {this._renderSelectedPhotos()}
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', padding:10, marginHorizontal: 15}}>
                    <Image source={locationImg} style={{marginRight: 10}}/>
                    <Text>发布于：</Text>
                    <Text style={{color: colors.orange}}>{this.state.address}</Text>
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