import React, { useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { getAllProduct, deleteProduct } from '../../../../services/ProductService'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
export default function Product() {
  const [products, setProducts] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [idProduct, setIdProduct] = useState(null)
  // get ALl Product 
  const fetchDatasProduct = async () => {
    const [allProduct] = await Promise.all([
      getAllProduct(null, 'idProduct', 'asc', null)
    ]);
    setProducts(allProduct.products);
  };

  const handleSwitchPageEdit = (id) => {
    setShowEdit(true)
    setIdProduct(id)
  }

  // handle display product immediately after add product
  const handleAddProductSuccess = () => {
    fetchDatasProduct(); 
  };

  // handle delete product
  const handleDeleteProduct = async(id) => {
    const response = await deleteProduct(id)
  }

  useEffect(() => {
    fetchDatasProduct();
  }, [handleDeleteProduct]);


  return (
    <div className='px-4 py-2 bg-white product'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h3>Product</h3>
          <h6 className='ms-3'>({products.length} product found)</h6>
          <button onClick={() => setShowAdd(true)} type="button" className="btn btn-outline-success ms-3">Tạo sản phẩm</button>
        </div>
        <div className='d-flex align-items-center'>
          <i className="bi bi-bell me-3"></i>
          <i className="bi bi-search me-3"></i>
          <ImageComponent
            src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png" alt=""
            width="30px"
            height="30px"
            borderRadius="5px"
          />
        </div>
      </div>
      <table style={{ width: '100%', backgroundColor: 'white', marginTop: '30px' }} cellspacing="0" cellpading="10">
        <thead>

          <tr>
            <th>Id</th>
            <th>Name</th>
            <th className='text-center'>Image</th>
            <th className='text-center'>Price</th>
            <th className='text-center'>Quantity</th>
            <th className='text-center'>Category</th>
            <th className='text-center'>Description</th>
            <th className='text-center' colSpan='2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td style={{ width: '4%' }}>{product.idProduct}</td>
                <td style={{ width: '20%' }}>{product.name}</td>
                <td style={{ width: '10%' }} className='text-center'>
                  <ImageComponent
                    src={product.image} alt=""
                    width="70px"
                    height="50px"
                    borderRadius="5px"
                  />
                </td>
                <td className='text-center'>{product.price}</td>
                <td className='text-center'>{product.quantity}</td>
                <td className='text-center'>{product.idCategory}</td>
                <td style={{ width: '25%' }}>{product.description}</td>
                <td style={{ width: '6%' }} className='text-center'>
                  <button 
                    onClick={() => handleSwitchPageEdit(product.idProduct)}
                    type="button" 
                    className="btn btn-outline-primary">
                    Edit
                  </button>
                </td>
                <td style={{ width: '6%' }} className='text-center'>
                  <button onClick={() => handleDeleteProduct(product.idProduct)} type="button" className="btn btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))
          ) :
            <div className="loading">
              <div className="spinner"></div>
            </div>
          }

        </tbody>
      </table>
      <AddProduct show={showAdd} close={() => setShowAdd(false)} onSuccess={handleAddProductSuccess} />
      <EditProduct show={showEdit} close={() => setShowEdit(false)} idProduct = {idProduct} />
    </div>
  )
}
