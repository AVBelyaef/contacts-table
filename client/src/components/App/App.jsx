import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import 'materialize-css';
import './App.css';
import LoginPage from '../pages/LoginPage';
import ContactsList from '../Contacts/ContactsList';

const App = () => {
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn);
  return (
    <div className="container">
      <Switch>
        <Route path="/login"><LoginPage /></Route>
        {isLoggedIn
          ? <Route path="/contacts"><ContactsList /></Route>
          : <Redirect to="/login" />}
        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </div>
  );
};

export default App;
