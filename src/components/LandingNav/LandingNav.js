import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './LandingNav.css';

function LandingNav(props) {
  return (
    <nav className="Header" style={{ borderBottom: "1px solid #eee" }}>
      <h1>
        <Link to="/">
          PLM
        </Link>
      </h1>

      {!TokenService.hasAuthToken() ?
      // Displayed while user is logged out
        <div className="SignOut">
          <div className='Header__not-logged-in'>
            <Link
              to='/login'>
              Login
            </Link>
            <Link
              to='/register'>
              Sign Up
            </Link>
          </div>
        </div>
        :
        // Displayed while user is logged in
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
      }
    </nav>
  )
}

export default LandingNav;