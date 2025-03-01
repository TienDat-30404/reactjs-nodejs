import Cookies from 'js-cookie'
export const getSaleRevenue = async() => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-sale-revenue`, {
        method : 'GET',
        headers : {
            "Authorization" : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    return response.json()
}


export const getTopProductBestSelling = async() => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-top-selling-products`, {
        method : 'GET',
        headers : {
            "Authorization" : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    return response.json()
}


export const getTopBuyers = async() => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-top-buyers`, {
        method : 'GET',
        headers : {
            "Authorization" : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    })
    return response.json()
}