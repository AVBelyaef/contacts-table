import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginFetch } from '../../redux/actions/usersAC';

import Spinner from '../Spinner/Spinner';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test@mail.com',
      password: '123456',
    };
  }

  onChangeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { requestLogin } = this.props;
    const { email, password } = this.state;
    requestLogin({
      email,
      password,
    });
  };

  render() {
    const { loginLoadingFetch, isLoggedIn, loginStatusError } = this.props;
    const { email, password } = this.state;
    if (loginLoadingFetch) {
      return (<div className="row"><Spinner /></div>);
    }
    if (isLoggedIn) {
      return (<Redirect to="/contacts" />);
    }
    return (
      <div className="row">
        <p className="red center-align">{loginStatusError}</p>
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
                    value={email}
                    onChange={this.onChangeInput}
                  />
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
                    value={password}
                    onChange={this.onChangeInput}
                  />
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
Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loginStatusError: PropTypes.string.isRequired,
  loginLoadingFetch: PropTypes.bool.isRequired,
  requestLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  loginLoadingFetch: state.user.loginLoadingFetch,
  loginStatusError: state.user.loginStatusError,
});

const mapDispatchToProps = (dispatch) => ({
  requestLogin: (user) => dispatch(loginFetch(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
