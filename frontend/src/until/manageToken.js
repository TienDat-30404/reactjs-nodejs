import { setCookieForToken, useSaveTokenOnRedux } from "./tokenUser";
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { refreshTokenService } from "../services/UserService";
export const useAuthHandler = () => {
    const dispatch = useDispatch();
    const saveTokenOnRedux = useSaveTokenOnRedux();

    const checkAndUpdateToken = async () => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            dispatch(loginSuccess({ dataLogin: jwtDecode(accessToken) }));
        } else {
            await handleRefreshToken();
        }
    };
    
    const handleRefreshToken = async () => {
        try {
            const refreshToken = await refreshTokenService()
            if (refreshToken.success) {
                setCookieForToken(refreshToken.tokenNew);
                saveTokenOnRedux(jwtDecode(refreshToken.tokenNew));
            }
            

        } catch (error) {
            console.log(error);
        }
    };

    return { checkAndUpdateToken };
};