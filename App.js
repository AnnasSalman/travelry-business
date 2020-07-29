import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigation from "./src/navigation/AppNavigation";
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import authentication from "./src/store/reducers/authentication";
import accountDetails from "./src/store/reducers/accountDetails";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios'
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";


const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

const getHeader = async() =>  await SecureStore.getItemAsync('Authorization')

axios.defaults.baseURL = uri;
// axios.defaults.headers.common['Authorization'] = 'Bearer '+ getHeader();

const rootReducer = combineReducers({
    authentication,
    accountDetails
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = async() => {

  await Font.loadAsync(
      {
        'the-bold-font': require('./assets/fonts/theboldfont.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
        'poppins-regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
        'poppins-medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
          'poppins-bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf')
      }
  )
}

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false)

    if(!dataLoaded){
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={()=> {
                setDataLoaded(true)
                console.log('loadeddd')
            }}
            onError={(err)=>console.log(err)}/>
    }
    fetchFonts()

    return (
        <Provider store={store}>
            <AppNavigation/>
        </Provider>
    );
}


