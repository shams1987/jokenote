import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
//import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SubjectPage from './components/SubjectPage';
import JokesPage from './components/JokesPage';
import HomePage from './components/HomePage';
import EditProfile from './components/EditProfile';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded} />
      {loaded && (
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId/edit" exact={true}>
            <EditProfile />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} >
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute path='/subjects/' exact={true} >
            <SubjectPage />
          </ProtectedRoute>
          <ProtectedRoute path='/jokes/:subjectId' exact={true} >
            <JokesPage />
          </ProtectedRoute>
          <Route path='/'>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
