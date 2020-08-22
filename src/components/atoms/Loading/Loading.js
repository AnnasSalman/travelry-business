import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import {Pulse, Fold} from "react-native-animated-spinkit";
import Colors from "../../../constants/Colors";


const {width, height} = Dimensions.get('window')

//Props:
// animating(boolean)(required),
// type('Fold'/null)(optional),
// color(color)(optional)
const Loading = props => {
    const [animationHeight, setanimationHeight] = useState(0)

    useEffect(()=>{
        if(props.animating){
            setanimationHeight(50)
        }else{
            setanimationHeight(0)
        }
    }, [props.animating])

    return(
        props.type==='Fold'?
            <View style={{...styles.container, height: animationHeight}}>
                <Fold size={props.size?props.size:30} animating={props.animating} color={props.color?props.color:'white'}/>
            </View>:
            <View style={{...styles.container, height: animationHeight}}>
                <Pulse size={30} animating={props.animating} color={props.color?props.color:'white'}/>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Loading
