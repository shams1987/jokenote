import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';
import logo1 from "../../img/logo1.jpg"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // function ValidateEmail(emailCheck) {
  //   // check for @ sign
  //   let atSymbol = emailCheck.indexOf("@");
  //   if (atSymbol < 1) return false;
  //   //dot comes atleast 2 after @
  //   let dot = emailCheck.indexOf(".");
  //   if (dot <= atSymbol + 2) return false;
  //   // check that the dot is not at the end
  //   if (dot === emailCheck.length - 1) return false;

  //   return true;
  // }

  const onSignUp = async (e) => {
    e.preventDefault();
    const newErrors = [];

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!regex.test(email)) {
      newErrors.push("please use a properly formatted email")
    }
    // if (!ValidateEmail(email)) {
    //   newErrors.push("please use a properly formatted email")
    // }
    if (password !== repeatPassword) {
      newErrors.push("passowrds do not match.")
    }
    if (newErrors.length > 0) {
      setErrors(newErrors)
      return;
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div id="bg-login">
        <div className='signup-form'>
          <div>
            <img className="img-logo1" src={logo1} alt="logo1"></img>
          </div>
          <div className='signup-title'>Signup</div>
          <div className=''>
            <form onSubmit={onSignUp}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <input className='form-field-signup'
                  type='text'
                  name='username'
                  placeholder='username'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div>
                <input className='form-field-signup'
                  type='text'
                  name='email'
                  placeholder='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div>
                <input className='form-field-signup'
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div>
                <input className='form-field-signup'
                  type='password'
                  name='repeat_password'
                  placeholder='repeat password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <div className='signup-button'>
                <button className="button-login green-button" type='submit'>Sign Up</button>
              </div>
              <div>
                <NavLink className="log-in-link" to="/login">
                  Already have an account? Log In Here!
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
