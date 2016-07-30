'use strict';

import {
    AsyncStorage
} from 'react-native';

export function naviGoBack(navigator) {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
}

var TOKEN_STORAGE_KEY = '@duoshouji:token';

export async function getToken() {
    try {
        let token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
        if (token !== null){
            this.state.token = token;
        } else {
            // fetch('https://duoshouji.com/endpoint/token', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         uid: '1111111111'
            //     })
            // }).then(response => response.json()).then((responseJson) => {
            //     AsyncStorage.setItem(TOKEN_STORAGE_KEY, responseJson.token);
            // }).catch((error) => {
            //     console.error(error);
            // });
        }
    } catch (error) {
        console.log('Failed to get token from server, AsyncStorage error: ' + error.message);
    }
}