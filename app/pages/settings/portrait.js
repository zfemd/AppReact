import React  from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Platform,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import { naviGoBack } from '../../utils/common';

var {height, width} = Dimensions.get('window');

class Portrait extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const info = this.props.route.info;
        const pHeight = width;
        const pWidth = info.portraitWidth/info.portraitHeight*pHeight;
        return(
            <View style={styles.portraitContainer}>

                <View style={styles.fullPortrait}>
                    <Image  style={[styles.fullPortraitImg]} source={{uri: info.thumbUri, width: pWidth, height: pHeight}} />
                </View>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonFont}>更换头像</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,styles.buttonGrey]} onPress={()=>naviGoBack(this.props.navigator)}>
                    <Text style={styles.buttonFont}>取消</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Portrait;