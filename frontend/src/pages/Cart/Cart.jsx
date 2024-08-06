import React from 'react'
import { useState, useEffect } from 'react'
import CartProduct from '../../components/CartProduct'
import { getAllProduct } from '../../services/ProductService'
export default function Cart() {
    const [page, setPage] = useState(1)
    const limit = 6
    const [totalPage, setTotalPage] = useState(1)
    const [products, setProducts] = useState([])

    const getDataProduct = async (page) => {
        const response = await getAllProduct(page, 'idProduct', 'asc', limit)
        setTotalPage(response.totalPages)
        return response.products
    }

    useEffect(() => {
        const fetchDatasProduct = async () => {
            const listProduct = await getDataProduct(page)
            setProducts(listProduct)
        }
        fetchDatasProduct()
    }, [page])

    const handleNextPage = () => {
        if (page < totalPage) {
            setPage(page + 1)
        }
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1)
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
                            <h6 style={{ fontWeight: '400' }}>(1 sản phẩm)</h6>
                        </div>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Đơn giá</span>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Số lượng</span>
                        <span className='col-2' style={{ fontSize: '14px', color: 'rgb(120, 120, 120)', fontWeight: '400' }}>Thành tiền</span>
                        <i className="col-2 bi bi-trash3"></i>
                    </div>
                    <div className='col-12 d-flex align-items-center bg-white px-2 py-2'>
                        <div className='d-flex align-items-center col-5'>
                            <input style={{ width: '17px', height: '20px', marginRight: '8px' }} type="checkbox" name="" id="" />
                            <img width="75px" src="https://salt.tikicdn.com/cache/w160/ts/product/5c/57/85/312c7a38df0312e7525a18f61c5a0fbc.jpg.webp" alt="" />
                            <p>Điện thoại Nokia C30 (2GB/32GB) - Hàng chính hãng - Xanh</p>
                        </div>
                        <span className='col-2 fw-bold'>1.490.000đ</span>
                        <div className='col-2'>
                            <span style={{ border: '1px solid #ccc', padding: '1px 8px' }}>-</span>
                            <span style={{ border: '1px solid #ccc', padding: '1px 8px', }}>1</span>
                            <span style={{ border: '1px solid #ccc', padding: '1px 8px' }}>+</span>
                        </div>
                        <span className='col-2 text-danger fw-bold'>1.490.000đ</span>
                        <i className="col-2 bi bi-trash3"></i>
                    </div>
                    <div className='col-12 d-flex align-items-center bg-white px-2 py-2'>
                        <div className='d-flex align-items-center col-5'>
                            <input style={{ width: '17px', height: '20px', marginRight: '8px' }} type="checkbox" name="" id="" />
                            <img width="75px" src="https://salt.tikicdn.com/cache/750x750/ts/product/18/54/2d/3919a15dcdb692041ddec9b93971e559.png.webp" alt="" />
                            <p>Điện thoại Nokia C30 (2GB/32GB) - Hàng chính hãng - Xanh</p>
                        </div>
                        <span className='col-2 fw-bold'>1.490.000đ</span>
                        <div className='col-2'>
                            <span style={{ border: '1px solid #ccc', padding: '1px 8px' }}>-</span>
                            <span style={{ border: '1px solid #ccc', padding: '1px 8px', }}>1</span>
                            <span style={{ border: '1px solid #ccc', padding: '1px 8px' }}>+</span>
                        </div>
                        <span className='col-2 text-danger fw-bold'>1.490.000đ</span>
                        <i className="col-2 bi bi-trash3"></i>
                    </div>
                    <div className='col-12 d-flex align-items-center bg-white px-2 py-2'>
                        <div className='d-flex align-items-center col-5'>
                            <input style={{ width: '17px', height: '20px', marginRight: '8px' }} type="checkbox" name="" id="" />
                            <img width="75px" src="https://salt.tikicdn.com/cache/750x750/ts/product/18/54/2d/3919a15dcdb692041ddec9b93971e559.png.webp" alt="" />
                            <p>Điện thoại Nokia C30 (2GB/32GB) - Hàng chính hãng - Xanh</p>
                        </div>
                        <span className='col-2 fw-bold'>1.490.000đ</span>
                        <div className='col-2'>
                            <span style={{ border: '1px solid #ccc', padding: '1px 8px' }}>-</span>
                            <span style={{ border: '1px solid #ccc', padding: '1px 8px', }}>1</span>
                            <span style={{ border: '1px solid #ccc', padding: '1px 8px' }}>+</span>
                        </div>
                        <span className='col-2 text-danger fw-bold'>1.490.000đ</span>
                        <i className="col-2 bi bi-trash3"></i>
                    </div>

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
            <h3 style={{ fontSize: '21px', fontWeight: '500', fontFamily: 'Georgia, serif', width: '100%', marginTop : '20px' }}>Sản phẩm bạn quan tâm</h3>
            <div className='d-flex mt-2  row'>
                    {
                        products.map((product, index) => (
                            <CartProduct
                                key={index}
                                width = "210px"
                                id={product.idProduct}
                                image={product.image}
                                name={product.name}
                                price={(product.price).toLocaleString('vi-VN')}
                            />
                        ))
                    }
                    <div className='pagination-controls'>
                        {page != 1 && (
                            <i style={{ position: 'absolute', top: '100%', fontSize: '30px', left: '7%', cursor: 'pointer' }} onClick={handlePrevPage} className="bi bi-arrow-left-circle"></i>
                        )}  
                        {(totalPage > 1 && page != totalPage) && (
                            <i style={{ position: 'absolute', top: '100%', fontSize: '30px', right: '7%', cursor: 'pointer' }} onClick={handleNextPage} className="bi bi-arrow-right-circle"></i>
                        )}
                    </div>
                </div>
        </div>
    )
}
