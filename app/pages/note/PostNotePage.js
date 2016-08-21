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

    _onContinue() {
        //const { navigator } = this.props;
        //
        //if(navigator) {
        //    navigator.push({
        //        name: 'PhotoEditPage',
        //        component: PhotoEditPage,
        //        params: {selectedPhoto:this.state.avatarSource}
        //    })
        //}
    }

    componentDidMount() {
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
                    <Image source={this.props.selectedPhoto} style={styles.uploadAvatar} width={80} height={80} />
                </View>
                <TouchableHighlight onPress={this._sendNote.bind(this)}
                    style={{padding: 10, justifyContent:'center', backgroundColor: '#f00', flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0}}>
                    <Text style={{color: '#fff'}}>发布</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default PostNotePage;