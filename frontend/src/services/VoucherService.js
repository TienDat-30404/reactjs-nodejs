import Cookies from 'js-cookie'
export const getVoucherOfUser = async(query) => {
    const token = Cookies.get('access_token')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-voucher-user?${query}`, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token} `
        },
        credentials: 'include',
    })
    return response.json()
}