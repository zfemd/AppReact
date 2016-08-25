'use strict';

import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <Toolbar
                    title="评论"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />
                <View style={styles.comment}>
                    <TextInput
                        style={styles.commentText}
                        placeholder={'来说说你的心得吧'}
                        placeholderTextColor='#bebebe'
                        multiline={true}
                        />
                </View>
                <View style={styles.shortcut}>
                    <Text style={styles.at}>
                        @
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.props.press}>
                    <Text style={styles.buttonFont} >发布</Text>
                </TouchableOpacity>
            </View>
        )

    }
}

export default User;