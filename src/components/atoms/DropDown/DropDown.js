import React, {useState} from 'react'
import {View, TouchableWithoutFeedback, StyleSheet, Dimensions, Text} from 'react-native'
import Colors from "../../../constants/Colors"
import {IconButton} from 'react-native-paper'
import FeatureCheckbox from "../FeaturesCheckbox/FeatureCheckbox";
import * as Animatable from 'react-native-animatable';

const {height, width} = Dimensions.get('window')

const DropDown = props => {
    const[selected, setSelected] = useState(false)

    const onPressHandler = () => {
        // if(selected){
        //     props.onOpen()
        // }
        // else{
        //     props.onClose()
        // }
        setSelected(!selected)
    }

    return(

        <View>
        <TouchableWithoutFeedback onPress={onPressHandler}>
                <Animatable.View style={!selected?styles.container:styles.containerSelected}>
                    <Text style={styles.text}>{props.name}</Text>
                    <Text style={styles.selected}>{props.selectedLength+"/"+props.children.length+" selected"}</Text>
                    <IconButton
                        icon={!selected?'chevron-right':'chevron-down'}
                        color='white'
                        size={height*0.05}
                    />
                </Animatable.View>
        </TouchableWithoutFeedback>
            <Animatable.View animation={selected?'fadeInLeft':''}>
            <View style={selected?{opacity: 1}:{height: 0, opacity: 0}}>
                {props.children}
            </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height*0.09,
        backgroundColor: Colors.DefaultTheme.splashBackground,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginRight: 10,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
    },
    containerSelected: {
        height: height*0.09,
        backgroundColor: Colors.DefaultTheme.splashBackground,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        marginRight: 0
    },
    text: {
        flexGrow: 1,
        fontSize: 22,
        color: 'white',
        marginLeft: width*0.04
    },
    selected: {
        color: 'white'
    }

})

export default DropDown
