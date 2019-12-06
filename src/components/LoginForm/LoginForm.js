import React from 'react';
import { Button, Form, Input2 , Required} from "../Utils/Utils";

function LoginForm(props) {
  return (
    <Form className="LoginForm" onSubmit={props.handleLogin}>
      <div role="alert">{props.error && <p className='red'>{props.error}</p>}</div>
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
      {!props.isLoading ? 
        <Button className="button demo-button" type="submit" style={{ width: "200px" }}>Login</Button> 
        :
        <Button className="button demo-button" type="submit" disabled={props.isLoading} style={{ width: "200px" }}>Loading...</Button>
      }
    </Form>
  )
}

export default LoginForm;