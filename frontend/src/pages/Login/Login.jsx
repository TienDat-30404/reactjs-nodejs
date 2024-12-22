import React, { useState, } from 'react';
import { InputComponent, ErrorMessageInput } from '../../components/InputComponent';
import { setCookieForToken } from '../../until/tokenUser';
import { useSaveTokenOnRedux } from '../../until/function';
import { jwtDecode } from 'jwt-decode';
import { loginService, loginGoogle } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function LoginModal({ show, handleClose, switchSignIn }) {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const dataLogin = { userName, password }
  const [errors, setErrors] = useState({})
  const saveTokenOnRedux = useSaveTokenOnRedux();

  const handleLoginGoogle = async (response) => {
    if (response.error) {
      console.error("Login failed:", response.error);
      return;
    }
    const token = response.credential;
    console.log("token", token)

    try {
      const responseAuth = await loginGoogle({
        userName: jwtDecode(token).name,
        email: jwtDecode(token).email,
        name :  jwtDecode(token).name
      })

      const responseUserData = await loginService({
        userName: jwtDecode(token).name
      })
      console.log("responseUserData", responseUserData)
      toast.success("Đăng nhập thành công")
      setCookieForToken(responseUserData.token)
      saveTokenOnRedux(jwtDecode(responseUserData.token))
      navigate('/')

    } catch (err) {
      console.error("Error when login from google", err);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
  };


  const handleClickLogin = async () => {
    try {
      const response = await loginService(dataLogin, true)
      console.log(response)
      if (response.errors) {
        setErrors(response.errors)
        return
      }
      else {
        handleCloseModal()
        toast.success("Đăng nhập thành công")
        setCookieForToken(response.token)
        saveTokenOnRedux(jwtDecode(response.token))
        localStorage.setItem('avatar', response.avatar)
        navigate('/')
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  const handleCloseModal = () => {
    setUserName('')
    setPassword('')
    setErrors({})
    handleClose()
  }

  const handleClickLoginGoogle = (credentialResponse) => {
    console.log(credentialResponse)
    console.log("Token từ Google:", credentialResponse.credential);

    fetch("http://localhost:3001/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Thông tin người dùng:", data);
      })
      .catch((err) => console.error("Lỗi:", err));
  }

  const handleLoginError = () => {
    console.error("Đăng nhập Google thất bại");
  };


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
            <h3 onClick={() => handleClickLoginGoogle()} className='fw-bold'>Welcome Back </h3>
            <div className='mb-2'>
              <label htmlFor="inputPassword5" className="form-label">UserName</label>
              <InputComponent
                value={userName}
                onChange={e => setUserName(e.target.value)}
                type="text"
                className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
              />
              {errors.userName && <ErrorMessageInput errors={errors} field="userName" />}
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
            <div className='d-flex flex-column align-items-center'>
              <p className='text-center mt-1 mb-1'>Hoặc tiếp tục bằng</p>

              <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID_AUTH}  >
                <GoogleLogin
                  buttonText="Login with Google"
                  onSuccess={handleLoginGoogle}
                  onFailure={handleLoginFailure}
                  cookiePolicy="single_host_origin"
                  scope="profile email"
                />
              </GoogleOAuthProvider>

            </div>
            <p className='text-center mt-2 note_login'>Bằng việc tiếp tục, bạn đã đọc và đồng ý với <a href="">điều khoản sử dụng</a> và <a href="">Chính sách bảo mật thông tin cá nhân</a> của Tiki </p>

          </div>
        </div>

      </div>
    </div>

  );
}

export default LoginModal;