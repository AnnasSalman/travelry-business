import React from 'react'
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import Colors from "../../../constants/Colors";
import {IconButton} from 'react-native-paper'
import {Ionicons} from "react-native-vector-icons";
import Bar from "./Bar/Bar";

const { height, width } = Dimensions.get('window')


const RoomLabel = props => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.rooms}
                              onPress={props.onPress}>
                <Text style={styles.title}>{props.name}</Text>
                <View style={styles.secondary}>
                    <View>
                        <IconButton
                            style={{margin: 0}}
                            icon="settings"
                            color='white'
                            size={25}
                        />
                    </View>
                    <View style={styles.inner}>
                        <Text style={styles.number}>{props.total}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.stats}>
                <Bar text='Occupied' number={props.occupied} total={props.total} color='green'/>
                <Bar text='Vacant' number={props.vacant} total={props.total} color='red'/>
                <Bar text='Unavailable' number={props.unavailable} total={props.total} color='grey'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 130,
        flexDirection: 'row'
    },
    text: {
        marginLeft: 10,
        color: Colors.DefaultTheme.surface
    },
    title: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.DefaultTheme.surface,
        shadowOpacity: 0.5,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset:{
            width: 1,
            height: 1
        }
    },
    rooms: {
        flex: 4,
        backgroundColor: '#006B38FF',
        width: 140,
        height: '100%',
        borderRadius: 12,
        shadowOpacity: 0.5,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset:{
            width: 1,
            height: 1
        }
    },
    number:{
        color: Colors.DarkTheme.background,
        fontSize: 35,
        fontWeight: 'bold',
        shadowOpacity: 0.3,
        shadowColor: 'white',
        shadowRadius: 0.5,
        shadowOffset:{
            width: 1,
            height: 1
        }
    },
    inner: {
        alignItems: 'flex-end'
    },
    secondary: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'flex-end',
        shadowOpacity: 0.5,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset:{
            width: 1,
            height: 1
        }
    },
    stats:{
        flex: 7,
        justifyContent: 'space-between',
        marginLeft: 10
    },

})

export default RoomLabel
