import React from 'react'

const InputComponent = ({ className, type, placeholder, ...rest }) => {
    return (
        <input
            className={className}
            type={type}
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
