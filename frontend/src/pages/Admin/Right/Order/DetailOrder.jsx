import React, { useEffect, useReducer, useRef, useState } from 'react'
import { detailOrder } from '../../../../services/OrderService'
import { handleChangeInput } from '../../../../until/function';
export default function DetailOrder({ show, close, idOrder, onSuccess, nameCustomer, isStatus, createdAt }) {
    const date = new Date(createdAt);

    const day = date.getUTCDate(); // Lấy ngày
    const month = date.getUTCMonth() + 1; // Lấy tháng (tháng bắt đầu từ 0, nên cộng thêm 1)
    const year = date.getUTCFullYear(); // Lấy năm
    const [orderDetail, setOrderDetail] = useState([])
    const [updateOrder, setUpdateOrder] = useState({
        statusOrder : isStatus,
        quantity : 2,
        totalPrice : 123000
    })
    useEffect(() => {
        const fetchDataOrderDetail = async () => {
            if (idOrder) {
                const responseOrderDetail = await detailOrder(idOrder)
                setOrderDetail(responseOrderDetail.detailOrder)
                console.log(responseOrderDetail)
            }
        }
        fetchDataOrderDetail()
    }, [idOrder])

    console.log(updateOrder)
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            {orderDetail.length > 0 && nameCustomer ? (
                <div className="detail_order px-2 py-3">
                    <div className='d-flex align-items-center justify-content-around'>

                        <div className='d-flex align-items-center'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Customer :</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif" }}>{nameCustomer}</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Date Created :</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif" }}>{day}-{month}-{year}</p>
                        </div>

                        <select onChange={(e) => handleChangeInput(e, setUpdateOrder)} className='form-control' style={{ width: '100px' }} name="statusOrder" id="">
                            <option value="Success">Success</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancel">Cancel</option>
                        </select>
                    </div>
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetail.map((order, index) => (
                                <tr key={index}>
                                    <th style={{ verticalAlign: 'middle' }} scope="row" className="table-cell">{index + 1}</th>
                                    <td>
                                        <img width="60px" src={order.product.image} alt="" />
                                        {order.product.name}
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <button className='hover_quantity-cart'
                                            style={{ border: '1px solid #ccc', padding: '1px 8px' }}
                                        >
                                            -
                                        </button>
                                        <span 
                                            name = "quantity"
                                            onChange={(e) => handleChangeInput(e, setUpdateOrder)}
                                            style={{ border: '1px solid #ccc', padding: '4px' }}>
                                            {order.quantity}
                                        </span>
                                        <button
                                            className='hover_quantity-cart'
                                            style={{ border: '1px solid #ccc', padding: '1px 8px' }}>
                                            +
                                        </button>
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>{order.product.price}</td>
                                    <td style={{ verticalAlign: 'middle' }}>{order.product.price * order.quantity}</td>
                                </tr>
                            ))}


                            <tr>
                                <th colSpan="4" style={{ textAlign: 'right', verticalAlign: 'middle' }}></th>
                                <td style={{ verticalAlign: 'middle', color: 'red', fontWeight: '600' }}>
                                    {orderDetail.reduce((sum, order) => sum + order.quantity * order.product.price, 0)}
                                </td>
                            </tr>   
                        </tbody>
                    </table>
                    <div className='d-flex justify-content-between'>
                        <button onClick={() => close()} className='btn btn-secondary'>Close</button>
                        <button className='btn btn-primary'>Xác nhận</button>
                    </div>
                </div>
            ) : "123"}
        </div>
    )
}
