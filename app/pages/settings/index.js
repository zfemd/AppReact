/**
 * Created by lyan2 on 16/9/22.
 */
import React  from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';

var chevronRightIcon = <Icon style={[styles.messageLinkIcon]} size={16} name="angle-right"/>;

class SettingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <Toolbar
                    title="设置"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>个人资料</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>账户于安全</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>关于我们</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>功能说明</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>登出</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>

            </View>
        )
    }
}

export default SettingPage;