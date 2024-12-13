import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/Auth/authSlice";
export const handleChangeInput = (e, setState) => {
    const { name, value } = e.target;
    setState(prevInfo => ({
        ...prevInfo,
        [name]: value
    }));

};

export const useSaveTokenOnRedux = () => {
    const dispatch = useDispatch();
    const saveTokenOnRedux = (dataLogin) => {
        dispatch(loginSuccess({
            dataLogin : dataLogin
        }));
    };
    return saveTokenOnRedux;
};
