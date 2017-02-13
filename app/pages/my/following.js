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
import {fetchFollowingList} from '../../actions/follow';

const {height, width} = Dimensions.get('window');
var backImg = require('../../assets/upload/rg_left.png');

class Following extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        const { dispatch, route } = this.props;
        let the = this;
        dispatch(fetchFollowingList(route.userId)).then(()=>{
            the.setState({dataSource: the.ds.cloneWithRows(the.props.follow.followingList)});

        });
    }

    componentWillMount() {

    }

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        return (
            <TouchableOpacity underlayColor="transparent" activeOpacity={0.5}>
                <View style={styles.friendsRowC}>
                    <View style={styles.friendsRow}>
                        <View style={{flex:1}}>
                            <TouchableOpacity
                                style={{flex:1,flexDirection: 'row'}}
                                onPress={() => this._jumpToUserPage(rowData.userId)}
                                >
                                <Image style={styles.portrait}
                                       source={{uri: (rowData.portraitUrl ? rowData.portraitUrl : images.DEFAULT_PORTRAIT), width: 34, height: 34}}/>
                                <View style={styles.name}>
                                    <Text>{rowData.nickname}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _jumpToUserPage(userId) {
        if (userId <= 0)
            return null;
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: UserPage,
                name: 'UserPage',
                sceneConfigs: Navigator.SceneConfigs.FloatFromRight,
                userId: userId
            });
        });
    }

    render() {
        return (
            <View style={[styles.container,{minHeight: height}, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="我的关注"
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

export default connect(mapStateToProps)(Following);