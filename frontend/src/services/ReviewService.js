export const getAllReviewOfProduct = async (id, query) => {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/review/${id}?${query}`, {
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