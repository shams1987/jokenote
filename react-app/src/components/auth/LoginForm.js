import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"
import logo1 from "../../img/logo1.jpg"


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  // demo button sign up
  const handleSubmitDemo = async (e) => {
    e.preventDefault();
    const demoEmail = "demo@aa.io"
    const demoPassword = "password"
    await dispatch(login(demoEmail, demoPassword)
    )
  };

  return (
    <>
      <div id="bg-login">
        <div className='login-form'>
          <div>
            <img className="img-logo1" src={logo1} alt="logo1"></img>
          </div>
          <div className='login-title'>Login</div>
          <div className=''>
            <form onSubmit={onLogin}>
              <div className="errors-field-container">
                {errors.map((error, ind) => (
                  <div className="errors-field" key={ind}>{error}</div>
                ))}
              </div>

              <div >
                {/* <label htmlFor='email'>Email</label> */}
                <input className="form-field"
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>

              <div >
                {/* <label htmlFor='password'>Password</label> */}
                <input className="form-field"
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>

              <div className='login-buttons'>
                <div >
                  <button className="button-login green-button" type='submit'>Login</button>
                </div>
                <div>
                  <button className="demo-login-btn button-login white-button" onClick={handleSubmitDemo}>
                    DEMO
                  </button>
                </div>
              </div>

              <div>
                <NavLink className="sign-up-link" to="/sign-up">
                  Don't have an account? Sign Up Here!
                </NavLink>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
