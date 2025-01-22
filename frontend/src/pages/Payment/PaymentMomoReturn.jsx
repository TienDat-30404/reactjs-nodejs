import React, { useState, useEffect } from 'react'
import Loading from '../../components/Loading';
import moment from 'moment'
import { addOrder } from '../../services/OrderService';
import { checkTransactionMomo, paymentByMomo } from '../../services/PaymentService';
export default function PaymentMomoReturn() {
  const [result, setResult] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  let params
  let orderId;
  if (window.location.search) {
    params = new URLSearchParams(window.location.search);
    orderId = params.get('orderId')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await checkTransactionMomo({ orderId })
        const informations = localStorage.getItem('informationPayment');
        const parsedInfo = informations ? JSON.parse(informations) : null;

        if (response && informations && response?.result?.resultCode === 0) {
          await addOrder(parsedInfo)
          localStorage.removeItem('informationPayment')
        }
        setResult(response.result)
      }
      catch (err) {
        console.log("Lỗi giao dịch", err)
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [orderId])

  if (isLoading) {
    return <Loading />
  }
  return (
    <div style={{ height: '100vh' }} className='bg-white d-flex justify-content-center align-items-center'>
      {result?.resultCode === 0 ? (

        <div style={{ width: '500px' }} class=" py-5 text-center" >
          <img style={{ width: '120px' }} src="https://static.vecteezy.com/system/resources/previews/009/362/934/original/tick-icon-accept-approve-sign-design-free-png.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class={`card-title text-success text-uppercase mt-3`}>Thanh toán thành công</h5>
            <div className='d-flex align-items-center justify-content-center mt-2'>
              <p class="card-text me-1">Mã đơn : </p>
              <p
                style={{ fontFamily: 'Roboto, sans-serif' }}
                className='fw-bolder'>
                {result?.orderId}
              </p>
            </div>
            <div className='d-flex align-items-center justify-content-center mt-2'>
              <p className='me-1'>Tổng tiền : </p>
              <p
                style={{ fontFamily: 'Roboto, sans-serif' }}
                className='fw-bold'>
                {(result?.amount).toLocaleString('vi-VN')}
              </p>
            </div>
            {/* <div className='d-flex align-items-center justify-content-center mt-2'>
              <p className='me-1'>Nội dung thanh toán : </p>
              <p
                style={{ fontFamily: 'Roboto, sans-serif' }}
                className='fw-bold'>
                {decodeURIComponent(result?.content).replace(/\+/g, ' ')}
              </p>
            </div> */}
            <div className='d-flex align-items-center justify-content-center mt-2'>
              <p className='me-1'>Thời gian thanh toán : </p>
              <p
                style={{ fontFamily: 'Roboto, sans-serif' }}
                className='fw-bold'>
                {moment(result?.responseTime).format('YYYY-MM-DD HH:mm:ss')}
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

