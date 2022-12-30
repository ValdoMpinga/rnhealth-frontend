import React from 'react'
import '../styles/components/Button.css'

function Button({ color, name, width, height ,isDesabled})
{
  return (
    <>
      <button
        disabled={isDesabled}
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
