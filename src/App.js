import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import Profile from './components/Profile/Profile';
import AddPost from './components/AddPost/AddPost';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import DemoPage from './components/DemoPage/DemoPage';
import TokenService from './services/token-service';
import config from './config';

const { API_BASE_URL } = config;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false,
      isShowingUpdate: false,
      isShowingDelete: false,
      isShowingDeletePost: false,
      posts: [],
      user: null,
      logInError: false,
      loggedIn: false,
      myPost: [],
      postId: null,
      postTitle: null,
      isLoading: false,
      postContentValid: false,
      error: null,
      likeError: null,
    }
  }

  handleUpdateSubmit = (e, postId) => {
    e.preventDefault();
    console.log("submit called");
    const post = {
      post_title: e.target.post_title.value,
      post_content: e.target.post_content.value
    }
    console.log(post);


    const options = {
      method: 'PATCH',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  `bearer ${TokenService.getAuthToken()}`
      }
    }

    fetch(`${API_BASE_URL}/posts/${postId}`, options)
    .then(res => {
      if (res.ok) {
        window.location.href='/profile'
      } else {
        return res.json().then(error => {
          throw new Error(error)
        })
      }
    })
  }

  handleDeleteUser = () => {
    fetch(`${API_BASE_URL}/users/user`, {
      method: "DELETE",
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw new Error(error);
          });
        }
      })
      .then(() => {
        TokenService.clearAuthToken()
        window.location.href='/'
      })
  }

  handleDeletePost = () => {
    const postId = this.state.postId

    fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      } 
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw new Error(error);
          })
        }
      })
      .then(() => {
        this.setState({
          myPost: this.state.myPost.filter(post => post.id !== postId),
          posts: this.state.posts.filter(post => post.id !== postId),
          isShowingDeletePost: false
        });
        window.location.reload(true);
      })
      .catch(error => {
        throw new Error(error);
      })
  }

  addPost = post => {
    this.setState({
      posts: [...this.state.posts, post]
    })
  }

  openModalHandler = (id, title) => {
      this.setState({
          postId: id,
          postTitle: title
      },  function() {
        this.setState({
          isShowing: true
        })
      });
  }

  closeModalHandler = () => {
      this.setState({
          isShowing: false
      });
  }

  openModalDeleteHandler = () => {
    this.setState({isShowingDelete: true})
    window.scrollTo(0, 0)
  }

  closeModalDeleteHandler = () => {
    this.setState({isShowingDelete: false})
  }

  openModalDeletePostHandler = (postId) => {
    this.setState({
        postId: postId
    }, function() {
      this.setState({
        isShowingDeletePost: true
      })
    });
    window.scrollTo(0, 0)
  }

  closeModalDeletePostHandler = () => {
    this.setState({isShowingDeletePost: false})
  }  

  openModalUpdateHandler = (postId) => {
    this.setState({
      postId: postId
    }, function() {
      this.setState({
        isShowingUpdate: true
      })
    });
    window.scrollTo(0, 0)
  }

  closeModalUpdateHandler = () => {
    this.setState({
      isShowingUpdate: false
    });
}

  trimfield = (str) => 
  { 
    return str.replace(/^\s+|\s+$/g,''); 
  }

  render() {
    return (
      <div className='App'>
        <span className='container'>
          <header>
            <Header />
          </header>
          <main className='main-container' style={{ marginTop: "30px" }}>
            <Route exact path='/' 
              component={LandingPage}
            />
            <Route exact path='/register'
              component={RegistrationForm}
            />
            <Route exact path='/login'
              component={LoginForm}
            />
            <Route exact path='/profile' render={(props) => 
                <Profile {...props} user={this.state.user} validation={this.validate} handleDeletePost={(postId) => this.handleDeletePost(postId)} deleteAccount={this.handleDeleteUser} postId={this.state.postId} closeModalUpdateHandler={this.closeModalUpdateHandler} isShowingDelete={this.state.isShowingDelete} openModalDeleteHandler={this.openModalDeleteHandler} closeModalDeleteHandler={this.closeModalDeleteHandler} 
                  openModalUpdateHandler={(postId) => this.openModalUpdateHandler(postId)} openModalDeletePostHandler={(postId) => this.openModalDeletePostHandler(postId)} closeModalDeletePostHandler={this.closeModalDeletePostHandler} isShowingDeletePost={this.state.isShowingDeletePost} isShowingUpdate={this.state.isShowingUpdate} handleUpdateSubmit={(event) => this.handleUpdateSubmit(event, this.state.postId)}/>}/>
            <Route exact path='/addPost'
              component={AddPost}
            />
            <Route exact path='/demo'
              component={DemoPage}
            />
          </main>
        </span>
      </div>
    );
  }
}

export default App;
