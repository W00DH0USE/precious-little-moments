import React from 'react';
import { Form, Input2, Required, Textarea, Button } from "../Utils/Utils";
import './UpdatePost.css';

function UpdatePost(props) {

  const post = props.posts.filter(post => post.id === props.postId)
  return (
    <section>
      <div className='modal-wrapper updatePostModal'>
        <div className="modal-content">
          <Form className='update-form' onSubmit={props.handleUpdateSubmit}>
            <div className="moment-title">
              <h2 className="Form__title">Precious Little Moment: <span><em>update moment</em></span></h2>
              <hr />
              <label htmlFor="post_title">
                Moment Title <Required />
              </label>
              <Input2
                required
                type="text"
                name="post_title"
                id="post_title"
                defaultValue={post[0].post_title}
              ></Input2>
            </div>

            <div className="password">
              <label htmlFor="post_content">
                Content <Required />
              </label>
              <Textarea
                required
                name="post_content"
                id="post_content"
                defaultValue={post[0].post_content}
              ></Textarea>
            </div>
            <Button className="button demo-button button-continue" type="submit">Continue</Button>
            <Button className="button demo-button button-cancel" onClick={props.close}>Cancel</Button>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default UpdatePost;