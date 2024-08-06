import React from 'react'
import Banner from './Banner/Banner'
import Promotion from './Promotion/Promotion'
import ProductSale from './Product/ProductSale/ProductSale'
import Product from './Product/Product/Product'
function Right() {
  return (
    <div className='col-9-5' >
      <Banner />
      <Promotion />
      <ProductSale />
      <Product />
    </div>
  )
}

export default Right
