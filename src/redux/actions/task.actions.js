export const Types = {
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  EDIT_TASK: "EDIT_TASK",
  CHANGE_FORM_STATUS: "CHANGE_FORM_STATUS",
  SEARCH_TASK: "SEARCH_TASK",
  SORT_TASK: "SORT_TASK",
  FILTER_TASK: "FILTER_TASK",
  SWITCH_CREATE_FORM_STATUS: "SWITCH_CREATE_FORM_STATUS",
};

export const addTaskAction = (task) => {
  return {
    type: Types.ADD_TASK,
    payload: task,
  };
};

export const deleteTaskAction = (id) => {
  return {
    type: Types.DELETE_TASK,
    payload: id,
  };
};

export const turnOnEditFormAction = (task) => {
  return {
    type: Types.CHANGE_FORM_STATUS,
    payload: task,
  };
};
export const switchCreateFormStatus = (task) => {
  return {
    type: Types.SWITCH_CREATE_FORM_STATUS,
    payload: task,
  };
};

export const editTaskAction = (task) => {
  return {
    type: Types.EDIT_TASK,
    payload: task,
  };
};
export const searchAction = (task) => {
  return {
    type: Types.SEARCH_TASK,
    payload: task,
  };
};
export const filterStatusAction = (task) => {
  return {
    type: Types.FILTER_TASK,
    payload: task,
  };
};
export const sortAction = (task) => {
  return {
    type: Types.SORT_TASK,
    payload: task,
  };
};
