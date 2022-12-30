import { createSlice } from "@reduxjs/toolkit"


const initialState =
{
    isSensorSelected: false,
    hoursToForecast: {
        hour1: false,
        hour2: false,
        hour3: false,
        hour4: false,
        hour5: false,
        hour6: false,
    },
    algorithmsNames : [
        { name: 'Algorithms' },
        { name: 'LSTM' },

    ],
    forecasts: [],
    isFetchingForecasts: false,
    isLoadingSpinnerOn : false,

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
            setHoursToForecast: (state,action) =>
            {
                state.hoursToForecast = action.payload
            },
            setForecasts: (state,action) =>
            {
                state.forecasts = action.payload
            },
            setIsFetchingForecasts: (state,action) =>
            {
                state.isFetchingForecasts = action.payload
            },
            setIsLoadingSpinnerOn: (state,action) =>
            {
                state.isLoadingSpinnerOn = action.payload
            },
            

        },
    }
)

export const { setIsSensorSelected, setHoursToForecast, setForecasts, setIsFetchingForecasts, setIsLoadingSpinnerOn } = sensorsSlice.actions
export default sensorsSlice.reducer
