import React, { useEffect, useState } from 'react';
import { detailOrder } from '../../../../services/OrderService';
import { confirmOrder } from '../../../../services/OrderService';
import { useSelector, useDispatch } from 'react-redux';
import { confirmOrderRedux } from '../../../../redux/Order/ordersSlice';
export default function DetailOrder({ show, close, data }) {
    const dispatch = useDispatch()
    const statuss = useSelector(state => state?.statuss?.data)
    const [status, setStatus] = useState('')
    const { isAuhenticated, userData } = useSelector((state) => state.auth);
    const totalPrice = data?.orderDetails.reduce((sum, order) => {
        return sum + order?.quantity * order?.attribute?.priceBought
    }, 0)

    useEffect(() => {
        setStatus(data?.status?._id)
    }, [data])

    const handleConfirmOrder = async () => {
        if (data) {
            if (window.confirm("Xác nhận đơn hàng?")) {
                const response = await confirmOrder(data?._id, {
                    status: status,
                    staff: userData.dataLogin.idUser
                })
                if(response && response.status === 200)
                {
                    dispatch(confirmOrderRedux({
                        idOrder : data?._id,
                        status : status
                    }))
                }
            }
        }
    }
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}  modal-display`} tabIndex="-1">
            <div className="detail_order px-2 py-3">
                <div className='d-flex align-items-center justify-content-around '>
                    <div className="row col-3">
                        <div className='d-flex align-items-center'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Customer :</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif" }}>{data?.user?.name}</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Created :</p>
                            <p
                                style={{ fontFamily: "Times New Roman, Times, serif" }}>{new Date(data?.createdAt).toLocaleString('vi-VN')}</p>
                        </div>
                    </div>
                    <div className='row col-4'>
                        <div className='d-flex align-items-center'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Phone</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif" }}>{data?.phone}</p>
                        </div>
                        <div className='d-flex'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px', }} className='px-2'>Address</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif", maxWidth: '80%', wordWrap: "break-word", }}>{data?.address}</p>
                        </div>
                    </div>
                    <div className='row col-5'>
                        <div className='d-flex'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Voucher:</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif" }}>
                                {data?.voucher !== null ? data?.voucher?.description : "Không"}
                            </p>
                        </div>
                        <div className='d-flex'>
                            <p style={{ fontFamily: "Verdana, sans-serif", fontSize: '14px' }} className='px-2'>Payment Method:</p>
                            <p style={{ fontFamily: "Times New Roman, Times, serif" }}>
                                {data?.paymentMethod?.name}
                            </p>
                        </div>
                    </div>


                </div>
                <table className="table caption-top">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Size</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.orderDetails && data?.orderDetails?.length > 0 && data?.orderDetails?.map((order, index) => (
                            <tr key={index}>
                                <th style={{ verticalAlign: 'middle' }} scope="row" className="table-cell">{index + 1}</th>
                                <td>
                                    {/* <img className='me-2' width="60px" src={order?.attribute?.product?.image} alt="" /> */}
                                    {order?.attribute?.product?.name}
                                </td>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <span
                                        name="quantity">
                                        {order?.attribute?.size?.name}
                                    </span>

                                </td>
                                <td style={{ verticalAlign: 'middle' }}>

                                    <span
                                        name="quantity">
                                        {order.quantity}
                                    </span>

                                </td>
                                <td style={{ verticalAlign: 'middle' }}>{order.attribute.priceBought}</td>
                                <td style={{ verticalAlign: 'middle' }}>{order.attribute.priceBought * order.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='d-flex justify-content-end '>
                    <div className='d-flex align-items-center'>
                        <p className='me-1'>Total : </p>
                        <p>
                            {data && (totalPrice).toLocaleString('vi-VN')}đ
                        </p>
                    </div>
                </div>
                <div className='d-flex justify-content-end py-1 border-bottom'>
                    <div className='d-flex align-items-center'>
                        <p className='me-1'>Voucher : </p>
                        <p>{data?.voucher !== null ? data?.voucher?.discountVoucher : 0}%</p>
                    </div>
                </div>
                <div className='d-flex justify-content-end py-1'>
                    <div className='d-flex align-items-center'>
                        <p className='me-1'>TotalPrice : </p>
                        <p>
                            {data?.voucher !== null ?
                                (totalPrice * (1 - data?.voucher?.discountVoucher)).toLocaleString('vi-VN') : totalPrice.toLocaleString('vi-VN') + "đ"
                            }
                        </p>
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <button onClick={() => close()} className='btn btn-secondary'>Close</button>
                    <div className='d-flex'>
                        <select
                            className='form-control me-2'
                            name="statusOrder"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {statuss && statuss?.length > 0 && statuss?.map((status, index) => (
                                <option
                                    selected={status === status?._id}
                                    value={status?._id}
                                >
                                    {status?.name}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => handleConfirmOrder()} className='btn btn-primary'>Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
