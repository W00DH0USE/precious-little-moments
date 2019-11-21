import React from 'react';
import { Button, Required, Form, Input2, Textarea } from "../Utils/Utils";
import TokenService from '../../services/token-service';
import config from '../../config';
import './AddPost.css';

const { API_BASE_URL } = config;

class AddPost extends React.Component {
  constructor() {
    super()
    this.state = {
      error: " " 
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { post_title, post_content } = e.target;

    const post = {
      post_title: post_title.value,
      post_content: post_content.value,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    }

    fetch(`${API_BASE_URL}/posts`, options)
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error;
        });
      }
      return res.json();
    })
    .then(post => {
      window.location.href='/profile'
    })
    .catch(error => {
      this.setState({error: error})
    })
    
  }

  render() {
    return (
      <Form className="AddPostForm" onSubmit={this.handleSubmit}>
        {/* <div role="alert">{this.logInError ? <p style={{ color: "red" }}>Incorrect Email or Password</p> : null}</div> */}
        <div className="post_title-div">
          <h2 className="Form__title">Precious Little Moment: <span><em>create a moment</em></span></h2>
          <hr />
          <label htmlFor="post_title">
            Moment Title <Required />
          </label>
          <Input2
            required
            type="text"
            name="post_title"
            id="post_title"
          ></Input2>
        </div>
  
        <div className="post_content-div">
          <label htmlFor="post_content">
            Moment Content <Required />
          </label>
          <Textarea
            required
            name="post_content"
            id="post_content"
            placeholder="Write about your moment..."
            autoComplete="off"
          ></Textarea>
        </div>
        <Button className="button demo-button" type="submit">Create</Button>
      </Form>
    )
  }
}

export default AddPost;