import React, {useState} from 'react'
import { Checkbox, IconButton } from 'react-native-paper';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import Colors from "../../../constants/Colors";
import * as Animatable from 'react-native-animatable';


const FeatureCheckbox = props => {

    const [checked, setChecked] = useState(false)

    const onPressHandler = () => {
        if(checked){
            props.onUnCheck()
        }else{
            props.onCheck()
        }
        setChecked(!checked)
    }

    return(
        <TouchableWithoutFeedback onPress={onPressHandler}>
            <Animatable.View animation={checked?'pulse':''} style={checked?styles.backgroundChecked:styles.background}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={()=>setChecked(!checked)}
                    color='white'
                />
                <IconButton
                    icon={props.icon}
                    color={checked?'white':Colors.DefaultTheme.splashBackground}
                    size={25}
                />
                <Text style={checked?styles.textChecked:styles.text}>{props.label}</Text>
                <Text style={checked?styles.textChecked:styles.text}> {checked?'(available)':'(unavailable)'}</Text>
            </Animatable.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    background: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 2,
        borderColor: Colors.DefaultTheme.splashBackground,
        borderRadius: 5,
    },
    backgroundChecked: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: Colors.DefaultTheme.splashBackground,
        borderRadius: 5,
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        marginLeft: 5
    },
    textChecked: {
        marginLeft: 5,
        fontSize: 20,
        color: 'white',
    }
})

export default FeatureCheckbox
