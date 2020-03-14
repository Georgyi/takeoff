import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';

import Contacts from '../contacts';
import Login from '../login';
import PrivateRoute from '../../hoc/private-route';
import config from '../../config/index';

import './index.scss';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path={config.loginPath} component={Login} />
          <PrivateRoute path="/contacts" component={Contacts} />
          <Redirect to={config.loginPath} />
        </Switch>
      </div>
    );
  }
}

export default App;
