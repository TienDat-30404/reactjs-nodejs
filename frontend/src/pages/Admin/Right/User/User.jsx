import React, { useCallback, useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { getAllUser } from '../../../../services/UserService'
import AddUser from './AddUser'
import { deleteUser } from '../../../../services/UserService'
import EditUser from './EditUser'
export default function User() {
  const [users, setUsers] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [idUser, setIdUser] = useState(null)
  // get ALl User 
  const fetchDatasUser = async () => {
    const [allUser] = await Promise.all([
      getAllUser()
    ]);
    setUsers(allUser);
  };

  const handleSwitchPageEdit = (id) => {
    setShowEdit(true)
    setIdUser(id)
  }

  // handle display account immediately after add account
  const handleAddUser = () => {
    fetchDatasUser(); 
  };

  // handle delete account
  const handleDeleteUser = async(id) => {
    const response = await deleteUser(id)
  }
  
  useEffect(() => {
    fetchDatasUser();
  }, [handleDeleteUser]);


  return (
    <div className='px-4 py-2 bg-white product'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h3>User</h3>
          <h6 className='ms-3'>({users.length} user found)</h6>
          <button onClick={() => setShowAdd(true)} type="button" className="btn btn-outline-success ms-3">Tạo người dùng</button>
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
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
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
                <td className='text-center' >{user.idRole}</td>

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
            ))
          ) :
            <div className="loading">
              <div className="spinner"></div>
            </div>
          }

        </tbody>
      </table>
      <AddUser show={showAdd} close={() => setShowAdd(false)} onSuccess={handleAddUser} />
      <EditUser show={showEdit} close={() => setShowEdit(false)} idUser = {idUser} />
    </div>
  )
}
