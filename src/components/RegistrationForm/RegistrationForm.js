import React, { Component } from "react";
import TokenService from '../../services/token-service';
import "./RegistrationForm.css";
import { Button, Required, Form, Input2 } from "../Utils/Utils";
import config from '../../config';

const { API_BASE_URL } = config


export default class RegistrationForm extends Component {
   constructor(){
    super()
    this.state = { 
      error: "", 
      passwordError: "",
      formValid: false,
    };
  } 

  handleUserSubmit = e => {
    e.preventDefault();
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]/;
    this.setState({isLoading: true})
    const { first_name, last_name, email, password } = e.target;

    const user = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    }

    if (password.value.startsWith(' ') || password.value.endsWith(' ')) {
      this.setState({
        passwordError: "Password must not start or end with empty spaces",
        formValid: false
      })
    } else {
      this.setState({ formValid: true })
    }

    if (REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password.value) === false) {
      this.setState({
        passwordError: "Password must contain one upper case, lower case, number and special character",
        formValid: false
      })
    } else {
      this.setState({ formValid: true })
    }

    if ((password.value.length > 20) || (password.value.length < 8)) {
      this.setState({
        passwordError: "Passwords must be at least 8 characters and not more than 20 characters",
        formValid: false
      })
    } else {
      this.setState({ formValid: true })
    }

    if (this.state.formValid === true) {
      fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          this.setState({isLoading: false})
          throw new Error(res.json())
        }
      })
      .then(user => {
        TokenService.saveAuthToken(user.authToken);
        window.location.href = '/login'
      })
      .catch(error => {
        this.setState({passwordError: error, isLoading: false})
      })
    }
  }

  render() {
     const { passwordError } = this.state; 
    return (
      <Form className="RegistrationForm" onSubmit={this.handleUserSubmit}>
        <div role="alert">{passwordError && <p className="red">{passwordError}</p>}</div>
        <div className="first_name">
          <h2 className="Form__title">Precious Little Moment: <span><em>sign up</em></span></h2>
          <hr />
          <label htmlFor="first_name">
            First Name <Required />
          </label>
          <Input2
            name="first_name"
            type="text"
            required
            id="first_name"
            autoComplete="off"
          ></Input2>
        </div>
        <div className="last_name">
          <label htmlFor="last_name">
            Last Name <Required />
          </label>
          <Input2
            name="last_name"
            type="text"
            required
            id="last_name"
            autoComplete="off"
          ></Input2>
        </div>
        <div className="user_name">
          <label htmlFor="email">
            Email <Required />
          </label>
          <Input2
            name="email"
            type="email"
            required
            id="email"
            autoComplete="off"
          ></Input2>
        </div>
        <div className="password">
          <label htmlFor="password">
            Password <Required />
          </label>
          <Input2
            name="password"
            type="password"
            required
            id="password"
            autoComplete="off"
          ></Input2>
        </div>
        <Button className="button demo-button" type="submit" style={{ width: "200px" }}>Register</Button>
      </Form>
    );
  }
}