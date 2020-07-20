import React, {useState, useEffect} from 'react';
import './App.css';
import './components/navbar.css';
import HomePage from './components/homepage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import {CircularProgress} from '@material-ui/core';
import firebase from './components/firebase';
import AddPosts from './components/addposts';
import PostDetail from './components/post-detail';
import UserPosts from './components/userposts';
function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/add-post" component={AddPosts} />
        <Route exact path="/my-posts" component={UserPosts} />
        <Route exact path="/post-detail/:id" component={PostDetail} />
      </Switch>
    </Router>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}

export default App;
