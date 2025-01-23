import React, { Fragment, useEffect, useState, useRef } from 'react'
import ImageComponent from '../../../../components/ImageComponent'
import DetailOrder from './DetailOrder'
import { handleChangeInput } from '../../../../until/function'
import { useSelector, useDispatch } from 'react-redux'
import { visiblePagination } from '../../../../until/function'
import { getAllOrder } from '../../../../services/OrderService'
import { getAllStatus } from '../../../../services/StatusService'
import { initDataOrder, switchPage } from '../../../../redux/Order/ordersSlice'
import { initDataStatus } from '../../../../redux/Status/statusSlice'
import Pagination from '../../../../components/Pagination'
export default function Product() {
  const dispatch = useDispatch()
  const orders = useSelector(state => state?.orders?.data)
  const page = useSelector(state => state?.orders?.page)
  const totalPage = useSelector(state => state?.orders?.totalPage)
  const totalOrder = useSelector(state => state?.orders?.totalOrder)
  let limit = useSelector(state => state?.orders?.limit)

  const [showAddModal, setShowAddModal] = useState(false)
  const statuss = useSelector(state => state.statuss.data)
  const [showEdit, setShowEdit] = useState(false)
  const [selectedDetailOrder, setSelectedDetailOrder] = useState(null);
  const tableRef = useRef();
  const [displayTextSearch, setDisplayTextSearch] = useState('idOrder')
  const [searchCriteria, setSearchCriteria] = useState({
    idOrder: '',
    status: '',

  })


  useEffect(() => {
    const fetchData = async () => {

      try {
        let query = `page=${page}&limit=${limit}`
        if (searchCriteria.idOrder != "") {
          query += `&idOrder=${searchCriteria.idOrder}`
        }
        if (searchCriteria.status != "") {
          query += `&status=${searchCriteria.status}`
        }
        // if (searchCriteria.email != "") {
        //   query += `&email=${searchCriteria.email}`
        // }
        // if (searchCriteria.userName != "") {
        //   query += `&userName=${searchCriteria.userName}`
        // }
        // if (searchCriteria.role != "") {
        //   query += `&role=${searchCriteria.role}`
        // }

        let [responseOrder, responseStatus] = await Promise.all(
          [
            getAllOrder(query),
            getAllStatus()
          ])
        if (responseOrder && responseOrder.status === 200) {
          dispatch(initDataOrder(responseOrder))
        }
        if (responseStatus && responseStatus.status === 200) {
          dispatch(initDataStatus(responseStatus))
        }
      }
      catch (error) {
        console.log("Fail when get orders to display")
      }
    }
    fetchData()
  }, [page, limit, searchCriteria, displayTextSearch])

  const handleSwitchDetailOrder = (data) => {
    setShowEdit(true)
    setSelectedDetailOrder(data)
  }
  const handlePagination = (page) => {
    dispatch(switchPage(page))
  }


  // handle delete product
  const handleDeleteUser = async (id) => {
    // const response = await deleteUser(id)
    // console.log(response)
    // if (response && response?.status === 200) {
    //   dispatch(deleteUserRedux(id))
    //   if (users.length === 1) {
    //     dispatch(switchPage(page - 1))
    //   }
    // }
  }

  const handleChangeSearchSelect = (e) => {
    setSearchCriteria({
      idOrder: '',
      status : ''
    })
    setDisplayTextSearch("")
    setDisplayTextSearch(e.target.value)
    dispatch(switchPage(1))
  }


  return (
    <div className='px-4 py-2 bg-white product'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <h3>Order</h3>
          <h6 className='ms-3'>({totalOrder} order found)</h6>
          {/* <button onClick={() => setShowAddModal(true)} type="button" className="btn btn-outline-success ms-3">Tạo tài khoản</button> */}

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
        <option value="idOrder" selected>Tìm kiếm theo idOrder</option>
        <option value="status">Tìm kiếm theo trạng thái đơn hàng</option>
        {/* <option value="email">Tìm kiếm theo email</option>
        <option value="role">Tìm kiếm theo quyền</option>
        <option value="phone">Tìm kiếm theo số điện thoại</option> */}
      </select>

      {displayTextSearch != 'status' ? (
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
      ) :
        <div>
          <select
            name={displayTextSearch}
            value={searchCriteria[`${displayTextSearch}`]}
            class="form-select"
            onChange={(e) => {
              handleChangeInput(e, setSearchCriteria);
              // dispatch(switchPage(1))
            }}
          >
            {statuss && statuss?.length > 0 ? (
              statuss?.map((status, index) => (
                <option key={index} value={status._id}>{status.name}</option>
              )
              )) :
              <option value="" selected>Không tồn tại trạng thái đơn hàng</option>
            }
          </select>
        </div>
      }



      <table className='table' ref={tableRef} >
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Involed Personal</th>
            <th scope="col">TotalPrice</th>
            <th scope="col">Voucher</th>
            <th scope="col">Contact Info</th>
            <th scope="col">PaymentMethod</th>
            <th scope="col">Status</th>
            <th scope="col">Timestamps</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders?.length > 0 ? (
            orders?.map((order, index) => (
              <tr key={index}>
                <th scope="row">{(order?._id)?.slice(0, 7)}...</th>

                <td>
                  <div className='d-flex'>
                    <strong>User: </strong>
                    <p className='px-1'>{order?.user?.name}</p>
                  </div>
                  <div className='d-flex'>
                    <strong>Staff:</strong>
                    <p className='px-1'>{order?.staff === null ? "null" : order?.staff?.name}</p>
                  </div>
                </td>


                <td>{order?.totalPrice}</td>

                <td>{order?.voucher === null ? "null" : order?.voucher?.discountVoucher}</td>
                <td>
                  <strong>Phone:</strong> {order?.phone}<br />
                  <strong>Address:</strong> {order?.address}
                </td>

                <td>{order?.paymentMethod?.name}</td>
                <td>{order?.status?.name}</td>


                <td>
                  <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString('vi-VN') || 'N/A'}<br />
                  <strong>Updated At:</strong> {new Date(order?.updatedAt).toLocaleString('vi-VN') || 'N/A'}
                </td>
                <td style={{ width: '6%' }} className='text-center'>
                  <button
                    onClick={() => handleSwitchDetailOrder(order)}
                    type="button"
                    className="btn btn-outline-primary">
                    Detail
                  </button>
                </td>
              </tr>
            ))
          ) : <p>Không có đơn hàng tồn tại</p>}

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

      {/* <AddUser show={showAddModal} close={() => setShowAddModal(false)} />
      <ChangePassword show={showChangePassword} close={() => setShowChangePassword(false)} data={selectedChangePassword} /> */}
      <DetailOrder show={showEdit} close={() => setShowEdit(false)} data={selectedDetailOrder} />

    </div>
  )
}
