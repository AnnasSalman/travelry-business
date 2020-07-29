import React, {useRef, useState} from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import BusinessCard from "../atoms/BusinessCard";


const {height, width} = Dimensions.get('window')

const BusinessCarousel = props => {
    const carousel = useRef(null)

    const [activeIndex, setactiveIndex] = useState(0)


    const _renderItem=({item,index})=>{
        return (
            <BusinessCard
                title={item.title} description={item.text} source={item.source}/>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center'}}>
                <Carousel
                    layout={"default"}
                    ref={ref => carousel}
                    data={props.carouselItems}
                    sliderWidth={width}
                    itemWidth={310}
                    renderItem={_renderItem}
                    onSnapToItem = {index => {
                        setactiveIndex(index)
                        props.node(index)
                    }}
                    loop={true}
                    autoplay
                    autoplayDelay={2000}
                    autoplayInterval={4000}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    }
});

export default BusinessCarousel;
