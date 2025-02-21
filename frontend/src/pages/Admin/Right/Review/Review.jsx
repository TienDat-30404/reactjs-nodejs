import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'
import Pagination from '../../../../components/Pagination'
import { getAllReview } from '../../../../services/ReviewService'
import { initDataReview } from '../../../../redux/Review/reviewsSlice'
import ReplyReview from './ReplyReview'

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

    const [displayTextSearch, setDisplayTextSearch] = useState('idDiscount')
    const [searchCriteria, setSearchCriteria] = useState({
        idDiscount: '',
        status: '',
        name: ''
    })

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let query = `page=${page}&limit=${limit}`
                let queryProduct = 'limit=100'
                // if (searchCriteria.idDiscount != "") {
                //     query += `&idDiscount=${searchCriteria.idDiscount}`
                // }
                // if (searchCriteria.status != "") {
                //     query += `&status=${searchCriteria.status}`
                // }
                
                const response = await getAllReview(query)
                if(response && response.status === 200)
                {
                    dispatch(initDataReview(response))
                }

            }
            catch (error) {
                console.log("Fail when get review to display")
            }
        }
        fetchData()
    }, [page, limit]);
    const handleSwitchPageEdit = (data) => {
        setShowEdit(true)
        setSelectedReview(data)
    }

    const handlePagination = (page) => {
        // dispatch(switchPage(page))
    }


    // handle delete product
    const handleDeleteDiscount = async (id) => {
        // const response = await deleteDiscount(id)
        // if (response && response?.status === 200) {
        //     dispatch(deleteDiscountRedux(id))
        //     if (discounts?.length === 1 && page > 1) {
        //         dispatch(switchPage(page - 1))
        //     }
        // }
    }

    const handleChangeSearchSelect = (e) => {
        // setSearchCriteria({
        //     idDiscount: '',
        //     status: '',
        //     name: ''
        // })
        // console.log(e.target.value)
        // setDisplayTextSearch(e.target.value)
    }
    return (
        <div className='px-4 py-2 bg-white product'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                    <h3>Review</h3>
                    <h6 className='ms-3'>({totalReview} review found)</h6>
                    <button onClick={() => setShowAddModal(true)} type="button" className="btn btn-outline-success ms-3">Tạo giảm giá cho sản phẩm</button>
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
            >
                <option value="idDiscount" selected>Tìm kiếm theo Id</option>
                <option value="status">Tìm kiếm theo trạng thái</option>
                <option value="name">Tìm kiếm theo tên</option>
            </select>


            {displayTextSearch && displayTextSearch != "status" && (
                <div class="input-group mb-3 mt-1">
                    <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Tìm kiếm theo {displayTextSearch}</button>
                    <input
                        type="text"
                        class="form-control"
                        name={displayTextSearch}
                        value={searchCriteria[`${displayTextSearch}`]}
                        onChange={(e) => handleChangeInput(e, setSearchCriteria)}
                    />
                </div>
            )}

            {displayTextSearch === "status" && (
                <select
                    name={displayTextSearch}
                    value={searchCriteria[`${displayTextSearch}`]}
                    onChange={(e) => handleChangeInput(e, setSearchCriteria)}
                    className="form-select mt-2"
                >
                    <option value="1">Đang giảm giá</option>
                    <option value="0">Hết giảm giá</option>
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
                                        className={`btn btn-outline-${review?.response?.length > 0 ? 'primary' : 'danger'}`}>
                                        {review?.response?.length > 0 ? 'Đã trả lời' : 'Chưa trả lời'}
                                    </button>
                                </td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button onClick={() => handleDeleteDiscount(review?._id)} type="button" className="btn btn-outline-danger">Delete</button>
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
        </div>
    )
}
