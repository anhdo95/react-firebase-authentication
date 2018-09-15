import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (e) => {
    const {
      email,
      passwordOne,
    } = this.state;
    const { history } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        // Set the local state to its initial state to empty input fields
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      })

    e.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isValid = 
      passwordOne !== passwordTwo ||
      !passwordOne ||
      !username ||
      !email;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={e => this.setState(byPropKey('username', e.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={e => this.setState(byPropKey('email', e.target.value))}
          type="email"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={e => this.setState(byPropKey('passwordOne', e.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={e => this.setState(byPropKey('passwordTwo', e.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={isValid}>
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () => 
  <p>
    Don't have an account?&nbsp;
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
}
