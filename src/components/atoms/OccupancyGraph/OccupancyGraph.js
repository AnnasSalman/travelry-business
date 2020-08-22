import React, {useEffect, useState} from 'react'
import {View, Text, Dimensions} from 'react-native'
import {
    LineChart,
} from "react-native-chart-kit";
import Colors from "../../../constants/Colors";
import Loading from "../Loading/Loading";

const screenWidth = Dimensions.get("window").width;

function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
}

const OccupancyGraph = props => {

    const [graphData, setgraphData] = useState({})
    const [loading, setloading] = useState(false)

    useEffect(()=>{
        let tempDates = []
        const tempArrivals = []
        const tempDepartures = []
        const calendar = props.calendar
        const month = props.current.dateString.substring(5,7)
        const monthInt = parseInt(month)
        const year = props.current.dateString.substring(0,4)
        const yearInt = parseInt(year)
        for(let i=1; i<=daysInMonth(monthInt,yearInt); i++){
            let day = i
            if(day<10){
                day='0'+(day.toString())
            }
            else{
                day=''+(day.toString())
            }
            tempDates.push(day)
            const fullDate = year+'-'+month+'-'+day
            if(calendar[(fullDate).toString()]){
                tempArrivals.push(props.calendar[fullDate][0].arriving)
                tempDepartures.push(props.calendar[fullDate][0].leaving)
            }
            else{
                tempArrivals.push(0)
                tempDepartures.push(0)
            }
        }
        setgraphData({
            labels: tempDates,
            datasets: [
                {
                    data: tempArrivals,
                    color: (opacity = 1) => Colors.DefaultTheme.primary, // optional
                    strokeWidth: 2 // optional
                },
                {
                    data: tempDepartures,
                    color: (opacity = 1) => '#E94B3C', // optional
                    strokeWidth: 2 // optional
                }
            ],
        })
    },[props.item])

    return(
        <View>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>This Month: </Text>
            {Object.keys(graphData).length>0?
                <LineChart
                data={graphData}
                width={screenWidth*0.8}
                height={180}
                chartConfig={chartConfig}
                bezier
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLabels={false}
                formatYLabel={(label)=>parseInt(label)}
                />:
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Loading animating={true} type={'Fold'} color={Colors.DefaultTheme.primary}/>
                </View>
            }
        </View>
    )
}

const chartConfig = {

    color: (opacity = 0) => `rgba(0, 144, 146, 0.5)`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
};

export default OccupancyGraph
