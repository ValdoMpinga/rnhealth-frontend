import React, { useState, CSSProperties } from 'react'
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
import { setHoursToForecast, setIsFetchingForecasts, setForecasts, setIsLoadingSpinnerOn } from '../app/features/sensors/sensorsSlice'
import SelectBox from '../components/sensors/SelectBox';
import Button from '../components/Button';
import ForecastsTable from '../components/sensors/ForecastsTable';
import axios from 'axios';
import apis from '../utils/Apis';
import { RNHEALT_LIVER, NINE_HOURS_IN_MILISECOUNDS, RNHEALT_GRAPE_PURPLE } from '../utils/Constants';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { RotateLoader } from 'react-spinners';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendApi = axios.create({
    baseURL: apis.backendApiUrl
})
const rnMonitorApi = axios.create({
    baseURL: apis.rnMonitorApiUrl
})


function Sensors()
{
    // const { id } = useParams()
    const { hoursToForecast, algorithmsNames, forecasts, isFetchingForecasts, isLoadingSpinnerOn } = useSelector((state) => state.sensors)
    const dispatch = useDispatch()

    const handleForecastButton = (e) =>
    {
        e.preventDefault();

        const areAllCheckboxesFalse = Object.values(hoursToForecast).every(
            value => value === false
        )

        if (areAllCheckboxesFalse)
        {
            toast("Please select at least one hour to forecast")

        } else
        {
            dispatch(setIsFetchingForecasts(true))
            dispatch(setIsLoadingSpinnerOn(true))

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
                            {
                                dispatch(setForecasts(response.data))
                                dispatch(setIsFetchingForecasts(false))
                                dispatch(setIsLoadingSpinnerOn(false))
                            }
                            )
                        }
                        )
                }
            })
        }





    }




    return (
        <div
            className='app'>
            <Navbar />
            <main >
                <Container className='mt-3 px-5'>


                    <ToastContainer
                        limit={1}
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    <Row className='row text-center'>
                        <h2 className='title'>
                            Sensors
                        </h2>
                    </Row>
                    <Row className='mt-5 d-flex justify-content-center'>
                        <SelectBox className='' />
                    </Row>

                    <Row className='col-lg mx-auto mt-5  text-center gx-4'
                    >
                        <Col className='forecast-config-column '>
                            <h3>Forecasting hours</h3>
                            <form onSubmit={handleForecastButton}>
                                <div className='mt-5'>
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
                                        isDesabled={isFetchingForecasts}
                                        name='Forecast'
                                        color={RNHEALT_LIVER}
                                        width='100px'
                                        height='40px'
                                    />
                                </div>
                            </form>

                        </Col>
                        <Col className='forecast-display-column '>
                            <h3>Forecasts will be displayed here!</h3>

                            {
                                isFetchingForecasts ?
                                    <div>
                                        <RotateLoader
                                            color={RNHEALT_GRAPE_PURPLE}
                                            loading={isLoadingSpinnerOn}
                                            size={20}
                                        />
                                    </div> :
                                    forecasts.length === 0 ?

                                        <OnlinePredictionIcon
                                            sx={{ fontSize: 50 }}
                                        /> :
                                        <ForecastsTable
                                            algorithms={algorithmsNames}
                                            measurements={forecasts}
                                        />
                            }
                        </Col>
                    </Row>
                </Container>
            </main>
            {/* <Footer /> */}
        </div>
    )
}



export default Sensors
