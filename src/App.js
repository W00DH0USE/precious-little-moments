import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LandingNav from './components/LandingNav/LandingNav';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import AppNav from './components/AppNav/AppNav';
import Profile from './components/Profile/Profile';
import AddPost from './components/AddPost/AddPost';
import DemoPage from './components/DemoPage/DemoPage';
import AuthApiService from './services/auth-api-service';
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
    }
  }

  // Handles login of existing user, will redirect upon valid login to the profile page
  handleLogin = event => {
    event.preventDefault()
    this.setState({isLoading: true, error: null})
    const { email, password } = event.target

    AuthApiService.postLogin({
      email: email.value,
      password: password.value
    })
    .then(res => {
      if (res.error) {
        return this.setState({logInError: true, isLoading: false})
      } else {
        return res;
      }
    })
    .then(user => {
      email.value = ''
      password.value = ''
      TokenService.saveAuthToken(user.authToken);
      this.setState({
        loggedIn: true,
        isLoading: false,
      });
      window.location.href = '/profile'
    })
    .catch(res => {
      this.setState({ error: res.error, isLoading: false })
    })
  }

  // Handles login to the demo account, will redirect upon valid login to the profile page
  handleDemoLogin = event => {
    event.preventDefault()
    this.setState({isLoading: true})

    AuthApiService.postLogin({
      email: "demo_user@demo.com",
      password: "Password1!"
    })
    .then(res => {
      if (res.error) {
        return this.setState({isLoading: false})
      } else {
        return res;
      }
    })
    .then(user => {
      TokenService.saveAuthToken(user.authToken);
      this.setState({
        loggedIn: true,
        isLoading: false,
      });
      window.location.href = '/profile'
    })
    .catch(res => {
      this.setState({ error: res.error, isLoading: false })
    })
  }

  // Handles the creation of a new moment by the user and posts to the database
  handleSubmit = e => {
    e.preventDefault();
    const post = {
      post_title: e.target.post_title.value,
      post_content: e.target.post_content.value,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    }

    fetch(`${API_BASE_URL}/posts`, options)
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error;
        });
      }
      return res.json();
    })
    .then(post => {
      const form = document.getElementById('AddPostForm');
      form.reset();
      window.location.href='/profile'
    })
    .catch(error => {
      throw new Error(error)
    })
  }

  // Handles the updating of a moment by the user and a PATCH request is made to the database
  handleUpdateSubmit = (e, postId) => {
    e.preventDefault();
    const post = {
      post_title: e.target.post_title.value,
      post_content: e.target.post_content.value
    }

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

  // Handles the deletion of a moment by the user and a DELETE request is made to the database
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

  // Handles the deletion of a user account and a DELETE request is made to the database, then the homepage is rendered
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
      this.setState({posts: this.state.posts.filter(post => post.owner !== this.state.user.id)})
      TokenService.clearAuthToken()
      window.location.href='/'
    })
  }

  // all 'update' prefixes set state
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

  // Opens and closes the Delete User Account Modal
  openModalDeleteHandler = () => {
    this.setState({isShowingDelete: true})
  }
  closeModalDeleteHandler = () => {
    this.setState({isShowingDelete: false})
  }

  // Opens and closes the Delete Post Modal
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

  // Opens and closes the Update Post Modal
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

  // Handles the logout of a user by removing token
  handleLogOut = () => {
    TokenService.clearAuthToken();
  }

  render() {
    return (
      <div className='App'>
        <span className='container'>
        <header>
          <Route exact path='/' render={(props) => <LandingNav {...props} handleLogout={this.handleLogOut} />} />
          <Route exact path='/login' render={(props) => <LandingNav {...props} handleLogout={this.handleLogOut} />} />
          <Route exact path='/register' render={(props) => <LandingNav {...props} handleLogout={this.handleLogOut} />} />
          <Route exact path='/addPost' render={(props) => <LandingNav {...props} handleLogout={this.handleLogOut} />} />
          <Route exact path='/demo' render={(props) => <LandingNav {...props} handleLogout={this.handleLogOut} />} />
          <Route exact path='/profile' render={(props) => <AppNav {...props} handleLogout={this.handleLogOut} />} />
        </header>
        <main className='main-container'>
        <Route exact path='/' render={(props) => 
            <LandingPage {...props} 
              isLoading={this.state.isLoading} 
              error={this.state.error} 
              handleDemoLogin={(event) => this.handleDemoLogin(event)} 
            />} 
          />
          <Route exact path='/register'
            component={RegistrationForm}
          />
          <Route exact path='/login' render={(props) => 
            <LoginForm {...props} 
              isLoading={this.state.isLoading} 
              error={this.state.error} 
              handleLogin={(event) => this.handleLogin(event)} 
            />} 
          />
          <Route exact path='/profile' render={(props) => 
            <Profile {...props} 
              user={this.state.user} 
              handleDeletePost={(postId) => this.handleDeletePost(postId)} 
              deleteAccount={this.handleDeleteUser} postId={this.state.postId} 
              closeModalUpdateHandler={this.closeModalUpdateHandler} 
              isShowingDelete={this.state.isShowingDelete} 
              openModalDeleteHandler={this.openModalDeleteHandler} 
              closeModalDeleteHandler={this.closeModalDeleteHandler} 
              openModalUpdateHandler={(postId) => this.openModalUpdateHandler(postId)} 
              openModalDeletePostHandler={(postId) => this.openModalDeletePostHandler(postId)} 
              closeModalDeletePostHandler={this.closeModalDeletePostHandler} 
              isShowingDeletePost={this.state.isShowingDeletePost} 
              isShowingUpdate={this.state.isShowingUpdate} 
              handleUpdateSubmit={(event) => this.handleUpdateSubmit(event, this.state.postId)}
            />}
          />
          <Route exact path='/addPost' render={(props) => 
            <AddPost {...props} 
              contentValid={this.state.postContentValid} 
              handleSubmit={(event) => this.handleSubmit(event)} 
            />}
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
