import React from 'react';
import { useState, useCallback } from 'react';
import {InputComponent} from '../../components/InputComponent';
import { ErrorMessageInput } from '../../components/InputComponent';
const SignInModal = React.memo(({ show, handleClose, switchLogin }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const handleClickSignIn = useCallback(async () => {
    const userData = { name, email, password, confirm_password };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.errors) {

        setErrors(data.errors);
      }
      else {
        alert('Đăng kí thành công');
        setErrors('')
      }
    } catch (error) {
      console.error(error)
    }
  }, [name, email, password, confirm_password])
  // close login modal 
  const handleCloseModal = useCallback(() => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    handleClose();
  }, [handleClose]);
  return (
    <div className={`modal bg- ${show ? 'd-block' : 'd-none'}  modal-display`} >
      <div className='modal_base'>
        <div className='page_access-shop'>
          <div style={{ width: '50%' }} className=''>
            <img width="100%" height="100%" src="https://images.pexels.com/photos/4321802/pexels-photo-4321802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          </div>
          <div style={{ width: '50%' }} className='m-3'>
            <i onClick={handleCloseModal} className="bi bi-x-lg icon_close"></i>
            <h3 className='fw-bold'>Hello, Welcome Back </h3>
            <div className='mb-2'>
              <label htmlFor="inputPassword5" className="form-label">Name</label>
              <InputComponent
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''} `} aria-describedby="passwordHelpBlock"
              />
              {errors.name && <ErrorMessageInput errors={errors} field="name" />}
            </div>
            <div className='mb-2'>
              <label htmlFor="inputPassword5" className="form-label">Email</label>
              <InputComponent
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`} aria-describedby="passwordHelpBlock"
              />
              {errors.email && <ErrorMessageInput errors={errors} field="email" />}
            </div>
            <div>
              <label htmlFor="inputPassword5" className="form-label">Password</label>
              <InputComponent
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`} aria-describedby="passwordHelpBlock"
              />
              {errors.password && <ErrorMessageInput errors={errors} field="password" />}
            </div>
            <div>
              <label htmlFor="inputPassword5" className="form-label">Confirm Password</label>
              <InputComponent
                value={confirm_password}
                onChange={e => setConfirmPassword(e.target.value)}
                type="password"
                className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`} aria-describedby="passwordHelpBlock"
              />
              {errors.confirm_password && <ErrorMessageInput errors={errors} field="confirm_password" />}
            </div>

            <button onClick={handleClickSignIn} type="button" className="btn btn-info text-white w-100 mt-3 fw-bold">Sign Up</button>
            <p className='mt-3 text-center'>If you already have an account? <a onClick={switchLogin} className='click_switch'>Click Here</a></p>
          </div>
        </div>

      </div>
    </div>

  );
})

export default SignInModal;