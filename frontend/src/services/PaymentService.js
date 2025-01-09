export const paymentByVnpService = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/create_payment_url`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    return response.json()
}

export const paymentVpnReturnService = async(query) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/payment-return?${query}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
    })
    return response.json()
}