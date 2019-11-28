import React from 'react';
import { Link } from 'react-router-dom';

import './AppNav.css';

// Displayed while user is logged in and on the profilePage
function AppNav(props) {
  return (
    <nav className="Header" style={{ borderBottom: "1px solid #eee" }}>
        <h1>
          <Link to="/">
            PLM
          </Link>
        </h1>

        <div className="SignOut">
          <div className='Header__logged-in'>
            <Link
              to='/profile'>
              Profile
            </Link>
            <Link
              to='/addPost'>
              Create Moment
            </Link>
            <Link
              onClick={props.handleLogout}
              to='/'>
              Logout
            </Link>
          </div>
        </div>
      </nav>
  )
}

export default AppNav;