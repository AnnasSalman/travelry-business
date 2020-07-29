import React, { useState, useRef, useEffect} from 'react'
import { View, StyleSheet, Text} from 'react-native'
import Colors from "../constants/Colors";
import StepIndicator from "expo-step-indicator";
import ViewPager from "@react-native-community/viewpager";
import BasicInfo from "../components/organisms/AddProperty/BasicInfo";
import LayoutAndPricing from "../components/organisms/AddProperty/LayoutandPricing";
import Facilities from "../components/organisms/AddProperty/FacilitiesandServices";
import Amenities from "../components/organisms/AddProperty/Amenities";
import Policies from "../components/organisms/AddProperty/Policies";
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import {addAccountDetails} from "../store/actions/accountDetails";

const labels = ["Basic Info","Room Data","Facilities","Amenities","Policies"];
const greenBack = Colors.DefaultTheme.splashBackground
const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize:44,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.DarkTheme.onSurface,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.DarkTheme.onSurface,
    stepStrokeUnFinishedColor: 'grey',
    separatorFinishedColor: Colors.DarkTheme.onSurface,
    separatorUnFinishedColor: 'grey',
    stepIndicatorFinishedColor: Colors.DarkTheme.onSurface,
    stepIndicatorUnFinishedColor: Colors.DefaultTheme.surface,
    stepIndicatorCurrentColor: greenBack,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 17,
    stepIndicatorLabelCurrentColor: Colors.DarkTheme.onSurface,
    stepIndicatorLabelFinishedColor: greenBack,
    stepIndicatorLabelUnFinishedColor: greenBack,
    labelColor: Colors.DarkTheme.onSurface,
    labelSize: 13,
    currentStepLabelColor: Colors.DarkTheme.onSurface
}

const CreateHotelAccountScreen = props => {

    const dispatch = useDispatch()
    const accountDetails = useSelector(state=>state.accountDetails)
    const pager = useRef(null);
    const [page, setPage] = useState(0)

    useEffect(()=>{
        console.log('HELLO')
        if(accountDetails.user){
            props.navigation.navigate('homeScreen')
        }
    },[accountDetails])

    const onNextHandler = () => {
        pager.current.setPage(page+1)
        setPage(page+1)
    }

    const onPreviousHandler = () => {
        pager.current.setPage(page-1)
        setPage(page-1)
    }

    const onCancelHandler = () => {
        props.navigation.navigate('Init')
    }

    const onConfirmHandler = async() => {
        try {
            await axios.post('/users/addhotel', {
                user: await SecureStore.getItemAsync('UserID'),
                ...accountDetails
            })
        }
        catch (e) {
            console.log('error')
            return
        }
        try{
            const hotel = await axios.get('users/hotel/'+await SecureStore.getItemAsync('UserID'))
            if(hotel.status === 200){
                dispatch(addAccountDetails(hotel.data.hotel))
            }
        }
        catch (e) {
            console.log(error)
        }
    }

    return (
        <View style={styles.main}>
            <View style={styles.steps}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={page}
                    labels={labels}
                />
            </View>
            <ViewPager initialPage={0} style={{flex:1}} scrollEnabled={false} ref={pager}>
                <View key="1" style={{flex:1}}>
                    <BasicInfo style={{ alignItems: 'center' }}
                               onNext={()=>onNextHandler()}
                               onCancel={()=>onCancelHandler()}
                    />
                </View>
                <View key="2" style={{flex:1}}>
                    <LayoutAndPricing
                        onNext={()=>onNextHandler()}
                        onPrevious={()=>onPreviousHandler()}
                    />
                </View>
                <View key="3" style={{flex:1}}>
                    <Facilities
                        onNext={()=>onNextHandler()}
                        onPrevious={()=>onPreviousHandler()}
                    />
                </View>
                <View key="4" style={{flex:1}}>
                    <Amenities
                        onNext={()=>onNextHandler()}
                        onPrevious={()=>onPreviousHandler()}
                    />
                </View>
                <View key="5" style={{flex:1}}>
                    <Policies
                        onNext={()=>onNextHandler()}
                        onPrevious={()=>onPreviousHandler()}
                        onConfirm={()=>onConfirmHandler()}
                    />
                </View>
            </ViewPager>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    steps:{
      paddingTop: 30,
      paddingBottom: 20,
        backgroundColor: greenBack
    },
    nextButtonText: {
        top: 15,
        color: Colors.DefaultTheme.splashBackground,
        fontSize: 25
    },
});

export default CreateHotelAccountScreen;
