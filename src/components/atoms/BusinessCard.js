import React from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import Colors from '../../constants/Colors'
import { BlurView } from 'expo-blur';
import { Button} from "react-native-paper";

const {height, width} = Dimensions.get('window')

//Accepts imageSource, title, description as props
const BusinessCard = props => {
    return (
        <View style={styles.main}>
            <ImageBackground
                source={props.source}
                style={styles.image}
                imageStyle={{borderRadius: 15}}
                >
                <BlurView
                    style={styles.footer}
                    intensity={60}
                    tint={'dark'}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.description}>{props.description}</Text>
                </BlurView>
            </ImageBackground>
            <Button mode="contained"
                    style={styles.Button}
                    onPress={() => props.onPress}
                    color={Colors.DarkTheme.onSurface}
                    contentStyle={{height: 50}}>
                SELECT
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        marginTop: 15,
        width: width*0.75,
        height: height * 0.62,
        shadowRadius: 10,
        shadowOpacity: 0.5,
        shadowColor: 'black',
        borderRadius: 15
    },
    image:{
        justifyContent: 'flex-end',
        width: width*0.75,
        height: height*0.62,
        borderRadius: 15,
        overflow: 'hidden'
    },
    footer:{
        width: width*0.75,
        height: height*0.23,
        backgroundColor: Colors.DarkTheme.background,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    title:{
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20,
        color: Colors.DarkTheme.onSurface,
        fontFamily: 'poppins-bold',
        fontSize: 25
    },
    description:{
        marginTop: 0,
        marginRight: 15,
        marginLeft: 20,
        color: Colors.DarkTheme.onSurface,
        fontFamily: 'poppins-regular',
        fontSize: 14
    },
    Button:{
        width: 150,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: -25,
        right: 25,
        borderRadius: 25,
    }
});

export default BusinessCard;
