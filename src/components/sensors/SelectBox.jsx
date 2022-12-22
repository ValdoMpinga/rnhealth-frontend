import React from 'react'
import Select from 'react-select'

const options = [
    { value: 'D001', label: 'D001' },
    { value: 'D002', label: 'D003' },
]

function SelectBox()
{
    return (
        <>
            <Select
                placeholder='Please pick one sensor'
                className='select-box'
                options={options}
            />
        </>
    )
}

export default SelectBox
