import React from 'react'
import { useSelector } from 'react-redux'
import CanvasJSReact from '../../assets/canvasJs/canvasjs.react'
import { RNHEALT_LIVER,RNHEALT_DAVE_GRAY, RNHEALT_GRAPE_PURPLE,RNHEALTH_LIGHT_PLUM } from '../../utils/Constants';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ForecastChart({ lstmForecats, biLstmForecasts, lastFiveMeasurements })
{
    const {  displayLstmForecasts, displayBiLstmForecasts } = useSelector((state) => state.sensors)

    const limitDecimalsWithoutRounding = (val, decimals) =>
    {
        let parts = val.toString().split(".");
        return parseFloat(parts[0] + "." + parts[1].substring(0, decimals));
    }

    let lstmForecastsArr = []
    let lstmForecastsErrors = []

    let biLstmForecastsArr = []
    let biLstmForecastsErrors = []
    let oneHourInMillisecounds = 3600000

    let lstmLastHour = new Date(lastFiveMeasurements[lastFiveMeasurements.length - 1].time)
    let biLstmLastHour = new Date(lastFiveMeasurements[lastFiveMeasurements.length - 1].time)

    lastFiveMeasurements.forEach((measure) =>
    {
        lstmForecastsArr.push({ x: new Date(measure.time),y: measure.Rn })
        biLstmForecastsArr.push({ x: new Date(measure.time),y: measure.Rn })
    })

    lstmForecats.forEach((measure, index) =>
    {
        let newDate = lstmLastHour.setTime(lstmLastHour.getTime() + oneHourInMillisecounds)
        lstmForecastsArr.push({ x: new Date(newDate), y: limitDecimalsWithoutRounding(measure.LSTM_Forecast,2), })
        lstmForecastsErrors.push({ x: new Date(newDate), y: [limitDecimalsWithoutRounding((measure.LSTM_Forecast - measure.error),2), limitDecimalsWithoutRounding((measure.LSTM_Forecast + measure.error),2 )]})
    })

    biLstmForecasts.forEach((measure) =>
    {
        let newDate = biLstmLastHour.setTime(biLstmLastHour.getTime() + oneHourInMillisecounds)

        biLstmForecastsArr.push({ x: new Date(newDate), y: limitDecimalsWithoutRounding(measure.biLSTM_Forecast,2)})
        biLstmForecastsErrors.push({ x: new Date(newDate), y: [limitDecimalsWithoutRounding((measure.biLSTM_Forecast - measure.error),2), limitDecimalsWithoutRounding(( measure.biLSTM_Forecast + measure.error),2)] })

    })



    const options = {
        animationEnabled: true,
        title: {
            text: "Radon concentration forecast for the next 6 hours"
        },
        axisX: {
            valueFormatString: "hh:mm TT" ,
            interval: 1,
            titleWrap : true,
        },
        axisY: {
            title: "Concentration levels",
        },
        axisY2: {
            title: "Concentration levels 2",

        },
        toolTip: {
            shared: true,
            animationEnabled: true,
            content: "jamaes"
        },
        data: [
            {

                type: "spline",
                color: RNHEALT_GRAPE_PURPLE,
                name: "Radon gas level",
                showInLegend: true,
                toolTipContent: "<b>{label}</b><span style=\"color:#591f50\">{name}</span>: {y} Bq/m³",
                dataPoints: lstmForecastsArr,
                visible: displayLstmForecasts,
                lineThickness: 10,
                markerColor: 'green',
                markerSize: 13,
            },
            {
                type: "rangeSplineArea",
                color: "red",
                name: "LSTM error range of the forecast",
                showInLegend: true,
                toolTipContent: "<span style=\"color:red\">{name} </span>: {y[0]} - {y[1]} Bq/m³",
                dataPoints: lstmForecastsErrors,
                visible: displayLstmForecasts,
                fillOpacity: .2,
            },

            {
                type: "spline",
                color: RNHEALTH_LIGHT_PLUM,
                name: "Radon gas level",
                showInLegend: true,
                toolTipContent: "<b>{label}</b><span style=\"color:#a54a96\">{name} </span>: {y} Bq/m³",
                dataPoints: biLstmForecastsArr,
                visible: displayBiLstmForecasts,
                lineThickness: 10,
                markerColor: 'green',
                markerSize: 13,
            },
            {
                type: "rangeSplineArea",
                color: "red",
                name: " BI LSTM error range of the forecast",
                showInLegend: true,
                toolTipContent: "<span style=\"color:red\">{name}</span>: {y[0]} - {y[1]} Bq/m³",
                dataPoints: biLstmForecastsErrors,
                visible: displayBiLstmForecasts,
                fillOpacity: .2,
            }
        ]
    }

    return (
        <CanvasJSChart options={options}
            className='mt-5'
        />
    )
}

export default ForecastChart
