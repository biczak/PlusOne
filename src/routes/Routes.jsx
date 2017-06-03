//external dependencies
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';

//local dependencies
import App from '.././containers/App';
import Profile from '.././containers/Profile';

import Events from '../containers/Events';
import EditForm from '../containers/EditForm';
import UserEvents from '../containers/UserEvents';
import EventForm from '../components/EventForm';
import EditProfile from '../containers/EditProfile';
import Inbox from '../containers/Inbox';
import { loginUser } from '../actions/actions.js';

class Routes extends React.Component {
  componentDidMount() {
    this.props.loginUser();
  }

  render() {
    return (
      <HashRouter basename="/" component={App}>
        <Switch>
          <Route path="/eventForm" component={EventForm} />
          <Route path="/profile" component={Profile} />
          <Route path="/edit" component={EditProfile} />
          <Route path="/events" component={Events} />
          <Route path="/editForm" component={EditForm} />
          <Route path="/userEvents" component={UserEvents} />
          <Route path="/inbox" component={Inbox} />
          <Route path="/" component={App} />
        </Switch>
      </HashRouter>
    );
  }
}

export default connect(null, { loginUser })(Routes);
