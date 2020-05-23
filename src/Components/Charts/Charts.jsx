import React, { useState, useEffect} from 'react';
import { fetchDailyData } from '../../Api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Charts.module.css'

// This file represents a functional component

const Charts = ({data: { confirmed, recovered, deaths }, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
                setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length // 71 (if the value is zero then False by default)
        ? (
            <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: 'rgb(0, 255, 255)',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    fill: true
                }],
            }}
        />) : null 
    );

    const barChart = (
        confirmed // equivalent to only: data.confirmed
        ? (
            <Bar
                data = {{
                    labels: ['infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgb(229, 245, 7, 0.7)', 
                            'rgba(0, 255, 255, 0.5)', 
                            'rgba(255, 0, 0, 0.2)'
                        ], data: [confirmed.value, recovered.value, deaths.value]
                        // equivalent to ... data: [data.confirmed, data.recovered, data.deaths]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text:`Current state in ${country}`}
                }}
            />
        ) : null
    );

    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts;

// EXTRA NOTES:
// A) useState, useEffect are hooks... 
//    note that 'const [dailyData, setDailyData] = useState({});' ...
//    is the way to declare a state in functional component... 
//    BUT in class-based component its 'state = {dailyData: {}}'
// B) Issues arise when hooks deal with asynchroneous functions
//    therefore separate functions are required.