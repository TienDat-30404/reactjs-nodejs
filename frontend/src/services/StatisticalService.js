export const getSaleRevenue = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-sale-revenue`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return response.json()
}


export const getTopProductBestSelling = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-top-selling-products`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return response.json()
}


export const getTopBuyers = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-top-buyers`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return response.json()
}