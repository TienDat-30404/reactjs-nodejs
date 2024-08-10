import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import CartProduct from '../../components/CartProduct'
import { getAllProduct } from '../../services/ProductService'
import { getAllCart, deleteCart, updateQuantityCart } from '../../services/CartService'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function Cart() {
    const limit = 6
    const [totalPage, setTotalPage] = useState(1)
    const [products, setProducts] = useState([])

    const [page, setPage] = useState(1)
    const [pageCart, setPageCart] = useState(1)
    const [totalPageCart, setTotalPageCart] = useState(1)
    const [totalProductInCart, setTotalProductInCart] = useState(1)
    const [sortBy, setSortBy] = useState('idCart')
    const [type, setType] = useState('asc')
    const [carts, setCart] = useState([])
    const [cartsCheck, setCartsCheck] = useState([])
    const { idUser } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDatas = async () => {
            const [listProduct, cart] = await Promise.all([
                getAllProduct(page, 'idProduct', 'asc', limit),
                getAllCart(idUser, pageCart, sortBy, type)
            ])
            console.log(cart)
            setProducts(listProduct.products)
            setTotalPage(listProduct.totalPages)

            setCart(cart.listCart)
            setTotalPageCart(cart.totalPages)
            setTotalProductInCart(cart.totalProductInCart)
        }
        fetchDatas()
    }, [page, pageCart, idUser, sortBy, type])

    // handle pagination next page
    const handleNextPage = useCallback(() => {
        if (page < totalPage) {
            setPage(page + 1)
        }
    }, [page, totalPage])

    // handle pagination prev page 
    const handlePrevPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1)
        }
    }, [page, totalPage])

    //  handle pagination next page Cart
    const handleNextPageCart = useCallback(() => {
        if (pageCart < totalPageCart) {
            setPageCart(pageCart + 1)
        }
    }, [pageCart, totalPageCart])

    // handle pagination prev page Cart
    const handlePrevPageCart = useCallback(() => {
        if (pageCart > 1) {
            setPageCart(pageCart - 1)
        }
    }, [pageCart, totalPageCart])

    // delete cart
    const handleDeleteCart = async (idCart) => {
        const response = await deleteCart(idCart)
        if (response.success) {
            alert("Xóa thành công")

            const updateCart = carts.filter(cart => cart.idCart != idCart)
            setCart(updateCart)

            setTotalProductInCart(totalProductInCart - 1)

            const updateTotalPrice = cartsCheck.filter(cart => cart.idCart != idCart)
            setCartsCheck(updateTotalPrice)

            if (updateCart.length === 0 && pageCart > 1) {
                setPageCart(pageCart - 1)
            }
            else {
                const response = await getAllCart(idUser, pageCart, sortBy, type)
                setCart(response.listCart)
                setTotalPageCart(response.totalPages)
            }
        }
    }

    // increase quantity cart 
    const handleIncreaseQuantityCart = async (idCart, quantity) => {
        const newQuantity = quantity + 1
        const response = await updateQuantityCart(idCart, newQuantity)
        if (response.success) {
            const updateCart = carts.map(cart =>
                cart.idCart === idCart ? { ...cart, quantityCart: newQuantity } : cart
            )
            setCart(updateCart)

            const updateTotalPrice = cartsCheck.map(cart =>
                cart.idCart === idCart ? { ...cart, quantityCart: newQuantity } : cart
            )
            setCartsCheck(updateTotalPrice)
        }
    }

    // decrease quantity cart
    const handleDecreaseQuantityCart = async (idCart, quantity) => {
        const newQuantity = quantity - 1
        const response = await updateQuantityCart(idCart, newQuantity)
        if (response.success) {
            const updateCart = carts.map(cart =>
                cart.idCart === idCart ? { ...cart, quantityCart: newQuantity } : cart
            )
            setCart(updateCart)

            const updateTotalPrice = cartsCheck.map(cart =>
                cart.idCart === idCart ? { ...cart, quantityCart: newQuantity } : cart
            )
            setCartsCheck(updateTotalPrice)
        }
    }

    // change input checkbox
    const handleChangeCheckInput = async (cart) => {
        setCartsCheck(prev => {
            const isCheck = prev.some(item => item.idCart === cart.idCart)
            if (isCheck) {
                return prev.filter(item => item.idCart !== cart.idCart)
            }
            else {
                return [...prev, cart]
            }
        })
    }
    // total Price
    const totalPrice = cartsCheck.reduce((sum, cart) => sum + (cart.price * cart.quantityCart), 0)

    // switch payment
    const switchPayment = () => {
        if (cartsCheck.length > 0) {
            navigate('/payment', {state: { cartsCheck }})
        }
    }
    return (
        <div className='col-12 container mt-4'>
            <h3 style={{ fontSize: '21px', fontWeight: '500', fontFamily: 'Georgia, serif', width: '100%' }}>GIỎ HÀNG</h3>
            <div className='col-12 d-flex'>
                <div className=' col-8 me-2'>
                    <div className='col-12 d-flex mb-3 bg-white px-2 py-2'>
                        <div className='col-5 d-flex'>
                            <input style={{ width: '17px', height: '20px', marginRight: '7px' }} type="checkbox" name="" id="" />
                            <h6 style={{ fontWeight: '400', marginRight: '3px' }}>Tất cả</h6>
                            <h6 style={{ fontWeight: '400' }}>{totalProductInCart} sản phẩm</h6>
                        </div>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Đơn giá</span>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Số lượng</span>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Thành tiền</span>
                        <i className="col-2 bi bi-trash3"></i>
                    </div>
                    {carts.length > 0 ? (
                        <div>
                            {carts.map((cart, index) => (
                                <div key={index} className='col-12 d-flex align-items-center bg-white px-2 py-2'>
                                    <div className='d-flex align-items-center col-5'>
                                        <input
                                            onChange={() => handleChangeCheckInput(cart)}
                                            style={{ width: '17px', height: '20px', marginRight: '8px' }}
                                            type="checkbox" name="" id=""
                                        />
                                        <img width="75px" src={cart.image} alt="" />
                                        <p>{cart.name}</p>
                                    </div>
                                    <span className='col-2 '>{(cart.price).toLocaleString('vi-VN')}đ</span>
                                    <div className='col-2'>
                                        <button
                                            disabled={cart.quantityCart === 1}
                                            className={cart.quantityCart == 1 ? '' : 'hover_quantity-cart'}
                                            onClick={() => handleDecreaseQuantityCart(cart.idCart, cart.quantityCart)}
                                            style={{ border: '1px solid #ccc', padding: '1px 8px', cursor: 'pointer' }}>
                                            -
                                        </button>
                                        <span style={{ border: '1px solid #ccc', padding: '1px 8px', }}>{cart.quantityCart}</span>
                                        <button
                                            className='hover_quantity-cart'
                                            onClick={() => handleIncreaseQuantityCart(cart.idCart, cart.quantityCart)}
                                            style={{ border: '1px solid #ccc', padding: '1px 8px' }}>
                                            +
                                        </button>
                                    </div>
                                    <span className='col-2 text-danger fw-bold'>{(cart.price * cart.quantityCart).toLocaleString('vi-VN')}</span>
                                    <i onClick={() => handleDeleteCart(cart.idCart)} style={{ cursor: 'pointer' }} className="col-2 bi bi-trash3 "></i>
                                </div>
                            ))}
                            {totalPageCart > 1 ? (
                                <>
                                    <div className='d-flex justify-content-center align-items-center mt-3'>
                                        <button disabled={pageCart == 1} onClick={handlePrevPageCart} type="button" className="btn btn-light me-3">Primary</button>
                                        <button disabled={pageCart >= totalPageCart} onClick={handleNextPageCart} type="button" className="btn btn-light">Next</button>
                                    </div>
                                    <div className='mt-2 d-flex justify-content-center'>
                                        <span>Page {pageCart} of {totalPageCart}</span>
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
                            <p style={{ fontSize: '14px' }}>Có thể chọn 2</p>
                        </div>
                        <div className='d-flex align-items-center mt-3' >
                            <i style={{ fontSize: '20px', color: 'blue' }} className="bi bi-ticket-perforated"></i>
                            <p style={{ fontWeight: '500', fontSize: '14px', fontWeight: '400', cursor: 'pointer' }} className='ms-2 text-primary'>Chọn hoặc nhập Khuyến mãi khác </p>
                        </div>
                    </div>
                    <div className='mt-2 bg-white px-3 py-2'>
                        <div className='d-flex justify-content-between'>
                            <p style={{ fontSize: '14px', color: '#888' }}>Tạm tính</p>
                            <p style={{ fontSize: '14px' }}>{totalPrice.toLocaleString('vi-VN')}đ</p>
                        </div>
                        <div className='d-flex justify-content-between mt-1 mb-2'>
                            <p style={{ fontSize: '14px', color: '#888' }}>Giảm giá</p>
                            <p style={{ fontSize: '14px' }}>0đ</p>
                        </div>
                        <div className="border-top border-gray"></div>
                        <div className='d-flex justify-content-between mt-1 mb-2'>
                            <p style={{ fontSize: '14px', fontWeight: '500' }}>Tổng tiền</p>
                            {cartsCheck.length > 0 ? (
                                <p style={{ color: 'red', fontWeight: '500', fontSize: '20px' }}>{totalPrice.toLocaleString('vi-VN')}đ</p>
                            ) :
                                <p style={{ fontSize: '14px' }}>Vui lòng chọn sản phẩm nếu có</p>
                            }
                        </div>
                        <button disabled = {cartsCheck <= 0} onClick={switchPayment} className='btn btn-danger col-12 mt-1 mb-3'>Mua hàng
                            <span style={{ color: 'white', paddingLeft: '3px' }}>({cartsCheck.length})</span>
                        </button>
                    </div>
                </div>
            </div>
            <h3 style={{ fontSize: '21px', fontWeight: '500', fontFamily: 'Georgia, serif', width: '100%', marginTop: '20px' }}>Sản phẩm bạn quan tâm</h3>
            <div className='d-flex mt-2 row see_more-cart'>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <CartProduct
                            key={index}
                            width="210px"
                            id={product.idProduct}
                            image={product.image}
                            name={product.name}
                            price={(product.price).toLocaleString('vi-VN')}
                        />
                    ))) :
                    <div class="loading">
                        <div class="spinner"></div>
                    </div>
                }
                <div className='pagination-controls'>
                    {page != 1 && (
                        <i style={{ fontSize: '30px', cursor: 'pointer' }} onClick={handlePrevPage} className="bi bi-arrow-left-circle"></i>
                    )}
                    {(totalPage > 1 && page != totalPage) && (
                        <i style={{ fontSize: '30px', cursor: 'pointer' }} onClick={handleNextPage} className="bi bi-arrow-right-circle"></i>
                    )}
                </div>
            </div>
        </div>
    )
}
