import React from 'react';
import { useState, useCallback } from 'react';
import { InputComponent } from '../../components/InputComponent';
import { ErrorMessageInput } from '../../components/InputComponent';
import { verifyOtpAgreeCreateAccount } from '../../services/UserService';
import { ToastContainer, toast } from 'react-toastify';
const ModalOtp = React.memo(({ show, close, data, closeAllModals }) => {
  const [otp, setOtp] = useState('')
    const userData = {
    ...data,
    otp
  }
  const handleClickSignIn = useCallback(async () => {
    try {
      const response = await verifyOtpAgreeCreateAccount(userData)
      console.log(response)
      if (response.status == 400) {
        toast.error("Otp không hợp lệ")
        return;
      }
      else {
        toast.success("Đăng ký tài khoản thành công")
        closeAllModals()
      }
    } catch (error) {
      console.error(error)
    }
  }, [userData, closeAllModals])
  // close login modal 
  const handleCloseModal = useCallback(() => {
    setOtp('')
    close();
  }, [close]);
  return (
    <div className={`modal bg- ${show ? 'd-block' : 'd-none'}  modal-display`} >
      <div className='modal_base'>
        <div className='page_access-shop'>
          <div style={{ width: '50%' }} className=''>
            <img width="100%" height="100%" src="https://images.pexels.com/photos/4321802/pexels-photo-4321802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          </div>
          <div style={{ width: '50%' }} className='m-3'>
            <div className='mb-2'>
              <label htmlFor="inputPassword5" className="form-label">Mã OTP</label>
              <InputComponent
                value={otp}
                onChange={e => setOtp(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>


            <button onClick={() => handleClickSignIn()} type="button" className="btn btn-info text-white w-100 mt-3 fw-bold">Xác nhận OTP</button>
            <button onClick={() => handleCloseModal()} type="button" className="btn btn-primary text-white w-100 mt-3 fw-bold">Trở lại</button>
          </div>
        </div>

      </div>
    </div>

  );
})

export default ModalOtp;