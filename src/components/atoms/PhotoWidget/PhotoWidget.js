import React, {useState, useEffect} from 'react'
import {Button, IconButton} from "react-native-paper";
import Colors from "../../../constants/Colors";
import imageplaceholder from "../../../../assets/placeholders/imageplaceholder.jpg";
import {ImageBackground, StyleSheet} from "react-native";
import Loading from "../Loading/Loading";

const PhotoWidget = props => {

    const [photo, setphoto] = useState(imageplaceholder)
    const [loading, setloading] = useState(false)

    useEffect(()=>{
        props.image?setphoto(props.image):setphoto(imageplaceholder)
    },[props])

    return(
        <ImageBackground
            source={photo}
            style={[props.style, styles.container]}
            onLoadStart={()=>setloading(true)}
            onLoadEnd={()=>setloading(false)}
        >
            {
                photo!==imageplaceholder?<Loading animating={loading} type='Fold'/>:null
            }
            {
                photo!==imageplaceholder?
                    <IconButton
                        icon="delete"
                        mode="outlined"
                        onPress={props.onDeleteImage}
                        style={styles.iconButton}
                        color='white'
                    >
                        Remove
                    </IconButton>:
                    null
            }
            <Button
                icon="camera"
                mode="outlined"
                onPress={props.onPickImage}
                style={styles.button}
                color='white'
            >
                {photo===imageplaceholder?props.pickImageButtonTitle:props.updateText}
            </Button>
        </ImageBackground>
    )
}

const styles= StyleSheet.create({
    container: {
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: 'rgba(16, 24, 32, 0.6)',
    },
    iconButton: {
    }
})

export default PhotoWidget
