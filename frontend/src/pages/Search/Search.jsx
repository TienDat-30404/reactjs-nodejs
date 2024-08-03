import React from 'react'
import { useState, useEffect } from 'react'
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { searchProduct } from '../../services/ProductService'
import CartProduct from '../../components/CartProduct'
export default function Search() {
    const navigate = useNavigate()
    const [resultSearch, setResultSearch] = useState([])
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const wordSearch = queryParams.type;
    const getDataSearchProduct = async (word) => {
        const response = await searchProduct(word)
        return response
    }

    useEffect(() => {
        const fetchDatasSearchProduct = async () => {
            if (wordSearch.trim() === '') {
                setResultSearch([]);
                return;
            }
            const listSearchProduct = await getDataSearchProduct(wordSearch)
            setResultSearch(listSearchProduct)
        }
        fetchDatasSearchProduct()
    }, [wordSearch])

    const switchHomePage = () => {
        navigate('/')
    }
    return (
        <div className="container d-flex">
            <div className="row col-12 mt-2">
                <div className='d-flex mb-2 align-items-center'>
                    <p onClick = {() => navigate('/')} style={{ fontSize: '15px', cursor: 'pointer' }} className='fw-light me-2 switch_homepage-profile'>Trang chủ</p>
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
                    {resultSearch.products ? resultSearch.products.map((product, index) => (
                        <CartProduct
                            id={product.idProduct}
                            ket={index}
                            width="300px"
                            name={product.name}
                            image={product.image}
                            price={product.price}
                        />
                    )) :
                        <div class="loading">
                            <div class="spinner"></div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
