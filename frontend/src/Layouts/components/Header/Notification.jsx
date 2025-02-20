import React from 'react'
import '../../../public/css/notification.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { formatTime } from '../../../until/function';
import { debounce, useLoadMoreData } from '../../../until/function';
import { readNotificationRedux, initDataNotification, loadMoreNotification } from '../../../redux/Notification/notificationsSlice';
import { getNotificationOfUserService, readNotificationService } from '../../../services/NotificationService';
export default function Notification({ show }) {
    const dispatch = useDispatch()
    const loadMoreData = useLoadMoreData()
    const [expandedIndex, setExpandedIndex] = useState(null);
    const data = useSelector(state => state?.notifications?.data)
    const limit = useSelector(state => state?.notifications?.limit)
    const totalNotification = useSelector(state => state?.notifications?.totalNotification)
    const {isAuthenticated, userData} = useSelector(state => state.auth)
    const idUser = isAuthenticated && userData?.dataLogin?.idUser
    useEffect(() => {
        const fetchDataNotification = async () => {
            let query = `limit=${limit}`
            const response = await getNotificationOfUserService(idUser, query)
            console.log("notification", response)
            if (response) {
                dispatch(initDataNotification(response))
            }
        }
        fetchDataNotification()
        const notificationElement = document.querySelector('.notification');
        const debouncedLoadMoreReviews = debounce(() => loadMoreData(limit, totalNotification, loadMoreNotification, dispatch, notificationElement), 200);
        notificationElement.addEventListener("scroll", debouncedLoadMoreReviews);

        return () => notificationElement.removeEventListener("scroll", debouncedLoadMoreReviews);
    }, [limit, loadMoreData])

    const handleShowMore = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };
    const handleCheckReadNotification = async (index, id) => {
        if (data[index].isRead === false) {
            const response = await readNotificationService({
                idNotification : id
            })
            console.log(response)
            if (response && response.status === 200) {
                dispatch(readNotificationRedux(id))
            }
        }
    }

    return (
        <div className={` ${show ? "d-block" : "d-none"} notification position-absolute top-100 start-50 translate-middle-x `}>
            <h5 className='p-2'>Thông báo</h5>
            <div className='p-2'>
                <button type="button" class="btn btn-primary btn-sm me-2">Tất cả</button>
                <button type="button" class="btn btn-secondary btn-sm">Chưa đọc</button>
            </div>
            {data?.map((notification, index) => (
                <div onClick={() => { handleCheckReadNotification(index, notification?._id) }} key={index} className={` mb-1`} >
                    <div className={`px-2 py-1 offcanvas-body`}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <img style={{ width: '40px' }} src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png" alt="" />
                                <p style={{ fontSize: '14px' }} className={`ms-2 ${notification?.isRead === true ? 'text-muted' : 'text-primary'}`}>
                                    {formatTime(notification?.createdAt)}
                                </p>
                            </div>

                            <span class={`${notification?.isRead === true ? "d-none" : "d-block"} p-2 bg-primary border border-light rounded-circle`}>
                                <span class="visually-hidden">New alerts</span>
                            </span>

                        </div>
                        <div className='d-flex flex-column'>
                            <p
                                style={{
                                    maxHeight: expandedIndex === index ? 'none' : '50px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: expandedIndex === index ? '' : 2,
                                }}
                                className={`${notification?.isRead === true ? 'text-muted' : 'text-dark'}`}
                            >
                                {notification.content}
                            </p>

                            <button
                                className="btn btn-link p-0 align-self-start"
                                onClick={() => handleShowMore(index)}
                            >
                                {expandedIndex === index ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}
