import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, ImageBackground} from 'react-native'
import {Button, IconButton} from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import Colors from "../../constants/Colors";
import {useSelector} from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {postHotelCoverImage, getHotelCoverURI} from '../../Requests/Images/Images'
import {uri} from "../../constants/Addresses";
import Keys from "../../constants/Keys";


const {height, width} = Dimensions.get('window')

const Home = props =>{

    const basicInfo = useSelector(State=>State.accountDetails.basicInfo)
    const hotelId = useSelector(State=>State.accountDetails._id)
    const geometry = useSelector(State=>State.accountDetails.geometry)

    const [coverUploaded, setCoverUploaded] = useState(false)
    const [image, setImage] = useState(require('../../../assets/placeholders/hotel.png'));
    const [coverLoading, setCoverLoading] = useState(false)

    useEffect(()=>{
        getCoverImage()
    },[])

    const openLocationPicker = () => {
        props.navigation.navigate('locationScreen', {geometry: geometry?geometry:null, hotelId})
    }

    const getCoverImage = async() => {
        try{
            const coverUri = await getHotelCoverURI(hotelId)
            setImage({uri: uri+'/hotels/hotel/images/'+coverUri})
            setCoverUploaded(true)
        }
        catch (e){
            console.log(e)
        }
    }

    const _uploadHotelCover = async() => {
        setCoverLoading(true)
        try{
            console.log(image.uri)
            await postHotelCoverImage(hotelId, image.uri)
            setCoverUploaded(true)
            setCoverLoading(false)
        }
        catch(e){
            console.log(e)
            setCoverLoading(false)
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [14, 9],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage({uri: result.uri});
            setCoverUploaded(false)
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.topMessage}>Welcome, <Text style={{color: Colors.DefaultTheme.primary, fontSize: 26}}>{basicInfo.contactName}</Text></Text>
            <ScrollView
                contentContainerStyle={styles.scrollView}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.doubleHeight}
                        onPress={pickImage}
                    >
                        <ImageBackground source={image} style={{height: '100%'}}>
                            <Text style={styles.typeTitle}>Hotel Cover Image</Text>
                            {!coverUploaded?
                                <Button
                                    onPress={_uploadHotelCover}
                                    style={styles.typeButton}
                                    mode={'outlined'}
                                    color={Colors.DefaultTheme.primary}
                                    loading={coverLoading}
                                >
                                    upload
                                </Button>
                                :null
                            }
                            <IconButton
                                color={Colors.DefaultTheme.primary}
                                size={35}
                                icon={'home-city-outline'}
                                style={styles.itemIcon}
                            />
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={styles.verticalDoubleContainer}>
                        <View style={styles.singleHeight}>
                            <TouchableOpacity
                                style={{width: '100%', height: '100%'}}
                                onPress={openLocationPicker}
                            >
                                {
                                    geometry?
                                        <ImageBackground
                                            style={{height: '100%', width: '100%'}}
                                            source={{url: 'https://maps.googleapis.com/maps/api/staticmap?key='+Keys.mapsKey+'&markers=color:green%7Clabel:G%7C'+geometry.coordinates[1]+','+geometry.coordinates[0]+'&center='+geometry.coordinates[1]+','+geometry.coordinates[0]+'&zoom=15&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c&size=800x400'}}
                                        >
                                            <Text style={styles.typeTitle}>Update Location</Text>
                                        </ImageBackground>
                                    :null
                                }
                                <View style={{flex: 1, backgroundColor: Colors.DefaultTheme.primary}}/>
                                <IconButton
                                    color={Colors.DefaultTheme.primary}
                                    size={35}
                                    icon={'map-marker'}
                                    style={styles.itemIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.singleHeight}>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <IconButton
                onPress={async()=>{
                    try{
                        await SecureStore.deleteItemAsync('UserID')
                        await SecureStore.deleteItemAsync('Authorization')
                        props.navigation.navigate('Init')
                    }
                    catch(e){
                        console.log(e)
                    }
                }}
                icon={'logout'}
                color={Colors.DefaultTheme.primary}
                size={30}
                style={styles.logout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.DarkTheme.background,
        paddingTop: 40,
        paddingHorizontal: 20
    },
    topMessage: {
        color: Colors.DarkTheme.onBackground,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width*0.93
    },
    doubleHeight: {
        height: height*0.5,
        width: width*0.45,
        backgroundColor: Colors.DarkTheme.onPrimary,
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    singleHeight: {
        height: height*0.24,
        width: width*0.45,
        backgroundColor: Colors.DarkTheme.onError,
        borderRadius: 10,
        overflow: 'hidden'
    },
    verticalDoubleContainer: {
        justifyContent: 'space-between',
        height: height*0.5
    },
    scrollView: {
        alignItems: 'center'
    },
    typeTitle: {
        color: 'white',
        marginTop: 10,
        marginLeft: 10,
        fontFamily: 'poppins-medium'
    },
    typeButton: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    itemIcon: {
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    logout: {
        position: 'absolute',
        top: 28,
        right: 10
    }
})

export default Home
