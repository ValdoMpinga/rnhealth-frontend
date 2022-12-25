import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/main.css'
import '../styles/pages/sensors.css'
import '../styles/components/sensors/selectBox.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux'
import { setHoursToForecast } from '../app/features/sensors/sensorsSlice'
import SelectBox from '../components/sensors/SelectBox';
import Button from '../components/Button';
import ForecastsTable from '../components/sensors/ForecastsTable';
import axios from 'axios';
import apis from '../utils/Apis';
import { RNHEALT_LIVER, NINE_HOURS_IN_MILISECOUNDS } from '../utils/Constants';
import { FaCreativeCommonsNcJp } from 'react-icons/fa';

const backendApi = axios.create({
    baseURL: apis.backendApiUrl
})
const rnMonitorApi = axios.create({
    baseURL: apis.rnMonitorApiUrl
})


function Sensors()
{
    // const { id } = useParams()
    const { hoursToForecast } = useSelector((state) => state.sensors)
    const dispatch = useDispatch()

    const y = [
        { name: 'Algorithms' },
        { name: 'LSTM' },
        { name: 'ARIMA' },
        { name: 'Prophet' }
    ]

    const z = [
        { hour: '1H', LSTM_Forecast: '400', ARIMA_Forecast: '500', Prophet_Forecast: '800' },
        { hour: '2H', LSTM_Forecast: '400', ARIMA_Forecast: '500', Prophet_Forecast: '800' },
        { hour: '3H', LSTM_Forecast: '400', ARIMA_Forecast: '500', Prophet_Forecast: '800' },
        { hour: '4H', LSTM_Forecast: '400', ARIMA_Forecast: '500', Prophet_Forecast: '800' },
        { hour: '5H', LSTM_Forecast: '400', ARIMA_Forecast: '500', Prophet_Forecast: '800' },
        { hour: '6H', LSTM_Forecast: '400', ARIMA_Forecast: '500', Prophet_Forecast: '800' },
    ]
    const handleForecastButton = (e) =>
    {
        e.preventDefault();

        backendApi.post('/forecast/hours',
            {
                "hour1": hoursToForecast.hour1,
                "hour2": hoursToForecast.hour2,
                "hour3": hoursToForecast.hour3,
                "hour4": hoursToForecast.hour4,
                "hour5": hoursToForecast.hour5,
                "hour6": hoursToForecast.hour6,
            }
        ).then((res) =>
        {
            if (res.status === 200)
            {
                let parsedCurrentDate = Date.now().toString()
                let parsedStartDate = (parseInt(Date.now()) - NINE_HOURS_IN_MILISECOUNDS).toString()

                rnMonitorApi.post('/measurement/get',

                    {

                        "dateStart": parsedStartDate,
                        "dateEnd": parsedCurrentDate,
                        "groupBy": "1h"
                    },
                    {
                        headers: {
                            'Authorization': process.env.REACT_APP_RN_MONITOR_KEY,
                            'Content-Type': 'application/json'
                        }
                    },
                )
                    .then((response) =>
                    {
                        let filteredData = response.data.filter((measurement) =>
                        {
                            return measurement.sensor_id == 'D001'
                        }
                        )

                        filteredData.forEach(function (measure)
                        {
                            delete measure.time
                            delete measure.sensor_id
                        });
                                            
                        backendApi.post('/forecast',
                             filteredData 
                            ,
                        ).then((response) =>
                            console.log(response.data)
                        )
                    }
                    )
            }
        })


    }

    return (
        <div
            className='app'>
            <Navbar />
            <main >
                <Container className='mt-3 px-5'>
                    <Row className='row text-center'>
                        <h2 className='title'>
                            Sensors
                        </h2>
                    </Row>
                    <Row className='mt-5 d-flex justify-content-center'>
                        <SelectBox className='' />
                    </Row>

                    <Row className='col-lg mx-auto mt-5  text-center align-items-center gx-4'
                    >
                        <Col className='forecast-config-column '>
                            <h3>Forecasting hours</h3>
                            <form onSubmit={handleForecastButton}>
                                <label >
                                    1 hour forecast:
                                    <input
                                        checked={hoursToForecast.hour1}
                                        onChange={() =>
                                        {
                                            dispatch(setHoursToForecast({ ...hoursToForecast, hour1: !hoursToForecast.hour1 }))
                                        }
                                        }
                                        className='checkbox'
                                        type="checkbox"
                                        name="1h" />
                                </label>
                                <br />

                                <label>
                                    2 hour forecast:
                                    <input
                                        checked={hoursToForecast.hour2}
                                        onChange={() =>
                                        {
                                            dispatch(setHoursToForecast({ ...hoursToForecast, hour2: !hoursToForecast.hour2 }))
                                        }
                                        }
                                        className='checkbox'
                                        type="checkbox"
                                        name="2h" />
                                </label>
                                <br />

                                <label>
                                    3 hour forecast:
                                    <input
                                        checked={hoursToForecast.hour3}
                                        onChange={() =>
                                        {
                                            dispatch(setHoursToForecast({ ...hoursToForecast, hour3: !hoursToForecast.hour3 }))
                                        }
                                        }
                                        className='checkbox'
                                        type="checkbox"
                                        name="3h" />
                                </label>
                                <br />

                                <label>
                                    4 hour forecast:
                                    <input className='checkbox'
                                        checked={hoursToForecast.hour4}
                                        onChange={() =>
                                        {
                                            dispatch(setHoursToForecast({ ...hoursToForecast, hour4: !hoursToForecast.hour4 }))
                                        }
                                        }
                                        type="checkbox"
                                        name="4h" />
                                </label>
                                <br />

                                <label>
                                    5 hour forecast:
                                    <input
                                        checked={hoursToForecast.hour5}
                                        onChange={() =>
                                        {
                                            dispatch(setHoursToForecast({ ...hoursToForecast, hour5: !hoursToForecast.hour5 }))
                                        }
                                        }
                                        className='checkbox'
                                        type="checkbox"
                                        name="5h" />
                                </label>
                                <br />

                                <label>
                                    6 hour forecast:
                                    <input className='checkbox'
                                        checked={hoursToForecast.hour6}
                                        onChange={() =>
                                        {
                                            dispatch(setHoursToForecast({ ...hoursToForecast, hour6: !hoursToForecast.hour6 }))
                                        }
                                        }
                                        type="checkbox"
                                        name="6h" />
                                </label>
                                <br />

                                <Button
                                    name='Forecast'
                                    color={RNHEALT_LIVER}
                                    width='100px'
                                    height='40px'
                                />
                            </form>

                        </Col>
                        <Col className='forecast-display-column'>
                            <h3>Forecasts will appear here!</h3>

                            <ForecastsTable
                                algorithms={y}
                                measurements={z}
                            />

                        </Col>
                    </Row>
                </Container>
            </main>
            {/* <Footer /> */}
        </div>
    )
}



export default Sensors
