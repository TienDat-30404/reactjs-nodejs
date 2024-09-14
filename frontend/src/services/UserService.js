import Cookies from 'js-cookie'
export const loginService = async (dataLogin) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataLogin),
        credentials: 'include' // Để gửi cookie từ client đến server
    })

    return response.json()
}

export const signInService = async(dataSignIn) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSignIn),
      });
      return response.json()
}

export const refreshTokenService = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Để gửi cookie từ client đến server
    });
    return response.json()
}

export const updateUser = async(id, data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update-user/${id}`, {
        method: 'PUT',
        body : data
    });
    return response.json()
}

export const getAllUser = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}

export const deleteUser = async (id) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-user/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, 
        }
    })
    return response.json()
}

export const getDetailUser = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/detail-user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}