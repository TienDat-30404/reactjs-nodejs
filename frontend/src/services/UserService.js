import Cookies from 'js-cookie'
export const loginService = async (dataLogin, isValidate) => {
    const params = new URLSearchParams({});
    if (isValidate) {
        params.append('validate_login', true)
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sign-up?${params.toString()}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataLogin),
        credentials: 'include' 
    })

    return response.json()
}

export const loginGoogle = async (dataGoogle) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataGoogle),
        credentials: 'include' 
    });
    return response.json()
}

export const signInService = async (dataSignIn) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSignIn),
    });
    return response.json()
}

export const refreshTokenService = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Để gửi cookie từ client đến server
    });
    return response.json()
}

export const updateUser = async (id, data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update-user/${id}`, {
        method: 'PUT',
        body: data
    });
    return response.json()
}

export const getAllUser = async (query) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-user?${query}`, {
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
    console.log(params.toString())
    return response.json()
}

export const searchUser = async (idUser, name, email, phone, idRole) => {
    const params = new URLSearchParams({});
    if (idUser) {
        params.append('idUser', idUser)
    }
    if (name) {
        params.append('name', name)
    }
    if (email) {
        params.append('email', email)
    }
    if (phone) {
        params.append('phone', phone)
    }
    if (idRole) {
        params.append('idRole', idRole)
    }
    const url = `${process.env.REACT_APP_API_URL}/search-user?${params.toString()}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}



export const logoutUser = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/logout-refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include' // Để gửi cookie từ client đến server
    })
    Cookies.remove('accessToken', { path: '' });
    localStorage.removeItem('avatar')
}
