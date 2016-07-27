'use strict';

import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');

class HomeFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            dropAnim: new Animated.Value(-150),
        }
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(
                this.state.fadeAnim,
                {toValue: 0.4}
            ),
            Animated.timing(
                this.state.dropAnim,
                {toValue: 0}
            )
        ]).start();

    }

    render() {
        return (
            <View style={styles.cate}>
                <Animated.View style={[styles.cateList, {marginTop: this.state.dropAnim}]}>
                    <TouchableOpacity style={styles.cateItem}>
                        <Text style={styles.cateFont}>全部</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cateItem}>
                        <Text style={styles.cateFont}>关注</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cateItem}>
                        <Text style={styles.cateFont}>附件</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.cateShadow, {opacity: this.state.fadeAnim}]}>

                </Animated.View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    cate: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: 58,
        zIndex: 1,
        flexDirection: 'column',
    },
    cateShadow: {
        backgroundColor: '#000',
        width: width,
        height: height,
    },
    cateList: {
        backgroundColor: '#fff',
        height: 120,
        opacity: 1,
        width: width,
        zIndex: 1,
    },
    cateItem: {
        height: 40,
        borderWidth: 1,
        borderColor: '#fff',
        borderTopColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cateFont: {
        fontSize: 14,
        color: '#9b9b9b'
    }
});

export default HomeFilter;