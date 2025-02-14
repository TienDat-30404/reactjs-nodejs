import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'
import { switchPage } from '../../../../redux/Category/categoriesSlice'
import Pagination from '../../../../components/Pagination'
import { getAllDiscount } from '../../../../services/DiscountService'
import { initDataDiscount } from '../../../../redux/Discount/discountsSlice'
import { getAllProduct } from '../../../../services/ProductService'
import { initDataProduct } from '../../../../redux/Products/productsSlice'
import AddDiscount from './AddDiscount'
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
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [displayTextSearch, setDisplayTextSearch] = useState('idCategory')
    const [searchCriteria, setSearchCriteria] = useState({
        idCategory: '',
        name: ''
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                let query = `page=${page}&limit=${limit}`
                let queryProduct = 'limit=100'
                // if (searchCriteria.name != "") {
                //   query += `&search=${searchCriteria.name}`
                // }
                // if (searchCriteria.idCategory != "") {
                //   query += `&idCategory=${searchCriteria.idCategory}`
                // }


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
                console.log("Fail when get categories to display")
            }
        }
        fetchData()
    }, [page, limit])
    const handleSwitchPageEdit = (data) => {
        // setShowEdit(true)
        // setSelectedCategory(data)
    }

    const handlePagination = (page) => {
        // dispatch(switchPage(page))
    }


    // handle delete product
    const handleDeleteDiscount = async (id) => {
        // const response = await deleteCategory(id)
        // console.log(response)
        // if (response && response?.status === 200) {
        //   dispatch(deleteCategoryRedux(id))
        //   if (categories?.length === 1 && page > 1) {
        //     dispatch(switchPage(page - 1))
        //   }
        // }
    }

    const handleChangeSearchSelect = (e) => {
        setSearchCriteria({
            idCategory: '',
            name: ''
        })
        setDisplayTextSearch(e.target.value)
    }
    return (
        <div className='px-4 py-2 bg-white product'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                    <h3>Category</h3>
                    <h6 className='ms-3'>({totalDiscount} discount found)</h6>
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
                onChange={handleChangeSearchSelect}
                class="form-select mt-2"
            >
                <option value="idProduct" selected>Tìm kiếm theo Id</option>
                <option value="name">Tìm kiếm theo tên</option>
            </select>


            {displayTextSearch && (
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




            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Product</th>
                        <th scope="col">DiscountValue</th>
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
                                <td>{discount?.discountValue}</td>

                                <td>{new Date(discount?.createdAt).toLocaleString('vi-VN')}</td>
                                <td>{new Date(discount?.endDate).toLocaleString('vi-VN')}</td>

                                <td>{new Date(discount?.updatedAt).toLocaleString('vi-VN')}</td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button
                                        onClick={() => handleSwitchPageEdit(discount)}
                                        type="button"
                                        className="btn btn-outline-primary">
                                        Edit
                                    </button>
                                </td>
                                <td style={{ width: '6%' }} className='text-center'>
                                    <button onClick={() => handleDeleteDiscount(discount?._id)} type="button" className="btn btn-outline-danger">Delete</button>
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
            {/* <AddCategory show={showAddModal} close={() => setShowAddModal(false)} />
            <EditCategory show={showEdit} close={() => setShowEdit(false)} data={selectedCategory} /> */}
        </div>
    )
}
