import React from 'react'
import CanvasJSReact from '../../assets/canvasJs/canvasjs.react'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ForecastChart({ lstmForecats, biLstmForecasts })
{
    let lstmForecastsArr = []
    let lstmForecastsErrors = []

    let biLstmForecastsArr = []
    let biLstmForecastsErros = []

    let lstmMeasures = [
        {
            'hour': 1,
            'LSTM_Forecast': 100,
            'error': 33.95,

        },
        {
            'hour': 2,
            'LSTM_Forecast': 120,
            'error': 55.63,
        },
        {
            'hour': 3,
            'LSTM_Forecast': 130,
            'error': 68.11,
        },
        {
            'hour': 4,
            'LSTM_Forecast': 150,
            'error': 84.85,
        },
        {
            'hour': 5,
            'LSTM_Forecast': 170,
            'error': 96.67,
        },
        {
            'hour': 6,
            'LSTM_Forecast': 140,
            'error': 107.24,
        }]

    let biLstmMeasures = [
        {
            'hour': 1,
            'biLSTM_Forecast': 200,
            'error': 33.95,

        },
        {
            'hour': 2,
            'biLSTM_Forecast': 220,
            'error': 55.63,
        },
        {
            'hour': 3,
            'biLSTM_Forecast': 230,
            'error': 68.11,
        },
        {
            'hour': 4,
            'biLSTM_Forecast': 250,
            'error': 84.85,
        },
        {
            'hour': 5,
            'biLSTM_Forecast': 270,
            'error': 96.67,
        },
        {
            'hour': 6,
            'biLSTM_Forecast': 240,
            'error': 107.24,
        }]


    console.log('inside chart component');

    lstmForecats.forEach((measure, index) =>
    {
        lstmForecastsArr.push({ y: measure.LSTM_Forecast })
        lstmForecastsErrors.push({ y: [measure.LSTM_Forecast - measure.error, measure.LSTM_Forecast + measure.error]})
    })

    biLstmForecasts.forEach((measure,index) =>
    {
        biLstmForecastsArr.push({ y: measure.biLSTM_Forecast })
        biLstmForecastsErros.push({ y: [measure.biLSTM_Forecast - measure.error, measure.biLSTM_Forecast + measure.error] })

    })


    const options = {
        animationEnabled: true,
        title: {
            text: "Radon concentration forecast for the next 6 hours"
        },
        axisX: {
            interval: 1
        },
        axisY: {
            title: "Concentration levels",
        },
        axisY2: {
            title: "Concentration levels 2",

        },
        toolTip: {
            shared: true
        },
        data: [

            {
                type: "line",
                name: "LSTM Forecast",
                showInLegend: true,
                toolTipContent: "<b>{label}</b><br><span style=\"color:#4F81BC\">{name}</span>: {y} Bq/m³",
                dataPoints: lstmForecastsArr
            },
            {
                type: "line",
                name: "Bi LSTM Forecast",
                showInLegend: true,
                toolTipContent: "<b>{label}</b><br><span style=\"color:#a54a96\">{name}</span>: {y} Bq/m³",
                dataPoints: biLstmForecastsArr
            },
            {
                type: "error",
                name: "LSTM Error Range",
                showInLegend: true,
                toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y[0]} - {y[1]} Bq/m³",
                dataPoints: lstmForecastsErrors
                //[
                //     { y: [18, 20] },
                //     { y: [14, 18] },
                //     { y: [15, 17] },
                //     { y: [15, 17]},
                //     { y: [14, 16] },
                //     { y: [12, 14] },
                //     { y: [13, 15], label: "Jul" },
                //     { y: [12, 14], label: "Aug" },
                //     { y: [14, 16], label: "Sep" },
                //     { y: [14, 16], label: "Oct" },
                //     { y: [16, 18], label: "Nov" },
                //     { y: [16, 19], label: "Dec" }
                // ]
            },
            {
                type: "error",
                name: " BI LSTM Error Range",
                showInLegend: true,
                toolTipContent: "<span style=\"color:#C0504E\">{name}</span>: {y[0]} - {y[1]} Bq/m³",
                dataPoints: biLstmForecastsErros
                //     [
                //     { y: [28, 32], label: "1 Hour" },
                //     { y: [24, 28], label: "2 Hour" },
                //     { y: [25, 27], label: "3 Hour" },
                //     { y: [25, 27], label: "4 Hour" },
                //     { y: [24, 26], label: "5 Hour" },
                //     { y: [22, 24], label: "6 Hour" },
                //     { y: [13, 15], label: "Jul" },
                //     { y: [12, 14], label: "Aug" },
                //     { y: [14, 16], label: "Sep" },
                //     { y: [14, 16], label: "Oct" },
                //     { y: [16, 18], label: "Nov" },
                //     { y: [16, 19], label: "Dec" }
                // ]
            }
        ]
    }

    return (
        <CanvasJSChart options={options}
            className='mt-5'
        // onRef = {ref => this.chart = ref} 
        />
    )
}

export default ForecastChart
