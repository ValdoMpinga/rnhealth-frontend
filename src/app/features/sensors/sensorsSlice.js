import { createSlice } from "@reduxjs/toolkit"


const initialState =
{
    isSensorSelected: false,
}

export const sensorsSlice = createSlice(
    {
        name: 'sensors',
        initialState,
        reducers: {
            setIsSensorSelected: (state) =>
            {
                state.isSensorSelected = !initialState.isSensorSelected
            }
        },
    }
)

export const { setIsSensorSelected } = sensorsSlice.actions
export default sensorsSlice.reducer
