import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllProduct } from '../../services/ProductService'
import CartProduct from '../../components/CartProduct'
import { detailCategory } from '../../services/CategoryService';
export default function Search() {
    const navigate = useNavigate()
    const limit = 4
    const [page, setPage] = useState(1)
    const [nameCategory, setNameCategory] = useState({})
    const [totalPage, setTotalPage] = useState(1)
    const [sort, setSort] = useState('idProduct')
    const [type, setType] = useState('asc')
    const [resultSearch, setResultSearch] = useState([])
    const params = new URLSearchParams(window.location.search)
    const wordSearch = params.get('find') ? params.get('find') : null
    const idCategory = params.get('idCategory') ? params.get('idCategory') : null
    const priceFrom = params.get('priceFrom') ? params.get('priceFrom') : null
    const priceTo = params.get('priceTo') ? params.get('priceTo') : null
 
    useEffect(() => {
        const fetchDatasSearchProduct = async () => {
            const listSearchProduct = await getAllProduct(page, sort, type, limit, idCategory, wordSearch, priceFrom, priceTo)
            setResultSearch(listSearchProduct)
            setTotalPage(listSearchProduct.totalPages)
        }
        fetchDatasSearchProduct()
    }, [page, sort, type, limit, idCategory, wordSearch, priceFrom, priceTo])

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
    }, [wordSearch, idCategory, priceFrom, priceTo])

    // get name category 
    useEffect(() => {
        const fetchCategoryName = async () => {
            if (idCategory) {
                const category = await detailCategory(idCategory);
                setNameCategory(category.category);
            } else {
                setNameCategory('');
            }
        };
        fetchCategoryName();
    }, [idCategory]);

    // arrange price
    const handleSortChange = (e) => {
        if(e.target.value === "priceAsc")
        {
            setSort('price'); 
            setType('asc')
        }
        else if(e.target.value === 'priceDesc')
        {
            setSort('price')
            setType('desc')
        }
        else 
        {
            setSort('idProduct')
            setType('asc')
        }
        setPage(1)
    }
    return (
        <div className="container d-flex">
            <div className="row col-12 mt-2">
                <div className='d-flex mb-2 align-items-center'>
                    <p onClick={() => navigate('/')} style={{ fontSize: '15px', cursor: 'pointer' }} className='fw-light me-2 switch_homepage-profile'>Trang chủ</p>
                    <i style={{ fontSize: '15px' }} className="bi bi-chevron-right me-2"></i>
                    <p style={{ fontSize: '15px', color: 'rgb(56, 56, 61)', fontWeight: '400', marginRight: '5px' }}>Kết quả tìm kiếm : </p>
                    {wordSearch
                        ? <p style={{ color: 'red', fontWeight: '500', fontSize: '15px', marginRight: '6px' }}>{wordSearch}</p>
                        : ''
                    }
                    {idCategory ?
                        <>
                            <span className='me-2'>, Thể loại : </span>
                            <p style={{ color: 'red', fontWeight: '500', fontSize: '15px', marginRight: '6px' }}>
                                {nameCategory.length > 0 ? (
                                    nameCategory.map((category, index) => (
                                        <span key={index}>{category.name}</span>
                                    ))
                                ) : (
                                    <p>123</p>
                                )}
                            </p>
                        </>
                        : ''
                    }
                    {priceFrom ?
                        <div className='d-flex align-items-center'>
                            <p className='me-2'>, Giá từ</p>
                            <p style={{ color: 'red', fontWeight: '500', fontSize: '16px', marginRight: '6px' }}>{parseFloat(priceFrom).toLocaleString('vi-VN')}đ</p>
                            <p className='me-2'>đến</p>
                            <p style={{ color: 'red', fontWeight: '500', fontSize: '16px', marginRight: '6px' }}>{parseFloat(priceTo).toLocaleString('vi-VN')}đ</p>
                        </div>
                        : ''
                    }
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
                        <select className='ms-3 rounded-3 py-1' name="" id="" value={`${sort}${type === 'asc' ? 'Asc' : 'Desc'}`} onChange={handleSortChange}>
                            <option value="">Phổ biến</option>
                            <option value="priceAsc">Giá thấp đến cao</option>
                            <option value="priceDesc">Giá cao đến thấp</option>
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
                                        price={(product.price).toLocaleString('vi-VN')}
                                    />
                                ))}
                            </div>
                            {resultSearch.products.length > 0 ? (
                                <div>

                                    <div className='d-flex justify-content-center align-items-center mt-3'>
                                        <button disabled={page == 1} onClick={handlePrevPage} type="button" className="btn btn-light me-3">Primary</button>
                                        <button disabled={page >= totalPage} onClick={handleNextPage} type="button" className="btn btn-light">Next</button>
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center mt-2'>
                                        <span>Page {page} of {totalPage}</span>
                                    </div>
                                </div>
                            ) :
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img width="200px" src="https://w7.pngwing.com/pngs/658/622/png-transparent-page-not-found-illustration.png" alt="" />
                                    <h2 className='text-danger'>Không tìm thấy sản phẩm</h2>
                                </div>
                            }
                        </div>
                    ) :
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    }

                </div>
            </div>
        </div >
    )
}
