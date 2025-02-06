import React from 'react'
import { useState, useEffect } from 'react'
import { getAllProduct } from '../../../../services/ProductService'
import CartProduct from '../../../../components/CartProduct'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initDataProduct, switchPage } from '../../../../redux/Products/productsSlice'
export default function Category() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.products)
  const page = useSelector(state => state.products.page)
  const totalPage = useSelector(state => state.products.totalPage)
  const totalProduct = useSelector(state => state.products.totalProduct)
  const limit = 5;
  const [isPageReset, setIsPageReset] = useState(false);
  const { _id } = useParams();


  useEffect(() => {
    if (_id) {
      dispatch(switchPage(1));
      setIsPageReset(true);
    }
  }, [_id, dispatch]);

  useEffect(() => {
    const fetchDatasProduct = async () => {
      if (_id && (!isPageReset || page === 1)) {
        const query = `page=${page}&sortBy=idProduct&type=asc&limit=${limit}&idCategory=${_id}&typeDisplay=1`;
        const response = await getAllProduct(query);
        console.log(response);
        if (response) {
          dispatch(initDataProduct(response));
        }
        setIsPageReset(false);
      }
    };
    fetchDatasProduct()
  }, [page, _id, limit, dispatch])



  const handleNextPage = () => {
    if (page < totalPage) {
      dispatch(switchPage(page + 1))
    }
  }

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(switchPage(page - 1))
    }
  }
  return (

    <div className='col-9-5 row'>
      {
        products.map((product, index) => (
          
          <CartProduct
            key={index}
            id={product._id}
            image={product.image}
            name={product.name}
            priceNotDiscount={
              product?.discount && product?.discount?.length > 0 ?
                (product?.productAttributes[0]?.priceBought * product?.productAttributes[0]?.size.sizePriceMultiplier).toLocaleString('vi-VN') + "đ"
                :
                ""
            }
            percentDiscount={
              product?.discount && product?.discount?.length > 0 ?
                ((1 - product.discount[0].discountValue) * 100).toFixed(0) + "%"
                :
                ""
            }
            price=
            {
              product?.discount && product?.discount.length > 0 ?
                (product?.productAttributes[0]?.priceBought * product?.productAttributes[0]?.size.sizePriceMultiplier * product.discount[0].discountValue).toLocaleString('vi-VN')
                :
                (product?.productAttributes[0]?.priceBought * product?.productAttributes[0]?.size.sizePriceMultiplier).toLocaleString('vi-VN')
            }
            widthImage="100px"
            heightImage="200px"
          />
        ))
      }
      <div className='pagination-controls'>
        {page != 1 && (
          <i style={{ position: 'absolute', top: '67%', fontSize: '30px', left: '23%', cursor: 'pointer' }} onClick={handlePrevPage} className="bi bi-arrow-left-circle"></i>
        )}
        {(totalPage > 1 && page != totalPage) && (
          <i style={{ position: 'absolute', top: '67%', fontSize: '30px', right: '11%', cursor: 'pointer' }} onClick={handleNextPage} className="bi bi-arrow-right-circle"></i>
        )}
      </div>
    </div>


  )
}
