import React from 'react'

const InputComponent = ({ className, type, placeholder, ...rest }) => {
    return (
        <input
            className={className}
            type="search"
            placeholder={placeholder}
            {...rest}
        />
    )
}

export default InputComponent
