import React from 'react'
import {Dimensions, StyleSheet, View} from "react-native";
import {IconButton, Text} from "react-native-paper";
import Colors from "../../../constants/Colors";

const {width, height} = Dimensions.get('window')

const RoomWidget = props => {
    return(
        <View style={stylesLocal.roomWidget}>
            <View style={stylesLocal.textContainer}>
                <Text style={stylesLocal.text}>{props.roomName}</Text>
                <Text style={stylesLocal.subtitleText}>Number Of Rooms (of this Type): {props.number}</Text>
            </View>
            <View style={stylesLocal.iconContainer}>
                <IconButton
                    icon="delete"
                    color='white'
                    size={30}
                    onPress={props.onDelete}
                />
                <IconButton
                    icon="pencil"
                    color='white'
                    size={30}
                    onPress={props.onEdit}
                />
            </View>
        </View>
    )
}

const stylesLocal = StyleSheet.create({
    roomWidget: {
        height: height*0.15,
        backgroundColor: Colors.DefaultTheme.splashBackground,
        margin: width*0.03,
        marginBottom: width*0.01,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textContainer: {
        flexGrow: 1
    },
    text: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    subtitleText: {
        color: 'white',
        fontSize: 15,
        marginLeft: 15,
        marginTop: 5
    },
    iconContainer: {
        flexDirection: 'row',
        marginRight: 5
    }
})

export default RoomWidget
