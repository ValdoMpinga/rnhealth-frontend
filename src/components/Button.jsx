import React from 'react'
import '../styles/components/Button.css'

function Button({ color, name, width, height ,isDesabled,handleButtonClick})
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
        onClick={handleButtonClick}
      >
        {name}
      </button>
    </>
  )
}

export default Button
