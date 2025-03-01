import React, { useEffect, useState } from 'react'
import CartProduct from '../../../../../components/CartProduct'
import { getAllProduct } from '../../../../../services/ProductService'
import { useDispatch, useSelector } from "react-redux";
import { initDataProduct } from '../../../../../redux/Products/productsSlice';
export default function Product() {
    const [page, setPage] = useState(1)
    const limit = 5
    const [totalPage, setTotalPage] = useState(1)

    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    useEffect(() => {
        const fetchDatasProduct = async () => {
            const listProduct = await getAllProduct(page, 'idProduct', 'asc', limit)
            if (listProduct) {
                dispatch(initDataProduct(listProduct))
            }
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
        <div className='mt-2 bg-white rounded-2 product'>
            <p className="text-capitalize ms-4 pt-2 fw-bold">Gợi ý hôm nay</p>
            <ul className="nav">
                <li className="nav-item d-flex align-items-center flex-column">
                    <img className='mt-2' width="40px" src="https://salt.tikicdn.com/cache/w100/ts/ta/70/b9/49/43f25c0f4ee6b7a0d918f047e37e8c87.png.webp" alt="" />
                    <a className="nav-link active" aria-current="page">Dành cho bạn</a>
                </li>
                <li className="nav-item d-flex align-items-center flex-column">
                    <img className='mt-2' width="40px" src="https://salt.tikicdn.com/cache/w100/ts/ta/12/59/f8/ef3c42e93fac779a393a5cd98a394ea6.png.webp" alt="" />
                    <a className="nav-link active" aria-current="page">Top Deal</a>
                </li>
                <li className="nav-item d-flex align-items-center flex-column">
                    <img className='mt-2' width="40px" src="https://salt.tikicdn.com/cache/w100/ts/ta/37/58/02/85786ae9e80eea21104c096b6593b37d.jpg.webp" alt="" />
                    <a className="nav-link active" aria-current="page">Sách xả kho - 60%</a>
                </li>
                <li className="nav-item d-flex align-items-center flex-column">
                    <img className='mt-2' width="40px" src="https://salt.tikicdn.com/cache/w100/ts/ta/f0/db/cd/dc286242f00373007d79073074384f45.png.webp" alt="" />
                    <a className="nav-link active" aria-current="page">Thể thao - 50%</a>
                </li>
                <li className="nav-item d-flex align-items-center flex-column">
                    <img className='mt-2' width="40px" src="https://salt.tikicdn.com/cache/w100/ts/ta/a3/2e/66/05032c91d5d30f4171b2642b635c1ef6.png.webp" alt="" />
                    <a className="nav-link active" aria-current="page">Thể thao - 50%</a>
                </li>
            </ul>
            <div className='row d-flex ms-3'>
                <div className='row'>
                    <div className='mt-2 video_product'>
                        <iframe style={{ width: '100%', height: '55%' }} src="https://www.youtube.com/embed/8pzyxuaV5iw" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <div className='d-flex image_demo-video'>
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/6a/a0/ff/b10971d31123358faa64ef43e6b7823d.jpg" alt="" />
                            <div>
                                <p className="">Bộ ba giường K-Bedding KMP chất liệu Microfiber bền chắc</p>
                                <div className='d-flex'>
                                    <h6>435.000đ</h6>
                                    <p className='fw-lighter'>-34%</p>
                                </div>
                                <div className='d-flex'>
                                    <p className="fw-lighter">Tài trợ bởi</p>
                                    <p>Everon Official Store</p>
                                </div>
                                <div className='mt-4 ms-2 d-flex justify-content-between align-items-center'>
                                    <img src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png" alt="" />
                                    <button className='btn btn-primary'>Xem thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {products.length > 0 ? (
                        products.map((product, index) => {
                            
                            const indexPriceAttribute = product?.productAttributes.find(attr => attr.priceBought != null)
                            if (!indexPriceAttribute) return;
                            
                            return (
                                <CartProduct
                                    key={index}
                                    id={product._id}
                                    image={product?.image}
                                    name={product.name}
                                    price={(indexPriceAttribute.priceBought).toLocaleString('vi-VN')}
                                />
                            )
                        })) :
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    }
                    <div className='d-flex justify-content-center align-items-center mt-3'>
                        <button disabled={page == 1} onClick={handlePrevPage} type="button" className="btn btn-light me-3">Primary</button>
                        <button disabled={page >= totalPage} onClick={handleNextPage} type="button" className="btn btn-light">Next</button>
                    </div>
                    <span className='text-center mt-2'>Page {page} of {totalPage}</span>


                </div>
            </div>
        </div>
    )
}
