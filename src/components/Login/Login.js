import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginFetch } from '../../redux/actions';

import Spinner from '../Spinner/Spinner';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.requestLogin({
      email: this.state.email,
      password: this.state.password,
    });
  };

  render() {
    return (
      <div className="row">
        {this.props.loginLoadingFetch ? (
          <Spinner />
        ) : this.props.isLoggedIn ? (
          <Redirect to="/contacts" />
        ) : (
          <p className="red center-align">{this.props.loginStatusError}</p>
        )}
        <div className="col s12 m6 offset-m3">
          <div className="card-panel grey lighten-5 z-depth-1 hoverable">
            <div className="card-content">
              <div className="row">
                <div className="input-field col s12">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Введите test@mail.com"
                    required
                    value={this.state.email}
                    onChange={this.onChangeInput}
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Введите пароль 123456"
                    value={this.state.password}
                    onChange={this.onChangeInput}
                  ></input>
                </div>
              </div>

              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onClick={this.handleSubmit}
              >
                Войти
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    loginLoadingFetch: state.user.loginLoadingFetch,
    loginStatusError: state.user.loginStatusError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestLogin: (user) => dispatch(loginFetch(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
