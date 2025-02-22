export const getAllReviewOfProduct = async (id, query) => {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-review-of-product/${id}?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}

export const addReview = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-review`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
    })
    return response.json()
}

export const getAllReview = async(query) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-review?${query}`, {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}


export const replyReview = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/reply-review`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
    })
    return response.json()
}

export const editReplyReview = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/edit-reply-review`, {
        method : 'PATCH',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
    })
    return response.json()
}


export const deleteReview = async(id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-review/${id}`, {
        method : 'DELETE',
        header : {
            'Content-Type': "application/json"
        }
    })
    return response.json()
}