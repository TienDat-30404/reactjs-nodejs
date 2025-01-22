export const getAllStatus = async() => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-status`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            },
        })
        return response.json()
    } catch (error) {
        console.log(`Fail when get all status ${error}`)
    }
}