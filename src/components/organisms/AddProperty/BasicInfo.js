import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import {Provider, Modal, Portal, Button} from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Title from "../../atoms/TextFormats/Title";
import Colors from "../../../constants/Colors";
import FormTextInputDark from '../../atoms/FormTextInput/FormTextInputDark';
import FormTextInputDefault from "../../atoms/FormTextInput/FormTextInputDefault";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Keys from "../../../constants/Keys";
import {Formik} from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import {addBasicInfo} from "../../../store/actions/accountDetails";
import styles from "./FormStyles/FormStyles";

const basicInfoSchema = yup.object({
    hotelName: yup.string().required().min(5).label('Hotel Name'),
    starRating: yup.string().required().test('is-num-1-7', 'Star Rating must be between 1 and 7', (val) => {
        return parseInt(val)<8 && parseInt(val)>0;
    }).label('Star Rating'),
    contactName: yup.string().required().label('Contact Name'),
    email: yup.string().required().email(),
    altPhone: yup.string().min(10).max(10).label('Phone Number'),
    streetAdd: yup.string().required().label('Street Address'),
    add2: yup.string().required().label('Street Address'),
    city: yup.string().required().label('City'),
    zip: yup.string().required().label('Zip')
})

const {width, height} = Dimensions.get('window')

const BasicInfo = props => {
    const [modalVisible, isModalVisible] = useState(false)
    const _showModal = () => isModalVisible(true);
    const _hideModal = () => isModalVisible(false);
    const dispatch = useDispatch();

    return (
        <Provider>
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
        >
            <Formik
                initialValues={{
                    hotelName: '',
                    starRating: '',
                    contactName: '',
                    email: '',
                    altPhone: '',
                    streetAdd: '',
                    add2: '',
                    city: '',
                    zip: ''
                }}
                validationSchema={basicInfoSchema}
                onSubmit={(values,actions)=>{
                    dispatch(addBasicInfo(values))
                    props.onNext()
                }}>
                {
                    (formikProps)=>(
                        <View>
                            <View style={styles.divDark}>
                                <Title style={{color:'white', marginLeft:20, marginTop: 15}}>Property Info</Title>
                                <Text style={styles.errorText}>{formikProps.touched.hotelName && formikProps.errors.hotelName}</Text>
                                <FormTextInputDark label='Hotel Name*' value={formikProps.values.hotelName}
                                                   onChangeText={formikProps.handleChange('hotelName')}
                                                   onBlur={formikProps.handleBlur('hotelName')}/>
                                <Text style={styles.errorText}>{formikProps.touched.starRating && formikProps.errors.starRating}</Text>
                                <FormTextInputDark label='Star Rating*' value={formikProps.values.starRating}
                                                   onChangeText={formikProps.handleChange('starRating')}
                                                   style={{marginBottom:40}}
                                                   onBlur={formikProps.handleBlur('starRating')}
                                                   keyboardType='numeric'/>
                            </View>

                            <View>
                                <Title style={{color: Colors.DefaultTheme.splashBackground, marginLeft:20, marginTop: 25}}>Contact Details</Title>
                                <Text style={styles.errorText}>{formikProps.touched.contactName && formikProps.errors.contactName}</Text>
                                <FormTextInputDefault label='Contact Name*' value={formikProps.values.contactName}
                                                      onChangeText={formikProps.handleChange('contactName')}
                                                      onBlur={formikProps.handleBlur('contactName')}
                                />
                                <Text style={styles.errorText}>{formikProps.touched.altPhone && formikProps.errors.altPhone}</Text>
                                <FormTextInputDefault label='Alternative Phone' value={formikProps.values.altPhone}
                                                      onChangeText={formikProps.handleChange('altPhone')}
                                                      onBlur={formikProps.handleBlur('altPhone')}
                                                      keyboardType='phone-pad'
                                />
                                <Text style={styles.errorText}>{formikProps.touched.email && formikProps.errors.email}</Text>
                                <FormTextInputDefault label='email*' value={formikProps.values.email}
                                                      onChangeText={formikProps.handleChange('email')}
                                                      style={{marginBottom: 40}}
                                                      onBlur={formikProps.handleBlur('email')}
                                />
                            </View>

                            <View style={{...styles.divDark, borderRadius: 15, marginBottom: '5%'}}>
                                <Title style={{color:'white', marginLeft:20, marginTop: 20}}>Property Location</Title>
                                <Text style={styles.errorText}>{formikProps.touched.streetAdd && formikProps.errors.streetAdd}</Text>
                                <FormTextInputDark label='Street Address*' value={formikProps.values.streetAdd}
                                                   onChangeText={formikProps.handleChange('streetAdd')}
                                                   onBlur={formikProps.handleBlur('streetAdd')}/>
                                <Text style={styles.errorText}>{formikProps.touched.add2 && formikProps.errors.add2}</Text>
                                <FormTextInputDark label='Address Line 2*' value={formikProps.values.add2}
                                                   onChangeText={formikProps.handleChange('add2')}
                                                   onBlur={formikProps.handleBlur('add2')}/>
                                <Text style={styles.errorText}>{formikProps.touched.city && formikProps.errors.city}</Text>
                                <Text style={styles.errorText}>{formikProps.touched.zip && formikProps.errors.zip}</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <FormTextInputDark label='City*' value={formikProps.values.city}
                                                       onChangeText={formikProps.handleChange('city')}
                                                       style={{width: (width-80)*0.75}}
                                                       onFocus={()=>_showModal()}
                                                       onBlur={formikProps.handleBlur('city')}/>
                                    <FormTextInputDark label='Zip*' value={formikProps.values.zip}
                                                       onChangeText={formikProps.handleChange('zip')}
                                                       style={{width: (width-80)*0.25, marginBottom: 40}}
                                                       onBlur={formikProps.handleBlur('zip')}/>
                                </View>
                            </View>
                            <Portal>
                                <Modal visible={modalVisible} onDismiss={_hideModal} contentContainerStyle={styles.modal}>
                                    <GooglePlacesAutocomplete
                                        autoFocus={true}
                                        styles={autoComplete}
                                        placeholder='City'
                                        onPress={(data, details = null) => {
                                            // 'details' is provided when fetchDetails = true
                                            if(data.terms.length<=1){

                                            }
                                            else if(data.terms.length>1){
                                                formikProps.values.city = data.terms[data.terms.length - 2].value
                                                _hideModal()
                                            }
                                        }}
                                        query={{
                                            key: Keys.Places,
                                            components: 'country:pk'
                                        }}
                                    />
                                </Modal>
                            </Portal>
                            <View style={styles.navButtonContainer}>
                                <Button mode="contained"
                                        style={styles.nextButton}
                                        onPress={props.onCancel}
                                        color={Colors.DefaultTheme.splashBackground}
                                        contentStyle={{height: 50}}>
                                    Cancel
                                </Button>
                                <Button mode="contained"
                                        style={styles.nextButton}
                                        onPress={formikProps.handleSubmit}
                                        color={Colors.DefaultTheme.splashBackground}
                                        contentStyle={{height: 50}}>
                                    Next
                                </Button>
                            </View>
                        </View>
                    )
                }
            </Formik>
        </KeyboardAwareScrollView>
        </Provider>
    );
}




const autoComplete = {
    textInputContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderBottomColor: 'white',
        borderBottomWidth: 2
    },
    textInput: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 38,
        color: '#5d5d5d',
        fontSize: 20,
        borderBottomColor: Colors.DefaultTheme.splashBackground,
        borderBottomWidth: 2
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
    listView: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
    },
}

export default BasicInfo;
