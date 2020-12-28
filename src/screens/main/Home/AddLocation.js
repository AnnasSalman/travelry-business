import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from "../../../constants/Colors";
import {IconButton, Button} from 'react-native-paper'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Keys from "../../../constants/Keys";
import Loading from "../../../components/atoms/Loading/Loading";
import {updateCoordinates} from "../../../Requests/HotelData/HotelData";
import {updateGeometry} from "../../../store/actions/accountDetails";
import {useDispatch} from "react-redux";

const AddLocation = props => {

    const mapRef = useRef(null)
    const dispatch = useDispatch()

    const [usersCoordinates, setUsersCoordinates] = useState({
        latitude: props.navigation.state.params.geometry?props.navigation.state.params.geometry.coordinates[1]:73.067322,
        longitude: props.navigation.state.params.geometry?props.navigation.state.params.geometry.coordinates[0]:73.067322,
        latitudeDelta: 0.011,
        longitudeDelta: 0.011
    })
    const [initialLoad, setInitialLoad] = useState(!props.navigation.state.params.geometry)
    const [addedCoordinates, setAddedCoordinates] = useState([])
    const [updateLoad, setUpdateLoad] = useState(false)


    useEffect(()=>{
        if(!props.navigation.state.params.geometry) {
            findCoordinates()
        }
    },[])

    useEffect(()=>{
        if(!props.navigation.state.params.geometry){
            mapRef.current.animateCamera(
                {
                    center: {
                        latitude: usersCoordinates.latitude,
                        longitude: usersCoordinates.longitude,
                    },
                    pitch: 0,
                    heading: 0,

                    // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
                    // altitude: 0.9,

                    // Only when using Google Maps.
                    zoom: 17
                }
            )
        }
    },[usersCoordinates])

    const _updateLocation = async() => {
        setUpdateLoad(true)
        try{
            const geometry = {
                coordinates: addedCoordinates
            }
            const status = await updateCoordinates(props.navigation.state.params.hotelId, geometry)
            console.log(status)
            if(status === 200){
                setUpdateLoad(false)
                dispatch(updateGeometry(geometry))
                _goBack()
            }
        }
        catch(e){
            setUpdateLoad(false)
        }
    }

    const findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = position;
                setUsersCoordinates({...usersCoordinates, latitude: location.coords.latitude, longitude: location.coords.longitude});
                setInitialLoad(false)
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    const _positionChange = (region) => {
        setAddedCoordinates([
            region.longitude,
            region.latitude
        ])
    }

    const _goBack = () => {
        props.navigation.goBack()
    }

    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <IconButton
                    color={Colors.DefaultTheme.primary}
                    size={22}
                    icon={'chevron-left'}
                    onPress={_goBack}
                />
                <Text style={styles.title}>Pick Location</Text>
            </View>
            <View style={{flex: 1}}>
                <MapView
                    style={styles.map}
                    initialRegion={
                        usersCoordinates
                    }
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={MapStyles}
                    ref={mapRef}
                    // onMapReady={mapState.onMapReady}
                    onRegionChangeComplete={(region)=>_positionChange(region)}
                >
                </MapView>
                <View style={styles.position}></View>
            </View>
            <View style={styles.bottomBar}>
                <Button
                    mode={'contained'}
                    color={Colors.DefaultTheme.primary}
                    style={styles.pickButton}
                    onPress={_updateLocation}
                >
                    Pick Location
                </Button>
            </View>
            {initialLoad?
                <View style={styles.loadingView}>
                    <Loading animating={true} type={'Fold'} color={Colors.DefaultTheme.primary} size={50}/>
                </View>
                :null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.DarkTheme.background,
        paddingTop: 20,
    },
    title: {
        fontSize: 22,
        fontFamily: 'poppins-medium',
        color: Colors.DefaultTheme.primary,
        marginVertical: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    map: {
        height: '100%',
        width: '100%'
    },
    position: {
        position: 'absolute',
        left: '47.5%',
        top: '48.5%',
        width: 20,
        height: 20,
        backgroundColor: Colors.DefaultTheme.primary,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'red'
    },
    loadingView: {
        position: 'absolute',
        right: 10,
        top: 30
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 80,
        backgroundColor: '#242f3e',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
    },
    pickButton: {
        width: '90%',
        height: 40,
        justifyContent: 'center',
        borderRadius: 15
    }
})

const MapStyles=[
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#101820"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#263c3f"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6b9a76"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#38414e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#212a37"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9ca5b3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1f2835"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f3d19c"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2f3948"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#515c6d"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    }
]

export default AddLocation
