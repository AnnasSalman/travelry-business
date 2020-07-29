import React, {useState} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Colors from '../constants/Colors'

const { height, width } = Dimensions.get('window')

import BusinessCarousel from "../components/molecules/BusinessCarousel";
import Title from "../components/atoms/TextFormats/Title";
import Dots from 'react-native-dots-pagination'


const BusinessSelectScreen = props => {

    const [currentNode, setcurrentNode] = useState(1)

    const setNode = (num=1) => {
        console.log('setnode called', currentNode)
        setcurrentNode(num)
    }

    const [carouselItems, setcarouselItems] = useState([
        {
            title: "Hotel",
            text: "Enables you to add and manage your Hotel at our platform. Features include booking handling, " +
                "customer interaction and much more.",
            source: require('../../assets/cards/hotel.jpg')
        },
        {
            title:"Property for rent",
            text: "Allows you to place your property on our platform for rent. The properties are usually rooms but" +
                "can also be apartments or homes.",
            source : require('../../assets/cards/room.jpg')
        },
    ])

    return (
        <View style={{flex: 1}}>
            <View style={styles.main}>
                <Title style={{marginTop: height*0.08, shadowColor: 'black', shadowRadius: 2}}>Select Your Business Type</Title>
                <BusinessCarousel
                    carouselItems={carouselItems}
                    node={(node)=>setNode(node)}
                />
            </View>
            <Dots length={2}
                  active={currentNode}
                  paddingVertical={50}
                  passiveDotWidth={13}
                  activeColor={Colors.DefaultTheme.splashBackground}></Dots>
        </View>

    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dots: {

    }
});

export default BusinessSelectScreen
