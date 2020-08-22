import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Colors from "../../../constants/Colors";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import OccupancyWidget from "../../molecules/OccupancyWidget/OccupancyWidget";

const {width, height} = Dimensions.get('window')

const CalendarDayWidget = props => {
    return(
        <View style={[styles.container]}>
            <View style={styles.shadow}>
                <View style={styles.arriving}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="bag-checked" size={32} color={Colors.DarkTheme.background} />
                        <Text style={styles.text}>Arriving</Text>
                    </View>
                    <Text style={styles.text}>{props.arriving}</Text>
                </View>
            </View>
            <View style={{...styles.shadow, shadowColor:'#E94B3C'}}>
                <View style={styles.leaving}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="ios-exit" size={32} color={Colors.DarkTheme.background} />
                        <Text style={styles.text}>Leaving</Text>
                    </View>
                    <Text style={styles.text}>{props.leaving}</Text>
                </View>
            </View>
            <View>
                <OccupancyWidget dateString={props.dateString}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 2,
        // borderColor: 'yellow',
        marginRight: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    text:{
        color: Colors.DarkTheme.background,
        fontFamily: 'roboto-regular',
        fontSize: 18,
        marginLeft: 10
    },
    shadow: {
        shadowColor: Colors.DefaultTheme.primary,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 6,
    },
    arriving: {
        opacity: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        height: height*0.09,
        marginTop: height*0.005,
        marginBottom: height*0.005,
        marginRight: 5,
        marginLeft: 5,
        overflow: 'hidden',
        borderRadius: 5,
        backgroundColor: Colors.DefaultTheme.primary,
    },
    leaving: {
        opacity: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        height: height*0.09,
        marginTop: height*0.005,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: height*0.005,
        backgroundColor: '#E94B3C',
        overflow: 'hidden',
        borderRadius: 5
    }
})

export default CalendarDayWidget
