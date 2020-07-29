import React, {useState, useRef} from 'react'
import {StyleSheet} from 'react-native'
import { Modal, Portal, Text, Button, Provider, IconButton} from 'react-native-paper';
import styles from "./FormStyles/FormStyles";
import Colors from "../../../constants/Colors";
import {Dimensions, View, ScrollView} from "react-native";
import AddRoomModal from "../../atoms/AddRoomModal/AddRoomModal";
import RoomWidget from "../../atoms/RoomWidget/RoomWidget";
import {useSelector,useDispatch} from "react-redux";
import {removeRoomInfo} from "../../../store/actions/accountDetails";

const {width, height} = Dimensions.get('window')

const defaultForm = {
    form:{
        roomType: '',
        roomName: '',
        numberOfRooms: '',
        amountOfGuests: '',
        price: ''
    },
    mode: 'default'

}

const LayoutAndPricing = props => {
    const dispatch = useDispatch()
    const [visible, setVisible] = React.useState(
        {
            visibility: false,
            data: {}
        });
    const showModal = (formData) => setVisible({visibility: true, data: formData});
    const hideModal = () => setVisible({visibility: false, data: {}});
    const roomInfo = useSelector(state => state.accountDetails.roomInfo);

    const onEditHandler = (key) => {
        roomInfo.forEach((room)=>{
            if(room.key===key){
                return showModal({form: room, mode: 'edit'})
            }
        })
        return null
    }

    return (
        <Provider>
            <ScrollView>
                <Text style={placeHolderStyles.Title}>Rooms List</Text>
                {roomInfo.length===0?
                    <View style={placeHolderStyles.container}>
                        <Text style={placeHolderStyles.Text}>No Rooms to show (Add rooms to continue)</Text>
                    </View>: null
                }
                {
                    roomInfo.map((room)=>(
                        <RoomWidget
                            key={room.key}
                            roomName={room.roomName}
                            number={room.numberOfRooms}
                            onDelete={()=>{dispatch(removeRoomInfo(room.key))}}
                            onEdit={()=>onEditHandler(room.key)}
                        />
                    ))
                }
                <Portal>
                    <Modal visible={visible.visibility} onDismiss={hideModal} contentContainerStyle={styles.modalFull}>
                        <AddRoomModal onCancel={()=>hideModal()} formData={visible.data}/>
                    </Modal>
                </Portal>
                <View style={styles.navButtonContainer}>
                    <Button mode="contained"
                            style={{...styles.nextButton, width: '100%'}}
                            onPress={()=>showModal(defaultForm)}
                            color={Colors.DefaultTheme.splashBackground}
                            contentStyle={{height: 50}}>
                        Add Room
                    </Button>
                </View>
                    <View style={styles.navButtonContainer}>
                        <Button mode="contained"
                                style={styles.nextButton}
                                onPress={props.onPrevious}
                                color={Colors.DefaultTheme.splashBackground}
                                contentStyle={{height: 50}}>
                            Previous
                        </Button>
                        {(roomInfo.length>0)?
                            <Button mode="contained"
                                    style={styles.nextButton}
                                    onPress={props.onNext}
                                    color={Colors.DefaultTheme.splashBackground}
                                    contentStyle={{height: 50}}>
                                Next
                            </Button>:null
                        }
                    </View>
            </ScrollView>
        </Provider>
    );
}

const placeHolderStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height*0.1
    },
    Text: {
        color: Colors.DefaultTheme.splashBackground,
        fontSize: 16
    },
    Title: {
        color: Colors.DefaultTheme.splashBackground,
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: height*0.02,
        marginLeft: width*0.03
    }
})

export default LayoutAndPricing;
