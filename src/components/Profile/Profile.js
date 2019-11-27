import React, {useState, useEffect} from 'react';
import moment from 'moment';
import TokenService from '../../services/token-service';
import Loader from '../Loader/Loader';
import config from '../../config';
import UpdateMyPost from '../UpdateMyPost/UpdateMyPost';
import DeleteMyAccount from '../DeleteMyAccount/DeleteMyAccount';
import DeleteMyPost from '../DeleteMyPost/DeleteMyPost';
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
      {isLoading ? <Loader {...props} /> : (
        <main className="profile-main" role="main">
          <header className="heading" role="banner">
            <h1>Welcome {user.first_name} {user.last_name}</h1>
            <hr className="LandingPage-hr"></hr>
          </header>
          {props.isShowingUpdate ? <UpdateMyPost className='modal' validate={props.validation} postId={props.postId} handleUpdateSubmit={props.handleUpdateSubmit} posts={myPost} show={props.isShowingUpdate} close={props.closeModalUpdateHandler}></UpdateMyPost> : null}
          {props.isShowingDelete ? <DeleteMyAccount className='modal' handleDelete={props.deleteAccount} show={props.isShowingDelete} close={props.closeModalDeleteHandler}></DeleteMyAccount> : null}
          {props.isShowingDeletePost ? <DeleteMyPost className='modal' postId={props.postId} handleDelete={props.handleDeletePost} posts={myPost} show={props.isShowingDeletePost} close={props.closeModalDeletePostHandler}></DeleteMyPost> : null}
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
                    <button className='card-button delete-post-button' onClick={() => {props.openModalDeletePostHandler(post.id); getUser()}}>Delete</button>
                    <button className='card-button update-post-button' onClick={() => props.openModalUpdateHandler(post.id)}>Update</button>
                  </div>
                </section>
              )
            })}
          </section>
          <button className='button demo-button delete-account-button' onClick={props.openModalDeleteHandler}>Delete Account</button> 
        </main>
      )}
      {props.isShowingUpdate ? <div onClick={props.closeModalUpdateHandler} className="back-drop"></div> : null }
      {props.isShowingDelete ? <div onClick={props.closeModalDeleteHandler} className="back-drop"></div> : null }
      {props.isShowingDeletePost ? <div onClick={props.closeModalDeletePostHandler} className="back-drop"></div> : null }
    </>
  )
}


export default Profile;