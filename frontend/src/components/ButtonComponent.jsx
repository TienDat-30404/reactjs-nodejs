import React from 'react'

const ButtonComponent = ({className, type, content, ...rests}) => {
  return (
    <button         
        className={className}
        type={type}
        {...rests}
        >
        {content}
    </button>
  )
}

export default ButtonComponent
