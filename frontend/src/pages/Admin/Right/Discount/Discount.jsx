import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'
import { switchPage } from '../../../../redux/Discount/discountsSlice'
import Pagination from '../../../../components/Pagination'
import { deleteDiscount, getAllDiscount } from '../../../../services/DiscountService'
import { deleteDiscountRedux, initDataDiscount } from '../../../../redux/Discount/discountsSlice'
import { getAllProduct } from '../../../../services/ProductService'
import { initDataProduct } from '../../../../redux/Products/productsSlice'
import AddDiscount from './AddDiscount'
import EditDiscount from './EditDiscount'
import { useRoleDetail } from '../../../../until/function'
export default function Discount() {
    const dispatch = useDispatch()
    const products = useSelector(state => state?.products?.products)
    const discounts = useSelector(state => state?.discounts?.data)
    const page = useSelector(state => state?.discounts?.page)
    const totalPage = useSelector(state => state?.discounts?.totalPage)
    const totalDiscount = useSelector(state => state?.discounts?.totalDiscount)
    const limit = useSelector(state => state?.discounts?.limit)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedDiscount, setSelectedDiscount] = useState(null);

    const [displayTextSearch, setDisplayTextSearch] = useState('idDiscount')
    const [searchCriteria, setSearchCriteria] = useState({
        idDiscount: '',
        status: '',
        name: ''
    })
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const idRole = isAuthenticated && userData?.dataLogin?.idRole

    useEffect(() => {
        const fetchData = async () => {
            try {
                let query = `page=${page}&limit=${limit}`
                let queryProduct = 'limit=100'
                if (searchCriteria.idDiscount != "") {
                    query += `&idDiscount=${searchCriteria.idDiscount}`
                }
                if (searchCriteria.status != "") {
                    query += `&status=${searchCriteria.status}`
                }


                const [responseDiscount, responseProduct] = await Promise.all([
                    await getAllDiscount(query),
                    await getAllProduct(queryProduct)
                ])
                if (responseDiscount && responseDiscount.status == 200) {
                    dispatch(initDataDiscount(responseDiscount))
                }
                if (responseProduct && responseProduct?.status === 200) {
                    dispatch(initDataProduct(responseProduct))
                }

            }
            catch (error) {
                console.log("Fail when get discount to display")
            }
        }
        fetchData()
    }, [page, limit, searchCriteria]);
    const { data: roleDetails, isLoading: isRoleDetailsLoading, isError: isRoleDetailsError, error: roleDetailsError } = useRoleDetail(idRole)

    const handleSwitchPageEdit = (data) => {
        setShowEdit(true)
        setSelectedDiscount(data)
    }

    const handlePagination = (page) => {
        dispatch(switchPage(page))
    }


    // handle delete product
    const handleDeleteDiscount = async (id) => {
        const response = await deleteDiscount(id)
        if (response && response?.status === 200) {
            dispatch(deleteDiscountRedux(id))
            if (discounts?.length === 1 && page > 1) {
                dispatch(switchPage(page - 1))
            }
        }
    }

    const handleChangeSearchSelect = (e) => {
        setSearchCriteria({
            idDiscount: '',
            status: '',
            name: ''
        })
        console.log(e.target.value)
        setDisplayTextSearch(e.target.value)
    }
    return (
        <div className='px-4 py-2 bg-white product'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                    <h3>Discount</h3>
                    <h6 className='ms-3'>({totalDiscount} discount found)</h6>
                    {!isRoleDetailsLoading ? (
                        <button
                            onClick={() => setShowAddModal(true)}
                            type="button"
                            className="btn btn-outline-success ms-3"
                            disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                (item) => item?.action === "discount_add" && item?.allow === false
                            )}
                        >
                            Tạo giảm giá cho sản phẩm
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
                    (item) => item?.action === "discount_search" && item?.allow === false
                )}
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
                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                            (item) => item?.action === "discount_search" && item?.allow === false
                        )}
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
                    disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                        (item) => item?.action === "discount_search" && item?.allow === false
                    )}
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
                        <th scope="col">Product</th>
                        <th scope="col">DiscountValue</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created At</th>
                        <th scope="col">End date</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {discounts && discounts?.length > 0 ? (
                        discounts?.map((discount, index) => (
                            <tr key={index}>
                                <th scope="row">{(discount?._id).slice(0, 10)}...</th>
                                <td>
                                    <ImageComponent
                                        src={discount?.product?.image} alt=""
                                        width="70px"
                                        height="50px"
                                        borderRadius="5px"
                                        className="me-2"
                                    />
                                    {discount?.product?.name}
                                </td>

                                <td>{discount?.discountValue}%</td>
                                <td>{discount?.status}</td>

                                <td>{new Date(discount?.createdAt).toLocaleString('vi-VN')}</td>
                                <td>{new Date(discount?.endDate).toLocaleString('vi-VN')}</td>

                                <td>{new Date(discount?.updatedAt).toLocaleString('vi-VN')}</td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button
                                        onClick={() => handleSwitchPageEdit(discount)}
                                        type="button"
                                        className="btn btn-outline-primary"
                                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                            (item) => item?.action === "discount_edit" && item?.allow === false
                                        )}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button
                                        onClick={() => handleDeleteDiscount(discount?._id)}
                                        type="button"
                                        className="btn btn-outline-danger"
                                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                                            (item) => item?.action === "discount_delete" && item?.allow === false
                                        )}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : <p>Không có giảm giá nào cho sản phẩm</p>}

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
            <AddDiscount show={showAddModal} close={() => setShowAddModal(false)} />
            <EditDiscount show={showEdit} close={() => setShowEdit(false)} data={selectedDiscount} />
        </div>
    )
}
