import React, { Fragment, useEffect, useState } from 'react'
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
import Pagination from '../../../../components/Pagination'
export default function Product() {
  const dispatch = useDispatch()
  const products = useSelector(state => state?.products?.products)
  const page = useSelector(state => state?.products?.page)
  const totalPage = useSelector(state => state?.products?.totalPage)
  const totalProduct = useSelector(state => state?.products?.totalProduct)
  const limit = useSelector(state => state?.products?.limit)
  const categories = useSelector(state => state.categories.categories)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false)
  const [displayTextSearch, setDisplayTextSearch] = useState('idProduct')
  const [searchCriteria, setSearchCriteria] = useState({
    idProduct: '',
    name: '',
    idCategory: '',
    priceFrom: '',
    priceTo: ''
  })


  useEffect(() => {
    const fetchData = async () => {

      try {
        let queryProduct = `page=${page}&limit=${limit}&typeDisplay=0`
        if (searchCriteria.name != "") {
          queryProduct += `&search=${searchCriteria.name}`
        }
        if (searchCriteria.idProduct != "") {
          queryProduct += `&idProduct=${searchCriteria.idProduct}`
        }
        if (searchCriteria.idCategory != "") {
          queryProduct += `&idCategory=${searchCriteria.idCategory}`
        }
        if (displayTextSearch === 'price') {
          queryProduct += `&priceFrom=${searchCriteria.priceFrom}&priceTo=${searchCriteria.priceTo}`
        }


        let [responseProduct, responseCategory, responseAttribute] = await Promise.all([
          getAllProduct(queryProduct),
          getAllCategory(),
          getAllSizeService()
        ])
        console.log("responseProduct", responseProduct)
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
  }, [page, limit, searchCriteria, displayTextSearch])

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
    }
  }

  const handleChangeSearchSelect = (e) => {
    setSearchCriteria({
      idProduct: '',
      name: '',
      idCategory: '',
      priceFrom: '',
      priceTo: ''
    })
    setDisplayTextSearch("")
    setDisplayTextSearch(e.target.value)
  }

  return (
    <div className='px-4 py-2 bg-white product'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h3>Product</h3>
          <h6 className='ms-3'>({totalProduct} product found)</h6>
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

      <select
        onChange={handleChangeSearchSelect}
        class="form-select mt-2"
      >
        <option value="idProduct" selected>Tìm kiếm theo Id</option>
        <option value="name">Tìm kiếm theo tên</option>
        <option value="idCategory">Tìm kiếm theo thể loại</option>
        <option value="price">Tìm kiếm theo giá</option>
      </select>

      {displayTextSearch == 'price' && (
        <div className='d-flex align-items-center justify-content-between'>
          <div class="input-group mb-3 mt-1 w-40 me-2">
            <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Giá bắt đầu</button>
            <input
              type="text"
              class="form-control"
              name="priceFrom"
              value={searchCriteria[`${displayTextSearch}From`]}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || Number(value)) {
                  handleChangeInput(e, setSearchCriteria);
                }

              }}
            />
          </div>

          <div class="input-group mb-3 mt-1 w-40">
            <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Giá kết thúc</button>
            <input
              type="text"
              class="form-control"
              name="priceTo"
              value={searchCriteria[`${displayTextSearch}To`]}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || Number(value)) {
                  handleChangeInput(e, setSearchCriteria);
                }
              }}
            />
          </div>
        </div>
      )}

      {displayTextSearch != 'idCategory' && displayTextSearch != 'price' && (
        <div class="input-group mb-3 mt-1">
          <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Tìm kiếm theo {displayTextSearch}</button>
          <input
            type="text"
            class="form-control"
            name={displayTextSearch}
            value={searchCriteria[`${displayTextSearch}`]}
            onChange={(e) => handleChangeInput(e, setSearchCriteria)}
          />
        </div>
      )}

      {displayTextSearch == 'idCategory' && (

        <div>
          <select
            name={displayTextSearch}
            value={searchCriteria[`${displayTextSearch}`]}
            class="form-select"
            onChange={(e) => handleChangeInput(e, setSearchCriteria)}
          >
            <option>Chọn thể loại</option>
            {categories && categories?.length > 0 ? (
              categories?.map((category, index) => (
                <option key={index} value={category._id}>{category.name}</option>
              )
              )) :
              <option value="" selected>Không tồn tại thể loại</option>
            }
          </select>
        </div>
      )}


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
                <td>{new Date(product?.createdAt).toLocaleString('vi-VN')}</td>
                <td>{new Date(product?.updatedAt).toLocaleString('vi-VN')}</td>
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
        <Pagination
          totalPage={totalPage}
          handlePagination={handlePagination}
          page={page}
          visiblePagination={visiblePagination}
        />
      )}


      <AddProduct show={showAddModal} close={() => setShowAddModal(false)} />
      <EditProduct show={showEdit} close={() => setShowEdit(false)} data={selectedProduct} />
    </div>
  )
}
