import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Title = props => {
    return (
        <Text style={[styles.main, props.style]}>{props.children}</Text>
    );
}

const styles = StyleSheet.create({
    main: {
        fontFamily: 'poppins-medium',
        fontSize: 25,
        marginBottom: 15
    }
});

export default Title;
