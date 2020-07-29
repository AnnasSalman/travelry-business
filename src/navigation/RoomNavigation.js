import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import Rooms from "../screens/main/Rooms";
import RoomDetails from "../screens/main/Rooms/RoomDetails";
import EditProfile from "../screens/main/Rooms/EditProfile";

import Colors from "../constants/Colors";

const RoomNavigation = createStackNavigator({
        room: {
            screen: Rooms,
        },
        roomDetails: {
            screen: RoomDetails,
            navigationOptions: {
                ...TransitionPresets.DefaultTransition
            }
        },
        editProfile: {
            screen: EditProfile,
            navigationOptions: {
                ...TransitionPresets.ModalTransition
            }
        }

    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.DefaultTheme.splashBackground
            },
            headerTintColor: 'white',
            // headerTitle: 'A Screen'
        }

    })

export default createAppContainer(RoomNavigation);
