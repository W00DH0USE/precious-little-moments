import React, {useState, useEffect} from 'react';
import TokenService from '../../services/token-service';
import { Button } from "../Utils/Utils";
import moment from 'moment';
import config from '../../config';
import UpdatePost from '../UpdatePost/UpdatePost';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import DeletePost from '../DeletePost/DeletePost';
import './Profile.css';

const {API_BASE_URL} = config;

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => 
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}

function Profile(props) {
  const [userRequest, setUser] = useMergeState({
    user: null,
    myPost: [],
    isLoading: true,
  })

  async function getUser() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    }
    try {
      const userResponse = await fetch(`${API_BASE_URL}/users/user`, options);
      const postsResponse = await fetch(`${API_BASE_URL}/posts/myPost`, options);
      const postsData = await postsResponse.json();
      const userData = await userResponse.json();
      setUser({
        user: userData,
        myPost: postsData,
        isLoading: false,
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const {user, myPost, isLoading} = userRequest;

  return (
    <>
      {isLoading ? <div>Loading</div> : (
        <main className="profile-main" role="main">
          <header className="heading" role="banner">
            <h1>Welcome {user.first_name} {user.last_name}</h1>
            <hr className="LandingPage-hr"></hr>
          </header>
          <section className='moments'>
            <h3 className="moments-title" id='Moments-title'>Your Moments</h3>
            {!myPost ? <h2>Oops Something Went Wrong</h2> : myPost.map(post => {
              return (
                <section className='cards' key={post.id}>
                  <div className="card_image">
                    <img src={require("../../images/family.jpg")} alt="cloud-img"/>
                  </div>
                  <div className="card_content">
                    <h4 className="card_title">{post.post_title}</h4>
                    <p className='card_text'>{post.post_content}</p>
                    <p className='card_date'>Created on: {moment(post.start_date).format("MM-DD-YYYY")}</p>
                    <Button className='card-button delete-post-button' onClick={() => {props.openModalDeletePostHandler(post.id); getUser()}}>Delete</Button>
                    <Button className='card-button update-post-button' onClick={() => props.openModalUpdateHandler(post.id)}>Update</Button>
                  </div>
                </section>
              )
            })}
          </section>
          <div className="delete-account-button-div">
            <Button className="button demo-button delete-account-button" onClick={props.openModalDeleteHandler}>Delete Account</Button> 
          </div>  
          {props.isShowingUpdate ? <UpdatePost className='modal' validate={props.validation} postId={props.postId} handleUpdateSubmit={props.handleUpdateSubmit} posts={myPost} show={props.isShowingUpdate} close={props.closeModalUpdateHandler}></UpdatePost> : null}
          {props.isShowingDelete ? <DeleteAccount className='modal' handleDelete={props.deleteAccount} show={props.isShowingDelete} close={props.closeModalDeleteHandler}></DeleteAccount> : null}
          {props.isShowingDeletePost ? <DeletePost className='modal' postId={props.postId} handleDelete={props.handleDeletePost} posts={myPost} show={props.isShowingDeletePost} close={props.closeModalDeletePostHandler}></DeletePost> : null}
        </main>
      )}
    </>
  )
}


export default Profile;