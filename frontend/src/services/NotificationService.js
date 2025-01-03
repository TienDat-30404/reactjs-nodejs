import Cookies from 'js-cookie';

export const getNotificationOfUser = async(query) => {
    
    try 
    {
        const token = Cookies.get('accessToken')
       
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-notification-user?${query}`, {
            method : 'GET',
            headers : {
                'Authorization' :  `Bearer ${token}`,
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/read-notification?idNotification=${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        return response.json()
    }
    catch(err)
    {
        console.log("Fail when read notification", err)
    }
}