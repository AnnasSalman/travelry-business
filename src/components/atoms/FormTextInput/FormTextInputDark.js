import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {TextInput} from "react-native-paper";
import Colors from "../../../constants/Colors";
import Themes from "../../../constants/Themes";

const FormTextInputDefault = props => {
    return (
        <View>
            <TextInput
                mode='outlined'
                label={props.label}
                value={props.value}
                onChangeText={props.onChangeText}
                style={[styles.inputDark, props.style]}
                theme={Themes.DarkTheme}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputDark: {
        margin: 20,
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: Colors.DefaultTheme.splashBackground
    },
});

export default FormTextInputDefault;
