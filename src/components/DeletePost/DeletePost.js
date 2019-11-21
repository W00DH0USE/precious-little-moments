import React from 'react';
import { Form, Button } from "../Utils/Utils";
import './DeletePost.css';

function DeletePost(props) {
  const post = props.posts.filter(post => post.id === props.postId)
  return (
    <div className='modal-wrapper deletePost'>
      <div className="modal-content">
        <Form className='delete-post-form' onSubmit={props.handleDelete}>
          <div className="delete-post-form-title">
            <h2 className="Form__title">Precious Little Moment: <span><em>delete moment</em></span></h2>
            <hr />
            <h3 className='delete-post-title'>Delete Moment "{post[0].post_title}"?</h3>
            <p className="delete-warning">*Please make sure you would like to delete this moment as this cannot be recovered!*</p>
          </div>
          <Button className="button demo-button button-cancel" type="submit">Delete</Button>
          <Button className="button demo-button button-continue" onClick={props.close}>Cancel</Button>
        </Form>
      </div>
    </div>
  )
}

export default DeletePost;