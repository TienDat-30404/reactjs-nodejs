import React, { useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { getAllProduct, deleteProduct } from '../../../../services/ProductService'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import { detailCategory } from '../../../../services/CategoryService'
import { InputComponent } from '../../../../components/InputComponent'
import { getAllCategory } from '../../../../services/CategoryService'
export default function Product() {
  const [products, setProducts] = useState([])
  const [showAdd, setShowAdd] = useState(false)
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
  const fetchDatasProduct = async () => {
    const [allProduct] = await Promise.all([
      getAllProduct(null, 'idProduct', 'asc', null)
    ]);

    const productsWithCategoryNames = await Promise.all(
      allProduct.products.map(async (product) => {
        const category = await detailCategory(product.idCategory);
        return { ...product, category };
      })
    );

    setProducts(productsWithCategoryNames);
  };

  // get all category
  useEffect(() => {
    const fetchDatasRole = async () => {
      const response = await getAllCategory();
      setCategories(response.categories)
    }
    fetchDatasRole()
  }, [])


  const handleSwitchPageEdit = (id) => {
    setShowEdit(true)
    setIdProduct(id)
  }

  // handle display product immediately after add product
  const handleAddProductSuccess = () => {
    fetchDatasProduct();
  };

  // handle delete product
  const handleDeleteProduct = async (id) => {
    const response = await deleteProduct(id)
    if(response)
    {
      setProducts(products.filter(user => user.idProduct != id))
    }
  }
  

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setWordSearch(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));

  };

  const handleSearchProduct = async (e) => {
    e.preventDefault()
    const [listSearchProduct] = await Promise.all([
      getAllProduct(null, 'idProduct', 'asc', null, wordSearch.idProduct, wordSearch.idCategory,
        wordSearch.name, wordSearch.priceFrom, wordSearch.priceTo, wordSearch.quantity)
    ]);

    const productsWithCategoryNames = await Promise.all(
      listSearchProduct.products.map(async (product) => {
        const category = await detailCategory(product.idCategory);
        return { ...product, category };
      })
    );
    if (productsWithCategoryNames) {
      setProducts(productsWithCategoryNames);
    }
  }

  useEffect(() => {
    fetchDatasProduct();
  }, []);
  console.log(products)
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

      <form onSubmit={handleSearchProduct} className='mt-3 w-100 align-items-center justify-content-between shadow p-3 mb-5 bg-white rounded '>
        {/* Các trường input */}
        <div style={{ width: '100%' }} className='d-flex'>
          <div style={{ width: '70%' }}>
            {/* Id */}
            <div className="d-flex align-items-center mb-2" style={{ width: '100%' }}>
              <label style={{ width: '80px' }} htmlFor="inputId" className="me-2 col-form-label">Id</label>
              <InputComponent
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
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
                  onChange={handleChangeInput}
                  name="priceFrom"
                  type="text"
                  className="form-control"
                  id="inputEmail"
                />
              </div>

              <i style={{ fontSize: '25px' }} class="bi bi-arrow-right"></i>

              <div style={{ width: '50%' }} className='d-flex align-items-center ms-3'>
                <InputComponent
                  onChange={handleChangeInput}
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
                onChange={handleChangeInput}
                name="quantity"
                type="text"
                className="form-control"
                id="inputPhone"
              />
            </div>

            {/* Role */}
            <div className="d-flex align-items-center" style={{ width: '100%' }}>
              <label style={{ width: '80px' }} className="me-2 col-form-label">Category</label>
              <select className='form-control' name="idCategory" onChange={handleChangeInput}>
                <option value="-1">Chọn thể loại</option>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <option key={index} value={category.idCategory}>{category.name}</option>
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
                {product.category.category.map((category, index) => (
                  <td style={{ width: '15%' }} key={index} className='text-center'>{category.name}</td>
                ))}
                <td style={{ maxWidth: '15%', overflowWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'normal' }}>{product.description}</td>
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
      <EditProduct show={showEdit} close={() => setShowEdit(false)} idProduct={idProduct} onSuccess={fetchDatasProduct} />
    </div>
  )
}
