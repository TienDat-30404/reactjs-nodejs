import React, { useState } from 'react';
import { InputComponent, ErrorMessageInput } from '../../components/InputComponent';
import { setCookieForToken, useSaveTokenOnRedux } from '../../until/tokenUser';
import { jwtDecode } from 'jwt-decode';
import { loginService } from '../../services/UserService';
function LoginModal({ show, handleClose, switchSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dataLogin = { email, password }
  const [errors, setErrors] = useState({})
  const saveTokenOnRedux = useSaveTokenOnRedux();
  const handleClickLogin = async () => {
    try {
      const userData = await loginService(dataLogin)
      console.log(userData)
      if (userData.errors) {
        setErrors(userData.errors)  
        return
      }
      else {
        setErrors({})
        setEmail('')
        setPassword('')
        handleClose()
        alert("Đăng nhập thành công")
        setCookieForToken(userData.token)
        saveTokenOnRedux(jwtDecode(userData.token))
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleCloseModal = () => {
    setEmail('')
    setPassword('')
    setErrors({})
    handleClose()
  }
  return (
    <div className={`modal bg- ${show ? 'd-block' : 'd-none'}  modal-display`} >
      <div className='modal_base'>
        <div className='page_access-shop'>
          <div style={{ width: '50%' }} className=''>
            <img width="100%" height="100%" src="https://images.pexels.com/photos/4321802/pexels-photo-4321802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          </div>
          <div style={{ width: '50%' }} className='m-3'>
            <i onClick={handleCloseModal} className="bi bi-x-lg icon_close"></i>
            <h3 className='fw-bold'>Hello, </h3>
            <h3 className='fw-bold'>Welcome Back </h3>
            <div className='mb-2'>
              <label htmlFor="inputPassword5" className="form-label">Email</label>
              <InputComponent
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <ErrorMessageInput errors={errors} field="email" />}
            </div>
            <div>
              <label htmlFor="inputPassword5" className="form-label">Password</label>
              <InputComponent
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
              {errors.password && <ErrorMessageInput errors={errors} field="password" />}
            </div>
            <div className='mt-3 d-flex align-items-center justify-content-between'>
              <div className='d-flex r align-items-center'>
                <input type="checkbox" />
                <h6 className='mb-1 ms-2 text_remerber-password'>Remember Me</h6>
              </div>
              <a style={{ fontSize: '14px' }} href="">Forgot Password?</a>
            </div>
            <button onClick={handleClickLogin} type="button" className="btn btn-info text-white w-100 mt-3 fw-bold">Login</button>
            <p className='mt-3 text-center'>Don't Have An Account? <a className='click_switch' onClick={switchSignIn}>Click Here</a></p>
            <div>
              <p className='text-center mt-1'>Hoặc tiếp tục bằng</p>
              <div className='d-flex justify-content-center mt-2'>
                <a href="">
                  <img className='me-2' width="40px" src="https://tse1.mm.bing.net/th?id=OIP.flV_HAhkgpxUwwDRW-5p9AHaHa&pid=Api&P=0&h=180" alt="" />
                </a>
                <a href="">
                  <img width="40px" src="https://www.violacreativa.com/images/social/facebook.png" alt="" />
                </a>
              </div>
            </div>
            <p className='text-center mt-2 note_login'>Bằng việc tiếp tục, bạn đã đọc và đồng ý với <a href="">điều khoản sử dụng</a> và <a href="">Chính sách bảo mật thông tin cá nhân</a> của Tiki </p>
          </div>
        </div>

      </div>
    </div>

  );
}

export default LoginModal;