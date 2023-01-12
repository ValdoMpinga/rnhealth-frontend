import React from 'react'
import { useSelector } from 'react-redux'
import CanvasJSReact from '../../assets/canvasJs/canvasjs.react'
import { RNHEALT_LIVER,RNHEALT_DAVE_GRAY, RNHEALT_GRAPE_PURPLE,RNHEALTH_LIGHT_PLUM } from '../../utils/Constants';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ForecastChart({ lstmForecats, biLstmForecasts })
{
    const {  displayLstmForecasts, displayBiLstmForecasts } = useSelector((state) => state.sensors)

    let lstmForecastsArr = []
    let lstmForecastsErrors = []

    let biLstmForecastsArr = []
    let biLstmForecastsErros = []

    console.log('inside chart component');

    lstmForecats.forEach((measure, index) =>
    {
        lstmForecastsArr.push({ y: measure.LSTM_Forecast, label: `${index + 1} Hour ahead` })
        lstmForecastsErrors.push({y:[ (measure.LSTM_Forecast - measure.error), ( measure.LSTM_Forecast + measure.error )]})
    })

    biLstmForecasts.forEach((measure,index) =>
    {
        biLstmForecastsArr.push({ y: measure.biLSTM_Forecast  })
        biLstmForecastsErros.push({  y: [measure.biLSTM_Forecast - measure.error, measure.biLSTM_Forecast + measure.error] })

    })

    console.log("bellow");
    console.log(lstmForecastsErrors);

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

                type: "spline",
                color: RNHEALT_GRAPE_PURPLE,
                name: "LSTM Forecast",
                showInLegend: true,
                toolTipContent: "<b>{label}</b><br><span style=\"color:#591f50\">{name}</span>: {y} Bq/m³",
                dataPoints: lstmForecastsArr,
                visible: displayLstmForecasts,
                lineThickness: 10,

            },
            {
                type: "rangeSplineArea",
                color: RNHEALT_DAVE_GRAY,
                name: "LSTM Error Range",
                showInLegend: true,
                toolTipContent: "<span style=\"color:#5c545c\">{name} </span>: {y[0]} - {y[1]} Bq/m³",
                dataPoints: lstmForecastsErrors,
                visible: displayLstmForecasts,
                fillOpacity: .3,

            },

            {
                type: "spline",
                color: RNHEALTH_LIGHT_PLUM,
                name: "Bi LSTM Forecast",
                showInLegend: true,
                toolTipContent: "<b>{label}</b><span style=\"color:#a54a96\">{name} </span>: {y} Bq/m³<br>",
                dataPoints: biLstmForecastsArr,
                visible: displayBiLstmForecasts,
                lineThickness: 10,


            },
            {
                type: "rangeSplineArea",
                color: RNHEALT_LIVER,
                name: " BI LSTM Error Range",
                showInLegend: true,
                toolTipContent: "<span style=\"color:#ababab\">{name}</span>: {y[0]} - {y[1]} Bq/m³",
                dataPoints: biLstmForecastsErros,
                visible: displayBiLstmForecasts,
                fillOpacity: .3,


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
