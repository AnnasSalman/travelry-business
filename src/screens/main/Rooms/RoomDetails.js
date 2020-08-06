import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, ImageBackground, Dimensions} from 'react-native'
import room_back from '../../../temporary/room_back.jpg'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../../../constants/Colors";
import {useSelector} from "react-redux";
import {PieChart} from 'react-native-chart-kit'
import {Button} from "react-native-paper";
import {FontAwesome} from "react-native-vector-icons";
import axios from 'axios'
import {hotelRoomImagesURI} from "../../../constants/Addresses";
import Loading from "../../../components/atoms/Loading/Loading";

const {width, height} = Dimensions.get('window')

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const RoomDetails = props => {

    const [background, setbackground] = useState(null)
    const [chartData, setchartData] = useState([])
    const [loading , setloading] = useState(false)

    const room = useSelector(State => {
        let tempRoom = {}
        State.accountDetails.roomInfo.forEach((roomInfo)=>{
        if(roomInfo.key === props.navigation.state.params.item.key){
            tempRoom = roomInfo
            return
        }
    })
        return tempRoom
    })
    const rooms = useSelector(State => State.accountDetails.roomInfo)
    const hotel = useSelector(State => State.accountDetails)

    useEffect(()=>{
        setchartData(
        [
            {
                name: "Occupied",
                population: parseInt(room.occupied),
                color: 'rgb(0,128,0)',
                legendFontColor: "white",
                legendFontSize: 12
            },
            {
                name: "Vacant",
                population: parseInt(room.available),
                color: 'rgba(128,128,0, 0.9)',
                legendFontColor: "white",
                legendFontSize: 12
            },
            {
                name: "Unavailable",
                population: parseInt(room.unavailable),
                color: 'rgb(143,188,143)',
                legendFontColor: "white",
                legendFontSize: 12
            },
        ]
        )
    }, [room])
    useEffect(()=>{
        const fetchCover = async() => {
            setloading(true)
            try{
                const imgs = await axios.get("/hotels/"+hotel._id+"/getimages/"+room.key)
                imgs.data.forEach((image)=>{
                    console.log(image)
                    if(image.includes('cover')){
                        setbackground({uri:hotelRoomImagesURI+image})
                    }
                })
                setloading(false)
            }
            catch{
                setloading(false)
            }
        }
        fetchCover()
    },[])
    useEffect(() => {
        props.navigation.setParams({
            loading: loading
        })
    }, [loading])

    return(
        <ImageBackground source={background} style={styles.backgroundImage}>
            <LinearGradient
                style={styles.inner}
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                start={[0.8, 0.0]}
                end={[0.0, 0.6]}
            >
                <View style={styles.top}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{...styles.subtitleIndicator, borderTopRightRadius: 10}}></View>
                        <Text style={styles.subtitle}>Current Occupancy:</Text>
                    </View>
                    <View style={styles.chartView}>
                        <PieChart
                            data={chartData}
                            width={width*0.8}
                            height={100}
                            chartConfig={chartConfig}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="0"
                            absolute
                        />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.titleIndicator}></View>
                        <Text style={styles.title}>{room.roomName}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.subtitleIndicator}></View>
                        <Text style={styles.subtitle}>{room.numberOfRooms} {room.roomType} Rooms</Text>
                        <Text style={styles.subtitle}>{room.amountOfGuests} <FontAwesome name="user" size={20} color='white' /> each</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.subtitleIndicator}></View>
                        <Text style={{...styles.body, marginTop: 2}}>at Rs.{room.price} per night</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{...styles.bodyIndicator, borderBottomRightRadius: 10}}></View>
                        <Text style={styles.body}>{room.description?room.description:'No Description Available'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', margin: '8%'}}>
                        <Button
                            icon="pencil"
                            mode="outlined"
                            onPress={()=>props.navigation.navigate('editProfile',{room, rooms, hotel})}
                            style={styles.button}
                            color='white'
                        >
                            Edit Profile
                        </Button>
                        <Button
                            icon="camera"
                            mode="outlined"
                            onPress={() => props.navigation.navigate('addPhotos',{room, rooms, hotel})}
                            style={styles.button}
                            color='white'
                        >
                            Room Photos
                        </Button>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    )
}

RoomDetails.navigationOptions = ({navigation}) => {
    return {
        // headerShown: false,
        headerTintColor: 'white',
        headerTransparent: true,
        headerStyle: {
            backgroundColor: 'rgba(255, 255, 255 ,0)'
        },
        headerTitle: 'Room Profile',
        headerRight: () => (
            navigation.state.params.loading?
                <Loading animating={navigation.state.params.loading} color={Colors.DefaultTheme.splashBackground}/>:null)
    };
};

const styles = StyleSheet.create({
    backgroundImage: {
        backgroundColor: Colors.DarkTheme.background,
        flex: 1,
        height: height
    },
    inner: {
        flex: 1,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '5%'
    },
    subtitle: {
        fontSize: 20,
        color: 'white',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '2%'
    },
    body:{
        fontSize: 15,
        color: 'white',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '4%'
    },
    top: {
        height: '50%',
        justifyContent: 'flex-end'
    },
    bottom: {
        justifyContent: 'center',
    },
    chartView: {
        backgroundColor: 'rgba(150,200,100,0.2)',
        marginRight: '12%',
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
    },
    titleIndicator: {
        width: 10,
        height: '100%',
        backgroundColor: Colors.DefaultTheme.splashBackground
    },
    subtitleIndicator: {
        width: 10,
        height: '100%',
        backgroundColor: 'olive'
    },
    bodyIndicator: {
        width: 10,
        height: '100%',
        backgroundColor: '#8FBC8F'
    },
    button: {
    }
})

export default RoomDetails
