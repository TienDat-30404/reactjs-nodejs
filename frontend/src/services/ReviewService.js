import Cookies from 'js-cookie'
export const getAllReviewOfProduct = async (id, query) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-review-of-product/${id}?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}

export const addReview = async (data) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-review`, {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const getAllReview = async (query) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-review?${query}`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}



export const replyReview = async (data) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/reply-review`, {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const editReplyReview = async (data) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/edit-reply-review`, {
        method: 'PATCH',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json()
}


export const deleteReview = async (id) => {
    const token = Cookies.get('accessToken')
    console.log(token)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-review/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
    return response.json()
}