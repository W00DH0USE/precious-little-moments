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
        likeError: null,
    }
  }

  handleLogOut = () => {
    TokenService.clearAuthToken();
  }

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

  handleLogin = event => {
    this.setState({isLoading: true})
    event.preventDefault();
    const { email, password } = event.target
    AuthApiService.postLogin({
      email: email.value,
      password: password.value
    })
      .then(res => {
        if (res.error) {
          return this.setState({logInError: true})
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
      .catch(err => {
        this.setState({error: err})
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
        this.setState({posts: this.state.posts.filter(post => post.owner !== this.state.user.id)})
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

  render() {
    return (
      <div className='App'>
        <span className='container'>
        <header>
          <Route exact path='/' render={(props) => <LandingNav {...props} />} />
          <Route exact path='/login' render={(props) => <LandingNav {...props} />} />
          <Route exact path='/register' render={(props) => <LandingNav {...props} />} />
          <Route exact path='/addPost' render={(props) => <LandingNav {...props} />} />
          <Route exact path='/demo' render={(props) => <LandingNav {...props} />} />
          <Route exact path='/profile' render={(props) => <AppNav {...props} handleLogout={this.handleLogOut} />} />
        </header>
        <main className='main-container'>
          <Route exact path='/' 
            component={LandingPage}
          />
          <Route exact path='/register'
            component={RegistrationForm}
          />
          <Route exact path='/login' render={(props) => 
            <LoginForm {...props} 
              isLoading={this.state.isLoading} 
              logInError={this.state.logInError} 
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
