import React, { Component } from 'react'
import "./Header.css";
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
          <div className='Header__logged-in'>
            <Link
              to='/profile'>
              Profile
            </Link>
            <Link
              to='/addPost'>
              Create Memory
            </Link>
            <Link
              onClick={this.handleLogoutClick}
              to='/'>
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

