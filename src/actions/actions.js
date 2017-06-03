
// Import Moment
import moment from 'moment';
import $ from 'jquery';
// User Actions


export const changeUser = (user) => {
  console.log('User:', user);
  return {
    type: 'LOGIN_USER',
    payload: user,
  };
};

export const loginUser = () => {
  return function (dispatch) {
    fetch('/auth/loggedIn', { credentials: 'include' })
      .then((res) => {
        console.log('Response Received');
        return res.json();
      })
      .then((data) => {
        console.log('JSON Data Received');
        if (data !== false) {
          dispatch(changeUser(data));
        }
      })
      .catch((err) => {
        console.error('Fetch User Error:', err, '(Actions: 26)');
      });
  };
};

export const updateUserInfo = (user) => {
  return {
    type: 'UPDATE_USER',
    user,
  };
};

export function removeEvent(event) {
  return ({
    type: 'REMOVE_EVENT',
    payload: event.id,
  });
}

export function deleteEvent(event) {
  return function (dispatch) {
    console.log('DISPATCHED');
    fetch(`/events/${event.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
    .then(resp => dispatch(removeEvent(event)))
    .catch(err => console.error(err));
  };
}

export function sendMessage(message) {
  return ({
    type: 'SEND_MESSAGE',
    payload: message,
  });
}
export function sendToUser(message) {
  console.log(message, typeof message);
  $.post(`/users/${message.targetUser}`, { message }, (data) => {
    console.log(data);
  });
}

// Event Actions

export const getEvents = ({ data }) => {
  data.forEach((event, index) => { event.id = index; });
  return {
    type: 'GET_EVENTS',
    payload: data,
  };
};

export function addEvent(eventInfo) {
  console.log('ADD EVENT CALLED', eventInfo);
  return ({
    type: 'ADD_EVENT',
    eventInfo,
  });
}

export const createEvent = (event) => {
  console.log('CREATE EVENT ACTION CREATOR CALLED', event);
  event.date_time = moment(event.date);
  delete event.date;
  delete event.time;
  delete event.dateFlag;
  return function (dispatch) {
    console.log('DISPATCHED');
    fetch('/events', {
      method: 'POST',
      credentials: 'include',
      dataType: 'json',
      body: JSON.stringify(event),
    })
    .then(resp => resp.json())
    .then(body => dispatch(addEvent(body)))
    .catch(err => console.error(err));
  };
};
