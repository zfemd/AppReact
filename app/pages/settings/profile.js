import React  from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Platform,
    Image,
    AsyncStorage,
    Navigator
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import StorageKeys from '../../constants/StorageKeys';
import images from '../../constants/images';
import portraitPage from '../settings/portrait';

var chevronRightIcon = <Icon style={[styles.messageLinkIcon]} size={16} name="angle-right"/>;

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this._updatePortrait = this._updatePortrait.bind(this);
        this.state = {
            user: {}
        }
    }

    componentWillMount() {
        AsyncStorage.getItem(StorageKeys.ME_STORAGE_KEY).then((meDetail)=> {
            if (meDetail !== null) {
                const detail = JSON.parse(meDetail);
                this.setState({user: detail});
            }
        })

    }

    _updatePortrait(info) {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'portraitPage',
                component: portraitPage,
                sceneConfigs: Navigator.SceneConfigs.FadeAndroid,
                info: info
            })
        }
    }

    render() {
        return (
            <View key="m" style={[{backgroundColor: '#f5f5f5', flex: 1},Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="个人资料"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />

                <TouchableHighlight onPress={()=>this._updatePortrait(this.state.user)} >
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            <Image style={styles.profilePortrait}
                                   source={{uri: this.state.user.thumbUri?this.state.user.thumbUri:images.DEFAULT_IMAGE, width: 45, height: 45}}/>
                        </Text>
                        <View style={styles.profileArrow}>
                            <Text style={styles.profileText}>修改头像</Text>
                            <View>{chevronRightIcon}</View>
                        </View>

                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal}/>

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>昵称</Text>
                        <View style={styles.profileArrow}>
                            <Text style={styles.profileText}>{this.state.user.name}</Text>
                            <View>{chevronRightIcon}</View>
                        </View>

                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal}/>

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>性别</Text>
                        <View style={styles.profileArrow}>
                            <Text style={styles.profileText}>{ this.state.user.gender && this.state.user.gender == 'women' ? '女' : '男' }</Text>
                            <View>{chevronRightIcon}</View>
                        </View>

                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal}/>


            </View>
        )
    }
}

export default ProfilePage;