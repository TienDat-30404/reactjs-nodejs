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

export const updateUserService = async(id, data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update-user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json()
}