import React from 'react'
import { useState, useEffect } from 'react'
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getAllProduct } from '../../services/ProductService'
import CartProduct from '../../components/CartProduct'
export default function Search() {
    const navigate = useNavigate()
    const limit = 4
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [resultSearch, setResultSearch] = useState([])
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const wordSearch = queryParams.type;
    const getDataSearchProduct = async (page, word) => {
        const response = await getAllProduct(page, 'idProduct', 'asc', limit, null, word)
        setTotalPage(response.totalPages)
        return response
    }
    useEffect(() => {
        const fetchDatasSearchProduct = async () => {
            if (wordSearch.trim() === '') {
                setResultSearch([]);
                return;
            }
            const listSearchProduct = await getDataSearchProduct(page, wordSearch)
            setResultSearch(listSearchProduct)
        }
        fetchDatasSearchProduct()
    }, [page, wordSearch])

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

    useEffect(() => {
        setPage(1)
    }, [wordSearch])
    return (
        <div className="container d-flex">
            <div className="row col-12 mt-2">
                <div className='d-flex mb-2 align-items-center'>
                    <p onClick={() => navigate('/')} style={{ fontSize: '15px', cursor: 'pointer' }} className='fw-light me-2 switch_homepage-profile'>Trang chủ</p>
                    <i style={{ fontSize: '15px' }} className="bi bi-chevron-right me-2"></i>
                    <p style={{ fontSize: '15px', color: 'rgb(56, 56, 61)', fontWeight: '400', marginRight: '5px' }}>Kết quả tìm kiếm</p>
                    "<p style={{ fontSize: '15px' }}>a</p>"
                </div>
                <div className='d-flex align-items-center bg-white justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center me-4'>
                            <input style={{ width: '20px', height: '27px', marginRight: '6px' }} type="checkbox" />
                            <img className='me-2' width="100px" src="https://salt.tikicdn.com/ts/upload/b5/aa/48/2305c5e08e536cfb840043df12818146.png" alt="" />
                            <p style={{ borderRight: '2px solid #ccc', paddingRight: '10px' }}>Siêu rẻ</p>
                        </div>
                        <input style={{ width: '20px', height: '27px', marginRight: '6px' }} type="checkbox" />
                        <div>
                            <i style={{ fontSize: "16px", color: "orange" }} className="bi bi-star-fill"></i>
                            <i style={{ fontSize: "15px", color: "orange" }} className="bi bi-star-fill"></i>
                            <i style={{ fontSize: "15px", color: "orange" }} className="bi bi-star-fill"></i>
                            <i style={{ fontSize: "15px", color: "orange" }} className="bi bi-star-half me-2"></i>
                            từ 4 sao
                        </div>
                    </div>
                    <div className='d-flex align-items-center mt-2'>
                        <p style={{ fontSize: '16px', color: '#888', fontWeight: '400' }}>Sắp xếp</p>
                        <select className='ms-3 rounded-3 py-1' name="" id="">
                            <option value="">Phổ biến</option>
                            <option value="">Giá thấp đến cao</option>
                            <option value="">Giá cao đến thấp</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex row col-12'>
                    {resultSearch.products ? (
                        <div>
                            <div className='d-flex'>
                                {resultSearch.products.map((product, index) => (
                                    <CartProduct
                                        id={product.idProduct}
                                        ket={index}
                                        width="300px"
                                        name={product.name}
                                        image={product.image}
                                        price={product.price}
                                    />
                                ))}
                            </div>
                            <div className='d-flex justify-content-center align-items-center mt-3'>
                                <button disabled={page == 1} onClick={handlePrevPage} type="button" className="btn btn-light me-3">Primary</button>
                                <button disabled={page >= totalPage} onClick={handleNextPage} type="button" className="btn btn-light">Next</button>
                            </div>
                            <div  className='d-flex justify-content-center align-items-center mt-2'>
                                <span>Page {page} of {totalPage}</span>
                            </div>
                        </div>
                    ) :
                        <div class="loading">
                            <div class="spinner"></div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
