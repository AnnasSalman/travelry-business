import { createStackNavigator, TransitionPresets} from 'react-navigation-stack'
import { createAppContainer} from "react-navigation";

import Bookings from "../screens/main/Calendar/Bookings";
import Calendar from "../screens/main/Calendar";
import Colors from "../constants/Colors";

const CalendarNavigation = createStackNavigator({
        calendar: {
            screen: Calendar,
            navigationOptions: {
                ...TransitionPresets.DefaultTransition
            }
        },
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

export default createAppContainer(CalendarNavigation);
