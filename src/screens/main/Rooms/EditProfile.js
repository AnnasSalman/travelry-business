import React from 'react'
import {View, Text, StyleSheet,} from 'react-native'
import {Button, TextInput} from "react-native-paper";
import Colors from "../../../constants/Colors";

const EditProfile = props => {
    return(
        <View style={styles.container}>
            <TextInput
                label="Room Name"
                value={'asf'}
                theme={{colors:{
                        primary: Colors.DefaultTheme.splashBackground,
                        placeholder: Colors.DefaultTheme.splashBackground,
                        text: Colors.DefaultTheme.splashBackground,
                    }}}
                style={styles.textInput}
            />
            <Text style={styles.body}>This is usually the common characteristic of the rooms in these categories
                for example: 'First Floor Rooms'.</Text>

            <TextInput
                label="Room Type"
                value={'asf'}
                theme={{colors:{
                        primary: Colors.DefaultTheme.splashBackground,
                        placeholder: Colors.DefaultTheme.splashBackground,
                        text: Colors.DefaultTheme.splashBackground,
                    }}}
                style={styles.textInput}
            />
            <Text style={styles.body}>This is the type of rooms that are in this category. This may be "Twin", "Single" etc.</Text>
            <TextInput
                label="Description"
                value={'asf'}
                theme={{colors:{
                        primary: Colors.DefaultTheme.splashBackground,
                        placeholder: Colors.DefaultTheme.splashBackground,
                        text: Colors.DefaultTheme.splashBackground,
                    }}}
                style={styles.textInput}
                multiline
            />
            <Text style={styles.body}>A short description of the room (about 3 sentences).</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    save: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        borderWidth: 0
    },
    textInput: {
        backgroundColor: 'transparent',
        margin: 10,
        marginBottom: 0
    },
    body:{
        fontSize: 14,
        color: 'grey',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '2%',
        marginBottom: '2%',
    },
})

EditProfile.navigationOptions = navData => {
    return {
        // headerShown: false,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgba(0, 0, 0 ,0.4)'
        },
        headerTitle: 'Edit Profile',
        headerRight: () => (
            <Button
                mode="outlined"
                onPress={() => console.log('Pressed')}
                color='white'
                style={styles.save}
            >
                Save
            </Button>
            // <HeaderButtons HeaderButtonComponent={HeaderButton}>
            //     <Item
            //         title="Menu"
            //         iconName="ios-menu"
            //         onPress={() => {
            //             navData.navigation.toggleDrawer();
            //         }}
            //     />
            // </HeaderButtons>
        )
    };
};

export default EditProfile
