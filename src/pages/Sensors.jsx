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
import { setIsFetchingForecasts, setLstmForecasts, setIsLoadingSpinnerOn, setBiLstmForecasts, setDisplayLstmForecasts, setDisplayBiLstmForecasts, setIsDataFetched, setSelectedSensor } from '../app/features/sensors/sensorsSlice'
import SelectBox from '../components/sensors/SelectBox';
import Button from '../components/Button';
import axios from 'axios';
import apis from '../utils/Apis';
import { RNHEALT_LIVER, TWENTY_HOURS_IN_MILISECOUNDS, TEST_DATE_IN_MILISECOUNDS, RNHEALT_GRAPE_PURPLE } from '../utils/Constants';
import { RotateLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForecastChart from '../components/sensors/ForecastChart';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import dayjs from 'dayjs';

const backendApi = axios.create({
    baseURL: apis.backendApiUrl
})
const rnMonitorApi = axios.create({
    baseURL: apis.rnMonitorApiUrl
})


function Sensors()
{
    const [lastFiveMeasurements, setLastFiveMeasurements] = useState([])
    const { hoursToForecast, displayLstmForecasts, displayBiLstmForecasts, lstmForecasts, selectedSensor, biLstmForecasts, isFetchingForecasts, isLoadingSpinnerOn, isDataFetched } = useSelector((state) => state.sensors)
    const [date, setDate] = useState(dayjs());

    const handleDateChange = (newDate) =>
    {
        setDate(newDate);
    };


    const dispatch = useDispatch()

    function getLastFiveDataAsc(data)
    {
        let newData = data.slice(-5);
        newData.sort(function (a, b)
        {
            return new Date(a.time) - new Date(b.time);
        });

        let newDataWithTime = newData.map(d => ({ time: d.time, Rn: d.Rn }))
        return newDataWithTime;
    }


    const handleForecastButton = () =>
    {
        if (selectedSensor == '')
        {
            toast("Please select a sensor")
        } else
        {
            dispatch(setIsFetchingForecasts(true))
            dispatch(setIsLoadingSpinnerOn(true))

    

                    let parsedCurrentDate = date.toDate().getTime().toString()
                    let parsedStartDate = (parseInt(date.toDate().getTime()) - TWENTY_HOURS_IN_MILISECOUNDS).toString()

                    console.log(parsedStartDate);
                    console.log(parsedCurrentDate);

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
                                return measurement.sensor_id == selectedSensor
                            }
                            )

                            filteredData.forEach(function (measure)
                            {
                                delete measure.sensor_id
                            });


                            setLastFiveMeasurements(getLastFiveDataAsc(filteredData))

                            console.log(JSON.stringify(
                                { targetSensor: selectedSensor }));

                            backendApi.post('/forecast/target-sensor',
                                { targetSensor: selectedSensor },
                            )
                                .then(backendApi.post('/forecast/lstm',
                                    filteredData,
                                )
                                    .then((response) =>
                                    {
                                        dispatch(setLstmForecasts(response.data))
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
                                            dispatch(setIsDataFetched(true))
                                        }
                                        )
                                    })
                                )
                        }
                        )
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



                    <Row className='col-lg mx-auto mt-5  text-center gx-4'>

                        <Col>
                            {
                                isFetchingForecasts ?
                                    <>
                                        <RotateLoader
                                            color={RNHEALT_GRAPE_PURPLE}
                                            loading={isLoadingSpinnerOn}
                                            size={20}
                                        />
                                    </>

                                    :

                                    <>

                                        {
                                            isDataFetched ? <>
                                                <Row className='mb-5'>
                                                    <Col className="d-flex t aligns-items-center justify-content-center mt-4">
                                                        <label >
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
                                                        </label>
                                                    </Col >
                                                    <Col className="d-flex aligns-items-center justify-content-center">
                                                        <Button
                                                            name='Forecast again'
                                                            color={RNHEALT_GRAPE_PURPLE}
                                                            width='120px'
                                                            height='60px'
                                                            handleButtonClick={() =>
                                                            {
                                                                
                                                                dispatch(setIsDataFetched(false))
                                                                dispatch(setSelectedSensor(''))
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col className="d-flex aligns-items-center justify-content-center mt-4">
                                                        <label >
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

                                                <div className='mb-5'>

                                                <ForecastChart
                                                    lastFiveMeasurements={lastFiveMeasurements}
                                                    lstmForecats={lstmForecasts}
                                                    biLstmForecasts={biLstmForecasts}
                                                    />
                                                </div>

                                            </>
                                                :
                                                <>
                                                    <Col>

                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DateTimePicker
                                                                label="Date & forecasting time"
                                                                value={date}
                                                                ampm={false}
                                                                onChange={handleDateChange}
                                                                disableFuture={true}
                                                                maxTime={dayjs(new Date())}
                                                                InputProps={{ readOnly: true }}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </Col>


                                                    <Col className='mt-4'>

                                                        <Button
                                                            name='Forecast'
                                                            color={RNHEALT_LIVER}
                                                            width='100px'
                                                            height='40px'
                                                            handleButtonClick={() => { handleForecastButton() }}
                                                        />
                                                    </Col>
                                                </>

                                        }


                                    </>

                            }

                        </Col>

                    </Row>
                </Container>
            </main>
            <Footer />
        </div>
    )
}



export default Sensors
