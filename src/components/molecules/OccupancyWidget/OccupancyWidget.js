import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Colors from "../../../constants/Colors";
import axios from 'axios'
import Loading from "../../atoms/Loading/Loading";
import { Feather, MaterialIcons } from '@expo/vector-icons';
import {useSelector} from "react-redux";


const {height, width} = Dimensions.get('window')

const OccupancyWidget = props => {

    const hotelid = useSelector(State=>State.accountDetails._id)
    const rooms = useSelector(State=> {
        let num = 0
        State.accountDetails.roomInfo.forEach((room)=>{
            num+=parseInt(room.numberOfRooms)
        })
        return num
    })

    const [loading, setloading] = useState(false)
    const [occupancy, setoccupancy] = useState({})

    const OccCalculate = (occupancy) => {
        const occupancyToday = occupancy.occupancyToday
        const occupancyYesterday = occupancy.occupancyYesterday

        let result= {
            occupancyToday,
            occupancyYesterday,
            sinceYesterday : 0,
            direction: 'Same As Yesterday',
            icon: 'arrow-right',
            color: 'grey'
        }
        if(occupancyYesterday === 0 && occupancyToday===0){
            result.sinceYesterday = 0
        }
        else if(occupancyYesterday === 0){
            result.sinceYesterday = 100
        }
        else if(occupancyToday === 0){
            result.sinceYesterday = -100
        }
        else{
            const sinceYesterday = (100*(occupancyToday-occupancyYesterday)/occupancyYesterday)
            result.sinceYesterday = sinceYesterday
        }
        if(result.sinceYesterday>=50){
            result.icon='arrow-up'
            result.direction='Up Since Yesterday'
            result.color='green'
        }
        else if(result.sinceYesterday>0){
            result.icon='arrow-up-right'
            result.direction='Up Since Yesterday'
            result.color=Colors.DefaultTheme.primary
        }
        else if(result.sinceYesterday===0){
            result.icon='arrow-right'
            result.direction='Same As Yesterday'
            result.color='grey'
        }
        else if(result.sinceYesterday>-50){
            result.icon='arrow-down-right'
            result.direction='Down Since Yesterday'
            result.color = '#E94B3C'
        }
        else if(result.sinceYesterday<=-50){
            result.icon='arrow-down'
            result.direction='Down Since Yesterday'
            result.color='red'
        }
        const occpercentage = Math.round((occupancyToday/parseInt(rooms))*100)
        result.occPercentage = occpercentage
        if(occpercentage===100){
            result.occTextColor = 'white'
            result.occColor = 'green'
            result.occMessage = 'HOUSE FULL! All rooms are occupied'
            result.occIcon='thumb-up'

        }
        else if(occpercentage>50){
            result.occTextColor = Colors.DarkTheme.background
            result.occColor = Colors.DefaultTheme.primary
            result.occMessage = occpercentage+'% of rooms are occupied'
            result.occIcon='eject'
        }
        else if(occpercentage===50){
            result.occTextColor = Colors.DarkTheme.background
            result.occColor = 'grey'
            result.occMessage = 'Half of the rooms are unoccupied'
            result.occIcon='equalizer'
        }
        else{
            result.occTextColor = Colors.DarkTheme.background
            result.occColor = '#E94B3C'
            result.occMessage = (100-occpercentage)+'% of the rooms are unoccupied'
            result.occIcon='error-outline'
        }
        return result
    }

    useEffect(()=>{
        setloading(true)
        const fetchOccupancy = async() =>{
            const dateTo = new Date(props.dateString)
            dateTo.setDate(dateTo.getDate()+1)
            const dateToString = dateTo.toISOString().substring(0,10)
            try{
                const occ = await axios.get('/bookings/hotel/'+hotelid+'/occupancy?from='+props.dateString+'&to='+dateToString)
                setoccupancy(OccCalculate(occ.data))
                setloading(false)
            }
            catch(e){
            }
        }
        fetchOccupancy()
    },[props.dateString])

    return(
        <View style={styles.container}>
            {loading?
                <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <Loading type='Fold' color={Colors.DefaultTheme.primary} animating={loading}/>
                </View>
                :
                <View>
                    <View style={styles.topBar}>
                        <View style={{alignItems: 'center', width: '30%'}}>
                            <Text style={styles.text}>Occupancy</Text>
                            <Text style={{...styles.text, fontSize: 38}}>{occupancy.occupancyToday}</Text>
                            <Text style={{...styles.text, fontSize: 10}}>Out of {rooms} Rooms</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '70%'}}>
                            <View style={{margin: 5}}>
                                <Feather name={occupancy.icon} size={32} color={occupancy.color}/>
                            </View>
                            <Text style={{...styles.text, fontSize: 28, fontWeight: 'bold', color: occupancy.color}}>
                                {Math.round(Math.abs(occupancy.sinceYesterday))}%
                            </Text>
                            <Text style={{...styles.text, fontSize: 12, width: 60, textAlign: 'center',margin: 5}}>{occupancy.direction}</Text>
                        </View>
                    </View>
                    <View style={{...styles.bottomBar, backgroundColor: occupancy.occColor}}>
                        <Text style={{color: occupancy.occTextColor}}>{occupancy.occMessage}</Text>
                        <MaterialIcons name={occupancy.occIcon} size={22} color={occupancy.occTextColor}/>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height*0.18,
        backgroundColor: Colors.DarkTheme.surface,
        margin: 5,
        borderRadius: 5
    },
    bottomBar: {
        flexDirection: 'row',
        height: height*0.05,
        width: '100%',
        backgroundColor: 'grey',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    topBar: {
        height: height*0.13,
        padding: height*0.015,
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontSize: 15
    },
})

export default OccupancyWidget
