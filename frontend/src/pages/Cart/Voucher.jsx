import React, { useEffect, useState } from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';
import { getVoucherOfUser } from '../../services/VoucherService';
import { useSelector, useDispatch } from 'react-redux'
import { applyVoucher, initDataVoucher } from '../../redux/Voucher/vouchersSlice';
import '../../public/css/modal.css'
import { toast, ToastContainer } from 'react-toastify';

function Voucher(cartsCheck) {
  const [showModal, setShowModal] = useState(false);
  const [checkVoucher, setCheckVoucher] = useState({})
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  
  const dispatch = useDispatch()
  const vouchers = useSelector(state => state.vouchers.vouchers)
  const limit = useSelector(state => state.vouchers.limit)
  useEffect(() => {
    const fetchData = async () => {
      let query = `limit=${limit}`
      const response = await getVoucherOfUser(query)
      if (response && response.status === 200) {
        dispatch(initDataVoucher(response))
      }
    }
    fetchData()
  })

  const handleApplyVoucher = () => {
    if (checkVoucher) {
      dispatch(applyVoucher(checkVoucher))
      handleClose()
    }
  }
  return (
    <div>
      <Button variant="primary" onClick={handleShow} disabled={cartsCheck?.cartsCheck.length === 0}>
        Áp dụng voucher
      </Button>

      <Modal show={showModal} onHide={handleClose} className="modal-wide">
        <Modal.Header closeButton>
          <Modal.Title>Áp dụng Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {vouchers && vouchers?.length > 0 ? (
            vouchers.map((voucher, index) => (
              <div className="card p-2 mb-3" key={index}>
                <div className='d-flex align-items-center '>
                  <input checked={voucher._id === checkVoucher._id} onChange={() => setCheckVoucher(voucher)} type='checkbox' className='me-3' />
                  <img style={{ width: '100px' }} src="https://images.bloggiamgia.vn/full/09-02-2023/ma-giam-gia-shopee-1675907000385.png" className="card-img-top" alt="..." />
                  <div className="ms-3">
                    <p className="card-text">
                      {voucher.description}
                    </p>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleApplyVoucher()}>
            Áp dụng
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Voucher;
