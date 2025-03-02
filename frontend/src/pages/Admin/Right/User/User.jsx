import React, { Fragment, useEffect, useState, useRef } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import AddUser from './AddUser'
import EditUser from './EditUser'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'
import { deleteUser, getAllUser } from '../../../../services/UserService'
import { deleteUserRedux, initDataUser, switchPage } from '../../../../redux/User/usersSlice'
import { getAllRole } from '../../../../services/RoleService'
import { initDataRole } from '../../../../redux/Role/rolesSlice'
import ChangePassword from './ChangePassword'
import Pagination from '../../../../components/Pagination'
import { useRoleDetail } from '../../../../until/function'
export default function Product() {
  const dispatch = useDispatch()
  const roles = useSelector(state => state?.roles?.roles)
  const users = useSelector(state => state?.users?.users)
  const page = useSelector(state => state?.users?.page)
  const totalPage = useSelector(state => state?.users?.totalPage)
  const totalUser = useSelector(state => state?.users?.totalUser)
  let limit = useSelector(state => state?.users?.limit)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [selectedEditUser, setSelectedEditUser] = useState(null);
  const [selectedChangePassword, setSelectedChangePassword] = useState(null);
  const tableRef = useRef();
  const [displayTextSearch, setDisplayTextSearch] = useState('idUser')
  const [searchCriteria, setSearchCriteria] = useState({
    idUser: '',
    userName: '',
    email: '',
    role: '',
    phone: ''
  })
  const { isAuthenticated, userData } = useSelector((state) => state.auth);
  const idRole = isAuthenticated && userData?.dataLogin?.idRole


  useEffect(() => {
    const fetchData = async () => {

      try {
        let query = `page=${page}&limit=${limit}`
        if (searchCriteria.idUser != "") {
          query += `&idUser=${searchCriteria.idUser}`
        }
        if (searchCriteria.phone != "") {
          query += `&phone=${searchCriteria.phone}`
        }
        if (searchCriteria.email != "") {
          query += `&email=${searchCriteria.email}`
        }
        if (searchCriteria.userName != "") {
          query += `&userName=${searchCriteria.userName}`
        }
        if (searchCriteria.role != "") {
          query += `&role=${searchCriteria.role}`
        }

        let [responseUser, responseRole] = await Promise.all(
          [
            getAllUser(query),
            getAllRole()
          ])
        if (responseUser && responseUser.status === 200) {
          dispatch(initDataUser(responseUser))
        }
        if (responseRole && responseRole.status === 200) {
          dispatch(initDataRole(responseRole))
        }
      }
      catch (error) {
        console.log("Fail when get users to display")
      }
    }
    fetchData()
  }, [page, limit, searchCriteria, displayTextSearch])

  const { data: roleDetails, isLoading: isRoleDetailsLoading, isError: isRoleDetailsError, error: roleDetailsError } = useRoleDetail(idRole)
  const isDisplayPageUser = roleDetails?.permissions?.some(item =>
    item.action.toLowerCase().includes('user') && item.allow === true
  )

  const handleSwitchPageEdit = (data) => {
    setShowEdit(true)
    setSelectedEditUser(data)
  }
  const handlePagination = (page) => {
    dispatch(switchPage(page))
  }


  // handle delete product
  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id)
    console.log(response)
    if (response && response?.status === 200) {
      dispatch(deleteUserRedux(id))
      if (users.length === 1) {
        dispatch(switchPage(page - 1))
      }
    }
  }

  const handleChangeSearchSelect = (e) => {
    setSearchCriteria({
      idUser: '',
      userName: '',
      email: '',
      role: '',
      phone: ''
    })
    setDisplayTextSearch("")
    setDisplayTextSearch(e.target.value)
    dispatch(switchPage(1))
  }

  const handleSelectedRow = (data) => {
    setSelectedChangePassword(data)

  }

  const handleClickOutside = (event) => {
    if (
      (tableRef.current && tableRef.current.contains(event.target)) ||
      event.target.closest(".modal") ||
      event.target.closest(".btn-change-password")
    ) {
      return;
    }
    setSelectedChangePassword(null);
  };



  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div className='px-4 py-2 bg-white product'>
      {isDisplayPageUser ? (
        <Fragment>

          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <h3>User</h3>
              <h6 className='ms-3'>({totalUser} user found)</h6>
              {!isRoleDetailsLoading ? (
                <button
                  onClick={() => setShowAddModal(true)}
                  type="button"
                  className="btn btn-outline-success ms-3"
                  disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                    (item) => item?.action === "user_add" && item?.allow === false
                  )}
                >
                  Tạo tài khoản
                </button>
              ) : (
                <div class="spinner-border" role="status">
                  <span class="sr-only"></span>
                </div>
              )}
              <button
                onClick={() => {
                  setShowChangePassword(true)
                }}
                type="button"
                className="btn btn-outline-success ms-3 btn-change-password"
                disabled={selectedChangePassword === null || !isRoleDetailsLoading && roleDetails?.permissions?.find(
                  (item) => item?.action === "user_changePassword" && item?.allow === false
                )}
              >
                Đổi mật khẩu
              </button>
    
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
            disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
              (item) => item?.action === "user_search" && item?.allow === false
            )}
          >
            <option value="idUser" selected>Tìm kiếm theo idUser</option>
            <option value="userName">Tìm kiếm theo userName</option>
            <option value="email">Tìm kiếm theo email</option>
            <option value="role">Tìm kiếm theo quyền</option>
            <option value="phone">Tìm kiếm theo số điện thoại</option>
          </select>
    
    
          {displayTextSearch != 'role' ? (
            <div class="input-group mb-3 mt-1">
              <button class="btn btn-outline-secondary" disabled type="button" id="button-addon1">Tìm kiếm theo {displayTextSearch}</button>
              <input
                type="text"
                class="form-control"
                name={displayTextSearch}
                value={searchCriteria[`${displayTextSearch}`]}
                onChange={(e) => handleChangeInput(e, setSearchCriteria)}
                disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                  (item) => item?.action === "user_search" && item?.allow === false
                )}
              />
            </div>
          ) :
            <div>
              <select
                name={displayTextSearch}
                value={searchCriteria[`${displayTextSearch}`]}
                class="form-select"
                onChange={(e) => {
                  handleChangeInput(e, setSearchCriteria);
                  dispatch(switchPage(1)
                  )
                }}
              >
                {roles && roles?.length > 0 ? (
                  roles?.map((role, index) => (
                    <option key={index} value={role._id}>{role.name}</option>
                  )
                  )) :
                  <option value="" selected>Không tồn tại quyền</option>
                }
              </select>
            </div>
          }
    
    
    
          <table ref={tableRef} >
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
                  <tr
                    key={index}
                    onClick={() => handleSelectedRow(user)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedChangePassword?.account?._id === user?.account?._id ? 'lightgray' : 'white'
                    }}
                  >
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
    
                    <td>{new Date(user?.account?.createdAt).toLocaleString('vi-VN')}</td>
                    <td>{new Date(user?.account?.updatedAt).toLocaleString('vi-VN')}</td>
                    <td style={{ width: '6%' }} className='text-center'>
                      <button
                        onClick={() => handleSwitchPageEdit(user)}
                        type="button"
                        className="btn btn-outline-primary"
                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                          (item) => item?.action === "user_edit" && item?.allow === false
                        )}
                      >
                        Edit
                      </button>
                    </td>
                    <td style={{ width: '6%' }} className='text-center'>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        type="button"
                        className="btn btn-outline-danger"
                        disabled={!isRoleDetailsLoading && roleDetails?.permissions?.find(
                          (item) => item?.action === "user_edit" && item?.allow === false
                        )}
                      >
                        Delete</button>
                    </td>
                  </tr>
                ))
              ) : <p>Không có người dùng tồn tại</p>}
    
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
    
    
          <AddUser show={showAddModal} close={() => setShowAddModal(false)} />
          <EditUser show={showEdit} close={() => setShowEdit(false)} data={selectedEditUser} />
          <ChangePassword show={showChangePassword} close={() => setShowChangePassword(false)} data={selectedChangePassword} />
        </Fragment>
      ) : ""}
    </div>
  )
}
