import React from 'react';
// import { Redirect } from 'react-router';
import { Button, Form, Input2 , Required} from "../Utils/Utils";
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      error: "",
      logInError: false,
      // userLoggedIn: false
    };
  }

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = e.target;
    AuthApiService.postLogin({
      email: email.value,
      password: password.value
    })
      .then(res => {
        if (res.error) {
          return this.setState({logInError: true})
        } else {
          return res;
        }
      })
      .then(user => {
        email.value = ''
        password.value = ''
        TokenService.saveAuthToken(user.authToken);
        // this.setState({ userLoggedIn: true });
        window.location.href = '/profile'
      })
      .catch(err => {
        this.setState({error: err})
      })
  }

  render() {
    // if (this.state.userLoggedIn) {
    //   return <Redirect to="/profile" />
    // }
    return (
      <Form className="LoginForm" onSubmit={this.handleLogin}>
        <div role="alert">{this.logInError ? <p style={{ color: "red" }}>Incorrect Email or Password</p> : null}</div>
        <div className="user_name">
          <h2 className="Form__title">Precious Little Moment: <span><em>login</em></span></h2>
          <hr />
          <label htmlFor="LoginForm__user_name">
            Email Address <Required />
          </label>
          <Input2
            required
            type="email"
            name="email"
            id="login-email"
            placeholder="Email Address"
          ></Input2>
        </div>
  
        <div className="password">
          <label htmlFor="LoginForm__password">
            Password <Required />
          </label>
          <Input2
            required
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
          ></Input2>
        </div>
        <Button className="button demo-button" type="submit">Login</Button>
      </Form>
    );
  }
};

export default LoginForm;