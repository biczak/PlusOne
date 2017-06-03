const initalState = {};

const user = (state = initalState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      console.log('LOGIN REDUCER CALLED!');
      return Object.assign({}, state, action.payload);
    case 'UPDATE_USER':
      console.log('Update user reducer called');
      return Object.assign({}, state, action.user);
    case 'SEND_MESSAGE':
      console.log('Send Message Reducer Called!', action, state);
      return {
        ...state,
        messages: [action.payload.message],
      };
    default:
      return state;
  }
};

export default user;
