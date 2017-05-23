// Import React Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Semantic-UI and CSS Components
import { Grid, Image, Header, Segment, Container } from 'semantic-ui-react';
import css from './profile.css';

// Import Local Components
import MenuTabs from '../MenuTabs/MenuTabs.jsx';
import MenuBar from '../MenuBar/MenuBar.jsx';
class UserProfile extends Component {

  render() {
    return (
      <div>
        <MenuBar />
        <Container fluid>
          <Grid stackable>
            <Grid.Column width={4}>
              <Image shape="rounded" src="http://img.bleacherreport.net/img/images/photos/003/636/668/67f633461ae2ccc5c437954bb971d8cb_crop_exact.jpg?w=508&h=338&q=75" />
            </Grid.Column>
            <Grid.Column width={12} className="userInfo" verticalAlign="middle" textAlign="center">
              <Segment vertical>
                <Header as="h1" color="teal">
                  Jesus Shuttlesworth
                </Header>
              </Segment>
              <Segment vertical>
                <Header as="h2" color="teal">
                  18 Years Old
                </Header>
              </Segment>
              <Segment vertical>
                <Header as="h3" color="teal">
                  New York, NY
                </Header>
              </Segment>
            </Grid.Column>
          </Grid>
          <MenuTabs />
        </Container>
      </div>
    );
  }
}

export default UserProfile;
