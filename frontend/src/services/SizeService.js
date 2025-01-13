export const getAllSizeService = async(query) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sizes?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}