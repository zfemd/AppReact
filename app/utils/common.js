'use strict';

import {
    AsyncStorage
} from 'react-native';
import StorageKeys from '../constants/StorageKeys';
import configs from '../constants/configs';
import LoginPage from '../pages/login/LoginPage';

export function naviGoBack(navigator) {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
};

export class Token {
}
;

Token.getToken = async function (navigator) {
    var token = null;

    try {
        token = await AsyncStorage.getItem(StorageKeys.TOKEN_STORAGE_KEY, (error, result) => {
            if (error) {
                console.error("Error happened when to get token: " + error);
            }
        });

        if (token == null) {
            if (navigator) {
                navigator.resetTo({
                    component: LoginPage,
                    name: 'LoginPage'
                });
            }
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
         fetch(configs.serviceUrl + 'login/authenticate/token', {
             method: 'POST',
             headers: {
                 'X-App-Token': token
             }
         }).then(response => {
             if (response.ok) {
                 return response.json()
             }
         }).then((responseJson) => {
             if (responseJson && responseJson.resultCode == 0) {
                 if (responseJson.resultValues && responseJson.resultValues.loginSuccess) {
                     AsyncStorage.setItem(TOKEN_STORAGE_KEY, responseJson.token);
                     return true;
                 }
             }
         }).catch((error) => {
             Alert.alert('登陆失败', "网络连接失败：" + error);
         });
        //return false;
    }

    return true;
};

export function request(url, method, body) {
    let success;
    return new Promise((resolve, reject) => {
        fetch(configs.serviceUrl + url, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        }).then((response) => {
            if (response.status == 200) {
                success = true;
            } else {
                success = false;
            }
            return response.json();
        }).then((responseData) => {
            if (success) {
                resolve(responseData);
            } else {
                reject(responseData);
            }
        }).catch((error) => {
            reject(error);
        });
    });
}
