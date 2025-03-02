import Cookies from 'js-cookie'
export const getAllDiscount = async (query) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-discount?${query}`, {

        method: 'GET',
        headers: {
            "Authorization" : `Bearer ${token}`,
            'Content-Type': "application/json"
        }
    })
    return response.json()
}

export const addDiscount = async (data) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-discount`, {
        method: 'POST',
        headers: {
            "Authorization" : `Bearer ${token}`,
            'Content-Type': "application/json"
        },
        body : JSON.stringify(data)
    })
    return response.json()
}

export const deleteDiscount = async(id) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-discount/${id}`, {
        method : 'DELETE',
        header : {
            "Authorization" : `Bearer ${token}`,
            'Content-Type': "application/json"
        }
    })
    return response.json()
}

export const updateDiscount = async(id, data) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update-discount/${id}`, {
        method : 'PUT',
        headers : {
            "Authorization" : `Bearer ${token}`,
            'Content-Type': "application/json"
        },
        body : JSON.stringify(data)
    })
    return response.json()
}
