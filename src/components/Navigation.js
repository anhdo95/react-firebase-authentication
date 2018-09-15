import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) => 
  <div>
    {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
  </div>

const NavigationAuth = () => 
  <ul class="nav-bar">
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () => 
  <ul class="nav-bar">
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign in</Link></li>
  </ul>

export default Navigation;