'use strict';

import React, { PropTypes } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import Spinner from 'react-native-spinkit';

var {height, width} = Dimensions.get('window');

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    componentWillMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rectangle}>
                    <Spinner style={styles.spinner} isVisible size={45} type="FadingCircleAlt" color={'#ffffff'}/>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: width,
        height: height+ 21,
        left: 0,
        top: 0,
        marginTop: -21,
        backgroundColor: 'rgba(0,0,0,.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    },
    rectangle:{
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.8)',
        borderRadius: 8
    },
    spinner: {
        marginLeft: -10,
        marginTop: -10,
    }
});



export default Loading;