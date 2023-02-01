import { configureStore } from "@reduxjs/toolkit";
import sensorReducer from './features/sensors/sensorsSlice'
export const store = configureStore
    ({
        reducer:
        {
            sensors: sensorReducer,

        }
    })
