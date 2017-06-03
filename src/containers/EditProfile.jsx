// Import React and Redux Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Semantic-UI Dependencies
import { Grid, Image, Header, Segment, Container, Button, Icon, Menu, Input } from 'semantic-ui-react';

// Import Third-Party Dependencies
import $ from 'jquery';

// Import Local Components
import MenuBar from '../components/MenuBar';
import UserEvents from './UserEvents';
import EditForm from './EditForm';
import { updateUserInfo } from '../actions/actions';
import '../../public/styles/profile.scss';

class EditProfile extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      answers: {
        display_name: props.display_name || '',
        contact_number: props.contact_number || '',
        email: props.email || '',
        bio: props.bio || '',
        age: props.age || undefined,
      },
      activeItem: 'bio',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState((prevState) => {
      return {
        answers: Object.assign(prevState.answers, { [name]: value }),
      };
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const surveyAnswers = Object.assign({}, this.state.answers);
    console.log(surveyAnswers);
    fetch('/users', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(surveyAnswers),
    })
    .then((resp) => {
      if (resp.status !== 200) {
        console.error('Profile not updated');
        return;
      }
      return resp.json();
    })
    .then((body) => {
      if (!body) {
        return;
      }
      this.props.updateUser(body);
      window.location = "/#/users";
    });
  }

  render() {
    const { user } = this.props;
    console.log(this.props);
    return (
      <div className="profile-page">
        <MenuBar />
        <Container className="page-container">
          <Container width={16} fluid textAlign="center" className="profile-container">
            <Grid centered stackable>
              <Grid.Column width={4}>
                <Image shape="rounded" src={this.props.img_url} />
              </Grid.Column>
              <Grid.Column width={12} className="userInfo" verticalAlign="middle" textAlign="center">
                <Segment vertical className="profile-segment">
                  <Input name="display_name" type="text" placeholder='John Smith' defaultValue={this.props.display_name} onChange={this.handleInputChange} className="edit-profile-info" />
                </Segment>
                <Segment vertical className="profile-segment">
                    <Input label='Age' labelPosition='left corner' name="age" type="number" placeholder='18' defaultValue={this.props.age} onChange={this.handleInputChange} className="edit-profile-info" />
                </Segment>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  <Menu.Item name="bio" active={this.state.activeItem === 'bio'} />
                </Menu>
                <Button color="green" size="large" className="editProfile-button" onClick={this.handleSubmit}>
                  <Button.Content visible>
                    <Icon size="large" name='save' />
                  </Button.Content>
                </Button>
              </Grid.Column>
              <Grid.Column stretched width={12}>
                <Segment className="profile-text">
                  <textarea label='Bio' labelPosition='left corner' type="text" name="bio" defaultValue={this.props.bio} onChange={this.handleInputChange} className="editBio" />
                </Segment>
              </Grid.Column>
            </Grid>
          </Container>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => state.user;

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUserInfo(user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);
