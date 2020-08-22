import React from 'react'
import {View, Text} from 'react-native'
import { Feather } from '@expo/vector-icons';


const NoActivity = props => {
    return(
        <View style={props.style}>
            <Feather name='activity' size={100} color={props.iconColor}/>
            <Text style={props.textStyle}>No Activity to show for Today</Text>
        </View>
    )
}

export default NoActivity
