
import React, { Component } from "react";
import "./RegistrationForm.css";
import { Button, Required, Form, Input2 } from "../Utils/Utils";
import config from '../../config';

const { API_BASE_URL } = config


export default class RegistrationForm extends Component {
   constructor(){
    super()
    this.state = { 
      error: " " 
    };
  } 

  handleUserSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, email, password } = e.target;

    const user = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    }

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
        throw new Error(res.json())
      }
    })
    .then(user => {
      window.location.href = '/login'
    })
    .catch(error => {
      this.setState({error: error})
    })
  }

  render() {
     const { error } = this.state; 
    return (
      <Form className="RegistrationForm" onSubmit={this.handleUserSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
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
