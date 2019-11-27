import React from 'react';
import { Button, Required, Form, Input2, Textarea } from "../Utils/Utils";
import './AddPost.css';

function AddPost(props) {
  return (
    <Form className="AddPostForm" id="AddPostForm" onSubmit={props.handleSubmit}>
      {/* <div role="alert">{this.addPostError ? <p style={{ color: "red" }}>Something went wrong! Please try again</p> : null}</div> */}
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

export default AddPost;