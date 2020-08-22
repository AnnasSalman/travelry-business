import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Platform } from 'react-native'

//Screens
import Calendar from "../screens/main/Calendar";
import Chats from "../screens/main/Chats";
import Home from "../screens/main/Home";
import RoomNavigation from "./RoomNavigation";

//assets
import { Ionicons } from 'react-native-vector-icons'
import Colors from '../constants/Colors'
import CalendarNavigation from "./CalendarNavigation";

const tabScreenConfig = {
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />
                );
            },
            style: {
                backgroundColor: 'transparent',
                borderTopWidth: 0,
            },
        }
    },
    Rooms: {
        screen: RoomNavigation,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-bed" size={25} color={tabInfo.tintColor} />;
            },
            // tabBarColor: Colors.DefaultTheme.splashBackground,
            tabBarColor: 'rgba(0,50,0,0.0)'

        }
    },
     Calendar: {
        screen: CalendarNavigation,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-calendar" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.DarkTheme.background
        }
    },
    Chats: {
        screen: Chats,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-chatbubbles" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.DefaultTheme.primary
        }
    }
};



const MainTabNavigation =
    // Platform.OS === 'android' ?
        createMaterialBottomTabNavigator(tabScreenConfig, {
            barStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.0)',
                borderTopWidth: 0,
            },
            activeTintColor: 'white',
            shifting: true,
        })
        // : createBottomTabNavigator(tabScreenConfig, {
        //     tabBarOptions: {
        //         activeTintColor: Colors.DefaultTheme.secondary,
        //         inactiveBackgroundColor: Colors.DarkTheme.surface,
        //         style: {
        //             backgroundColor: 'black',
        //             opacity: 0.7
        //         }
        //     }
        // });

export default createAppContainer(MainTabNavigation);
