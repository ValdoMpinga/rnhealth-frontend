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
    }
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
            }

        },
    }
)

export const { setIsSensorSelected, setHoursToForecast } = sensorsSlice.actions
export default sensorsSlice.reducer
