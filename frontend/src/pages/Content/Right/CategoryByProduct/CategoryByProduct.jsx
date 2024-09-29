import React from 'react'
import { useState, useEffect } from 'react'
import { getAllProduct } from '../../../../services/ProductService'
import CartProduct from '../../../../components/CartProduct'
import { useParams } from 'react-router-dom'
export default function Category() {
  const [page, setPage] = useState(1)
  const limit = 10
  const { idCategory } = useParams();
  console.log(idCategory)
  const [totalPage, setTotalPage] = useState(1)
  const [categories, setCategories] = useState([])
  const getDataCategory = async (page) => {
    const response = await getAllProduct(page, 'idProduct', 'asc', limit, null, idCategory)
    setTotalPage(response.totalPages)
    return response.products
  }

  useEffect(() => {
    const fetchDatasProduct = async () => {
      const listCategory = await getDataCategory(page)
      console.log(listCategory)
      setCategories(listCategory)
    }
    fetchDatasProduct()
  }, [page, idCategory])

  useEffect(() => {
    setPage(1);
  }, [idCategory]);

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
  console.log(categories)
  return (

    <div className='col-9-5 row'>
      {
        categories.map((product, index) => (
          <CartProduct
            key={index}
            id={product.idProduct}
            image={product.image}
            name={product.name}
            price={(product.price).toLocaleString('vi-VN')}
          />
        ))
      }
      <div className='pagination-controls'>
        {page != 1 && (
          <i style={{ position : 'absolute', top : '67%', fontSize : '30px', left : '23%', cursor : 'pointer' }} onClick={handlePrevPage} className="bi bi-arrow-left-circle"></i>
        )}
        {(totalPage > 1 && page != totalPage) && (
          <i style={{ position : 'absolute', top : '67%', fontSize : '30px', right : '11%', cursor : 'pointer' }} onClick={handleNextPage} className="bi bi-arrow-right-circle"></i>
        )}
      </div>
    </div>
    

  )
}
