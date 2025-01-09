import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import { getAllCart, deleteCart, updateQuantityCart } from '../../services/CartService'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initDataCart, switchPage, updateQuantity } from '../../redux/Cart/cartsSlice'
import Voucher from './Voucher'; // Import component Voucher
import { removeUseVoucher } from '../../redux/Voucher/vouchersSlice'

export default function Cart() {

    const dispatch = useDispatch()

    const [cartsCheck, setCartsCheck] = useState([])

    const carts = useSelector(state => state.carts.carts)
    const page = useSelector(state => state.carts.page)
    const totalPage = useSelector(state => state.carts.totalPage)
    // const limit = useSelector(state => state.carts.limit)
    const useVoucher = useSelector(state => state?.vouchers?.useVoucher)
    const limit = 2;
    const totalProductInCart = useSelector(state => state.carts.totalProductInCart)
    const { idUser } = useParams()
    const navigate = useNavigate()

    const fetchDataCarts = async () => {
        let query = `idUser=${idUser}&page=${page}&limit=${limit}`
        const response = await getAllCart(query)
        if (response) {
            dispatch(initDataCart(response))
        }
    }

    useEffect(() => {
        fetchDataCarts()
    }, [page, dispatch])



    //  handle pagination next page Cart
    const handleNextPageCart = () => {
        if (page < totalPage) {
            dispatch(switchPage(page + 1))
        }
    }

    // handle pagination prev page Cart
    const handlePrevPageCart = useCallback(() => {
        if (page > 1) {
            dispatch(switchPage(page - 1))
        }
    }, [page])

    // delete cart
    const handleDeleteCart = async (idCart) => {
        const response = await deleteCart(idCart)
        if (response.success) {
            if (carts.length - 1 < limit) {
                fetchDataCarts()
            }

        }
    }

    // increase quantity cart 
    const handleIncreaseQuantityCart = async (idCart, newQuantity) => {
        const response = await updateQuantityCart(idCart, newQuantity)
        console.log(response)
        if (response.success) {
            dispatch(updateQuantity({
                _id: idCart,
                quantity: newQuantity
            }))
        }
    }


    // change input checkbox
    const handleChangeCheckInput = async (cart) => {
        setCartsCheck(prev => {
            const isCheck = prev.some(item => item._id === cart._id)
            if (isCheck) {
                return prev.filter(item => item._id !== cart._id)
            }
            else {
                return [...prev, cart]
            }
        })
    }

    // total Price
    const totalPrice = cartsCheck.reduce((sum, cart) =>
        sum +
        (cart?.attribute?.priceBought * cart?.quantity *
            (cart?.attribute?.product?.discount?.length > 0 ?
                cart?.attribute?.product.discount[0].discountValue : 1
            )
        )
        , 0)
        
    const totalPriceDiscountProduct = cartsCheck.reduce((sum, cart) =>
        sum +
        (
            cart?.attribute?.product?.discount?.length > 0 ?
                (1 - cart?.attribute?.product?.discount[0]?.discountValue) * cart?.attribute?.priceBought
                : 0
        ), 0)

    // switch payment
    const switchPayment = () => {
        if (cartsCheck.length > 0) {
            navigate('/payment', { state: { cartsCheck } })
        }
    }

    const handleDeleteUserVoucher = () => {
        dispatch(removeUseVoucher())
    }

    const handleCheckAllCart = () => {
        if(cartsCheck.length > 0)
        {
            setCartsCheck([])
        }
        else 
        {
            setCartsCheck(carts)
        }
    }

   
    return (
        <div className='col-12 container mt-4'>
            <h3 style={{ fontSize: '21px', fontWeight: '500', fontFamily: 'Georgia, serif', width: '100%' }}>GIỎ HÀNG</h3>
            <div className='col-12 d-flex'>
                <div className=' col-8 me-2'>
                    <div className='col-12 d-flex mb-3 bg-white px-2 py-2'>
                        <div className='col-4 d-flex'>
                            <input
                                onChange={() => handleCheckAllCart()}
                                style={{ width: '17px', height: '20px', marginRight: '7px' }}
                                type="checkbox" name="" id="" />
                            <h6 style={{ fontWeight: '400', marginRight: '3px' }}>Tất cả</h6>
                            <h6 style={{ fontWeight: '400' }}>{totalProductInCart} sản phẩm</h6>
                        </div>
                        <span className='col-1' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Size</span>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Đơn giá</span>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Số lượng</span>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Thành tiền</span>
                        <i className="col-2 bi bi-trash3"></i>
                    </div>
                    {carts.length > 0 ? (
                        <div>
                            {carts.map((cart, index) => (
                                <div key={index} className='col-12 d-flex align-items-center bg-white px-2 py-2'>
                                    <div className='d-flex align-items-center col-4'>
                                        <input
                                            checked={cartsCheck.some(item => item._id === cart._id)}
                                            onChange={() => handleChangeCheckInput(cart)}
                                            style={{ width: '17px', height: '20px', marginRight: '8px' }}
                                            type="checkbox" name="" id=""
                                        />
                                        <img width="60px" src={cart?.attribute?.product?.image} alt="" />
                                        <p>{cart?.attribute?.product?.name}</p>
                                    </div>
                                    <span className='col-1'>{cart?.attribute?.size?.name}</span>

                                    <span
                                        className='col-2 '>
                                        {(cart?.attribute?.priceBought *
                                            (cart?.attribute?.product?.discount?.length > 0 ?
                                                cart?.attribute?.product?.discount[0]?.discountValue : 1
                                            ))
                                            ?.toLocaleString('vi-VN')}đ
                                    </span>
                                    <div className='col-2'>
                                        <button
                                            disabled={cart.quantity === 1}
                                            className={cart.quantity == 1 ? '' : 'hover_quantity-cart'}
                                            onClick={() => handleIncreaseQuantityCart(cart._id, cart.quantity - 1)}

                                            style={{ border: '1px solid #ccc', padding: '1px 8px', cursor: 'pointer' }}>
                                            -
                                        </button>
                                        <span style={{ border: '1px solid #ccc', padding: '1px 8px', }}>{cart?.quantity}</span>
                                        <button
                                            className='hover_quantity-cart'
                                            onClick={() => handleIncreaseQuantityCart(cart._id, cart.quantity + 1)}
                                            style={{ border: '1px solid #ccc', padding: '1px 8px' }}>
                                            +
                                        </button>
                                    </div>
                                    <span
                                        className='col-2 text-danger fw-bold'>
                                        {(cart?.attribute?.priceBought * cart?.quantity *
                                            (cart?.attribute?.product?.discount?.length > 0 ?
                                                cart?.attribute?.product?.discount[0]?.discountValue : 1
                                            )
                                        )
                                            .toLocaleString('vi-VN')}
                                    </span>
                                    <i onClick={() => handleDeleteCart(cart._id)} style={{ cursor: 'pointer' }} className="col-2 bi bi-trash3 "></i>
                                </div>
                            ))}
                            {totalPage > 1 ? (
                                <>
                                    <div className='d-flex justify-content-center align-items-center mt-3'>
                                        <button disabled={page == 1} onClick={() => handlePrevPageCart()} type="button" className="btn btn-light me-3">Primary</button>
                                        <button disabled={page >= totalPage} onClick={() => handleNextPageCart()} type="button" className="btn btn-light">Next</button>
                                    </div>
                                    <div className='mt-2 d-flex justify-content-center'>
                                        <span>Page {page} of {totalPage}</span>
                                    </div>
                                </>
                            ) :
                                <></>
                            }
                        </div>
                    ) :
                        <div className='text-center'>
                            <img width="300x" src="https://taphoa.cz/static/media/cart-empty-img.8b677cb3.png" alt="" />
                            <p style={{ fontSize: '20px ' }}>Chưa có sản phầm nào trong giỏ hàng</p>
                        </div>
                    }

                </div>
                <div className='col-4 px-3'>
                    <div className='bg-white py-2 px-3'>
                        <div className='d-flex justify-content-between'>
                            <p style={{ fontSize: '14px', fontWeight: '500' }}>Tiki khuyến mãi</p>
                            <p style={{ fontSize: '14px' }}>Có thể chọn {carts.length}</p>
                        </div>
                        <div className='d-flex align-items-center mt-3' >
                            <i style={{ fontSize: '20px', color: 'blue' }} className="bi bi-ticket-perforated"></i>
                            {useVoucher && useVoucher[0]?.discountVoucher ? (
                                <div className='d-flex align-items-center'>
                                    <p style={{ fontWeight: '500', fontSize: '14px', fontWeight: '400', cursor: 'pointer' }} className='ms-2 text-danger'>

                                        {"-" + (totalPrice * useVoucher[0]?.discountVoucher).toLocaleString('vi-VN') + "đ"}

                                    </p>
                                    <p style={{ fontWeight: '500', fontSize: '14px', fontWeight: '400', cursor: 'pointer' }} className='ms-2 text-primary'>
                                        {
                                            " (voucher giảm giá " + (useVoucher[0]?.discountVoucher * 100).toFixed(1) + "% tổng hóa đơn)"
                                        }
                                    </p>
                                    <i onClick={() => handleDeleteUserVoucher()} style={{ cursor: 'pointer' }} class="bi bi-x fs-5 ms-2 cursor-pointer"></i>
                                </div>
                            ) :
                                <p className='ms-2 text-primary'>

                                    <Voucher cartsCheck={cartsCheck} />
                                </p>
                            }
                        </div>
                    </div>
                    <div className='mt-2 bg-white px-3 py-2'>
                        <div className='d-flex justify-content-between'>
                            <p style={{ fontSize: '14px', color: '#888' }}>Tạm tính</p>
                            <p>
                                {
                                    useVoucher && useVoucher?.length > 0 ? (
                                        totalPrice * (1 - useVoucher[0]?.discountVoucher)
                                    ) :
                                        totalPrice
                                }
                            </p>
                        </div>
                        <div className='d-flex justify-content-between mt-1 mb-2'>
                            <p style={{ fontSize: '14px', color: '#888' }}>Giảm giá</p>
                            <p style={{ fontSize: '14px' }}>
                                {(totalPriceDiscountProduct).toLocaleString('vi-VN')}
                            </p>
                        </div>
                        <div className="border-top border-gray"></div>
                        <div className='d-flex justify-content-between mt-1 mb-2'>
                            <p style={{ fontSize: '14px', fontWeight: '500' }}>Tổng tiền</p>
                            {cartsCheck.length > 0 ? (
                                <p style={{ color: 'red', fontWeight: '500', fontSize: '20px' }}>
                                    {(totalPrice * (
                                        useVoucher?.length > 0 ? (1 - useVoucher[0].discountVoucher) : 1
                                    ))
                                        .toLocaleString('vi-VN')}
                                    đ
                                </p>
                            ) :
                                <p style={{ fontSize: '14px' }}>Vui lòng chọn sản phẩm nếu có</p>
                            }
                        </div>
                        <button disabled={cartsCheck <= 0} onClick={switchPayment} className='btn btn-danger col-12 mt-1 mb-3'>Mua hàng
                            <span style={{ color: 'white', paddingLeft: '3px' }}>({cartsCheck.length})</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
