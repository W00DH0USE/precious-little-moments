import React, { Component } from 'react'
import "../HeaderLoggedIn/Header.css";
import { Link } from "react-router-dom";

export default class Header extends Component {

  render(props) {
    return (
      <nav className="Header" style={{ borderBottom: "1px solid #eee" }}>
        <h1>
          <Link to="/">
            PLM
          </Link>
        </h1>

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
      </nav>
    );
  }
}

