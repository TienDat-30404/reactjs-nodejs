import React, { useCallback, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { getAllUser, searchUser } from '../../../../services/UserService'
import AddUser from './AddUser'
import ChangePassword from './ChangePassword'
import { deleteUser } from '../../../../services/UserService'
import EditUser from './EditUser'
import { getDetailRole } from '../../../../services/RoleService'
import { InputComponent } from '../../../../components/InputComponent'
import { getAllRole } from '../../../../services/RoleService'
export default function User() {
  const [users, setUsers] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [idUser, setIdUser] = useState(null)
  const [roles, setRoles] = useState([])
  const [selectedId, setSelectedId] = useState(null); // State để lưu idUser được chọn
  const [wordSearch, setWordSearch] = useState({
    idUser: '',
    name: '',
    email: '',
    phone: '',
    idRole: ''
  })

  // Fetch all users
  const fetchDatasUser = async () => {
    const allUser = await getAllUser()
    await fetchUsersWithRoles(allUser)
  }

  // Fetch users with roles
  const fetchUsersWithRoles = async (usersList) => {
    const nameRoleUser = await Promise.all(
      usersList.map(async (item) => {
        const user = await getDetailRole(item.idRole)
        return { ...item, user }
      })
    )
    setUsers(nameRoleUser)
  }

  // get all role
  useEffect(() => {
    const fetchDatasRole = async () => {
      const response = await getAllRole();
      setRoles(response.roles)
    }
    fetchDatasRole()
  }, [])

  const handleSelectRow = (id) => {
    setSelectedId(id); // Lưu idUser của dòng được chọn
  };



  const handleSwitchPageEdit = (id) => {
    setShowEdit(true)
    setIdUser(id)
  }

  // handle display account immediately after add account
  const handleAddUser = () => {
    fetchDatasUser();
  };

  // handle search user
  const handleSearchUser = async (e) => {
    e.preventDefault()
    const response = await searchUser(wordSearch.idUser, wordSearch.name, wordSearch.email, wordSearch.phone, wordSearch.idRole)
    if (response && response.users) {
      await fetchUsersWithRoles(response.users);  // Lấy chi tiết role của các user trong kết quả tìm kiếm
    }
  }
  console.log(users)

  // handle delete account
  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id)
    if (response.message == "Delete Successfully") {
      setUsers(prevUsers => prevUsers.filter(user => user.idUser !== id));
    }
  }

  // switch modal change password
  const switchModalChangePassword = () => {
    if(selectedId)
    {
      setShowChangePassword(true)
    }
    else 
    {
      alert("Vui lòng chọn tài khoản muốn đổi tài khoản")
    }
  }

  useEffect(() => {
    fetchDatasUser();
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setWordSearch(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));

  };


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
            <label htmlFor="inputId" className="me-2 col-form-label">Id</label>
            <InputComponent
              onChange={handleChangeInput}
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
              onChange={handleChangeInput}
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
              onChange={handleChangeInput}
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
              onChange={handleChangeInput}
              name="phone"
              type="text"
              className="form-control"
              id="inputPhone"
            />
          </div>

          {/* Role */}
          <div className="d-flex align-items-center" style={{ width: '15%' }}>
            <label htmlFor="inputRole" className="me-2 col-form-label">Role</label>
            <select className='form-control' name="idRole" onChange={handleChangeInput}
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
                  backgroundColor: selectedId === user.idUser ? 'lightblue' : 'white', // Đổi màu nền khi được chọn
                  cursor: 'pointer'
                }}
                onClick={() => handleSelectRow(user.idUser)} // Sự kiện click để chọn user
              >

                <td style={{ width: '4%' }}>{user.idUser}</td>
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

                <td key={index} className='text-center' >{user.user.detailRole.name}</td>

                <td style={{ width: '6%' }} className='text-center'>
                  <button
                    onClick={() => handleSwitchPageEdit(user.idUser)}
                    type="button"
                    className="btn btn-outline-primary">
                    Edit
                  </button>
                </td>
                <td style={{ width: '6%' }} className='text-center'>
                  <button onClick={() => handleDeleteUser(user.idUser)} type="button" className="btn btn-outline-danger">Delete</button>
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
      <AddUser show={showAdd} close={() => setShowAdd(false)} onSuccess={handleAddUser} />
      <EditUser show={showEdit} close={() => setShowEdit(false)} idUser={idUser} onSuccess={fetchDatasUser} />
      <ChangePassword show={showChangePassword} close={() => setShowChangePassword(false)} idUser={selectedId} />
    </div>
  )
}
