import React from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';

import { updateUserInfo } from '../actions/actions';

import SurveyComponent from '../components/Survey';

class EditForm extends React.Component {
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
    });
  }
  render() {
    return (
      <SurveyComponent
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        answers={this.state.answers}
      />
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
)(EditForm);
