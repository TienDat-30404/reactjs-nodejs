import React from 'react'
import { useState, useEffect } from 'react'
import CartProduct from '../../components/CartProduct'
import { getAllProduct } from '../../services/ProductService'
import { getAllCart } from '../../services/CartService'
import { useParams } from 'react-router-dom'
export default function Cart() {
    const limit = 6
    const [totalPage, setTotalPage] = useState(1)
    const [products, setProducts] = useState([])
    
    
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState('idCart')
    const [type, setType] = useState('asc')
    const [carts, setCart] = useState([])
    const {idUser} = useParams()
    // data product
    useEffect(() => {
        const fetchDatasProduct = async () => {
            const listProduct = await getAllProduct(page, 'idProduct', 'asc', limit)
            setTotalPage(listProduct.totalPages)
            setProducts(listProduct.products)
        }
        fetchDatasProduct()
    }, [page])

    // handle pagination next page
    const handleNextPage = () => {
        if (page < totalPage) {
            setPage(page + 1)
        }
    }

    // handle pagination prev page
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    // data Cart
    useEffect(() => {
        const listCart = async () => {
            const cart = await getAllCart(idUser, page, sortBy, type)
            console.log(cart)
            setCart(cart.listCart)
        }
        listCart()
    }, [idUser])    
    return (
        <div className='col-12 container mt-4'>
            <h3 style={{ fontSize: '21px', fontWeight: '500', fontFamily: 'Georgia, serif', width: '100%' }}>GIỎ HÀNG</h3>
            <div className='col-12 d-flex'>
                <div className=' col-8 me-2'>
                    <div className='col-12 d-flex mb-3 bg-white px-2 py-2'>
                        <div className='col-5 d-flex'>
                            <input style={{ width: '17px', height: '20px', marginRight: '7px' }} type="checkbox" name="" id="" />
                            <h6 style={{ fontWeight: '400', marginRight: '3px' }}>Tất cả</h6>
                            <h6 style={{ fontWeight: '400' }}>(1 sản phẩm)</h6>
                        </div>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Đơn giá</span>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Số lượng</span>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Thành tiền</span>
                        <i className="col-2 bi bi-trash3"></i>
                    </div>
                    {carts.length > 0 ? (
                        carts.map((cart, index) => (
                            <div key={index} className='col-12 d-flex align-items-center bg-white px-2 py-2'>
                                <div className='d-flex align-items-center col-5'>
                                    <input style={{ width: '17px', height: '20px', marginRight: '8px' }} type="checkbox" name="" id="" />
                                    <img width="75px" src={cart.image} alt="" />
                                    <p>{cart.name}</p>
                                </div>
                                <span className='col-2 fw-bold'>{(cart.price).toLocaleString('vi-VN')}đ</span>
                                <div className='col-2'>
                                    <span style={{ border: '1px solid #ccc', padding: '1px 8px' }}>-</span>
                                    <span style={{ border: '1px solid #ccc', padding: '1px 8px', }}>1</span>
                                    <span style={{ border: '1px solid #ccc', padding: '1px 8px' }}>+</span>
                                </div>
                                <span className='col-2 text-danger fw-bold'>{(cart.price * cart.quantity).toLocaleString('vi-VN')}</span>
                                <i className="col-2 bi bi-trash3"></i>
                            </div>
                        ))
                    ) :
                        <div class="loading">
                            <div class="spinner"></div>
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
                            <p style={{ fontSize: '14px' }}>0đ</p>
                        </div>
                        <div className='d-flex justify-content-between mt-1 mb-2'>
                            <p style={{ fontSize: '14px', color: '#888' }}>Giảm giá</p>
                            <p style={{ fontSize: '14px' }}>0đ</p>
                        </div>
                        <div className="border-top border-gray"></div>
                        <div className='d-flex justify-content-between mt-1 mb-2'>
                            <p style={{ fontSize: '14px', fontWeight: '500' }}>Tổng tiền</p>
                            <p style={{ fontSize: '14px' }}>Vui lòng chọn sản phẩm nếu có</p>
                        </div>
                        <button className='btn btn-danger col-12 mt-1 mb-3'>Mua hàng <span>(0)</span></button>
                    </div>
                </div>
            </div>
            <h3 style={{ fontSize: '21px', fontWeight: '500', fontFamily: 'Georgia, serif', width: '100%', marginTop: '20px' }}>Sản phẩm bạn quan tâm</h3>
            <div className='d-flex mt-2 row see_more-cart'>
                {
                    products.map((product, index) => (
                        <CartProduct
                            key={index}
                            width="210px"
                            id={product.idProduct}
                            image={product.image}
                            name={product.name}
                            price={(product.price).toLocaleString('vi-VN')}
                        />
                    ))
                }
                <div className='pagination-controls'>
                    {page != 1 && (
                        <i style={{   fontSize: '30px', cursor: 'pointer' }} onClick={handlePrevPage} className="bi bi-arrow-left-circle"></i>
                    )}
                    {(totalPage > 1 && page != totalPage) && (
                        <i style={{  fontSize: '30px', cursor: 'pointer' }} onClick={handleNextPage} className="bi bi-arrow-right-circle"></i>
                    )}
                </div>
            </div>
        </div>
    )
}
