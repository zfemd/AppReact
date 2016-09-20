import React from 'react';
import {
    Dimensions,
    Image,
    InteractionManager
} from 'react-native';
import {
    Token
} from '../../utils/common';
import Home from '../home';
import LoginPage from '../login/LoginPage';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../../assets/logo/splash.png');

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }

    async componentDidMount() {
        const { navigator } = this.props;
        let isTokenValid = false;

        this.timer = setTimeout(() => {
            if (isTokenValid) {
                InteractionManager.runAfterInteractions(() => {
                    navigator.resetTo({
                        component: Home,
                        name: 'Home',
                        params: {store: this.props.store}
                    });
                });
            } else {
                navigator.resetTo({
                    component: LoginPage,
                    name: 'LoginPage',
                    params: {store: this.props.store}
                });
            }
        }, 2000);

        isTokenValid = await Token.isTokenValid();

        //fetch('http://facebook.github.io/react-native/movies.json', {
        //    method: 'GET',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json'
        //    }
        //}).then((response) => response.json()).then((responseJson) => {
        //    console.log(responseJson);
        //    return responseJson.movies;
        //}).catch((error) => {
        //    console.error(error);
        //});
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <Image
                style={{ width: 284, height: 200, top: (maxHeight-200)/2, left: (maxWidth-284)/2, borderRadius: 20 }}
                source={splashImg}
                />
        );
    }
}

export default Splash;