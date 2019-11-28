import React from 'react';
import { Form, Input2, Required, Textarea, Button } from "../Utils/Utils";
import './UpdateMyPost.css';

function UpdatePost(props) {
  const post = props.posts.filter(post => post.id === props.postId)
  return (
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
        // <section>
        // <div className='modal-wrapper updatePostModal'
        //         style={{
        //             transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
        //             opacity: props.show ? '1' : '0'
        //         }}>
        //         <div className='modal-header'>
        //             <h3 id='updatePost-title'>Update Post</h3>
        //         </div>
        //         <div className='modal-body'>
        //         <form className='update-form' onSubmit={props.handleUpdateSubmit}>
        //             <div className='updatePost-grid-container'>
        //                 <label htmlFor='post_title'>Post Title</label>
        //                 <input type='text' name='post_title' id='post_title' defaultValue={post[0].post_title} required/>
        //             </div>
        //             <div className='updatePost-grid-container'>
        //                 <label htmlFor='post_content'>Content</label>
        //                 <textarea rows='15' type='text' name='post_content' id='post_content' defaultValue={post[0].post_content} required/>
        //             </div>
        //             <div className="modal-footer">
        //                 <button className="btn-cancel" onClick={props.close}><span>CLOSE</span></button>
        //                 <button className="btn-continue" type='submit'><span>CONTINUE</span></button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        // </section>
  )
}

export default UpdatePost;