import React from 'react';
import { Route, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';

import config from '../../config';
import { logout } from '../../store/reducer/auth/actions';

const PrivateRoute = ({ component: Component, path, isAuth, ...rest }) => {
  if (!localStorage.getItem(config.tokenName)) logout();

  return (
    <Route
      path={path}
      render={() => isAuth ? <Component {...rest} /> : <Redirect to={config.loginPath} />}
    />
  );
};

const mapStateToProps = ({ auth: { isAuth } }) => ({ isAuth });
const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
