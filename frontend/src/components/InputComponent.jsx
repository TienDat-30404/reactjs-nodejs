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

const ErrorMessageInput = ({errors, field}) => {
    return(
        <p style={{ color: 'red', fontSize: '13px' }}>{errors[field]}</p>
    )    
}
export {InputComponent, ErrorMessageInput}
