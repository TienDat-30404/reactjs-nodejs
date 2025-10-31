import Cookies from 'js-cookie'
export const loginService = async (data, isValidate) => {
    const params = new URLSearchParams({});
    if (isValidate) {
        params.append('validate_login', true)
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sign-in?${params.toString()}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })

    return response.json()
}

export const loginGoogle = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });
    return response.json()
}


export const sendOtpForCreateAccount = async (dataSignIn) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/send-otp-signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSignIn),
    });
    return response.json()
}

export const verifyOtpAgreeCreateAccount = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/verify-otp-signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json()
}


export const refreshTokenService = async () => {
    console.log("tnj23r233333333333333333333333333333", process.env.REACT_APP_API_URL)
    const response = await fetch(`https://backend-commerce-psdz.onrender.com/refresh-token/22222222`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Để gửi cookie từ client đến server
    });
    return response.json()
}

export const updateUser = async (id, data) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update-user/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        method: 'PUT',
        body: data
    });
    return response.json()
}

export const getAllUser = async (query) => {
    const token = Cookies.get('accessToken')

    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-user?${query}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
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

export const changePassword = async (id, data, isChange) => {
    const params = new URLSearchParams({});
    if (isChange) {
        params.append('change', true)
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/change-password/${id}?${params.toString()}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json()
}



export const logoutUser = async () => {
    // const token = Cookies.get('accessToken')
    await fetch(`${process.env.REACT_APP_API_URL}/logout-refresh-token`, {
        method: 'POST',
        headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include' // Để gửi cookie từ client đến server
    })
    Cookies.remove('accessToken', { path: '' });
    localStorage.removeItem('avatar')
}


export const addUser = async (data) => {
    const token = Cookies.get('accessToken')
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-user`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json()
}