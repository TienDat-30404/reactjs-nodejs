import React from 'react'
import { useState, useEffect } from 'react'
import CartProduct from '../../../../../components/CartProduct'
import { getAllProduct } from '../../../../../services/ProductService'
export default function ProductSale() {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const getDataProduct = async (page) => {
        const response = await getAllProduct(page, 'idProduct', 'asc')
        setTotalPage(response.totalPages)
        return response.products
    }

    getDataProduct(page)
    useEffect(() => {
        const fetchDatasProduct = async () => {
            const listProducts = await getDataProduct(page)
            setProducts(listProducts)
        }
        fetchDatasProduct()
    }, [page])

    const handleNextPage = () => {
        if (page < totalPage) {
            setPage(page + 1)
        }
    }
    const handlePrevPage = () => {
        if(page > 1)
        {
            setPage(page - 1)
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
                {products.map((product, index) => (
                    <CartProduct
                        key={index}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                    />
                ))
                }
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <button disabled = {page == 1} onClick={handlePrevPage} type="button" class="btn btn-light me-3">Primary</button>
                    <button disabled={page >= totalPage} onClick={handleNextPage} type="button" class="btn btn-light">Next</button>
                </div>
                <span className='text-center mt-2'>Page {page} of {totalPage}</span>
            </div>
        </div>

    )
}
