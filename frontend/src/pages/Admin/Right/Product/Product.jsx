import React, { useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { getAllProduct, deleteProduct } from '../../../../services/ProductService'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import { detailCategory } from '../../../../services/CategoryService'
import { InputComponent } from '../../../../components/InputComponent'
import { getAllCategory } from '../../../../services/CategoryService'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { initDataProduct } from '../../../../redux/Products/productsSlice'
export default function Product() {
  const dispatch = useDispatch()
  const products = useSelector(state => state?.products?.products)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [idProduct, setIdProduct] = useState(null)
  const [categories, setCategories] = useState([])
  const [wordSearch, setWordSearch] = useState({
    idProduct: '',
    name: '',
    priceFrom: '',
    priceTo: '',
    quantity: '',
    idCategory: ''

  })
  // get ALl Product 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProduct()
        if (response && response?.status === 200) {
          dispatch(initDataProduct(response))
        }
      }
      catch (error) {
        console.log("Lỗi khi lấy danh sách sản phẩm")
      }
    }
    fetchData()
  })

  const handleSwitchPageEdit = (id) => {
    // setShowEdit(true)
    // setIdProduct(id)
  }


  // handle delete product
  const handleDeleteProduct = async (id) => {
    // const response = await deleteProduct(id)
    // if (response) {
    //   setProducts(products.filter(product => product._id != id))
    // }
  }




  const handleSearchProduct = async (e) => {
    // e.preventDefault()
    // const [listSearchProduct] = await Promise.all([
    //   getAllProduct(null, 'idProduct', 'asc', null, wordSearch.idProduct, wordSearch.idCategory,
    //     wordSearch.name, wordSearch.priceFrom, wordSearch.priceTo, wordSearch.quantity)
    // ])
  }


  return (
    <div className='px-4 py-2 bg-white product'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h3>Product</h3>

          <h6 className='ms-3'>({products.length} product found)</h6>
          <button onClick={() => setShowAddModal(true)} type="button" className="btn btn-outline-success ms-3">Tạo sản phẩm</button>
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

      <form onSubmit={handleSearchProduct} className='mt-3 w-100 align-items-center justify-content-between shadow p-3 mb-5 bg-white rounded '>
        {/* Các trường input */}
        <div style={{ width: '100%' }} className='d-flex'>
          <div style={{ width: '70%' }}>
            {/* Id */}
            <div className="d-flex align-items-center mb-2" style={{ width: '100%' }}>
              <label style={{ width: '80px' }} htmlFor="inputId" className="me-2 col-form-label">Id</label>
              <InputComponent
                onChange={(e) => handleChangeInput(e, setWordSearch)}
                name="idProduct"
                type="text"
                className="form-control"
                id="inputId"
              />
            </div>

            {/* Name */}
            <div className="d-flex align-items-center mb-2" style={{ width: '100%' }}>
              <label style={{ width: '80px' }} htmlFor="inputName" className="me-2 col-form-label">Name</label>
              <InputComponent
                onChange={(e) => handleChangeInput(e, setWordSearch)}
                name="name"
                type="text"
                className="form-control"
                id="inputName"
              />
            </div>

            {/* Email */}
            <div className="d-flex align-items-center mb-2" style={{ width: '100%' }}>
              <div style={{ width: '50%' }} className='d-flex align-items-center me-3'>
                <label style={{ width: '100px' }} htmlFor="inputEmail" className="me-2 col-form-label">Price</label>
                <InputComponent
                  onChange={(e) => handleChangeInput(e, setWordSearch)}
                  name="priceFrom"
                  type="text"
                  className="form-control"
                  id="inputEmail"
                />
              </div>

              <i style={{ fontSize: '25px' }} class="bi bi-arrow-right"></i>

              <div style={{ width: '50%' }} className='d-flex align-items-center ms-3'>
                <InputComponent
                  onChange={(e) => handleChangeInput(e, setWordSearch)}

                  name="priceTo"
                  type="text"
                  className="form-control"
                  id="inputEmail"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="d-flex align-items-center mb-2" style={{ width: '100%' }}>
              <label style={{ width: '80px' }} htmlFor="inputPhone" className="me-2 col-form-label">Quantity</label>
              <InputComponent
                onChange={(e) => handleChangeInput(e, setWordSearch)}

                name="quantity"
                type="text"
                className="form-control"
                id="inputPhone"
              />
            </div>

            {/* Role */}
            <div className="d-flex align-items-center" style={{ width: '100%' }}>
              <label style={{ width: '80px' }} className="me-2 col-form-label">Category</label>
              <select className='form-control' name="idCategory" onChange={(e) => handleChangeInput(e, setWordSearch)}
              >
                <option value="-1">Chọn thể loại</option>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <option key={index} value={category._id}>{category.name}</option>
                  ))
                ) : <option>Hiện tại chưa có quyền</option>}
              </select>
            </div>
          </div>

          {/* Nút Submit */}
          <div style={{ width: '30%' }} className="d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-primary">Tìm kiếm</button>
          </div>
        </div>
      </form>


      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products && products?.length > 0 ? (
            products?.map((product, index) => (
              <tr>
                <th scope="row">{(product?._id).slice(0, 10)}...</th>
                <td>
                  <ImageComponent
                    src={product?.image} alt=""
                    width="70px"
                    height="50px"
                    borderRadius="5px"
                    className="me-2"
                  />
                  {product?.name}
                </td>
                <td>{product?.category?.name}</td>
                <td>{product?.description}</td>
                <td>{product?.createdAt}</td>
                <td>{product?.updatedAt}</td>
                <td style={{ width: '6%' }} className='text-center'>
                  <button
                    onClick={() => handleSwitchPageEdit(product._id)}
                    type="button"
                    className="btn btn-outline-primary">
                    Edit
                  </button>
                </td>
                <td style={{ width: '6%' }} className='text-center'>
                  <button onClick={() => handleDeleteProduct(product._id)} type="button" className="btn btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))
          ) : "123"}

        </tbody>
      </table>
      
      <AddProduct show={showAddModal} close={() => setShowAddModal(false)} />
      {/* <EditProduct show={showEdit} close={() => setShowEdit(false)} idProduct={idProduct} onSuccess={fetchDatasProduct} /> */}
    </div>
  )
}
