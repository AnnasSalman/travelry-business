import React from 'react'
import {StyleSheet, View} from 'react-native'
import RNPickerSelect from "react-native-picker-select";

const FormPickerInputDefault = props => {
    return(
        <RNPickerSelect
            placeholder={props.placeholder}
            items={props.items}
            onValueChange={props.onValueChange
            }
            style={{ ...pickerSelectStyles }}
            value={props.value}
            useNativeAndroidPickerStyle={false} //android only
            hideIcon={true}
        />
    );
}


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        margin: 20,
        marginBottom: 10,
        marginTop: 5,
        fontSize: 16,
        paddingTop: 10,
        height: 55,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});
export default FormPickerInputDefault
