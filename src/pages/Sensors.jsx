import React, { useState, useEffect, useRef } from 'react'
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
import { setHoursToForecast, setIsFetchingForecasts, setLstmForecasts, setIsLoadingSpinnerOn, setBiLstmForecasts, setDisplayLstmForecasts, setDisplayBiLstmForecasts } from '../app/features/sensors/sensorsSlice'
import SelectBox from '../components/sensors/SelectBox';
import Button from '../components/Button';
import ForecastsTable from '../components/sensors/ForecastsTable';
import axios from 'axios';
import apis from '../utils/Apis';
import { RNHEALT_LIVER, TWENTY_HOURS_IN_MILISECOUNDS, TEST_DATE_IN_MILISECOUNDS, RNHEALT_GRAPE_PURPLE } from '../utils/Constants';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { RotateLoader } from 'react-spinners';
import CanvasJSReact from '../assets/canvasJs/canvasjs.react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForecastChart from '../components/sensors/ForecastChart';
const backendApi = axios.create({
    baseURL: apis.backendApiUrl
})
const rnMonitorApi = axios.create({
    baseURL: apis.rnMonitorApiUrl
})



function Sensors()
{


    // const { id } = useParams()
    const shouldGetForecast = useRef(true)
    const { hoursToForecast, displayLstmForecasts, displayBiLstmForecasts, lstmForecasts, biLstmForecasts, isFetchingForecasts, isLoadingSpinnerOn } = useSelector((state) => state.sensors)
    const dispatch = useDispatch()

    const getForecasts = () =>
    {

        // dispatch(setIsFetchingForecasts(true))
        // dispatch(setIsLoadingSpinnerOn(true))

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
                let parsedStartDate = (parseInt(Date.now()) - TWENTY_HOURS_IN_MILISECOUNDS).toString()
                // let parsedCurrentDate = TEST_DATE_IN_MILISECOUNDS
                // let parsedStartDate = TEST_DATE_IN_MILISECOUNDS - TWELVE_HOURS_IN_MILISECOUNDS

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

                        console.log(parsedStartDate);
                        console.log(parsedCurrentDate);
                        console.log(filteredData);

                        filteredData.forEach(function (measure)
                        {
                            delete measure.time
                            delete measure.sensor_id
                        });

                        backendApi.post('/forecast/lstm',
                            filteredData
                            ,
                        ).then((response) =>
                        {
                            dispatch(setLstmForecasts(response.data))

                            console.log(response.data);
                        }
                        ).then(() =>
                        {
                            backendApi.post('/forecast/bi-lstm',
                                filteredData,
                            ).then((response) =>
                            {
                                dispatch(setBiLstmForecasts(response.data))
                                dispatch(setIsLoadingSpinnerOn(false))
                                dispatch(setIsFetchingForecasts(false))

                                console.log(response.data);
                            }
                            )
                        })


                    }
                    )
            }
        })
    }

    useEffect(() =>
    {
        if (shouldGetForecast.current)
        {
            shouldGetForecast.current = false
            getForecasts()
        }

    }, [])


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


                    {/* <Row className='mt-5 d-flex justify-content-center'>
                        <SelectBox className='' />
                    </Row> */}

                    <Row className='col-lg mx-auto mt-5  text-center gx-4'>

                        <Col>
                            {
                                isFetchingForecasts ?
                                    <RotateLoader
                                        color={RNHEALT_GRAPE_PURPLE}
                                        loading={isLoadingSpinnerOn}
                                        size={20}
                                    /> :
                                    <>

                                        <Row className="">
                                            <Col>  <label >
                                               LSTM:
                                                <input
                                                    checked={displayLstmForecasts}
                                                    onChange={() =>
                                                    {
                                                        dispatch(setDisplayLstmForecasts(!displayLstmForecasts))
                                                    }
                                                    }
                                                    className='checkbox'
                                                    type="checkbox"
                                                    name="1h" />
                                            </label></Col>
                                            <Col>  <label >
                                                Bi LSTM:
                                                <input
                                                    checked={displayBiLstmForecasts}
                                                    onChange={() =>
                                                    {
                                                        dispatch(setDisplayBiLstmForecasts(!displayBiLstmForecasts))
                                                    }
                                                    }
                                                    className='checkbox'
                                                    type="checkbox"
                                                    name="1h" />
                                            </label></Col>


                                        </Row>

                                        <ForecastChart
                                            lstmForecats={lstmForecasts}
                                            biLstmForecasts={biLstmForecasts}
                                        />

                                    </>

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
