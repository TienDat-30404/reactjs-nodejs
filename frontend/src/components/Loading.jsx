import React from 'react'

export default function Loading() {
    return (
        <div style={{ height: '100vh' }} className="bg-white d-flex justify-content-center align-items-center">
            <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
            </button>
        </div>
    )
}
