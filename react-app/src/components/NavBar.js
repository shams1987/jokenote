import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from "react-redux";
import { getSubjectsThunk } from '../store/subject';
import "./NavBar.css";
import logo2 from "../img/logo2.jpg"

const NavBar = ({ loaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  const subjectList = useSelector(state => Object.values(state.subject).reverse());
  const userId = sessionUser?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getSubjectsThunk(userId));
    })();
  }, [dispatch, userId]);

  if (sessionUser) {

    return (
      <nav className="menu-container">
        <div className='img-logo2-container'>
          <img className="img-logo2" src={logo2} alt="logo2"></img>
        </div>
        <ul >



          <li>
            <NavLink
              to='/' exact={true} activeClassName='active'
              style={{ textDecoration: "none" }}
            >
              <button className="green-button nav-button"> Home</button>
            </NavLink>
          </li>

          <li >
            <NavLink
              to={`/users/${userId}`}
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <button className="green-button nav-button"> Profile</button>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/toprated' exact={true} activeClassName='active'
              style={{ textDecoration: "none" }}
            >
              <button className="green-button nav-button"> Rated</button>
            </NavLink>
          </li>

          <li >
            <NavLink
              to='/subjects' exact={true}
              style={{ textDecoration: "none" }}
            >
              <button className="green-button nav-button">Subjects</button>
            </NavLink>
          </li>
          <div>
            {subjectList.length < 8 ? subjectList?.map(subject => (
              <div key={subject.id}>
                <ul>
                  <li key={subject.id + "A"}>
                    <NavLink
                      to={`/jokes/${subject.id}`}
                      style={{ textDecoration: "none", color: "black" }} >
                      <button className="yellow-button subject-button">{subject.heading}</button>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )) : null}
          </div>
        </ul>

        <div className="footer">
          <div className='about-me'>
            <div><a href="https://github.com/shams1987/jokenote"><i class="fa-brands fa-github"></i></a></div>
            <div><a href="https://www.linkedin.com/in/shams-shaikh-330884229/"><i class="fa-brands fa-linkedin"></i></a></div>
          </div>
          <div className='logout-button'>
            <LogoutButton />
          </div>
        </div>

      </nav>
    );
  }

  else {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'
              style={{ textDecoration: "none" }}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'
              style={{ textDecoration: "none" }}>
              Sign Up
            </NavLink>
          </li>

        </ul>
      </nav>
    )

  }
}

export default NavBar;
