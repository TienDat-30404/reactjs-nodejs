import Cookies from 'js-cookie';

export const getNotificationOfUserService = async(id, query) => {
    
    try 
    {
        // const token = Cookies.get('accessToken')
       
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-notification-user?idUser=${id}&${query}`, {
            method : 'GET',
            headers : {
                // 'Authorization' :  `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            credentials: 'include', 
        })
        return response.json()
    }
    catch(error)
    {
        console.log("Fail when fetch data Notification ", error)
    }
}

export const readNotificationService = async(id) => {
    try 
    {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/read-notification`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(id)
        })
        return response.json()
    }
    catch(err)
    {
        console.log("Fail when read notification", err)
    }
}

export const getAllNotification = async(query) => {
    try 
    {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-notification?${query}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        return response.json()
    }
    catch(err)
    {
        console.log("Fail when get all notification", err)
    }
}


export const createNotificationForAll = async(data) => {
    try 
    {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/create-notification`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
        return response.json()
    }
    catch(err)
    {
        console.log("Fail when create notification", err)
    }
}

export const updateNotificationService = async(id, data) => {
    try 
    {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/update-notification/${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
        return response.json()
    }
    catch(err)
    {
        console.log("Fail when update notification", err)
    }
}

export const deleteNotificationService = async(id) => {
    try 
    {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-notification/${id}`, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        return response.json()
    }
    catch(err)
    {
        console.log("Fail when delete notification", err)
    }
}