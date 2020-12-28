import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import InitScreen from "../screens/InitScreen";
import createAccountScreen from "../screens/createAccountScreen";
import numberVerificationScreen from '../screens/NumberconfirmationScreen'
import businessSelectScreen from '../screens/BusinessSelectScreen'
import hotelInfoScreen from '../screens/CreateHotelAccountScreen'
import passwordScreen from "../screens/passwordScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import MainTabNavigation from "./MainTabNavigation";
import AddLocation from "../screens/main/Home/AddLocation";



const AppNavigation = createStackNavigator({
        Init: {
            screen: InitScreen,
        },
        createAccount: {
            screen: createAccountScreen,
            navigationOptions: {
                ...TransitionPresets.ModalTransition
            }
        },
        numberVerification: {
            screen: numberVerificationScreen,
            navigationOptions: {
                ...TransitionPresets.FadeFromBottomAndroid
            }
        },
        businessSelect: {
            screen: businessSelectScreen,
            navigationOptions: {
                ...TransitionPresets.DefaultTransition
            }
        },
        password: {
            screen: passwordScreen,
            navigationOptions: {
                ...TransitionPresets.DefaultTransition
            }
        },
        hotelInfo: {
            screen: hotelInfoScreen,
            navigationOptions: {
                ...TransitionPresets.DefaultTransition
            }
        },
        loginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                ...TransitionPresets.DefaultTransition
            }
        },
        homeScreen:{
            screen: MainTabNavigation,
            navigationOptions: {
                ...TransitionPresets.DefaultTransition
            }
        },
        locationScreen:{
            screen: AddLocation,
            navigationOptions: {
                ...TransitionPresets.DefaultTransition
            }
        },
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
            // headerStyle: {
            //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            // },
            // headerTintColor:
            //     Platform.OS === 'android' ? 'white' : Colors.primaryColor,
            //         headerTitle: 'A Screen'
        }

    })

export default createAppContainer(AppNavigation);
