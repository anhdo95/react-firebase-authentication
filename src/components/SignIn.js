import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    <SignUpLink />
    <PasswordForgetLink />
  </div>

class SignInForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (e) => {
    const {
      email,
      password,
    } = this.state;
    const { history } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
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
      email,
      password,
      error,
    } = this.state;

    const isValid = !password || !email;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={e => this.setState(byPropKey('email', e.target.value))}
          type="email"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={e => this.setState(byPropKey('password', e.target.value))}
          type="password"
          placeholder="Password"
        />
        <button type="submit" disabled={isValid}>
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}


export default withRouter(SignInPage);

export {
  SignInForm
};