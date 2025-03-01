import Cookies from 'js-cookie'
export const getAllCategory = async (query) => {
    // const token = Cookies.get('accessToken')

    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-category?${query}`, {
        method: 'GET',
        headers: {
            // "Authorization" : `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}

export const addCategory = async (data) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-category`, {
        headers : {
            "Authorization" : `Bearer ${token}`
        },
        method: 'POST',
        body: data
    })
    return response.json()
}

export const detailCategory = async(id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/detail-category/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}

export const deleteCategory = async (id) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-category/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, 
        }
    })
    return response.json()
}


export const updateCategory = async(id, data) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update-category/${id}`, {
        headers : {
            "Authorization" : `Bearer ${token}`
        },
        method: 'PUT',
        body : data
    })
    return response.json()
}


