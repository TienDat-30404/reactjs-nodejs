// import { setCookieForToken } from "./tokenUser";
// import { useSaveTokenOnRedux } from "./function";
// import Cookies from 'js-cookie'
// import { jwtDecode } from "jwt-decode";
// import { loginSuccess } from "../redux/Auth/authSlice";
// import { useDispatch } from "react-redux";
// import { refreshTokenService } from "../services/UserService";
// import { useEffect } from "react";
// export const useAuthHandler = () => {
//     const dispatch = useDispatch();
//     const saveTokenOnRedux = useSaveTokenOnRedux();
//     const accessToken = Cookies.get('accessToken');
//     const checkAndUpdateToken = async () => {
//         if (accessToken) {
//             console.log("123")
//             dispatch(loginSuccess({ dataLogin: jwtDecode(accessToken) }));
//         } else {
//             console.log("123456")
//             await handleRefreshToken();
//         }
//     };

//     const handleRefreshToken = async () => {
//         try {
//             const refreshToken = await refreshTokenService()
//             if (refreshToken.success) {
//                 setCookieForToken(refreshToken.tokenNew);
//                 saveTokenOnRedux(jwtDecode(refreshToken.tokenNew));
//                 dispatch(loginSuccess({ dataLogin: jwtDecode(refreshToken.tokenNew) }));
//             }

//         } catch (error) {
//             console.log(error);
//         }
//     };


//     useEffect(() => {
//         checkAndUpdateToken();
//     }, []);

//     return { checkAndUpdateToken };
// };




import { setCookieForToken } from "./tokenUser";
import { useSaveTokenOnRedux } from "./function";
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "../redux/Auth/authSlice";
import { useDispatch } from "react-redux";
import { refreshTokenService } from "../services/UserService";
import { useEffect } from "react";
export const useAuthHandler = () => {
    const dispatch = useDispatch();
    const saveTokenOnRedux = useSaveTokenOnRedux();
    const handleRefreshToken = async () => {
        try {
            const refreshToken = await refreshTokenService()
            if (refreshToken.success) {
                setCookieForToken(refreshToken.tokenNew);
                saveTokenOnRedux(jwtDecode(refreshToken.tokenNew));
                dispatch(loginSuccess({ dataLogin: jwtDecode(refreshToken.tokenNew) }));
            }
            console.log("accessToken When refresh", Cookies.get('accessToken'))

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const checkToken = async () => {
            const token = Cookies.get('accessToken');
            if (token) {
                console.log("accessToken")
                dispatch(loginSuccess({ dataLogin: jwtDecode(token) }));
            } else {
                console.log("refreshToken")
                await handleRefreshToken();
            }
        };

        checkToken();

        const interval = setInterval(() => {
            handleRefreshToken();
        }, 15000);

        return () => clearInterval(interval);
    }, []);


    return {}
};