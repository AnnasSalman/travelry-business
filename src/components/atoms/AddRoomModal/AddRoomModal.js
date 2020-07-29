import React, {useState, useRef} from 'react'
import { View, Text, StyleSheet,TextInput} from 'react-native'
import FormPickerInputDefault from "../../atoms/FormPickerInput/FormPickerInputDefault";
import FormTextInputDefault from "../../atoms/FormTextInput/FormTextInputDefault";
import {Formik} from "formik";
import Title from "../../atoms/TextFormats/Title";
import Colors from "../../../constants/Colors";
import styles from "../../organisms/AddProperty/FormStyles/FormStyles";
import {Button} from "react-native-paper";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import { v5 as uuidv5 } from 'uuid';
import {useDispatch} from "react-redux";
import {addRoomInfo, updateRoomInfo} from "../../../store/actions/accountDetails";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const roomDataSchema = yup.object({
    roomType: yup.string().required().label('Room Type'),
    roomName: yup.string().required().label('Room Name'),
    numberOfRooms: yup.string().required().label('Number of Rooms'),
    amountOfGuests: yup.string().required().label('Amount of Guests'),
    price: yup.string().required().label('Price'),
})

const AddRoomModal = props =>{
    const dispatch = useDispatch();
    const [items, setItems] = useState([
        {
            label: 'Single',
            value: 'Single',
        },
        {
            label: 'Double',
            value: 'double',
        },
        {
            label: 'Twin',
            value: 'Twin',
        },
        {
            label: 'Triple',
            value: 'Triple',
        },
        {
            label: 'Triple',
            value: 'Triple',
        },
        {
            label: 'Family',
            value: 'Family',
        },
    ],)

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
        >
        <Formik
            initialValues={props.formData.form}
            validationSchema={roomDataSchema}
            onSubmit={(values,actions)=>{
                if(props.formData.mode==='default'){
                    dispatch(addRoomInfo({key: uuidv4(),...values, available: values.numberOfRooms, unavailable: '0', occupied: '0'}))
                    props.onCancel()
                }
                else{
                    dispatch(updateRoomInfo({key: props.formData.key,...values, available: values.numberOfRooms, unavailable: '0', occupied: '0'}))
                    props.onCancel()
                }
            }}>
            {
                (formikProps)=>(

                    <View>
                        <Title style={{color: Colors.DefaultTheme.splashBackground, marginLeft:20, marginTop: 25}}>Room Data</Title>
                        <Text style={styles.errorText}>{formikProps.touched.roomType && formikProps.errors.roomType}</Text>
                        <FormPickerInputDefault
                            placeholder={{
                                label: 'Select a Room Type...',
                                value: '',
                            }}
                            items={items}
                            onValueChange={formikProps.handleChange('roomType')}
                            value={formikProps.values.roomType}
                            useNativeAndroidPickerStyle={false} //android only
                            hideIcon={true}
                        />
                        <Text style={styles.errorText}>{formikProps.touched.roomName && formikProps.errors.roomName}</Text>
                        <FormTextInputDefault label='Room Name*'
                                              value={formikProps.values.roomName}
                                              onChangeText={formikProps.handleChange('roomName')}
                                              onBlur={formikProps.handleBlur('roomName')}/>
                        <Text style={styles.errorText}>{formikProps.touched.numberOfRooms && formikProps.errors.numberOfRooms}</Text>
                        <FormTextInputDefault label='Number Of Rooms (of this type)*'
                                              value={formikProps.values.numberOfRooms}
                                              keyboardType='numeric'
                                              onChangeText={formikProps.handleChange('numberOfRooms')}
                                              onBlur={formikProps.handleBlur('numberOfRooms')}/>
                        <Text style={styles.errorText}>{formikProps.touched.amountOfGuests && formikProps.errors.amountOfGuests}</Text>
                        <FormTextInputDefault label='How many guests can stay in this room?*'
                                              value={formikProps.values.amountOfGuests}
                                              keyboardType='numeric'
                                              onChangeText={formikProps.handleChange('amountOfGuests')}
                                              onBlur={formikProps.handleBlur('amountOfGuests')}/>
                        <Text style={styles.errorText}>{formikProps.touched.price && formikProps.errors.price}</Text>
                        <FormTextInputDefault label='Price per room (PKR)*'
                                              value={formikProps.values.price}
                                              keyboardType='numeric'
                                              onChangeText={formikProps.handleChange('price')}
                                              onBlur={formikProps.handleBlur('price')}/>
                        <View style={styles.navButtonContainer}>
                            <Button mode="contained"
                                    style={styles.nextButton}
                                    onPress={formikProps.handleSubmit}
                                    color={Colors.DefaultTheme.splashBackground}
                                    contentStyle={{height: 50}}>
                                {props.formData.mode==='default'?'Add Room':'Update Room'}
                            </Button>
                            <Button mode="contained"
                                    style={styles.nextButton}
                                    onPress={props.onCancel}
                                    color={Colors.DefaultTheme.splashBackground}
                                    contentStyle={{height: 50}}>
                                Cancel
                            </Button>
                        </View>
                    </View>
                )}
        </Formik>
        </KeyboardAwareScrollView>
    );
}


export default AddRoomModal;
