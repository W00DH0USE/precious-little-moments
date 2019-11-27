import React from 'react';
import { Form, Input2, Required, Textarea, Button } from "../Utils/Utils";
import './UpdateMyPost.css';

function UpdatePost(props) {
    const post = props.posts.filter(post => post.id === props.postId)
    return (
        <section>
        <div className='modal-wrapper updatePostModal'
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className='modal-header'>
                    <h3 id='updatePost-title'>Update Post</h3>
                </div>
                <div className='modal-body'>
                <form className='update-form' onSubmit={props.handleUpdateSubmit}>
                    <div className='updatePost-grid-container'>
                        <label htmlFor='post_title'>Post Title</label>
                        <input type='text' name='post_title' id='post_title' defaultValue={post[0].post_title} required/>
                    </div>
                    <div className='updatePost-grid-container'>
                        <label htmlFor='post_content'>Content</label>
                        <textarea rows='15' type='text' name='post_content' id='post_content' defaultValue={post[0].post_content} required/>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={props.close}><span>CLOSE</span></button>
                        <button className="btn-continue" type='submit'><span>CONTINUE</span></button>
                    </div>
                </form>
            </div>
        </div>
        </section>
    )
}

export default UpdatePost;