import React, {useState, useEffect, useLayoutEffect, useRef} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {CalendarList, Agenda} from "react-native-calendars";
import Colors from "../../constants/Colors";
import Rooms from "./Rooms";
import CalendarDayWidget from "../../components/atoms/CalendarDayWidget/CalendarDayWidget";
import axios from 'axios'
import getCalendarData from '../../constants/Addresses'
import OccupancyWidget from "../../components/molecules/OccupancyWidget/OccupancyWidget";
import {useSelector} from "react-redux";
import Loading from "../../components/atoms/Loading/Loading";
import {Button, IconButton} from "react-native-paper";
import DropdownAlert from "react-native-dropdownalert";
import NoActivity from "../../components/atoms/NoActivity/NoActivity";
import OccupancyGraph from "../../components/atoms/OccupancyGraph/OccupancyGraph";

const Calendar = props =>{

    const alert = useRef(null);

    const [loading, setloading] = useState(false)
    const [selectedDate, setselectedDate] = useState('')
    const [refreshing, setrefresing] = useState(false)
    const [calendar, setcalendar] = useState({})
    const [currentItem, setcurrentItem] = useState({})
    const [markings, setmarkings] = useState({})
    const [graphData, setgraphData] = useState({})
    const [loadedMonths, setloadedMonths] = useState([])
    const [firstLoad, setFirstLoad] = useState(false)

    const hotelid = useSelector(State=>State.accountDetails._id)

    const arrival = {key:'arrival', color: 'green', selectedDotColor: 'green'};
    const departure = {key:'departure', color: 'red', selectedDotColor: 'red'};



    const getDataForCurrentMonth = async() => {

        const dateToday = new Date()
        const month = dateToday.getMonth()
        const year = dateToday.getFullYear()
        let monthString = month+1
        if (monthString<10){
            monthString = '0'+monthString
        }
            try {
                if (!loadedMonths.includes((monthString) + '-' + year)) {
                    const calresponse = await axios.get('/bookings/hotel/' + hotelid + '/month/' + (month + 1) + '/year/' + year)
                    setFirstLoad(true)
                    setloadedMonths([...loadedMonths, (monthString) + '-' + year])
                    console.log(calresponse.data)
                    setcalendar(calresponse.data)
                    setloading(false)
                    setrefresing(false)
                }
            } catch (e) {
                alert.current.alertWithType('error', 'Could not load yor data', 'Check your internet connection and try again');
                setloading(false)
                setrefresing(false)
            }
    }

    const refresh = async() => {
        setloading(true)
        setloadedMonths([])
        await getDataForCurrentMonth()
        setloading(false)
    }

    //Load Default Data
    useEffect(()=>{
        const fetchdata = async()=>{
            setloading(true)
            setrefresing(true)
            await getDataForCurrentMonth()
        }
        fetchdata()
    },[])

    useLayoutEffect(() => {
        props.navigation.setParams({
            loading: loading
        })
    }, [loading]);

    useLayoutEffect(() => {
        props.navigation.setParams({
            refresh: refresh
        })
    }, [loading]);

    //Set Default render item
    useEffect(()=>{
        const today = new Date().toISOString().substring(0,10)
        setcurrentItem({[today]:calendar[today]})
    },[calendar])

    //Set Default render item
    useEffect(()=>{
        if(selectedDate){
            setcurrentItem({[selectedDate]:calendar[selectedDate]})
        }
    },[loading])

    //Convert calendar Data to marking data
    useEffect(()=>{
        let temp = {}
        Object.keys(calendar).forEach((date)=>{
            const marks = []
            if(calendar[date][0].arriving){
                marks.push(arrival)
            }
            if(calendar[date][0].leaving){
                marks.push(departure)
            }
            temp = {...temp, [date]: {dots: marks}}
        })
        setmarkings(temp)
    },[calendar])

        return (
            <View style={{height: '100%', width: '100%'}}>
                {firstLoad && refreshing===false?
                <Agenda
                    // items={calendar}
                    loadItemsForMonth={async (month) => {
                        let monthString = month.month+1
                        if (monthString<10) {
                            monthString = '0' + monthString
                        }
                        if (!loadedMonths.includes((monthString) + '-' + month.year)) {
                            try {
                                setloading(true)
                                const calresponse = await axios.get('/bookings/hotel/' + hotelid + '/month/' + (month.month) + '/year/' + month.year)
                                const tempLoaded = loadedMonths
                                tempLoaded.push(((monthString) + '-' + month.year).toString())
                                setloadedMonths(tempLoaded)
                                setcalendar({...calendar, ...calresponse.data})
                                setloading(false)
                            } catch (e) {
                                setloading(false)
                                alert.current.alertWithType('error', 'Could not load yor data', 'Check your internet connection and try again');
                            }
                        }
                    }
                    }
                    items={currentItem}
                    renderItem={(item, firstItemInDay) =>
                        <View>
                            <CalendarDayWidget
                                arriving={item.arriving}
                                leaving={item.leaving}
                                dateString={item.dateString}
                            />
                            <OccupancyGraph calendar={calendar} current={item}/>
                        </View>
                    }
                    markedDates={markings}
                    markingType={'multi-dot'}
                    style={{marginBottom: 30}}
                    theme={theme}
                    minDate={'2020-08-01'}
                    refreshing={refreshing}
                    onRefresh={() => console.log('refreshing')}
                    onDayPress={(day) => {
                        if(loading){
                            alert.current.alertWithType('info','Fetching your data', 'Loading data please wait')
                        }
                        else{
                            setselectedDate(day.dateString)
                            setcurrentItem({[day.dateString]: calendar[day.dateString]})
                        }
                    }}
                    renderEmptyData={() => {
                        return <NoActivity style={styles.noActivity} textStyle={styles.text}
                                           iconColor={Colors.DefaultTheme.primary}/>
                    }}

                />:
                <View style={{height: '100%', width: '100%', backgroundColor: Colors.DarkTheme.background, alignItems: 'center', justifyContent: 'center'}}>
                    <Loading animating={refreshing} type={'Fold'} color={Colors.DefaultTheme.primary} size={50}/>
                </View>}
                <DropdownAlert ref={alert}/>
            </View>
        )
}

const theme = {
        backgroundColor: Colors.DarkTheme.background,
        calendarBackground: Colors.DarkTheme.background,
        textSectionTitleColor: 'white',
        textSectionTitleDisabledColor: 'grey',
        selectedDayBackgroundColor: Colors.DefaultTheme.primary,
        selectedDayTextColor: Colors.DarkTheme.background,
        todayTextColor: 'yellow',
        dayTextColor: Colors.DefaultTheme.background,
        textDisabledColor: 'grey',
        dotColor: 'red',
        selectedDotColor: Colors.DarkTheme.background,
        arrowColor: 'orange',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: Colors.DefaultTheme.surface,
        indicatorColor: Colors.DefaultTheme.splashBackground,
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
        agendaDayTextColor: Colors.DefaultTheme.primary,
        agendaDayNumColor: Colors.DefaultTheme.primaryVariant,
        agendaTodayColor: 'white',
        agendaKnobColor: Colors.DefaultTheme.splashBackground
}

Calendar.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'Calendar',
        headerTintColor: 'white',
        headerRight: ()=>(
            navigation.state.params && navigation.state.params.loading?
                <Loading animating={navigation.state.params.loading}/>:
                <IconButton
                    icon="refresh"
                    onPress={() => navigation.state.params.refresh()}
                    color='white'
                    size={25}
                >
                    Save
                </IconButton>
        // this works just fine
        )

    }
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

const styles = StyleSheet.create({
    noActivity: {
        height: '75%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    text: {
        color: Colors.DefaultTheme.primary,
        fontSize: 18
    }
})

export default Calendar
