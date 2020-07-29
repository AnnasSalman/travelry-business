import React, {useEffect, useState, useRef} from 'react'
import { View, Text, StyleSheet, Dimensions} from 'react-native'
import {TextInput,IconButton} from "react-native-paper";
import Colors from "../constants/Colors";
import firebase from '../Firebase/Firebase'
import { BarIndicator } from 'react-native-indicators'

const {height, width} = Dimensions.get('window')

const NumberConfirmationScreen = props => {

    const textInput = useRef(null)

    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)

    const codeRequest = async(verificationCode) => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                props.navigation.state.params.verificationId,
                verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            props.navigation.navigate('password', {phone: props.navigation.state.params.phone})
        } catch (err) {
            console.log(err)
        }
    }

    const checkcodeLength = (text) => {
        setCode(text)
        if(text.length===6){
            setLoading(true)
            codeRequest(text)
        }
    }

    useEffect(()=>{
        textInput.current.focus()
    })

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <IconButton
                    icon="chevron-left"
                    color={Colors.DefaultTheme.onSecondary}
                    size={40}
                    onPress={() => props.navigation.goBack()}
                />
                <Text style={styles.text}>Enter Your Verification Code</Text>
                <View style={styles.textView}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text=>checkcodeLength(text)}
                        value={code}
                        ref={textInput}
                        selectionColor={Colors.DefaultTheme.splashBackground}
                        theme={{colors: {primary: Colors.DefaultTheme.splashBackground, fontSize: 25}}}
                        keyboardType={'number-pad'}
                        editable={!loading}
                    />
                    <BarIndicator
                        animating={loading}
                        color={Colors.DefaultTheme.splashBackground}
                        count={4}
                        size={60}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: {
        fontFamily: 'poppins-medium',
        fontSize: 25,
        marginBottom: 15
    },
    textInput: {
        width: width*0.45,
        fontSize: 25,
    },
    container: {
        marginTop: height*0.04
    },
    textView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginBottom: 5,
        marginTop: height*0.16,
        justifyContent: 'center',
        backgroundColor: Colors.DefaultTheme.splashBackground,
        borderRadius: 30,
        shadowColor: 'black',
        shadowRadius: 2
    },
    description: {
        marginTop: 10,
        textAlign: 'center',
        color: 'grey'
    }
});

export default NumberConfirmationScreen;
