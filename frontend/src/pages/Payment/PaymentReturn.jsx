import React, { useState, useEffect } from 'react'
import { paymentVpnReturnService } from '../../services/PaymentService';

import moment from 'moment'
import { addOrder } from '../../services/OrderService';
export default function PaymentReturn() {
  const [result, setResult] = useState({})
  let params
  let secureHash;
  if (window.location.search) {
    params = new URLSearchParams(window.location.search);
    secureHash = params.get('vnp_SecureHash');
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await paymentVpnReturnService(params)
      if (response && response?.status === 200 && response?.statusTransaction === "00") {
        const informations = JSON.parse(localStorage.getItem('informationPayment'))
        await addOrder(informations)
      }
      setResult(response)
      localStorage.removeItem('informationPayment')
      
    }
    fetchData()
  }, [])

  return (
    <div style={{ height: '100vh' }} className='bg-white d-flex justify-content-center align-items-center'>
      {result?.statusTransaction === "00" ? (

        <div style={{ width: '500px' }} class=" py-5 text-center" >
          <img style={{ width: '120px' }} src="https://static.vecteezy.com/system/resources/previews/009/362/934/original/tick-icon-accept-approve-sign-design-free-png.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class={`card-title text-success text-uppercase mt-3`}>Thanh toán thành công</h5>
            <div className='d-flex align-items-center justify-content-center mt-2'>
              <p class="card-text me-1">Mã đơn : </p>
              <p
                style={{ fontFamily: 'Roboto, sans-serif' }}
                className='fw-bolder'>
                {result?.paymentReferenceId}
              </p>
            </div>
            <div className='d-flex align-items-center justify-content-center mt-2'>
              <p className='me-1'>Tổng tiền : </p>
              <p
                style={{ fontFamily: 'Roboto, sans-serif' }}
                className='fw-bold'>
                {(result?.totalPrice / 100).toLocaleString('vi-VN')}
              </p>
            </div>
            <div className='d-flex align-items-center justify-content-center mt-2'>
              <p className='me-1'>Nội dung thanh toán : </p>
              <p
                style={{ fontFamily: 'Roboto, sans-serif' }}
                className='fw-bold'>
                {decodeURIComponent(result?.content).replace(/\+/g, ' ')}
              </p>
            </div>
            <div className='d-flex align-items-center justify-content-center mt-2'>
              <p className='me-1'>Thời gian thanh toán : </p>
              <p
                style={{ fontFamily: 'Roboto, sans-serif' }}
                className='fw-bold'>
                {moment(result?.createdAt, "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm:ss")}
              </p>
            </div>
            <a href="http://localhost:3000" class="btn btn-primary mt-3">Quay về trang chủ</a>
          </div>
        </div>
      ) :
        <div style={{ width: '400px' }} class=" py-5 text-center" >
          <img style={{ width: '120px' }} src="https://tse2.mm.bing.net/th?id=OIP.2DsT9kz1pM-5dum3u5-rowAAAA&pid=Api&P=0&h=180" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class={`card-title text-danger text-uppercase mt-3`}>Thanh toán thất bại</h5>
            <a href="http://localhost:3000" class="btn btn-primary mt-3">Quay về trang chủ</a>
          </div>
        </div>
      }
    </div>

  )
}
