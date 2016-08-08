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
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ImageButton from '../../components/toolbar/ImageButton';
const arrowImg = require('../../assets/header/arrow.png');
import styles from './style';

class PhotoEditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarSource: this.props.selectedPhoto
        };

    }

    _onCancel() {
        const { navigator } = this.props;

        if(navigator) {
            navigator.pop();
        }
    }

    _onChangeTab() {

    }

    _onPressImage(event) {
        let {locationX, locationY} = event.nativeEvent;
        console.log(this.image.getSize)
    }

    _onImageLoad() {
        console.log("imageload");
    }

    render() {
        let {height, width} = Dimensions.get('window');

        return (
            <View style={styles.container}>
                <View style={styles.navigator}>
                    <TouchableHighlight onPress={this._onCancel.bind(this)} style={styles.leftContainer}>
                        <Text style={[styles.navigatorText]}>返回</Text>
                    </TouchableHighlight>
                    <View style={styles.navigatorTitle} >
                        <Text style={styles.navigatorText}>编辑照片</Text>
                    </View>
                    <TouchableHighlight style={styles.rightContainer}>
                        <Text style={[styles.navigatorText]}>继续</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.selectedPhotoContainer}>
                    <TouchableHighlight onPress={this._onPressImage.bind(this)}>
                        <Image source={this.state.avatarSource} style={styles.selectedPhoto} width={width} height={300}
                        resizeMode='contain' onLoad={this._onImageLoad}/>
                    </TouchableHighlight>
                </View>

                <ScrollableTabView
                    style={{marginTop: 0, }}
                    tabBarPosition='overlayBottom'
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar {...this.props}/>}
                    onChangeTab={this._onChangeTab.bind(this)}
                    >
                    <ScrollView navigator={this.props.navigator}  tabLabel="美化"  />

                    <ScrollView tabLabel="标签" >
                        <View style={[styles.tabView, {height:100}]}>
                            <Text>点击照片</Text>
                            <Text>选择添加相关信息</Text>
                        </View>
                    </ScrollView>

                    <ScrollView navigator={this.props.navigator} tabLabel="贴图"/>
                </ScrollableTabView>
            </View>
        );
    }
}

export default PhotoEditPage;