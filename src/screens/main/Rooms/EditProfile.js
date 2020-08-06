import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Dimensions} from 'react-native'
import {Button, TextInput} from "react-native-paper";
import Colors from "../../../constants/Colors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {withFormik} from "formik";
import * as yup from "yup";
import axios from 'axios'
import {useDispatch} from "react-redux";
import {updateRoomsInfo} from "../../../store/actions/accountDetails";
import Loading from "../../../components/atoms/Loading/Loading";
import { HeaderBackButton } from 'react-navigation-stack';

const {width, height} = Dimensions.get('window')

const updateRooms = async(room, rooms, hotel) => {

    let roomIndex = 0
    rooms.forEach((roomObj, index)=>{
        if(roomObj.key===room.key){
            roomIndex = index
        }
    })
    const roomsUpdated = [...rooms]
    roomsUpdated[roomIndex] = room
    try{
        const roomResult = await axios.put('/users/hotel/'+hotel._id+'/updaterooms', {
            roomInfo: roomsUpdated
        })
        if(roomResult.status===200){
            return roomResult.data.roomInfo
        }
    }
    catch(e){
        return e
    }
}

const roomDataSchema = yup.object({
    roomType: yup.string().required().label('Room Type'),
    roomName: yup.string().required().label('Room Name'),
    numberOfRooms: yup.string().required().label('Number of Rooms'),
    amountOfGuests: yup.string().required().label('Amount of Guests'),
    price: yup.string().required().label('Price'),
    description: yup.string().test('len', 'Must be less than 100 characters', val => val?val.length <= 100:true)
})

const formWrapper = withFormik({
    enableReinitialize: true,
    mapPropsToValues: props => {
        let description = ''
        if(props.navigation.state.params.room.description){
            description = props.navigation.state.params.room.description
        }
        return{...props.navigation.state.params.room, description}
    },
    validationSchema: roomDataSchema,
    handleSubmit: async(values,{props, ...actions}) => {
        let description = ''
        if(props.navigation.state.params.room.description){
            description = props.navigation.state.params.room.description
        }
        if(!(JSON.stringify({...props.navigation.state.params.room, description}) === JSON.stringify(values))){
            try{
                const updatedRooms = await updateRooms(
                                            values,
                                            props.navigation.state.params.rooms,
                                            props.navigation.state.params.hotel
                                        )
                actions.setStatus({error: false, updatedRooms})
            }
            catch(e){
                actions.setStatus({error: true})
            }
        }
    },
})

const EditProfile = props => {

    const dispatch = useDispatch()

    const {
        isSubmitting,
        values,
        actions,
        handleSubmit,
        setFieldValue,
        navigation,
        status,
        touched,
        errors,
        handleChange,
        handleBlur,
    } = props;

    const [loading, setloading] = useState(false)

    useEffect(() => {
        navigation.setParams({
            saveHandler: saveHandler,
        })
    }, [])

    useEffect(() => {
        navigation.setParams({
            loading: loading
        })
    }, [loading])

    useEffect(()=>{
        if(status && !status.error){
            dispatch(updateRoomsInfo(status.updatedRooms))
            props.navigation.goBack()
        }
    },[status])

    useEffect(()=>{
        setloading(isSubmitting)
    },[isSubmitting])

    const saveHandler = () => {
            handleSubmit()
    }

    return(
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            style={{backgroundColor: Colors.DarkTheme.background}}
        >
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                <View style={styles.container}>
                    <TextInput
                        label='Room Name (Required)'
                        value={values.roomName}
                        onChangeText={handleChange('roomName')}
                        onBlur={handleBlur('roomName')}
                        theme={{colors:{
                                primary: Colors.DefaultTheme.background,
                                placeholder: Colors.DefaultTheme.background,
                                text: Colors.DefaultTheme.background,
                            }}}
                        style={styles.textInput}
                        underlineColor={Colors.DefaultTheme.background}
                    />
                    <Text style={styles.body}>This is usually the common characteristic of the rooms in these categories
                        for example: 'First Floor Rooms'.</Text>
                    <Text style={styles.errorText}>{touched.roomName && errors.roomName}</Text>
                    <TextInput
                        label='RoomType (Required)'
                        value={values.roomType}
                        onChangeText={handleChange('roomType')}
                        onBlur={handleBlur('roomType')}
                        theme={{colors:{
                                primary: Colors.DefaultTheme.background,
                                placeholder: Colors.DefaultTheme.background,
                                text: Colors.DefaultTheme.background,
                            }}}
                        style={styles.textInput}
                        underlineColor={Colors.DefaultTheme.background}
                    />
                    <Text style={styles.body}>This is the type of rooms that are in this category. This may be "Twin", "Single" etc.</Text>
                    <Text style={styles.errorText}>{touched.roomType && errors.roomType}</Text>
                    <TextInput
                        label='Description'
                        value={values.description}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        theme={{colors:{
                                primary: Colors.DefaultTheme.background,
                                placeholder: Colors.DefaultTheme.background,
                                text: Colors.DefaultTheme.background,
                            }}}
                        style={styles.textInput}
                        underlineColor={Colors.DefaultTheme.background}
                        multiline
                    />
                    <Text style={styles.body}>A short description of the room. {values.description.length}/100 characters.</Text>
                    <Text style={styles.errorText}>{touched.description && errors.description}</Text>
                    <View>
                        <TextInput
                            label='Number of guests (Required)'
                            value={values.amountOfGuests}
                            onChangeText={handleChange('amountOfGuests')}
                            onBlur={handleBlur('amountOfGuests')}
                            theme={{colors:{
                                    primary: Colors.DefaultTheme.background,
                                    placeholder: Colors.DefaultTheme.background,
                                    text: Colors.DefaultTheme.background,
                                }}}
                            style={{...styles.textInput, width: '60%'}}
                            keyboardType='numeric'
                            underlineColor={Colors.DefaultTheme.background}
                        />
                        <Text style={styles.body}>Guest allowed for this type of room.</Text>
                        <Text style={styles.errorText}>{touched.amountOfGuests && errors.amountOfGuests}</Text>
                        <TextInput
                            label='Price (Required)'
                            value={values.price}
                            onChangeText={handleChange('price')}
                            onBlur={handleBlur('price')}
                            theme={{colors:{
                                    primary: Colors.DefaultTheme.background,
                                    placeholder: Colors.DefaultTheme.background,
                                    text: Colors.DefaultTheme.background,
                                }}}
                            style={{...styles.textInput, width: '50%'}}
                            keyboardType='numeric'
                            underlineColor={Colors.DefaultTheme.background}
                        />
                        <Text style={styles.body}>Price per room.</Text>
                        <Text style={styles.errorText}>{touched.price && errors.price}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    textInput: {
        backgroundColor: 'transparent',
        margin: 10,
        marginBottom: 0,
        marginTop: 5
    },
    body:{
        fontSize: 14,
        color: 'grey',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '2%',
        marginBottom: '1%',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginLeft: '5%',
        marginRight: '5%',
    },
    save: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        borderWidth: 0
    },
})


EditProfile.navigationOptions = ({navigation}) => {
    return {
        // headerShown: false,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgba(0, 0, 0 ,0.4)'
        },
        headerTitle: 'Edit Profile',
        headerLeft: () => (
            navigation.state.params.loading?
                null:
                <HeaderBackButton
                    label='Cancel'
                    tintColor='white'
                    onPress={()=>navigation.goBack()}
                />
        ),
        headerRight: () => (
            navigation.state.params.loading?
            <Loading animating={navigation.state.params.loading}/>:
            <Button
                mode="outlined"
                onPress={() => navigation.state.params.saveHandler()}
                color='white'
                style={styles.save}
            >
                Save
            </Button>
            // <HeaderButtons HeaderButtonComponent={HeaderButton}>
            //     <Item
            //         title="Menu"
            //         iconName="ios-menu"
            //         onPress={() => {
            //             navData.navigation.toggleDrawer();
            //         }}
            //     />
            // </HeaderButtons>
        )
    };
};

export default formWrapper(EditProfile)
