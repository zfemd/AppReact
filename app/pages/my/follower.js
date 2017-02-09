import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Image,
    Switch,
    ListView,
    Dimensions,
    Animated,
    InteractionManager,
    Navigator,
    Platform
} from 'react-native';
import styles from './followStyle';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/toolbar/ImageButton.js';
import { naviGoBack, Token ,request, toast, follow } from '../../utils/common';
import Contacts from 'react-native-contacts';
import images from '../../constants/images';
import UserPage from '../../pages/user';
import _ from 'lodash';
import Spinner from 'react-native-spinkit';
import { connect } from 'react-redux';
import {fetchFollowerList} from '../../actions/follow';

const {height, width} = Dimensions.get('window');
var backImg = require('../../assets/upload/rg_left.png');

class Follower extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.follow.followingList)
        };
    }

    componentDidMount() {
        const { dispatch, route } = this.props;
        dispatch(fetchFollowerList(route.userId));
    }

    componentWillMount() {

    }

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        if (!rowData.hasBeFollowed) {
            this.state.opacity[rowData.phone] = new Animated.Value(1);
            this.state.toLeft[rowData.phone] = new Animated.Value(0);
            this.state.height[rowData.phone] = new Animated.Value(50);

            return (
                <TouchableOpacity underlayColor="transparent" activeOpacity={0.5}>
                    <Animated.View
                        style={{opacity: this.state.opacity[rowData.phone],
                                left: this.state.toLeft[rowData.phone],
                                height: this.state.height[rowData.phone]}}>
                        <View style={styles.friendsRow}>
                            <View style={{flex:1}}>
                                <TouchableOpacity
                                    style={{flex:1,flexDirection: 'row'}}
                                    onPress={() => this._jumpToUserPage(rowData.userId)}
                                    >
                                    <Image style={styles.portrait}
                                           source={{uri: (rowData.portrait ? rowData.portrait : images.DEFAULT_PORTRAIT), width: 34, height: 34}}/>
                                    <View style={styles.name}>
                                        <Text>{rowData.name}</Text>
                                        <Text>{rowData.phone}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.invite}>
                                {
                                    rowData.hasRegistered ?
                                        <TouchableHighlight onPress={()=>this._follow(rowData)}
                                                            style={styles.button}>
                                            <Image source={require('../../assets/invite/follow.png')}></Image>
                                        </TouchableHighlight>
                                        :
                                        <TouchableHighlight onPress={()=>this._invite(rowData.phone)}
                                                            style={styles.button}>
                                            <Image source={require('../../assets/invite/invite.png')}></Image>
                                        </TouchableHighlight>

                                }
                            </View>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            );
        }
        else {
            return null;
        }
    }

    _jumpToUserPage(userId) {
        if (userId <= 0)
            return null;
        const { navigator } = this.props;
        const token = this.state.token;
        if (token) {
            InteractionManager.runAfterInteractions(() => {
                navigator.push({
                    component: UserPage,
                    name: 'UserPage',
                    sceneConfigs: Navigator.SceneConfigs.FloatFromRight,
                    userId: userId
                });
            });
        }
    }

    render() {
        return (
            <View style={[styles.container,{minHeight: height}, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="我的粉丝"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />

                {
                    <View style={styles.listContainer}>
                        <ListView
                            contentContainerStyle={styles.friendsList}
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            enableEmptySections={true}
                            />
                    </View>
                }

            </View>
        )

    }
}

function mapStateToProps(state) {
    const { follow } = state;
    return {
        follow
    };
}

export default connect(mapStateToProps)(Follower);