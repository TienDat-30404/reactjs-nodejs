import React, { useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { getAllProduct, deleteProduct } from '../../../../services/ProductService'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import { InputComponent } from '../../../../components/InputComponent'
import { getAllCategory } from '../../../../services/CategoryService'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProductRedux, initDataProduct, switchPage } from '../../../../redux/Products/productsSlice'
import { getAllSizeService } from '../../../../services/SizeService'
import { initDataCategory } from '../../../../redux/Category/categoriesSlice'
import { initDataSize } from '../../../../redux/Size/sizesSlice'
import { visiblePagination } from '../../../../until/function'
export default function Product() {
  const dispatch = useDispatch()
  const products = useSelector(state => state?.products?.products)
  const page = useSelector(state => state?.products?.page)
  const totalPage = useSelector(state => state?.products?.totalPage)
  const limit = useSelector(state => state?.product?.limit)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false)
  const [wordSearch, setWordSearch] = useState({
    idProduct: '',
    name: '',
    idCategory: ''
  })

  const handleSearchProduct = async (e) => {
    
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        let queryProduct = `page=${page}&limit=${limit}`
        let [responseProduct, responseCategory, responseAttribute] = await Promise.all([
          getAllProduct(queryProduct),
          getAllCategory(),
          getAllSizeService()
        ])
        if (responseProduct && responseProduct?.status === 200) {
          dispatch(initDataProduct(responseProduct))
        }
        if (responseCategory && responseCategory?.status === 200) {
          dispatch(initDataCategory(responseCategory))
        }
        if (responseAttribute && responseAttribute?.status === 200) {
          dispatch(initDataSize(responseAttribute))
        }

      }
      catch (error) {
        console.log("Fail when get products to display")
      }
    }
    fetchData()
  }, [page, limit])

  const handleSwitchPageEdit = (data) => {
    setShowEdit(true)
    setSelectedProduct(data)
  }

  const handlePagination = (page) => {
    dispatch(switchPage(page))
  }


  // handle delete product
  const handleDeleteProduct = async (id) => {
    const response = await deleteProduct(id)
    console.log(response)
    if (response && response?.status === 200) {
      dispatch(deleteProductRedux(id))
      if (products?.length === 1 && page > 1) {
        dispatch(switchPage(page - 1))
      }
      else if (products?.length === 1) {
        dispatch(switchPage(page - 1))
      }
    }
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

      {/* <form onSubmit={handleSearchProduct} className='mt-3 w-100 align-items-center justify-content-between shadow p-3 mb-5 bg-white rounded '>
        <div style={{ width: '100%' }} className='d-flex'>
          <div style={{ width: '70%' }}>
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

          <div style={{ width: '30%' }} className="d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-primary">Tìm kiếm</button>
          </div>
        </div>
      </form> */}


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
              <tr key={index}>
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
                    onClick={() => handleSwitchPageEdit(product)}
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
          ) : <p>Không có sản phẩm tồn tại</p>}

        </tbody>
      </table>

      {totalPage > 1 && (
        <ul class="pagination d-flex justify-content-center">
          <li style={{ cursor: 'pointer' }} onClick={() => handlePagination(page - 1)} class={`page-item ${page === 1 ? "disabled" : ""}`}>
            <a class="page-link">Previous</a>
          </li>

          {visiblePagination(page, totalPage).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${page === pageNumber ? "active" : ""}`}
              onClick={() => handlePagination(pageNumber)}
            >
              <button className="page-link">{pageNumber}</button>
            </li>
          ))}

          <li style={{ cursor: 'pointer' }} class={`page-item ${page === totalPage ? "disabled" : ""}`}>
            <button onClick={() => handlePagination(page + 1)}
              class="page-link">Next</button>
          </li>
        </ul>
      )}

      <AddProduct show={showAddModal} close={() => setShowAddModal(false)} />
      <EditProduct show={showEdit} close={() => setShowEdit(false)} data={selectedProduct} />
    </div>
  )
}
