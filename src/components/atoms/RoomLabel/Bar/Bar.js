import React from 'react'
import {Text, View, StyleSheet} from "react-native";
import Colors from "../../../../constants/Colors";

const Bar = props => {
    return(
        <View>
            <View style={styles.dataView}>
                <Text style={styles.text}>{props.text}</Text>
                <Text style={styles.text}>{props.number}</Text>
            </View>
            <View style={styles.bar}>
                <View style={{
                    ...styles.filled,
                    width: ((props.number/props.total)*100).toString()+'%',
                    backgroundColor: props.color
                }}>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dataView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    bar:{
        height: '12%',
        backgroundColor: Colors.DefaultTheme.onSurface,
        borderRadius: 5
    },
    filled:{
        height: '100%',
        borderRadius: 5
    },
    text:{
        color: 'grey',
        fontWeight: 'bold'
    }
})

export default Bar
