import { createSlice } from "@reduxjs/toolkit"


const initialState =
{
    isSensorSelected: false,
    hoursToForecast: {
        hour1: true,
        hour2: true,
        hour3: true,
        hour4: true,
        hour5: true,
        hour6: true,
    },
    algorithmsNames: [
        { name: 'Algorithms' },
        { name: 'LSTM' },

    ],
    lstmForecasts: [],
    biLstmForecasts: [],
    isFetchingForecasts: true,
    isLoadingSpinnerOn: true,

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


        },
    }
)

export const { setIsSensorSelected, setHoursToForecast, setLstmForecasts, setIsFetchingForecasts, setIsLoadingSpinnerOn, setBiLstmForecasts } = sensorsSlice.actions
export default sensorsSlice.reducer
