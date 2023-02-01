import { createSlice } from "@reduxjs/toolkit"

const initialState =
{
    isSensorSelected: false,
    selectedSensor: '',
    hoursToForecast: {
        hour1: true,
        hour2: true,
        hour3: true,
        hour4: true,
        hour5: true,
        hour6: true,
    },
    algorithmsNames:
        [

            { name: 'Algorithms' },
            { name: 'LSTM' },

        ],
    lstmForecasts: [],
    biLstmForecasts: [],
    displayLstmForecasts: true,
    displayBiLstmForecasts: false,
    isFetchingForecasts: false,
    isLoadingSpinnerOn: false,
    isDataFetched: false
}

export const sensorsSlice = createSlice(
    {
        name: 'sensors',
        initialState,
        reducers: {
            setIsSensorSelected: (state) =>
            {
                state.isSensorSelected = !initialState.isSensorSelected
            },
            setSelectedSensor: (state, action) =>
            {
                state.selectedSensor = action.payload
            },
            setHoursToForecast: (state, action) =>
            {
                state.hoursToForecast = action.payload
            },
            setLstmForecasts: (state, action) =>
            {
                state.lstmForecasts = action.payload
            },
            setBiLstmForecasts: (state, action) =>
            {
                state.biLstmForecasts = action.payload
            },
            setIsFetchingForecasts: (state, action) =>
            {
                state.isFetchingForecasts = action.payload
            },
            setIsLoadingSpinnerOn: (state, action) =>
            {
                state.isLoadingSpinnerOn = action.payload
            },
            setDisplayLstmForecasts: (state, action) =>
            {
                state.displayLstmForecasts = action.payload
            },
            setDisplayBiLstmForecasts: (state, action) =>
            {
                state.displayBiLstmForecasts = action.payload
            },
            setIsDataFetched: (state, action) =>
            {
                state.isDataFetched = action.payload
            },
        },
    }
)

export const { setIsSensorSelected, setHoursToForecast, setLstmForecasts, setIsFetchingForecasts, setIsLoadingSpinnerOn, setBiLstmForecasts, setDisplayLstmForecasts, setDisplayBiLstmForecasts, setSelectedSensor, setIsDataFetched } = sensorsSlice.actions
export default sensorsSlice.reducer
