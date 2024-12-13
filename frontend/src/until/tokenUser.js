import Cookies from 'js-cookie';

const setCookieForToken = (token) => {
    const timeExistTokenCookie = new Date(new Date().getTime() + 10 * 1000);
    Cookies.set('accessToken', token, { expires: timeExistTokenCookie, secure: true, sameSite: 'strict' });
}





export { setCookieForToken }