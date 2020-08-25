import React from 'react'
import {Text, View} from 'react-native'
import {Button} from "react-native-paper";
import * as SecureStore from "expo-secure-store";

const Home = props =>{
    return(
        <View>
            <Button
                onPress={async()=>{
                    try{
                        await SecureStore.deleteItemAsync('UserID')
                        await SecureStore.deleteItemAsync('Authorization')
                        props.navigation.navigate('Init')
                    }
                    catch(e){
                        console.log(e)
                    }
                }}
            >
                LOGOUT
            </Button>
        </View>
    )
}

export default Home
