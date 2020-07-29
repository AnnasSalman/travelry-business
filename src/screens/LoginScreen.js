import React, {useState} from 'react'
import styles from "../components/organisms/AddProperty/FormStyles/FormStyles";
import Title from "../components/atoms/TextFormats/Title";
import {Text, View, StyleSheet} from "react-native";
import FormTextInputDark from "../components/atoms/FormTextInput/FormTextInputDark";
import {addAccountDetails} from "../store/actions/accountDetails";
import {Formik} from "formik";
import Colors from "../constants/Colors";
import {Button} from "react-native-paper";
import * as yup from "yup";
import axios from 'axios'
import * as SecureStore from "expo-secure-store";
import {useDispatch, useSelector} from "react-redux";


const schema = yup.object({
    username: yup.string().required().label('Phone Number'),
    password: yup.string().required().label('Password'),
})

const LoginScreen = props => {

    const dispatch = useDispatch()

    const [loading, isloading] = useState(false)
    const [buttonText, setButtonText] = useState('Login')
    const [disabled, isdisabled ] = useState(false)
    const [errorText, seterrorText] = useState('')

    return(
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={schema}
            onSubmit={async(values,actions)=>{
                try{
                    isdisabled(true)
                    isloading(true)
                    setButtonText('')
                    const status = await axios.post('/users/login', values)
                    if(status.data.success){
                        await SecureStore.setItemAsync('Authorization',status.data.token)
                        await SecureStore.setItemAsync('UserID',status.data.user._id)
                        axios.defaults.headers.common['Authorization'] = 'Bearer '+ status.data.token;
                    }
                }
                catch(error){
                    isloading(false)
                    isdisabled(false)
                    seterrorText('Invalid credentials')
                    setButtonText('Login')
                    return
                }
                try{
                    const hotel = await axios.get('users/hotel/'+await SecureStore.getItemAsync('UserID'))
                    if(hotel.status === 200){
                        dispatch(addAccountDetails(hotel.data.hotel))
                        props.navigation.navigate('homeScreen')
                    }
                }
                catch (e) {
                    props.navigation.navigate('hotelInfo')
                }
            }}>
            {
                (formikProps)=>(
                    <View style={{...styles.divDark, height: '100%', borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
                        <Title style={{color:'white', marginLeft:20, marginTop: '20%'}}>Login to your account</Title>
                        <Text style={styles.errorText}>{formikProps.touched.username && formikProps.errors.username}</Text>
                        <FormTextInputDark label='Phone Number (10 digits after the initial 0)*' value={formikProps.values.username}
                                           onChangeText={formikProps.handleChange('username')}
                                           onBlur={formikProps.handleBlur('username')}
                                           keyboardType='numeric'/>
                        <Text style={styles.errorText}>{formikProps.touched.password && formikProps.errors.password}</Text>
                        <FormTextInputDark label='Password*' value={formikProps.values.password}
                                           onChangeText={formikProps.handleChange('password')}
                                           style={{marginBottom:40}}
                                           onBlur={formikProps.handleBlur('password')}
                                           secureTextEntry={true}
                        />
                       <View style={localStyles.loginView}>
                           <Text style={localStyles.errorText}>{errorText}</Text>
                            <Button mode="contained"
                                    disable={disabled}
                                    style={localStyles.loginButton}
                                    onPress={formikProps.handleSubmit}
                                    color={Colors.DarkTheme.onSurface}
                                    contentStyle={{height: 50}}
                                    loading={loading}>
                                {buttonText}
                            </Button>
                       </View>
                    </View>
                )
            }
        </Formik>
    )
}

const localStyles = StyleSheet.create({
    loginButton: {
        marginBottom: 5,
        marginTop: 0,
        justifyContent: 'center',
        fontSize: 12,
        borderColor: Colors.DarkTheme.onSurface,
        borderWidth: 2,
        borderRadius: 30,
        width: '90%'
    },
    loginView: {
        alignItems: 'center'
    },
    errorText: {
        color: 'orange',
        marginBottom: 10
    }
})

export default LoginScreen
