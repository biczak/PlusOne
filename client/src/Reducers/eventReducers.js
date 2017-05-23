const event = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        id: action.id,
        name: action.name,
        description: action.description,
        dateTime: action.dateTime,
        location: action.location,
        notes: action.notes,
        full: false,
      };
     // Remove Event
    // Join Event
    // Leave Event
    // Other
    default:
      return state;
  }
};

const events = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [
        ...state,
        event(undefined, action)
      ];
    // Remove Event
    // Join Event
    // Leave Event
    // Other
    default:
      return state;
  }
};

export default events;
