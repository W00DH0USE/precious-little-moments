import React from 'react';
import './DeleteMyPost.css';

function DeleteMyPost(props) {
  const post = props.posts.filter(post => post.id === props.postId)
  return (
    <>
      <div className='modal-wrapper deletePost'>
        <div className='modal-content'>
          <div className='delete-post-form'>
            <div className="delete-post-form-title">
              <h2 className="Form__title">Precious Little Moment: <span><em>delete moment</em></span></h2>
                <hr />
                <h3 className='delete-post-title'>Delete Moment "{post[0].post_title}"?</h3>
                <p className="delete-warning">*Please make sure you would like to delete this moment as this cannot be recovered!*</p>
            </div>
            <button className="button demo-button button-continue delete-post-form-btn" type='button' onClick={props.handleDelete}>Delete</button>
            <button className="button demo-button button-cancel delete-post-form-btn" onClick={props.close}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteMyPost;