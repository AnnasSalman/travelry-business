import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DropDown from "../../atoms/DropDown/DropDown";
import Title from "../../atoms/TextFormats/Title";
import Colors from "../../../constants/Colors";
import FeatureCheckbox from "../../atoms/FeaturesCheckbox/FeatureCheckbox";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import CheckBox from "react-native-web/src/exports/CheckBox";
import styles from "./FormStyles/FormStyles";
import {Button} from "react-native-paper";
import {addAmenities, addFacilitiesInfo} from "../../../store/actions/accountDetails";
import {useDispatch} from "react-redux";

const checked = [
    {
        name: 'Room',
        data: [
            {label: 'Sofa Bed', icon: 'sofa'},
            {label: 'Wardrobe', icon: 'wardrobe'},
            {label: 'Carpeted', icon: 'script'},
            {label: 'Fireplace', icon: 'fireplace'},
            {label: 'Heating', icon: 'radiator'},
            {label: 'Iron', icon: 'tshirt-crew'},
            {label: 'Private entrance', icon: 'door'},
            {label: 'Sound proof', icon: 'volume-off'},
            {label: 'Sitting area', icon: 'seat'},
            {label: 'Wooden flooring', icon: 'layers'},
            {label: 'Desk', icon: 'desk-lamp'},
        ],
    },
    {
        name: 'Bathroom',
        data: [
            {label: 'Toilet paper', icon: 'toilet'},
            {label: 'Bath tub', icon: 'hot-tub'},
            {label: 'Hair dryer', icon: 'air-filter'},
            {label: 'Shower', icon: 'shower-head'},
        ],
    },
    {
        name: 'Media',
        data: [
            {label: 'Computer', icon: 'desktop-classic'},
            {label: 'Game Console', icon: 'gamepad-variant'},
            {label: 'Laptop', icon: 'laptop'},
            {label: 'Flat Screen TV', icon: 'television'},
            {label: 'Telephone', icon: 'phone-hangup'},
        ],
    },
    {
        name: 'Food',
        data: [
            {label: 'Dining Area', icon: 'silverware'},
            {label: 'Barbecue', icon: 'grill'},
            {label: 'Toaster', icon: 'bread-slice'},
            {label: 'Electric Kettle', icon: 'kettle'},
            {label: 'Microwave', icon: 'microwave'},
            {label: 'Refrigerator', icon: 'fridge'},
        ],
    },
    {
        name: 'Services',
        data: [
            {label: 'Alarm Clock', icon: 'alarm'},
            {label: 'Towels', icon: 'scale-bathroom'},
        ],
    },
    {
        name: 'Accessibility',
        data: [
            {label: 'Elevator', icon: 'elevator'},
            {label: 'Stairs only', icon: 'stairs'},
            {label: 'Wheelchair access', icon: 'wheelchair-accessibility'},
        ],
    },
    {
        name: 'View',
        data: [
            {label: 'City view', icon: 'city'},
            {label: 'Garden view', icon: 'tree'},
            {label: 'Lake view', icon: 'waves'},
            {label: 'Landmark view', icon: 'lighthouse'},
            {label: 'Mountain view', icon: 'image-filter-hdr'},
            {label: 'Pool view', icon: 'pool'},
            {label: 'River view', icon: 'wave'},
            {label: 'Ocean view', icon: 'tower-beach'},
        ],
    },
]

const Amenities = props => {

    const dispatch = useDispatch()
    const [selectedAmenities, setSelectedAmenities] = useState({
        rooms:[],
        bathroom:[],
        media:[],
        food:[],
        services:[],
        view:[],
        accessibility:[]

    })

    const onCheckHandler = (category ,label) => {

        switch (category) {
            case 'Room':
                setSelectedAmenities({...selectedAmenities, rooms: [...selectedAmenities.rooms, label]})
                break
            case 'Bathroom':
                setSelectedAmenities({...selectedAmenities, bathroom: [...selectedAmenities.bathroom, label]})
                break
            case 'Media':
                setSelectedAmenities({...selectedAmenities, media: [...selectedAmenities.media, label]})
                break
            case 'Food':
                setSelectedAmenities({...selectedAmenities, food: [...selectedAmenities.food, label]})
                break
            case 'Services':
                setSelectedAmenities({...selectedAmenities, services: [...selectedAmenities.services, label]})
                break
            case 'View':
                setSelectedAmenities({...selectedAmenities, view: [...selectedAmenities.view, label]})
                break
            case 'Accessibility':
                setSelectedAmenities({...selectedAmenities, accessibility: [...selectedAmenities.accessibility, label]})
        }
    }

    const onUnCheckHandler = (category, label) => {
        switch (category) {
            case 'Room':
                const roomTemp = selectedAmenities.rooms
                roomTemp.splice(roomTemp.indexOf(label), 1);
                setSelectedAmenities({...selectedAmenities, rooms: roomTemp})
                break
            case 'Bathroom':
                const bathroomTemp = selectedAmenities.bathroom
                bathroomTemp.splice(bathroomTemp.indexOf(label), 1);
                setSelectedAmenities({...selectedAmenities, bathroom: bathroomTemp})
                break
            case 'Media':
                const mediaTemp = selectedAmenities.media
                mediaTemp.splice(mediaTemp.indexOf(label), 1);
                setSelectedAmenities({...selectedAmenities, media: mediaTemp})
                break
            case 'Food':
                const foodTemp = selectedAmenities.food
                foodTemp.splice(foodTemp.indexOf(label), 1);
                setSelectedAmenities({...selectedAmenities, food: foodTemp})
                break
            case 'Services':
                const servicesTemp = selectedAmenities.services
                servicesTemp.splice(servicesTemp.indexOf(label), 1);
                setSelectedAmenities({...selectedAmenities, services: servicesTemp})
                break
            case 'View':
                const viewTemp = selectedAmenities.view
                viewTemp.splice(viewTemp.indexOf(label), 1);
                setSelectedAmenities({...selectedAmenities, view: viewTemp})
                break
            case 'Accessibility':
                const accessibilityTemp = selectedAmenities.accessibility
                accessibilityTemp.splice(accessibilityTemp.indexOf(label), 1);
                setSelectedAmenities({...selectedAmenities, accessibility: accessibilityTemp})
        }
    }

    const getLength = (category) => {
        switch (category) {
            case 'Room':
                return selectedAmenities.rooms.length
            case 'Bathroom':
                return selectedAmenities.bathroom.length
            case 'Media':
                return selectedAmenities.media.length
            case 'Food':
                return selectedAmenities.food.length
            case 'Services':
                return selectedAmenities.services.length
            case 'View':
                return selectedAmenities.view.length
            case 'Accessibility':
                return selectedAmenities.accessibility.length
        }
    }

    const handleSubmit = () => {
        dispatch(addAmenities(selectedAmenities))
        props.onNext()
    }

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
        >
            <View>
                <Title style={{color: Colors.DefaultTheme.splashBackground, marginLeft:20, marginTop: 25}}>Amenities</Title>
                {
                    checked.map((menu)=>(
                        <DropDown name={menu.name} key={menu.name} selectedLength={getLength(menu.name)}>
                            {menu.data.map((check)=>(
                                <FeatureCheckbox
                                    key={check.label}
                                    label={check.label}
                                    icon={check.icon}
                                    onCheck={()=>onCheckHandler(menu.name, check.label)}
                                    onUnCheck={()=>onUnCheckHandler(menu.name, check.label)}/>
                            ))}
                        </DropDown>
                    ))
                }
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
                            onPress={handleSubmit}
                            color={Colors.DefaultTheme.splashBackground}
                            contentStyle={{height: 50}}>
                        Next
                    </Button>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Amenities;
