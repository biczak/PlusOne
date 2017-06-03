const initalState = {};

const message = (state = initalState, action) => {
  switch (action.type) {
    case 'SEND_MESSAGES':
      console.log('LOGIN REDUCER CALLED!');
      return Object.assign({}, state, action.payload);
    case 'UPDATE_USER':
      console.log('Update user reducer called');
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
};

export default user;
