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
                style={[styles.inputLight, props.style]}
                theme={Themes.DefaultTheme}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
            />
        </View>
        );
}

const styles = StyleSheet.create({
    inputLight: {
        margin: 20,
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: Colors.DefaultTheme.background,
    },
});

export default FormTextInputDefault;
