import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from "react-redux";
import "./NavBar.css";

const NavBar = ({ loaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  const subjectList = useSelector(state => Object.values(state.subject).reverse());
  const userId = sessionUser?.id;

  if (sessionUser) {

    return (
      <nav>
        <ul>
          <li>
            <LogoutButton />
          </li>
          <li>
            <NavLink
              to='/' exact={true} activeClassName='active'
              style={{ textDecoration: "none" }}
            >
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
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/subjects' exact={true}
              style={{ textDecoration: "none" }}
            >
              My Subjects
            </NavLink>
            <div>
              {subjectList?.map(subject => (
                <div key={subject.id}>
                  <ul>
                    <li key={subject.id}>
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
