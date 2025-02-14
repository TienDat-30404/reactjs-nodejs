
export const getAllDiscount = async (query) => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-discount?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': "application/json"
        }
    })
    return response.json()
}

export const addDiscount = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-discount`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body : JSON.stringify(data)
    })
    return response.json()
}

// export const deleteFavoriteService = async(id) => {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-favorite/${id}`, {
//         method : 'DELETE',
//         header : {
//             'Content-Type': "application/json"
//         }
//     })
//     return response.json()
// }
