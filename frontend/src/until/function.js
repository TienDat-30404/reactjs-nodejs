import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/Auth/authSlice";
import dayjs from 'dayjs';

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


 export const formatTime = (createdAt) => {
    const now = dayjs();
    const diffMinutes = now.diff(dayjs(createdAt), 'minute');
    const diffHours = now.diff(dayjs(createdAt), 'hour');
    const diffDays = now.diff(dayjs(createdAt), 'day');

    if (diffMinutes < 1) return "Vừa xong";
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${diffDays} ngày trước`;
  };
