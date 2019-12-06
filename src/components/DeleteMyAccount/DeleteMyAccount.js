import React from 'react';
import { Form, Button } from "../Utils/Utils";
import './DeleteMyAccount.css';

function DeleteMyAccount(props) {
  return (
    <div className='modal-wrapper deletePost'>
      <div className="modal-content">
        <Form className='delete-account-form' onSubmit={props.handleDelete}>
          <div className="delete-account-form-title">
            <h2 className="Form__title">Precious Little Moment: <span><em>delete account</em></span></h2>
            <hr />
            <h3 className='delete-post-title'>Delete Your Account?</h3>
            <p className="delete-warning">*Please make sure you would like to delete your account as your moment's cannot be recovered!*</p>
          </div>
          <Button className="button demo-button button-cancel" disabled={props.cUser === "Demo"} type="submit" title="Disabled for this account!">Delete</Button>
          <Button className="button demo-button button-continue" onClick={props.close}>Cancel</Button>
        </Form>
      </div>
    </div>
  )
}

export default DeleteMyAccount;