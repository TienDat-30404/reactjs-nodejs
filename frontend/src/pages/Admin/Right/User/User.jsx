import React, { Fragment, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { getAllProduct, deleteProduct } from '../../../../services/ProductService'
import AddUser from './AddUser'
import EditUser from './EditUser'
import { InputComponent } from '../../../../components/InputComponent'
import { getAllCategory } from '../../../../services/CategoryService'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProductRedux, initDataProduct, switchPage } from '../../../../redux/Products/productsSlice'
import { getAllSizeService } from '../../../../services/SizeService'
import { initDataCategory } from '../../../../redux/Category/categoriesSlice'
import { initDataSize } from '../../../../redux/Size/sizesSlice'
import { visiblePagination } from '../../../../until/function'
import { getAllUser } from '../../../../services/UserService'
import { initDataUser } from '../../../../redux/User/usersSlice'
import { getAllRole } from '../../../../services/RoleService'
import { initDataRole } from '../../../../redux/Role/rolesSlice'
export default function Product() {
  const dispatch = useDispatch()
  const users = useSelector(state => state?.users?.users)
  const page = useSelector(state => state?.users?.page)
  const totalPage = useSelector(state => state?.users?.totalPage)
  const totalUser = useSelector(state => state?.users?.totalUser)
  const limit = useSelector(state => state?.users?.limit)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
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
        let query = `page=${page}&limit=${limit}`
        let [responseUser, responseRole] = await Promise.all(
          [
            getAllUser(query),
            getAllRole()
          ])
        if(responseUser && responseUser.status === 200)
        {
            dispatch(initDataUser(responseUser))
        }
        if(responseRole && responseRole.status === 200)
        {
            dispatch(initDataRole(responseRole))
        }
      }
      catch (error) {
        console.log("Fail when get users to display")
      }
    }
    fetchData()
  }, [page, limit])

  const handleSwitchPageEdit = (data) => {
    setShowEdit(true)
    setSelectedUser(data)
  }
  const handlePagination = (page) => {
    dispatch(switchPage(page))
  }


  // handle delete product
  const handleDeleteProduct = async (id) => {
    // const response = await deleteProduct(id)
    // console.log(response)
    // if (response && response?.status === 200) {
    //   dispatch(deleteProductRedux(id))
    //   if (products?.length === 1 && page > 1) {
    //     dispatch(switchPage(page - 1))
    //   }
    //   else if (products?.length === 1) {
    //     dispatch(switchPage(page - 1))
    //   }
    // }
  }

  const handleChangeSearchSelect = (e) => {
    // setSearchCriteria({
    //   idProduct: '',
    //   name: '',
    //   idCategory: '',
    //   priceFrom: '',
    //   priceTo: ''
    // })
    // setDisplayTextSearch("")
    // setDisplayTextSearch(e.target.value)
  }
  console.log(users)
  return (
    <div className='px-4 py-2 bg-white product'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h3>User</h3>
          <h6 className='ms-3'>({totalUser} user found)</h6>
          <button onClick={() => setShowAddModal(true)} type="button" className="btn btn-outline-success ms-3">Tạo tài khoản</button>
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



      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">TypeLogin</th>
            <th scope="col">Role</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users?.length > 0 ? (
            users?.map((user, index) => (
              <tr key={index}>
                <th scope="row">{(user?.account?._id)?.slice(0, 10)}...</th>
                <td>
                  <ImageComponent
                    src={user?.avatar} alt=""
                    width="70px"
                    height="50px"
                    borderRadius="5px"
                    className="me-2"
                  />
                  {user?.account?.userName}
                </td>
                <td>{user?.account?.email}</td>
                <td>{user?.account?.typeLogin}</td>
                <td>{user?.account?.role?.name}</td>

                <td>{user?.account?.createdAt}</td>
                <td>{user?.account?.updatedAt}</td>
                <td style={{ width: '6%' }} className='text-center'>
                  <button
                    onClick={() => handleSwitchPageEdit(user)}
                    type="button"
                    className="btn btn-outline-primary">
                    Edit
                  </button>
                </td>
                <td style={{ width: '6%' }} className='text-center'>
                  <button onClick={() => handleDeleteProduct(user._id)} type="button" className="btn btn-outline-danger">Delete</button>
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

      <AddUser show={showAddModal} close={() => setShowAddModal(false)} />
      <EditUser show={showEdit} close={() => setShowEdit(false)} data={selectedUser} />
    </div>
  )
}
