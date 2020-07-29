import React, {useState} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Formik, Field} from "formik";
import {addBasicInfo, addFacilitiesInfo} from "../../../store/actions/accountDetails";
import {Provider, Checkbox, Button} from "react-native-paper";
import Title from "../../atoms/TextFormats/Title";
import Colors from "../../../constants/Colors";
import styles from "./FormStyles/FormStyles";
import FormPickerInputDefault from "../../atoms/FormPickerInput/FormPickerInputDefault";
import FeatureCheckbox from "../../atoms/FeaturesCheckbox/FeatureCheckbox";
import * as yup from "yup";
import {useDispatch} from "react-redux";

const facilitiesInfoSchema = yup.object({
    parking: yup.string().required().label('Parking'),
    breakfast: yup.string().required().label('Breakfast'),
})

const parkingOptions = [
    {
        label: 'No',
        value: 'No',
    },
    {
        label: 'Yes, paid',
        value: 'Yes, paid',
    },
    {
        label: 'Yes, free',
        value: 'Yes, free',
    },
]

const breakfastOptions = [
    {
        label: 'No',
        value: 'No',
    },
    {
        label: 'Yes, included in the price',
        value: 'Yes, included in the price',
    },
    {
        label: 'Yes, optional',
        value: 'Yes, optional',
    },
]

const checked =
    [
        {label: 'Free Wifi', icon: 'wifi'},
        {label: 'Restaurant', icon: 'silverware'},
        {label: 'Room Service', icon: 'broom'},
        {label: '24 hour front-desk', icon: 'room-service'},
        {label: 'Fitness center', icon: 'dumbbell'},
        {label: 'Garden', icon: 'tree'},
        {label: 'Family rooms', icon: 'home-heart'},
        {label: 'Swimming pool', icon: 'pool'},
        {label: 'Air Conditioning', icon: 'air-conditioner'},
        {label: 'Backup Generator', icon: 'transmission-tower'},
    ]

const Facilities = props => {
    const dispatch=useDispatch()

    const [facilities, setFacilities]= useState([])

    const onCheckHandler = (label) => {
        setFacilities([...facilities, label])
    }

    const onUnCheckHandler = (label) => {
        const facilityTemp = facilities
        facilityTemp.splice(facilityTemp.indexOf(label), 1);
        setFacilities(facilityTemp)
    }


    return (
        <Provider>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <Formik
                    initialValues={{
                        parking: '',
                        breakfast: '',
                        otherFacilities: []

                    }}
                    validationSchema={facilitiesInfoSchema}
                    onSubmit={(values,actions)=>{
                        dispatch(addFacilitiesInfo({...values, facilities}))
                        props.onNext()
                    }}>
                    {
                        (formikProps)=>(
                            <View>
                                <View style={styles.divDark}>
                                    <Title style={{color: 'white', marginLeft:20, marginTop: 25}}>Parking Availability</Title>
                                    <Text style={stylesLocal.textLight}>Is parking available?</Text>
                                    <Text style={styles.errorText}>{formikProps.touched.parking && formikProps.errors.parking}</Text>
                                    <FormPickerInputDefault
                                        placeholder={{
                                            label: 'Select a Parking Option...',
                                            value: '',
                                        }}
                                        items={parkingOptions}
                                        onValueChange={formikProps.handleChange('parking')}
                                        value={formikProps.values.parking}
                                        useNativeAndroidPickerStyle={false} //android only
                                        hideIcon={true}
                                    />
                                    <Title style={{color: 'white', marginLeft:20, marginTop: 25}}>Breakfast Availability</Title>
                                    <Text style={stylesLocal.textLight}>Is breakfast available to guests?</Text>
                                    <Text style={styles.errorText}>{formikProps.touched.breakfast && formikProps.errors.breakfast}</Text>
                                    <FormPickerInputDefault
                                        placeholder={{
                                            label: 'Select a Breakfast Option...',
                                            value: '',
                                        }}
                                        items={breakfastOptions}
                                        onValueChange={formikProps.handleChange('breakfast')}
                                        value={formikProps.values.breakfast}
                                        useNativeAndroidPickerStyle={false} //android only
                                        hideIcon={true}
                                    />
                                </View>
                                <View style={styles.divLight}>
                                    <Title style={{color: Colors.DefaultTheme.splashBackground, marginLeft:20, marginTop: 25}}>Other Facilities</Title>
                                    <Text style={stylesLocal.textDark}>Select Facilities to make them available</Text>
                                    {
                                        checked.map((facility)=>(
                                            <FeatureCheckbox
                                                 label={facility.label}
                                                 icon={facility.icon}
                                                 onCheck={()=>onCheckHandler(facility.label)}
                                                 onUnCheck={()=>onUnCheckHandler(facility.label)}
                                                 key={facility.label}
                                            />
                                        ))
                                    }
                                </View>
                                <View style={styles.navButtonContainer}>
                                    <Button mode="contained"
                                            style={styles.nextButton}
                                            onPress={props.onPrevious}
                                            color={Colors.DefaultTheme.splashBackground}
                                            contentStyle={{height: 50}}>
                                        Previous
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

const stylesLocal = StyleSheet.create({
    textLight: {
        marginLeft:20,
        fontSize: 15,
        color: 'white'
    },
    textDark: {
        marginLeft:20,
        fontSize: 15,
        color: Colors.DefaultTheme.splashBackground
    }
})

export default Facilities;
