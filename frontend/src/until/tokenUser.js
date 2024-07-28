import Cookies from 'js-cookie';
import { loginSuccess } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const setCookieForToken = (token) => {
    const timeExistTokenCookie = new Date(new Date().getTime() + 30 * 1000);
    Cookies.set('accessToken', token, { expires: timeExistTokenCookie, secure: true, sameSite: 'strict' });
}

const useSaveTokenOnRedux = () => {
    const dispatch = useDispatch();

    const saveTokenOnRedux = (token) => {
        dispatch(loginSuccess({
            dataLogin: token
        }));
    };

    return saveTokenOnRedux;
};





const logoutUser = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/logout-refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include' // Để gửi cookie từ client đến server
    })
    Cookies.remove('accessToken', { path: '' });
    window.location.reload()
}

export { setCookieForToken, useSaveTokenOnRedux, logoutUser }