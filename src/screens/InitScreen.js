import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import { createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import {useDispatch} from "react-redux";

import Colors from '../constants/Colors'
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {addAccountDetails} from "../store/actions/accountDetails";
const { height, width } = Dimensions.get('window')


const InitScreen = props => {
    const dispatch = useDispatch()

    useEffect(()=>{
        const checkLogin = async() => {
            console.log(await SecureStore.getItemAsync('UserID'))
            console.log(await SecureStore.getItemAsync('Authorization'))
            if(await SecureStore.getItemAsync('UserID')){
                axios.defaults.headers.common['Authorization'] = 'Bearer '+ await SecureStore.getItemAsync('Authorization');
                try{
                    const hotel = await axios.get('users/hotel/'+await SecureStore.getItemAsync('UserID'))
                    if(hotel.status === 200){
                        dispatch(addAccountDetails(hotel.data.hotel))
                        props.navigation.navigate('homeScreen')
                    }
                }
                catch (e) {
                    console.log(e)
                }
            }
        }
        checkLogin()
    },[])

    const navcreateAccountScreen = () => {
        props.navigation.navigate('createAccount')
    }

    return (
        <View style={styles.main}>
            <Image source={require('../../assets/logo/logo.png')} style={styles.logo}/>
            <View style={styles.content}>
                <Text style={styles.terms}>By tapping "Log in" or "Create a new account", you agree to our terms.</Text>
                <View style={styles.buttonContainer}>
                    <Button mode="text"
                            onPress={() => navcreateAccountScreen()}
                            uppercase={false}
                            color={Colors.DarkTheme.onSurface}
                            style={{...styles.textButton, marginTop: 20}}>
                        Create a new account
                    </Button>
                </View>
                <Button mode="outline"
                        style={styles.loginButton}
                        onPress={() => props.navigation.navigate('loginScreen')}
                        color={Colors.DarkTheme.onSurface}
                        contentStyle={{height: 50}}>
                    LOG IN WITH PHONE NUMBER
                </Button>
                <Button mode="outline"
                        style={styles.loginButton}
                        onPress={() => props.navigation.navigate('hotelInfo')}
                        color={Colors.DarkTheme.onSurface}
                        contentStyle={{height: 50}}>
                    LOG IN WITH EMAIL
                </Button>
                <View style={styles.buttonContainer}>
                    <Button mode="text"
                            onPress={() => console.log('Pressed')}
                            uppercase={false} color={Colors.DarkTheme.onSurface}
                            style={styles.textButton}>
                        Trouble logging in?
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: Colors.DefaultTheme.splashBackground,

    },
    content:{
        marginRight: width*0.04,
        marginLeft: width*0.04,
        marginBottom: height*0.04
    },
    logo: {
      width: width*0.92,
      height: 175
    },
    terms:{
      textAlign: 'center',
        color: 'grey',
    },
    loginButton: {
        marginBottom: 5,
        marginTop: 10,
        justifyContent: 'center',
        fontSize: 12,
        borderColor: Colors.DarkTheme.onSurface,
        borderWidth: 2,
        borderRadius: 30
    },
    textButton: {
        marginTop: 10,
        borderBottomColor: Colors.DarkTheme.onSurface,
        width: 200,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default InitScreen;
