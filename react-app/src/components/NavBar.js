import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from "react-redux";
import { getSubjectsThunk } from '../store/subject';
import "./NavBar.css";

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
        <ul >

          <li>
            <LogoutButton />
          </li>

          <li>
            <NavLink
              to='/' exact={true} activeClassName='active'
              style={{ textDecoration: "none" }}
            >
              <i class="fa-solid fa-house"></i>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/users/${userId}`}
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <i class="fa-solid fa-user"></i>
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/toprated' exact={true} activeClassName='active'
              style={{ textDecoration: "none" }}
            >
              <i class="fa-solid fa-star"></i>
              Rated
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/subjects' exact={true}
              style={{ textDecoration: "none" }}
            >
              <i class="fa-solid fa-face-grin"></i>
              Subjects
            </NavLink>
            <div>
              {subjectList?.map(subject => (
                <div key={subject.id}>
                  <ul className='nav-sub-list'>
                    <li key={subject.id + "A"}>
                      <NavLink
                        to={`/jokes/${subject.id}`}
                        style={{ textDecoration: "none", color: "black" }} >
                        {subject.heading}
                      </NavLink>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </li>

        </ul>
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
