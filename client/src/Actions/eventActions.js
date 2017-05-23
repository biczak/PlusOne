let nextEventId = 0;

export const addEvent = (eventInfo) => ({
  type: 'ADD_EVENT',
  id: nextEventId++,
  eventInfo,
});

export const removeEvent = (event) => ({
  type: 'DELETE_EVENT',
  id: event.id,
  eventInfo
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});
