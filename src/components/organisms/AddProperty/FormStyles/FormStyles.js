import {StyleSheet} from "react-native";
import Colors from "../../../../constants/Colors";
import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    divDark: {
        backgroundColor: Colors.DefaultTheme.splashBackground,
        color: 'blue',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        shadowRadius: 10,
        shadowOpacity: 0.5,
        elevation: 6
    },
    inputDark: {
        margin: 20,
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: Colors.DefaultTheme.splashBackground,
    },
    dropDown: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        backgroundColor: 'red',
        paddingRight: 30,
    },
    divLight: {
        backgroundColor: Colors.DefaultTheme.background,
        marginTop: 15
    },
    inputLight: {
        margin: 20,
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: Colors.DefaultTheme.background,
    },
    modal:{
        height: height-(height*0.3),
        backgroundColor: Colors.DefaultTheme.background,
    },
    modalFull:{
        height: height,
        backgroundColor: Colors.DefaultTheme.background,
    },
    nextButton: {
        width: '40%',
        marginBottom: 5,
        marginTop: 10,
        justifyContent: 'center',
        fontSize: 12,
        borderColor: Colors.DarkTheme.onSurface,
        borderWidth: 2,
        borderRadius: 30
    },
    navButtonContainer: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'space-between'
    },
    errorText: {
        marginLeft: 20,
        color: 'red'

    }
});

export default styles
