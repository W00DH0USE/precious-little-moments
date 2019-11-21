import React, { Component } from 'react'
import "./Header.css";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";

export default class Header extends Component {
   handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
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
    )
  }
  
  renderLoginLink() {
    return (
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
    )
  }
  render() {
    return (
      <nav className="Header" style={{ borderBottom: "1px solid #eee" }}>
        <h1>
          <Link to="/">
            <img className="plm-logo" src={require("../../images/logo.jpg")} alt="plm-logo"/>Precious <span>"Little"</span> Moments
          </Link>
        </h1>

        <div className="SignOut">
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </nav>
    );
  }
}

