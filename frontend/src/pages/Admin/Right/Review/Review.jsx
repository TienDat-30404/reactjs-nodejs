import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'
import Pagination from '../../../../components/Pagination'
import { deleteReview, getAllReview } from '../../../../services/ReviewService'
import { addReviewRedux, deleteReviewRedux, initDataReview, switchPage } from '../../../../redux/Review/reviewsSlice'
import ReplyReview from './ReplyReview'
import { io } from 'socket.io-client'
import { useRoleDetail } from '../../../../until/function'
const socket = io(process.env.REACT_APP_API_URL);
export default function Review() {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state?.reviews?.reviews)
    const page = useSelector(state => state?.reviews?.page)
    const totalPage = useSelector(state => state?.reviews?.totalPage)
    const totalReview = useSelector(state => state?.reviews?.totalReview)
    const limit = useSelector(state => state?.reviews?.limit)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedReview, setSelectedReview] = useState(null);

    const [displayTextSearch, setDisplayTextSearch] = useState('idReview')
    const [searchCriteria, setSearchCriteria] = useState({
        idReview: '',
        content: '',
        rating: ''
    })
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const idRole = isAuthenticated && userData?.dataLogin?.idRole


    useEffect(() => {
        const fetchData = async () => {
            try {
                let query = `page=${page}&limit=${limit}`
                if (searchCriteria.idReview != "") {
                    query += `&idReview=${searchCriteria.idReview}`
                }
                if (searchCriteria.content != "") {
                    query += `&content=${searchCriteria.content}`
                }
                if (searchCriteria.rating != "") {
                    query += `&rating=${searchCriteria.rating}`
                }


                const response = await getAllReview(query)
                if (response && response.status === 200) {
                    dispatch(initDataReview(response))
                }

            }
            catch (error) {
                console.log("Fail when get review to display")
            }
        }
        fetchData()
    }, [page, limit, displayTextSearch, searchCriteria]);
    const { data: roleDetails, isLoading: isRoleDetailsLoading, isError: isRoleDetailsError, error: roleDetailsError } = useRoleDetail(idRole)
    const isDisplayPageReview = roleDetails?.permissions?.some(item =>
        item.action.toLowerCase().includes('review') && item.allow === true
    )

    useEffect(() => {
        socket.on('review', (review) => {
            dispatch(addReviewRedux(review))
        })
    }, [])

    const handleSwitchPageEdit = (data) => {
        setShowEdit(true)
        setSelectedReview(data)
    }

    const handlePagination = (page) => {
        dispatch(switchPage(page))
    }


    // handle delete product
    const handleDeleteReview = async (id) => {
        const response = await deleteReview(id)
        console.log(response)
        if (response && response?.status === 200) {
            dispatch(deleteReviewRedux(id))
            if (reviews?.length === 1 && page > 1) {
                dispatch(switchPage(page - 1))
            }
        }
    }



    const handleChangeSearchSelect = (e) => {
        setSearchCriteria({
            idReview: '',
            content: '',
            rating: ''
        })
        setDisplayTextSearch(e.target.value)
    }
    return (
        <div className='px-4 py-2 bg-white product'>
            {isDisplayPageReview ? (
                <Fragment>

                    <div className='d-flex justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <h3>Review</h3>
                            <h6 className='ms-3'>({totalReview} review found)</h6>
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
                            (item) => item?.action === "review_search" && item?.allow === false
                        )}
                    >
                        <option value="idReview" selected>Tìm kiếm theo Id</option>
                        <option value="content">Tìm kiếm theo nội dung</option>
                        <option value="rating">Tìm kiếm theo đánh giá sao</option>
                    </select>
        
        
                    {displayTextSearch && displayTextSearch != "rating" && (
                        <div class="input-group mb-3 mt-1">
                            <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Tìm kiếm theo {displayTextSearch}</button>
                            <input
                                type="text"
                                class="form-control"
                                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                    (item) => item?.action === "review_search" && item?.allow === false
                                )}
                                name={displayTextSearch}
                                value={searchCriteria[`${displayTextSearch}`]}
                                onChange={(e) => handleChangeInput(e, setSearchCriteria)}
                            />
                        </div>
                    )}
        
                    {displayTextSearch === "rating" && (
                        <select
                            name={displayTextSearch}
                            value={searchCriteria[`${displayTextSearch}`]}
                            onChange={(e) => handleChangeInput(e, setSearchCriteria)}
                            className="form-select mt-2"
                            disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                (item) => item?.action === "review_search" && item?.allow === false
                            )}
                        >
                            <option value="1">1 star</option>
                            <option value="2">2 star</option>
                            <option value="3">3 star</option>
                            <option value="4">4 star</option>
                            <option value="5">5 star</option>
                        </select>
                    )}
        
        
        
        
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Content</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Sender</th>
                                <th scope="col">Respondent</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Updated At</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews && reviews?.length > 0 ? (
                                reviews?.map((review, index) => (
                                    <tr key={index}>
                                        <th scope="row">{(review?._id).slice(0, 10)}...</th>
                                        <td>{review?.content}</td>
                                        <td>{review?.rating}</td>
                                        <td>{review?.user?.name}</td>
                                        <td>{review?.response[0]?.user?.name}</td>
        
                                        <td>{new Date(review?.createdAt).toLocaleString('vi-VN')}</td>
        
                                        <td>{new Date(review?.updatedAt).toLocaleString('vi-VN')}</td>
                                        <td style={{ width: '10%' }} className='text-center'>
                                            <button
                                                onClick={() => handleSwitchPageEdit(review)}
                                                type="button"
                                                className={`btn btn-outline-${review?.response?.length > 0 ? 'primary' : 'danger'}`}
                                                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                                    (item) => item?.action === "review_reply" && item?.allow === false
                                                )}
                                            >
                                                {review?.response?.length > 0 ? 'Đã trả lời' : 'Chưa trả lời'}
                                            </button>
                                        </td>
                                        <td style={{ width: '6%' }} className='text-center'>
                                            <button
                                                onClick={() => handleDeleteReview(review?._id)}
                                                type="button"
                                                className="btn btn-outline-danger"
                                                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                                    (item) => item?.action === "review_delete" && item?.allow === false
                                                )}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : <p>Không có nhận xét nào cho sản phẩm</p>}
        
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
                    <ReplyReview show={showEdit} close={() => setShowEdit(false)} data={selectedReview} />
                    {/* <AddDiscount show={showAddModal} close={() => setShowAddModal(false)} />
                    <EditDiscount show={showEdit} close={() => setShowEdit(false)} data={selectedReview} /> */}
                </Fragment>
            ) : ""}
        </div>
    )
}
