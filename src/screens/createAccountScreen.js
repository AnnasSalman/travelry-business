import React, {useEffect, useState, useRef} from 'react'
import { View, Text, StyleSheet, Dimensions} from 'react-native'
import {Button, TextInput,IconButton} from "react-native-paper";
import Colors from "../constants/Colors";
import firebase from '../Firebase/Firebase'
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'
import Axios from "axios";

const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
const {height, width} = Dimensions.get('window')

const createAccountScreen = props => {
    const recaptchaVerifier = useRef(null);
    const textInput = useRef(null)

    const [numValid, setnumValid] = useState(false)
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [userExists, doesUserExists] = useState(false)
    const [buttonText, setButtonText] = useState('CONTINUE')
    const [error, setError] = useState('')

    useEffect(()=>{
        textInput.current.focus()
    })

    const phoneNumberAvailability = () => {
        if(userExists){
            return <Text style={{...styles.description, color: 'red'}}>An account already exists on that phone number.{"\n"} Try another phone or go to the log in page</Text>
        }
    }

    const captchaRequest = async (phoneNumber) => {
        // setButtonText('')
        // setLoading(true)
        // try {
        //     const isUser = await Axios.get('/users/isuser/'+phoneNumber)
        //     console.log(isUser)
        //     if (isUser.data.status) {
        //         doesUserExists(true)
        //         setLoading(false)
        //         setButtonText('CONTINUE')
        //         setnumValid(false)
        //         return
        //     }
        // }
        // catch(error){
        //     console.log(error)
        // }
        // try {
        //     const phoneProvider = new firebase.auth.PhoneAuthProvider();
        //     const verificationId = await phoneProvider.verifyPhoneNumber(
        //         '+92'+phoneNumber,
        //         recaptchaVerifier.current
        //     );
        //     props.navigation.navigate('numberVerification',{verificationId: verificationId, phone: phoneNumber})
        // } catch (err) {
        //     console.log(err.type(),"phone: ",phoneNumber);
        // }
        props.navigation.navigate('password',{phone: phoneNumber})
    }

    const validateNumber = (num) => {
        setPhone(num)
        if(num.length===10){
            setnumValid(true)
        }
        else{
            setnumValid(false)
        }
    }

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                <IconButton
                    icon="chevron-left"
                    color={Colors.DefaultTheme.onSecondary}
                    size={40}
                    onPress={() => props.navigation.goBack()}
                />
                <Text style={styles.text}>Enter Your Number</Text>
                <View style={styles.textView}>
                    <Text style={{...styles.text, marginRight: 10, marginTop: height*0.0217}}>+92</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => validateNumber(text)}
                        value={phone}
                        ref={textInput}
                        selectionColor={Colors.DefaultTheme.splashBackground}
                        theme={{colors: {primary: Colors.DefaultTheme.splashBackground, fontSize: 25}}}
                        keyboardType={'number-pad'}
                    />
                </View>
                <Text style={styles.description}>We will send a text with a verification code. Message{"\n"} and data rates may apply</Text>
                {phoneNumberAvailability()}
                <Text style={{...styles.description, color: Colors.DefaultTheme.Error}}>{error}</Text>
                <Button mode="contained"
                        style={numValid?styles.button:{...styles.button, backgroundColor:'white'}}
                        onPress={() => captchaRequest(phone)}
                        color={numValid?Colors.DefaultTheme.primary:'grey'}
                        contentStyle={{height: 55}}
                        disabled={numValid?false:true}
                        loading={loading}>
                    {buttonText}
                </Button>
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
        width: width*0.65,
        fontSize: 25,
    },
    container: {
        marginTop: height*0.04
    },
    textView: {
        flexDirection: 'row',
        alignItems: 'center',
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

export default createAccountScreen;
