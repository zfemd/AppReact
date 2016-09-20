'use strict';

import {
    AsyncStorage
} from 'react-native';
import StorageKeys from '../constants/StorageKeys';

export function naviGoBack(navigator) {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
};

export class Token {};

Token.getToken = async function() {
    var token = null;

    try {
        token = await AsyncStorage.getItem(StorageKeys.TOKEN_STORAGE_KEY, (error, result) => {
            if (error) {
                console.error("Error happened when to get token: " + error);
            }
        });

        if (token == null) {
            console.log(token);
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

    return token;
};

Token.setToken = function (token) {
    if (token) {
        try {
            AsyncStorage.setItem(StorageKeys.TOKEN_STORAGE_KEY, token);
        } catch (error) {
            console.error('Failed to store token, AsyncStorage error: ' + error.message);
        }
    }
};

Token.isTokenValid = async function () {
    let token = await Token.getToken();

    if (token) {
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
        return true;
    }

    return false;
};
