/**
 * Created by lyan2 on 16/9/8.
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
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Toolbar from '../../components/toolbar';
import colors from '../../constants/colors';
import styles from './style';

const garbageImg = require('../../assets/note/garbage.png');

class PhotosReviewPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: []
        };
    }

    componentWillMount() {
        let { notePhotos } = this.props.draftNote;

        if (notePhotos != null && notePhotos.length > 0) {
            this.state.tabs = notePhotos.map(function(photo, i){
                return ""+i;
            });
        }

        console.log(this.state.tabs);
    }

    componentDidMount() {

    }

    _renderSelectedPhotos() {
        let {height, width} = Dimensions.get('window');
        let { notePhotos } = this.props.draftNote;
        let photos = [];

        height -= 51;

        if (notePhotos != null && notePhotos.length > 0) {
            notePhotos.forEach(function(photo, index){
                let key = "" + index;
                let image = <Image key={key} tabLabel={key} source={photo} resizeMode='contain' style={{height:height, width:width}}/>
                photos.push(image);
            });
        }

        return photos;
    }

    render() {
        console.log(this.state.tabs);
        return (
            <View style={[styles.container, {minHeight: height}]}>
                <Toolbar
                    title=""
                    navigator={this.props.navigator}
                    hideDrop={true}
                    rightImg={garbageImg}
                    />

                <ScrollableTabView
                    scrollWithoutAnimation={true}
                    style={{marginTop: 0}}
                    tabBarPosition='overlayBottom'
                    renderTabBar={()=> <DefaultTabBar/>}
                    initialPage={0}
                    >
                    {this._renderSelectedPhotos()}
                </ScrollableTabView>
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

export default connect(mapStateToProps)(PhotosReviewPage);