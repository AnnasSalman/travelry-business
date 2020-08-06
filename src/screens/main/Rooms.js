import React from 'react'
import {Text, View, StyleSheet, FlatList} from 'react-native'
import Colors from "../../constants/Colors";
import RoomLabel from "../../components/atoms/RoomLabel/RoomLabel";
import {useSelector} from "react-redux";

const Rooms = props =>{

    const rooms = useSelector(State=>State.accountDetails.roomInfo)

    return(
        <View style={styles.container}>
            <FlatList
                data={rooms}
                renderItem={({item})=>(
                    <View style={{margin: 15}}>
                        <RoomLabel
                            total={parseInt(item.numberOfRooms)}
                            occupied={parseInt(item.occupied)}
                            vacant={parseInt(item.available)}
                            unavailable={parseInt(item.unavailable)}
                            name={item.roomName}
                            onPress={()=>props.navigation.navigate('roomDetails',{item})}
                        />
                    </View>
                )}
            />
        </View>
    )
}

Rooms.navigationOptions = navData => {
    return {
        headerTitle: 'Rooms',
        // headerLeft: (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <Item
        //             title="Menu"
        //             iconName="ios-menu"
        //             onPress={() => {
        //                 navData.navigation.toggleDrawer();
        //             }}
        //         />
        //     </HeaderButtons>
        // )
    };
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors.DarkTheme.background
    }
})

export default Rooms
