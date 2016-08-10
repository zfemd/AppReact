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
        let point = {locationX, locationY} = event.nativeEvent;
        let scope = this.state.imageScope;

        if (point.locationX < scope.left || point.locationX > scope.left + scope.width
            || point.locationY < scope.top || point.locationY > scope.top + scope.height) {
            console.log("not in image");
        } else {
            this.state.clickedPos = {x: point.locationX - scope.left, y: point.locationY - scope.top};
        }
    }

    _onImageLoad() {
        let windowSize = {height, width} = Dimensions.get('window');
        let containerSize = {width: windowSize.width, height: 300};
        let imageSize = {height, width} =this.state.avatarSource;

        let ratio = imageSize.width > 0 ? imageSize.height / imageSize.width : 1;
        let scale = ratio > 1 ? containerSize.height / imageSize.height : windowSize.width / imageSize.width;
        let actualSize = {width: imageSize.width * scale, height: imageSize.height * scale};

        // left and top is the let top corner position of image in image container.
        this.state.imageScope = {left: (containerSize.width - actualSize.width) / 2, top: (containerSize.height - actualSize.height) / 2,
            width: actualSize.width, height: actualSize.height};
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
                        resizeMode='contain' onLoad={this._onImageLoad.bind(this)}/>
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