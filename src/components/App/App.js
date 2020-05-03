import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import 'materialize-css';
import './App.css'
import LoginPage from '../pages/LoginPage';
import ContactPage from '../pages/ContactPage';
// import UpdateContact from '../Contacts/UpdateContact';

const App = (props) => {
  return (
    <div className="container">
      <Switch>
        <Route path="/" exact render={() => <Redirect to={'/login'} />} />
        <Route path="/login" component={LoginPage} />
        {/* <Route path="/contacts" exact component={ContactPage} /> */}
        {props.isLoggedIn 
            ? <Route path="/contacts" component={ContactPage} />
            : <Redirect to={'/login'} />
        }
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
