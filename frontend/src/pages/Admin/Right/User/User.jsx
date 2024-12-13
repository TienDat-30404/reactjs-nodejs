import React, { useCallback, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { getAllUser, searchUser } from '../../../../services/UserService'
import AddUser from './AddUser'
import ChangePassword from './ChangePassword'
import { deleteUser } from '../../../../services/UserService'
import EditUser from './EditUser'
import { InputComponent } from '../../../../components/InputComponent'
import { getAllRole } from '../../../../services/RoleService'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUserRedux, initDataUser, switchPage } from '../../../../redux/User/usersSlice'
import { initDataRole } from '../../../../redux/Role/rolesSlice'
export default function User() {
  const dispatch = useDispatch()
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [idUser, setIdUser] = useState(null)
  const [selectedId, setSelectedId] = useState(null); // State để lưu idUser được chọn
  const [wordSearch, setWordSearch] = useState({
    idUser: '',
    name: '',
    email: '',
    phone: '',
    idRole: ''
  })

  const users = useSelector(state => state.users.users)
  const page = useSelector(state => state.users.page)
  const totalPage = useSelector(state => state.users.totalPage)
  const limit = useSelector(state => state.users.limit)
  const totalUser = useSelector(state => state.users.totalUser)

  const roles = useSelector(state => state.roles.roles)

  const fetchDataUser = async () => {
    let query = `page=${page}&limit=1000`
    const responseUser = await getAllUser(query)
    const responseRole = await getAllRole()
    if (responseUser && responseRole) {
      dispatch(initDataUser(responseUser))
      dispatch(initDataRole(responseRole))
    }
  }

  useEffect(() => {
    fetchDataUser()
  }, [page, dispatch])



  //  handle pagination next page Cart
  const handleNextPageCart = () => {
    if (page < totalPage) {
      dispatch(switchPage(page + 1))
    }
  }

  // handle pagination prev page Cart
  const handlePrevPageCart = useCallback(() => {
    if (page > 1) {
      dispatch(switchPage(page - 1))
    }
  }, [page])

  const handleSelectRow = (id) => {
    setSelectedId(id); // Lưu idUser của dòng được chọn
  };


  const handleSwitchPageEdit = (id) => {
    setShowEdit(true)
    setIdUser(id)
  }

  

  // handle search user
  const handleSearchUser = async (e) => {
    // e.preventDefault()
    // const response = await searchUser(wordSearch.idUser, wordSearch.name, wordSearch.email, wordSearch.phone, wordSearch.idRole)
    // if (response && response.users) {
    //   await fetchUsersWithRoles(response.users);  // Lấy chi tiết role của các user trong kết quả tìm kiếm
    // }
  }

  // handle delete account
  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id)
    if (response) {
      dispatch(deleteUserRedux({id}))
    }
  }

  // switch modal change password
  const switchModalChangePassword = () => {
    if (selectedId) {
      setShowChangePassword(true)
    }
    else {
      alert("Vui lòng chọn tài khoản muốn đổi tài khoản")
    }
  }




  return (
    <div className='px-4 py-2 bg-white product'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h3>User</h3>
          <h6 className='ms-3'>({users.length} user found)</h6>
          <button onClick={() => setShowAdd(true)} type="button" className="btn btn-outline-success ms-3">Tạo người dùng</button>
          <button onClick={() => switchModalChangePassword()} type="button" className="btn btn-outline-success ms-3">Đổi mật khẩu</button>
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

      <form onSubmit={handleSearchUser} className='mt-3 w-100 align-items-center justify-content-between shadow p-3 mb-5 bg-white rounded '>
        {/* Các trường input */}
        <div style={{ width: '100%' }} className='d-flex align-items-center justify-content-between'>

          {/* Id */}
          <div className="d-flex align-items-center" style={{ width: '10%', marginRight: '10px' }}>
            <label className="me-2 col-form-label">Id</label>
            <InputComponent
              onChange={(e) => handleChangeInput(e, setWordSearch)}
              name="idUser"
              type="text"
              className="form-control"
              id="inputId"
            />
          </div>

          {/* Name */}
          <div className="d-flex align-items-center" style={{ width: '20%', marginRight: '10px' }}>
            <label htmlFor="inputName" className="me-2 col-form-label">Name</label>
            <InputComponent
              onChange={(e) => handleChangeInput(e, setWordSearch)}
              name="name"
              type="text"
              className="form-control"
              id="inputName"
            />
          </div>

          {/* Email */}
          <div className="d-flex align-items-center" style={{ width: '25%', marginRight: '10px' }}>
            <label htmlFor="inputEmail" className="me-2 col-form-label">Email</label>
            <InputComponent
              onChange={(e) => handleChangeInput(e, setWordSearch)}
              name="email"
              type="text"
              className="form-control"
              id="inputEmail"
            />
          </div>

          {/* Phone */}
          <div className="d-flex align-items-center" style={{ width: '20%', marginRight: '10px' }}>
            <label htmlFor="inputPhone" className="me-2 col-form-label">Phone</label>
            <InputComponent
              onChange={(e) => handleChangeInput(e, setWordSearch)}
              name="phone"
              type="text"
              className="form-control"
              id="inputPhone"
            />
          </div>

          {/* Role */}
          <div className="d-flex align-items-center" style={{ width: '15%' }}>
            <label htmlFor="inputRole" className="me-2 col-form-label">Role</label>
            <select className='form-control' name="idRole" onChange={(e) => handleChangeInput(e, setWordSearch)}
            >
              <option value="-1">Chọn quyền</option>
              {roles.length > 0 ? (
                roles.map((role, index) => (
                  <option key={index} value={role.idRole}>{role.name}</option>
                ))
              ) : <option>Hiện tại chưa có quyền</option>}
            </select>
          </div>

        </div>

        {/* Nút Submit */}
        <div className="mt-3 text-center">
          <button type="submit" className="btn btn-primary">Tìm kiếm</button>
        </div>
      </form>



      {users.length > 0 ? (

        <table style={{ width: '100%', backgroundColor: 'white', marginTop: '30px' }} cellspacing="0" cellpading="10">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th className='text-center'>Email</th>
              {/* <th className='text-center'>Password</th> */}
              <th className='text-center'>Address</th>
              <th className='text-center'>Phone</th>
              <th className='text-center'>Date Of Birth</th>
              <th className='text-center'>Sex</th>
              <th className='text-center'>Avatar</th>
              <th className='text-center'>Role</th>
              <th className='text-center' colSpan='2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}
                style={{
                  backgroundColor: selectedId === user._id ? 'lightblue' : 'white', // Đổi màu nền khi được chọn
                  cursor: 'pointer'
                }}
                onClick={() => handleSelectRow(user._id)} // Sự kiện click để chọn user
              >

                <td style={{ width: '4%' }}>{user._id}</td>
                <td style={{ width: '8%' }}>{user.name}</td>

                <td style={{ width: '15%' }} className='text-center'>{user.email}</td>
                {/* <td style={{ width: '5%' }} className='text-center'>{user.password}</td> */}
                <td style={{ width: '15%' }} className='text-center'>{user.address}</td>
                <td className='text-center' style={{ width: '15%' }}>{user.phone}</td>
                <td className='text-center' style={{ width: '10%' }}>{user.date_of_birth}</td>
                <td className='text-center' style={{ width: '5%' }}>{user.sex}</td>
                <td className='text-center'>
                  {user.avatar != "" ? (
                    <ImageComponent
                      src={user.avatar} alt=""
                      width="70px"
                      height="50px"
                      borderRadius="5px"
                    />
                  ) :
                    <p>null</p>
                  }
                </td>

                <td key={index} className='text-center' >{user.role.name}</td>

                <td style={{ width: '6%' }} className='text-center'>
                  <button
                    onClick={() => handleSwitchPageEdit(user._id)}
                    type="button"
                    className="btn btn-outline-primary">
                    Edit
                  </button>
                </td>
                <td style={{ width: '6%' }} className='text-center'>
                  <button onClick={() => handleDeleteUser(user._id)} type="button" className="btn btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))}


          </tbody>
        </table>
      ) :
        <div className='text-center'>
          <img src="https://tse3.mm.bing.net/th?id=OIP.-CiVIfCy46VrgitiIjfahwAAAA&pid=Api&P=0&h=180" alt="" />
          <h2>Không có nhân viên mà bạn muốn tìm kiếm</h2>
        </div>}
      <AddUser show={showAdd} close={() => setShowAdd(false)} />
      <EditUser show={showEdit} close={() => setShowEdit(false)} idUser={idUser}  />
      <ChangePassword show={showChangePassword} close={() => setShowChangePassword(false)} idUser={selectedId} />
    </div>
  )
}
