/**
 * Created by lyan2 on 16/9/23.
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

class SecurityPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <Toolbar
                    title="账号与安全"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>手机号</Text>
                        <Text style={styles.phoneText}>13585979772</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>微信账号</Text>
                        <Text style={styles.boundText}>已绑定</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>新浪微博</Text>
                        <Text style={styles.boundText}>已绑定</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>QQ账号</Text>
                        <Text style={styles.boundText}>已绑定</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>淘宝账号</Text>
                        <Text style={styles.boundText}>已绑定</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>支付宝账号</Text>
                        <Text style={styles.boundText}>已绑定</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>

            </View>
        )
    }
}

export default SecurityPage;