import React, {useState, useEffect, useRef} from 'react'
import {Text, View, StyleSheet, Dimensions, ImageBackground} from 'react-native'
import {HeaderBackButton} from "react-navigation-stack";
import Loading from "../../../components/atoms/Loading/Loading";
import {Button} from "react-native-paper";
import Colors from "../../../constants/Colors";
import PhotoWidget from "../../../components/atoms/PhotoWidget/PhotoWidget";
import axios from 'axios'
import DropdownAlert from 'react-native-dropdownalert';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import imageplaceholder from '../../../../assets/placeholders/imageplaceholder.jpg'
import Constants from "expo-constants";
import {uri, deleteHotelRoomImagesURI} from "../../../constants/Addresses";

const {width, height} = Dimensions.get('window')
const baseURI = uri

const AddPhotos = props => {
    const hotelid = (props.navigation.state.params.hotel._id)
    const roomid = (props.navigation.state.params.room.key)
    console.log('render')

    const alert = useRef(null)

    const [photos, setphotos] = useState(
            [
                {
                    image: null,
                    type: 'cover',
                    updated: true
                },
                {
                    image: null,
                    type: 'pic1',
                    updated: true
                },
                {
                    image: null,
                    type: 'pic2',
                    updated: true
                },
                {
                    image: null,
                    type: 'pic3',
                    updated: true
                },
                {
                    image: null,
                    type: 'pic4',
                    updated: true
                },
                ]
        )

    const [loading, setloading] = useState(false)

    //Permissions
    useEffect(()=>{
        getPermissionAsync()
    },[])
    //Fetch Images
    useEffect(()=>{
        const fetchImages = async()=>{
            setloading(true)
            try {
                const imgs = await axios.get("/hotels/"+hotelid+"/getimages/"+roomid)
                console.log(imgs)
                imgs.data.forEach((image) => {
                    photos.forEach((element, index) => {
                        if (image.includes(element.type)) {
                            const temp = photos
                            temp[index] = {
                                ...temp[index],
                                image: {uri: baseURI + '/hotels/room/images/' + image},
                                updated: true
                            }
                            setphotos([...temp])
                            console.log(baseURI + '/hotels/room/images/' + image)
                        }
                    })
                })
                setloading(false)
            }
            catch(e){
                setloading(false)
                alert.current.alertWithType('error', 'Could not load images', 'Check your internet connection and try again');
            }
        }
        fetchImages()
    },[])
    //Setting navigation save param
    useEffect(() => {
        props.navigation.setParams({
            saveHandler: onSave,
        })
    }, [photos])
    //Setting navigation loading param
    useEffect(() => {
        props.navigation.setParams({
            loading: loading
        })
    }, [loading])

    //Save Event Handler
    const onSave = async() => {
        setloading(true)
        let formData = new FormData()
        photos.forEach((photo)=>{
            if(photo.updated===false){
                let uriParts = photo.image.uri.split('.');
                let fileType = uriParts[uriParts.length - 1];
                formData.append(photo.type, {
                    uri: photo.image.uri,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                },`image/${fileType}`)
            }
        })
        const config = {
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total);
            },
            headers: { 'content-type': 'multipart/form-data' }
        }
        setTimeout(async function() {
        try{
                const res = await axios.post('/hotels/'+hotelid+'/uploadimages/'+roomid, formData, config)
                setloading(false)
        }
        catch(e){
            console.log(e)
            setloading(false)
            alert.current.alertWithType('error', 'Could not save images', 'Check your internet connection and try again');
        }
        },100)
    }
    //Delete Event Handler
    const onDelete = async(index) => {
        setloading(true)
        if(photos[index].updated===false){
            const temp = photos
            temp[index] = {image: null, type: photos[index].type, updated: true}
            setphotos([...temp])
            setloading(false)
        }
        try{
            const deleteResult = await axios.delete(deleteHotelRoomImagesURI
                +hotelid+'-'
                +roomid+'-'
                +photos[index].type+'.jpg')
            const temp = photos
            temp[index] = {image: null, type: photos[index].type, updated: true}
            setphotos([...temp])
            setloading(false)
        }
        catch{
            setloading(false)
            console.log('error')
        }
    }

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    //Pick Image Handler
    const _pickImage = async (index) => {
        let aspect = [4, 3]
        if(index===0){
            aspect = [1, 3]
        }
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect,
                quality: 1,
            });
            if (!result.cancelled) {
                const temp = photos
                temp[index] = {...temp[index], image: {uri: result.uri}, updated: false}
                setphotos([...temp])
            }
        } catch (E) {
            console.log(E);
        }
    };

    return(
        <View style={styles.container}>
            <PhotoWidget
                image={photos[0].image}
                style={styles.profile}
                onPickImage={()=>_pickImage(0)}
                pickImageButtonTitle='Add Room Cover Photo'
                updateText='Change Cover Photo'
                onDeleteImage={()=>onDelete(0)}
            />
            <View style={styles.row}>
                <PhotoWidget
                    image={photos[1].image}
                    style={styles.photo}
                    onPickImage={()=>_pickImage(1)}
                    pickImageButtonTitle='Add Photo 1'
                    updateText='Change Photo 1'
                    onDeleteImage={()=>onDelete(1)}
                />
                <PhotoWidget
                    image={photos[2].image}
                    style={styles.photo}
                    onPickImage={()=>_pickImage(2)}
                    pickImageButtonTitle='Add Photo 2'
                    updateText='Change Photo 2'
                    onDeleteImage={()=>onDelete(2)}
                />
            </View>
            <View style={styles.row}>
                <PhotoWidget
                    image={photos[3].image}
                    style={styles.photo}
                    onPickImage={()=>_pickImage(3)}
                    pickImageButtonTitle='Add Photo 3'
                    updateText='Change Photo 3'
                    onDeleteImage={()=>onDelete(3)}
                />
                <PhotoWidget
                    image={photos[4].image}
                    style={styles.photo}
                    onPickImage={()=>_pickImage(4)}
                    pickImageButtonTitle='Add Photo 4'
                    updateText='Change Photo 4'
                    onDeleteImage={()=>onDelete(4)}
                />
            </View>
            <DropdownAlert ref={alert}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: Colors.DarkTheme.background,
        height: '100%'
    },
    row: {
        flexDirection: 'row'
    },
    profile:{
        height: height*0.27,
        marginBottom: 10,
        width: width,
        backgroundColor: 'rgba(107,142,35, 0.3)',
        borderWidth: 0,
        borderColor: 'grey',
        overflow: 'hidden'
    },
    photo:{
        height: height*0.26,
        width: width*0.46,
        margin: 2,
        backgroundColor: 'rgba(107,142,35, 0.3)',
        borderWidth: 0,
        borderColor: 'rgba(107,142,35, 0.3)',
        borderRadius: 15,
        overflow: 'hidden'
    },
    save: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        borderWidth: 0
    },

})

AddPhotos.navigationOptions = ({navigation}) => {
    return {
        // headerShown: false,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgba(0, 0, 0 ,0.4)'
        },
        headerTitle: 'Room Photos',
        headerLeft: () => (
            navigation.state.params.loading?
                null:
                <HeaderBackButton
                    label='Cancel'
                    tintColor='white'
                    onPress={()=>navigation.goBack()}
                />
        ),
        headerRight: () => (
            navigation.state.params.loading?
                <Loading animating={navigation.state.params.loading}/>:
                <Button
                    mode="outlined"
                    onPress={() => navigation.state.params.saveHandler()}
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

export default AddPhotos
