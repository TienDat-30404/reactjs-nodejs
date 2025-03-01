import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'

import Pagination from '../../../../components/Pagination'
import { getAllVoucher } from '../../../../services/VoucherService'
import { initDataVoucher } from '../../../../redux/Voucher/vouchersSlice'
import { deleteNotificationService, getAllNotification } from '../../../../services/NotificationService'
import { deleteNotificationRedux, initDataNotification, switchPage } from '../../../../redux/Notification/notificationsSlice'
import AddNotification from './AddNotification'
import EditNotification from './EditNotification'
import { useRoleDetail } from '../../../../until/function'
export default function Discount() {
    const dispatch = useDispatch()
    const notifications = useSelector(state => state?.notifications?.data)
    const page = useSelector(state => state?.notifications?.page)
    const totalPage = useSelector(state => state?.notifications?.totalPage)
    const totalNotification = useSelector(state => state?.notifications?.totalNotification)
    const limit = useSelector(state => state?.notifications?.limit)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedNotification, setSelectedNotification] = useState(null);

    const [displayTextSearch, setDisplayTextSearch] = useState('idNotification')
    const [searchCriteria, setSearchCriteria] = useState({
        idNotification: '',
        content: ''
    })
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const idRole = isAuthenticated && userData?.dataLogin?.idRole

    useEffect(() => {
        const fetchData = async () => {
            try {
                let query = `page=${page}&limit=${limit}`
                if (searchCriteria.idNotification != "") {
                    query += `&idNotification=${searchCriteria.idNotification}`
                }
                if (searchCriteria.content != "") {
                    query += `&content=${searchCriteria.content}`
                }


                const response = await getAllNotification(query)
                if (response && response?.status === 200) {
                    dispatch(initDataNotification(response))
                }

            }
            catch (error) {
                console.log("Fail when get notification", error)
            }
        }
        fetchData()
    }, [page, limit, displayTextSearch, searchCriteria]);
    const { data: roleDetails, isLoading: isRoleDetailsLoading, isError: isRoleDetailsError, error: roleDetailsError } = useRoleDetail(idRole)

    const handleSwitchPageEdit = (data) => {
        setShowEdit(true)
        setSelectedNotification(data)
    }

    const handlePagination = (page) => {
        dispatch(switchPage(page))
    }


    // handle delete product
    const handleDeleteDiscount = async (id) => {
        const response = await deleteNotificationService(id)
        if (response && response?.status === 200) {
            dispatch(deleteNotificationRedux(id))
            if (notifications?.length === 1 && page > 1) {
                dispatch(switchPage(page - 1))
            }
        }
    }

    const handleChangeSearchSelect = (e) => {
        setSearchCriteria({
            idNotification: '',
            content: ''
        })
        setDisplayTextSearch(e.target.value)
    }
    return (
        <div className='px-4 py-2 bg-white product'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                    <h3>Discount</h3>
                    <h6 className='ms-3'>({totalNotification} notification found)</h6>
                    {!isRoleDetailsLoading ? (
                        <button
                            onClick={() => setShowAddModal(true)}
                            type="button"
                            className="btn btn-outline-success ms-3"
                            disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                (item) => item?.action === "notification_add" && item?.allow === false
                            )}
                        >
                            Tạo thông báo
                        </button>
                    ) : (
                        <div class="spinner-border" role="status">
                            <span class="sr-only"></span>
                        </div>
                    )}
                </div>
                <div className='d-flex align-items-center'>
                    <i className="bi bi-bell me-3"></i>
                    <i className="bi bi-search me-3"></i>
                    <ImageComponent
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png" alt=""
                        width="30px"
                        height="30px"
                        borderRadius="5px"
                    />
                </div>
            </div>

            <select
                class="form-select"
                onChange={handleChangeSearchSelect}
                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                    (item) => item?.action === "notification_search" && item?.allow === false
                )}
            >
                <option value="idNotification" selected>Tìm kiếm theo Id</option>
                <option value="content">Tìm kiếm theo nội dung</option>
            </select>


            {displayTextSearch && (
                <div class="input-group mb-3 mt-1">
                    <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Tìm kiếm theo {displayTextSearch}</button>
                    <input
                        type="text"
                        class="form-control"
                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                            (item) => item?.action === "notification_search" && item?.allow === false
                        )}
                        name={displayTextSearch}
                        value={searchCriteria[`${displayTextSearch}`]}
                        onChange={(e) => handleChangeInput(e, setSearchCriteria)}
                    />
                </div>
            )}

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Content</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications && notifications?.length > 0 ? (
                        notifications?.map((notification, index) => (
                            <tr key={index}>
                                <th scope="row">{(notification?._id).slice(0, 10)}...</th>


                                <td>{notification?.content}</td>

                                <td>{new Date(notification?.createdAt).toLocaleString('vi-VN')}</td>
                                <td>{new Date(notification?.updatedAt).toLocaleString('vi-VN')}</td>

                                <td style={{ width: '6%' }} className='text-center'>
                                    <button
                                        onClick={() => handleSwitchPageEdit(notification)}
                                        type="button"
                                        className="btn btn-outline-primary"
                                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                            (item) => item?.action === "notification_edit" && item?.allow === false
                                        )}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button
                                        onClick={() => handleDeleteDiscount(notification?._id)}
                                        type="button"
                                        className="btn btn-outline-danger"
                                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                            (item) => item?.action === "notification_delete" && item?.allow === false
                                        )}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : <p>Không có thông báo</p>}

                </tbody>
            </table>

            {totalPage > 1 && (
                <Pagination
                    totalPage={totalPage}
                    handlePagination={handlePagination}
                    page={page}
                    visiblePagination={visiblePagination}
                />
            )}
            <AddNotification show={showAddModal} close={() => setShowAddModal(false)} />
            <EditNotification show={showEdit} close={() => setShowEdit(false)} data={selectedNotification} />
        </div>
    )
}
