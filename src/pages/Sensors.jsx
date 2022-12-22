import React from 'react'


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
import { setIsSensorSelected } from '../app/features/sensors/sensorsSlice'
import SelectBox from '../components/sensors/SelectBox';
import Button from '../components/Button';
import RnColors from '../utils/Constants';
import ForecastsTable from '../components/sensors/ForecastsTable';



function Sensors()
{
    // const { id } = useParams()
    const isSensorSelect = useSelector((state) => state.sensors.isSensorSelected)
    const dispatch = useDispatch()

    const y = [
        { name: 'Algorithms' },
        { name: 'LSTM' },
        { name: 'ARIMA' },
        { name: 'Prophet' }
    ]

    const z = [
        { hour: '1H', LSTM_Forecast: '400', ARIMA_Forecast : '500',Prophet_Forecast : '800' },
        { hour: '2H', LSTM_Forecast: '400', ARIMA_Forecast : '500',Prophet_Forecast : '800' },
        { hour: '3H', LSTM_Forecast: '400', ARIMA_Forecast : '500',Prophet_Forecast : '800' },
        { hour: '4H', LSTM_Forecast: '400', ARIMA_Forecast : '500',Prophet_Forecast : '800' },
        { hour: '5H', LSTM_Forecast: '400', ARIMA_Forecast : '500',Prophet_Forecast : '800' },
        { hour: '6H', LSTM_Forecast: '400', ARIMA_Forecast : '500',Prophet_Forecast : '800' },

    ]
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
                            <form>
                                <label >
                                    1 hour forecast:
                                    <input
                                        className='checkbox'
                                        type="checkbox"
                                        name="1h" />
                                </label>
                                <br />

                                <label>
                                    2 hour forecast:
                                    <input
                                        className='checkbox'
                                        type="checkbox"
                                        name="2h" />
                                </label>
                                <br />

                                <label>
                                    3 hour forecast:
                                    <input
                                        className='checkbox'
                                        type="checkbox"
                                        name="3h" />
                                </label>
                                <br />

                                <label>
                                    4 hour forecast:
                                    <input className='checkbox'
                                        type="checkbox"
                                        name="4h" />
                                </label>
                                <br />

                                <label>
                                    5 hour forecast:
                                    <input
                                        className='checkbox'
                                        type="checkbox"
                                        name="5h" />
                                </label>
                                <br />

                                <label>
                                    6 hour forecast:
                                    <input className='checkbox'
                                        type="checkbox"
                                        name="6h" />
                                </label>
                                <br />

                                <Button
                                    name='Forecast'
                                    color={RnColors.rnhealthLiver}
                                    width='100px'
                                    height='40px'
                                />
                            </form>

                        </Col>
                        <Col className='forecast-display-column'>
                            <h3>Forecasts will appear here!</h3>

                            <ForecastsTable
                                algorithms ={ y}
                                measurements ={ z}
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
