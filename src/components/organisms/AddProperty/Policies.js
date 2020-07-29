import React, {useState} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {Button, IconButton} from "react-native-paper";
import Title from "../../atoms/TextFormats/Title";
import Colors from "../../../constants/Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {addPolicies} from "../../../store/actions/accountDetails";
import styles from "./FormStyles/FormStyles";
import {useDispatch, useSelector} from "react-redux";

const Policies = props => {

    const dispatch = useDispatch();

    const [date, setDate] = useState(
        {checkIn: {hours: 9, minutes: 0, seconds: 0},
                    checkOut: {hours: 9, minutes: 0, seconds: 0}}
                    )
    const [isDatePickerVisible, setDatePickerVisibility] = useState({checkIn: false, checkOut: false});
    const defaultCheckInDate = new Date()
    const defaultCheckOutDate = new Date()
    defaultCheckInDate.setSeconds(date.checkIn.seconds)
    defaultCheckInDate.setMinutes(date.checkIn.minutes)
    defaultCheckInDate.setHours(date.checkIn.hours)
    defaultCheckOutDate.setSeconds(date.checkOut.seconds)
    defaultCheckOutDate.setMinutes(date.checkOut.minutes)
    defaultCheckOutDate.setHours(date.checkOut.hours)

    const showDatePicker = (pickerType) => {
        switch (pickerType) {
            case 'checkIn':
                setDatePickerVisibility({...isDatePickerVisible, checkIn: true})
                break;
            case 'checkOut':
                setDatePickerVisibility({...isDatePickerVisible, checkOut: true})
                break;
        }
    };

    const hideDatePicker = (pickerType) => {
        switch (pickerType) {
            case 'checkIn':
                setDatePickerVisibility({...isDatePickerVisible, checkIn: false})
                break;
            case 'checkOut':
                setDatePickerVisibility({...isDatePickerVisible, checkOut: false})
                break;
        }
    };

    const handleConfirm = (dateObj, type) => {
        console.log(dateObj)
        const dateTemp = new Date(dateObj)
        if(type==='checkIn'){
            setDate({...date, checkIn: {hours: dateTemp.getHours(), minutes: dateTemp.getMinutes(), seconds: dateTemp.getSeconds()}})
            hideDatePicker('checkIn');
        }
        else if (type==='checkOut'){
            setDate({...date, checkOut: {hours: dateTemp.getHours(), minutes: dateTemp.getMinutes(), seconds: dateTemp.getSeconds()}})
            hideDatePicker('checkOut');
        }
    };

    const onSubmitHandler = () => {
        dispatch(addPolicies(date))
    }


    return (
            <View>
                <Title style={{color: Colors.DefaultTheme.splashBackground, marginLeft:20, marginTop: 25}}>Policies</Title>

                <Text style={{...stylesLocal.timeText, marginLeft: 20}}> Check in Time: </Text>
                <View style={stylesLocal.timeContainer}>
                    <Text style={stylesLocal.timeText}>{date.checkIn.hours<10?'0'+date.checkIn.hours:date.checkIn.hours}</Text>
                    <Text style={stylesLocal.timeText}> : </Text>
                    <Text style={stylesLocal.timeText}>{date.checkIn.minutes<10?'0'+date.checkIn.minutes:date.checkIn.minutes}</Text>
                    <IconButton
                        icon="circle-edit-outline"
                        color={Colors.DefaultTheme.splashBackground}
                        size={20}
                        onPress={() => showDatePicker('checkIn')}
                    />
                </View>

                <Text style={{...stylesLocal.timeText, marginLeft: 20}}> Check out Time: </Text>
                <View style={stylesLocal.timeContainer}>
                    <Text style={stylesLocal.timeText}>{date.checkOut.hours<10?'0'+date.checkOut.hours:date.checkOut.hours}</Text>
                    <Text style={stylesLocal.timeText}> : </Text>
                    <Text style={stylesLocal.timeText}>{date.checkOut.minutes<10?'0'+date.checkOut.minutes:date.checkOut.minutes}</Text>
                    <IconButton
                        icon="circle-edit-outline"
                        color={Colors.DefaultTheme.splashBackground}
                        size={20}
                        onPress={() => showDatePicker('checkOut')}
                    />
                </View>
                <DateTimePickerModal
                    style={{backgroundColor: Colors.DefaultTheme.splashBackground}}
                    date={defaultCheckInDate}
                    isVisible={isDatePickerVisible.checkIn}
                    pickerContainerStyleIOS={{backgroundColor: Colors.DefaultTheme.splashBackground}}
                    // customConfirmButtonIOS={confirmButton}
                    mode="time"
                    onCancel={()=>hideDatePicker('checkIn')}
                    onConfirm={(time)=>handleConfirm(time,'checkIn')}
                />
                <DateTimePickerModal
                    style={{backgroundColor: Colors.DefaultTheme.splashBackground}}
                    date={defaultCheckOutDate}
                    isVisible={isDatePickerVisible.checkOut}
                    pickerContainerStyleIOS={{backgroundColor: Colors.DefaultTheme.splashBackground}}
                    // customConfirmButtonIOS={confirmButton}
                    mode="time"
                    onCancel={()=>hideDatePicker('checkOut')}
                    onConfirm={(time)=>handleConfirm(time,'checkOut')}
                />
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
                            color={Colors.DefaultTheme.splashBackground}
                            contentStyle={{height: 50}}
                            onPress={props.onConfirm}>
                        Confirm
                    </Button>
                </View>
            </View>
    )
}

const stylesLocal = StyleSheet.create({
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.DefaultTheme.splashBackground,
        margin: 20
    },
    timeText: {
        fontSize: 20,
        color: Colors.DefaultTheme.splashBackground,
    }
})

export default Policies;
