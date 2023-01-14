import React from 'react'
import Select from 'react-select'
import { useDispatch } from 'react-redux'

import { setSelectedSensor } from '../../app/features/sensors/sensorsSlice'

const options = [
    { value: 'D001', label: 'D001' },
    { value: 'D003', label: 'D003' },
]

function SelectBox()
{
    const dispatch = useDispatch()

    return (
        <>
            <Select
                placeholder='Please pick one sensor'
                className='select-box'
                options={options}
                onChange={(action) =>
                {
                    dispatch(setSelectedSensor(action.value))
                }}
            />
        </>
    )
}

export default SelectBox
