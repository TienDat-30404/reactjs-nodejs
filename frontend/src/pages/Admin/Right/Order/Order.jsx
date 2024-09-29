import React, { useEffect, useState } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import { searchUser } from '../../../../services/UserService'
import AddUser from './AddUser'
import ChangePassword from './ChangePassword'
import { deleteUser } from '../../../../services/UserService'
import EditUser from './EditUser'
import { InputComponent } from '../../../../components/InputComponent'
import { handleChangeInput } from '../../../../until/function'
import { getDetailUser } from '../../../../services/UserService'
import { getAllOrder } from '../../../../services/OrderService'
import DetailOrder from './DetailOrder'
export default function Order() {
  const [orders, setOrders] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [idUser, setIdUser] = useState(null)
  const [idOrder, setIdOrder] = useState(null)
  const [isStatus, setIsStatus] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [nameCustomer, setNameCustomer] = useState(null)
  const [roles, setRoles] = useState([])
  const [selectedId, setSelectedId] = useState(null); // State để lưu idUser được chọn
  const [wordSearch, setWordSearch] = useState({
    idUser: '',
    name: '',
    email: '',
    phone: '',
    idRole: ''
  })

  // Fetch all order
  const fetchDatasOrder = async () => {
    const allOrder = await getAllOrder()
    getNameWithOrder(allOrder.orders)
  }

  const getNameWithOrder = async (listOrder) => {
    const orders = await Promise.all(
      listOrder.map(async (item) => {
        const nameCustomerResponse = await getDetailUser(item.idUser)
        const nameCustomer = nameCustomerResponse.detailUser.name
        let nameStaff
        if (item.idStaff !== null) {
          const nameStaffResponse = await getDetailUser(item.idStaff)
          nameStaff = nameStaffResponse.detailUser.name
        }
        else {
          nameStaff = null;
        }
        return { ...item, nameCustomer, nameStaff }
      })
    )
    setOrders(orders)
  }



  const handleSelectRow = (id) => {
    setSelectedId(id); // Lưu idUser của dòng được chọn
  };



  const handleSwitchPageEdit = (id) => {
    setShowEdit(true)
    setIdUser(id)
  }

  const handleSwitchPageDetailOrder = (idOrder, nameCustomer, isStatus, dateCreated) => {
    setShowDetail(true)
    setIdOrder(idOrder)
    setNameCustomer(nameCustomer)
    setIsStatus(isStatus)
    setCreatedAt(dateCreated)

  }

  // handle display account immediately after add account
  const handleAddUser = () => {
    fetchDatasOrder();
  };

  // handle search user
  const handleSearchUser = async (e) => {
    e.preventDefault()
    const response = await searchUser(wordSearch.idUser, wordSearch.name, wordSearch.email, wordSearch.phone, wordSearch.idRole)
  }

  // handle delete account
  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id)
    if (response.message == "Delete Successfully") {
      setOrders(prevUsers => prevUsers.filter(user => user.idUser !== id));
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
  console.log(orders)
  useEffect(() => {
    fetchDatasOrder();
  }, []);


  return (
    <div className='px-4 py-2 bg-white product'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h3>Order</h3>
          <h6 className='ms-3'>({orders.length} order found)</h6>
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



      {orders.length > 0 ? (

        <table style={{ width: '100%', backgroundColor: 'white', marginTop: '30px' }} cellspacing="0" cellpading="10">
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer</th>
              <th className='text-center'>Staff</th>
              <th className='text-center'>TotalPrice</th>
              <th className='text-center'>Phone</th>
              <th className='text-center'>Address</th>
              <th className='text-center'>PaymentMethod</th>
              <th className='text-center'>BankAccount</th>
              <th className='text-center'>Detail Order</th>
              <th className='text-center' colSpan='2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}
                style={{
                  backgroundColor: selectedId === order.idOrder ? 'lightblue' : 'white', // Đổi màu nền khi được chọn
                  cursor: 'pointer'
                }}
                onClick={() => handleSelectRow(order.idOrder)} // Sự kiện click để chọn user
              >

                <td style={{ width: '4%' }}>{order.idOrder}</td>
                <td style={{ width: '10%' }}>{order.nameCustomer}</td>
                <td className='text-center' style={{ width: '10%' }}>
                  {order.idStaff === null ? (
                    "Chưa xác nhận"
                  ) : order.nameStaff}
                </td>

                <td style={{ width: '10%' }} className='text-center'>{(order.totalPrice).toLocaleString('vi-VN')}</td>
                <td style={{ width: '8%' }} className='text-center'>{order.phone}</td>
                <td className='text-center' style={{ width: '15%' }}>{order.address}</td>
                <td className='text-center' style={{ width: '10%' }}>{order.paymentMethod}</td>
                <td className='text-center' style={{ width: '10%' }}>
                  {order.bankAccount ? (
                    order.bankAccount
                  ) : null}
                </td>

                <td style={{ width: '6%' }} className='text-center'>
                  <button
                    onClick={() => handleSwitchPageDetailOrder(order.idOrder, order.nameCustomer, order.isStatus, order.createdAt)}
                    type="button"
                    className="btn btn-outline-primary">
                    Detail
                  </button>
                </td>

                <td style={{ width: '6%' }} className='text-center'>
                  <button
                    onClick={() => handleSwitchPageEdit(order.idOrder)}
                    type="button"
                    className="btn btn-outline-primary">
                    Edit
                  </button>
                </td>
                <td style={{ width: '6%' }} className='text-center'>
                  <button onClick={() => handleDeleteUser(order.idOrder)} type="button" className="btn btn-outline-danger">Delete</button>
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
      <EditUser show={showEdit} close={() => setShowEdit(false)} idUser={idUser} onSuccess={fetchDatasOrder} />
      <DetailOrder show={showDetail} close={() => setShowDetail(false)} idOrder={idOrder} onSuccess={fetchDatasOrder} nameCustomer={nameCustomer} isStatus={isStatus} createdAt = {createdAt} />
      <ChangePassword show={showChangePassword} close={() => setShowChangePassword(false)} idUser={selectedId} />
    </div>
  )
}
