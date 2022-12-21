import React from 'react'
import '../styles/components/Button.css'

function Button({ color, name, width, height })
{
  return (
    <>
      <button
        style={{
          backgroundColor: color,
          width: width,
          height: height,
        }}
      >
        {name}
      </button>
    </>
  )
}

export default Button
