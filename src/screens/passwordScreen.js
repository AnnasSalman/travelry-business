import React, {useState} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import FormTextInputDefault from "../components/atoms/FormTextInput/FormTextInputDefault";
import {Formik} from "formik";
import * as yup from "yup";
import styles from "../components/organisms/AddProperty/FormStyles/FormStyles";
import Title from "../components/atoms/TextFormats/Title";
import Colors from "../constants/Colors";
import {Button} from "react-native-paper";
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';


const passwordSchema = yup.object({
    password: yup
        .string()
        .required('Please Enter your password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    repassword: yup
        .string()
        .required()
        .label('Confirm password')
        .test('passwords-match', 'Passwords must match', function(value) {
            return this.parent.password === value;
        }),
})

const passwordScreen = props => {

    const [loading, setloading] = useState(false)
    const [buttonText, setButtonText] = useState('Confirm')

    return(
        <View>
            <Formik
                initialValues={{
                    password: '',
                    repassword: ''
                }}
                validationSchema={passwordSchema}
                onSubmit={async (values,actions)=>{
                    setloading(true)
                    setButtonText('')
                    try{
                        const status = await axios.post('/users/signup', {
                            username: props.navigation.state.params.phone,
                            password: values.password,
                        })
                        if(status.data.success){
                            console.log('step1')
                            const loginstatus = await axios.post('/users/login', {
                                username: props.navigation.state.params.phone,
                                password: values.password,
                            })
                            if(loginstatus.data.success){
                                console.log('step2')
                                await SecureStore.setItemAsync('Authorization',loginstatus.data.token)
                                await SecureStore.setItemAsync('UserID',loginstatus.data.user._id)
                                axios.defaults.headers.common['Authorization'] = 'Bearer '+ loginstatus.data.token;
                                props.navigation.navigate('hotelInfo')
                            }
                        }
                    }
                    catch(error){
                        setloading(false)
                        setButtonText('Confirm')
                        console.log(error)
                    }
                }}>
                {
                    (formikProps)=>(
                        <View style={localStyles.container}>
                            <Title style={{color:Colors.DefaultTheme.splashBackground, marginLeft:20, marginTop: 50}}>Enter a password</Title>
                            <FormTextInputDefault label='Password*' value={formikProps.values.password}
                                                  onChangeText={formikProps.handleChange('password')}
                                                  style={{margin: 20, marginBottom: 0}}
                                                  onBlur={formikProps.handleBlur('password')}
                                                  secureTextEntry={true}
                            />
                            <Text style={{...styles.errorText, fontSize: 12}}>{formikProps.touched.password && formikProps.errors.password}</Text>
                            <FormTextInputDefault label='Re-Enter Password*' value={formikProps.values.repassword}
                                                  onChangeText={formikProps.handleChange('repassword')}
                                                  style={{margin: 20, marginBottom: 0}}
                                                  onBlur={formikProps.handleBlur('repassword')}
                                                  secureTextEntry={true}
                            />
                            <Text style={{...styles.errorText, fontSize: 12}}>{formikProps.touched.repassword && formikProps.errors.repassword}</Text>
                            <Button mode="contained"
                                    style={{...styles.nextButton, width:'100%', marginTop: 30}}
                                    onPress={formikProps.handleSubmit}
                                    color={Colors.DefaultTheme.splashBackground}
                                    contentStyle={{height: 50}}
                                    loading={loading}>
                                {buttonText}
                            </Button>
                        </View>
                    )
                }
            </Formik>
        </View>
    )
}

const localStyles = StyleSheet.create({
    container:{
    }
})

export default passwordScreen
