import React from 'react'
import { useState, useEffect } from 'react'
import CartProduct from '../../../../../components/CartProduct'
import { getAllProduct } from '../../../../../services/ProductService'
import { useDispatch, useSelector } from 'react-redux'
import { initDataProduct, switchPage } from '../../../../../redux/Products/productsSlice'
export default function ProductSale() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const page = useSelector(state => state.products.page)
    const totalPage = useSelector(state => state.products.totalPage)
    const totalProduct = useSelector(state => state.products.totalProduct)
    const { isAuthenticated, userData } = useSelector(state => state.auth)
    const idUser = isAuthenticated && userData?.dataLogin?.idUser
    const limit = 5;

    // get all product
    useEffect(() => {
        const fetchDatasProduct = async () => {
            const query = `page=${page}&sortBy=idProduct&type=asc&limit=${limit}&typeDisplay=1`
            console.log(query)
            const response = await getAllProduct(query)
            console.log(response)
            if (response) {
                dispatch(initDataProduct(response))
            }
        }
        fetchDatasProduct()
    }, [page])

    // handle pagination next page
    const handleNextPage = () => {
        if (page < totalPage) {
            dispatch(switchPage(page + 1))
        }
    }

    // handle pagination prev page
    const handlePrevPage = () => {
        if (page > 1) {
            dispatch(switchPage(page - 1))
        }
    }




    return (
        <div className='mt-3 bg-white rounded-2 product-sale'>
            <div className='d-flex justify-content-between align-items-center ms-4 me-4 mb-2'>
                <div className='d-flex align-items-center'>
                    <img className='rounded-4 me-2' width="40px" src="https://salt.tikicdn.com/ts/upload/2f/52/8e/00ab5fbea9d35fcc3cadbc28d7c6b14e.png" alt="" />
                    <p className=" text-uppercase text-danger fw-bold">TOP DEAL - SIÊU GIÁ RẺ</p>
                </div>
                <a className="text-capitalize text-primary nav-link">Xem Tất Cả</a>
            </div>
            <div className='d-flex align-items-center ms-4'>
                <p className='border border-primary rounded-5 px-3 py-1 text-primary'>Chăm sóc nhà cửa</p>
                <p className='border rounded-5 px-3 py-1 ms-3'>Phụ kiện thời trang</p>
                <p className='border rounded-5 px-3 py-1 ms-3'>Ngon</p>
                <p className='border rounded-5 px-3 py-1 ms-3'>Nhà Sách Tiki</p>
            </div>
            <div className='row pb-3 d-flex ms-3 product'>
                {products.length > 0 ? (
                    products.map((product, index) => {
                        const indexPriceAttribute = product?.productAttributes?.find(attr => attr.priceBought !== null);

                        if (!indexPriceAttribute) return null;

                        return (
                            <CartProduct
                                key={index}
                                id={product?._id}
                                image={product?.image}
                                name={product?.name}
                                priceNotDiscount={
                                    product?.discount?.length > 0
                                        ? (indexPriceAttribute?.priceBought * indexPriceAttribute?.size?.sizePriceMultiplier).toLocaleString('vi-VN') + "đ"
                                        : ""
                                }
                                percentDiscount={
                                    product?.discount?.length > 0
                                        ? (product?.discount[0]?.discountValue * 100).toFixed(0) + "%"
                                        : ""
                                }
                                price={
                                    product?.discount?.length > 0
                                        ? (indexPriceAttribute.priceBought * (1 - product?.discount[0]?.discountValue) * indexPriceAttribute?.size?.sizePriceMultiplier).toLocaleString('vi-VN')
                                        : (indexPriceAttribute.priceBought * indexPriceAttribute?.size?.sizePriceMultiplier).toLocaleString('vi-VN')
                                }
                                widthImage="100px"
                                heightImage="200px"
                                totalReview={
                                    product?.reviews?.length > 0
                                        ? (product?.reviews?.reduce((sum, review) => sum + review?.rating, 0) / product?.reviews?.length).toFixed(2)
                                        : 0
                                }
                            />
                        );
                    })
                ) : (
                    <div className="loading">
                        <div className="spinner"></div>
                    </div>
                )}
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <button disabled={page == 1} onClick={() => handlePrevPage()} type="button" className="btn btn-light me-3">Primary</button>
                    <button disabled={page >= totalPage} onClick={() => handleNextPage()} type="button" className="btn btn-light">Next</button>
                </div>
                <span className='text-center mt-2'>Page {page} of {totalPage}</span>
            </div>
        </div>

    )
}


