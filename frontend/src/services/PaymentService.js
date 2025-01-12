export const paymentByVnpService = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/payment-create-vnpay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const paymentVpnReturnService = async (query) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/payment-return-vnpay?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json()
}

export const paymentByZaloPay = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/payment-create-zalopay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
    return response.json()
}


export const checkTranSactionZaloPay = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/payment-check-transaction-zalopay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
} 


export const paymentByMomo = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/payment-create-momo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const checkTransactionMomo = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/payment-check-transaction-momo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}