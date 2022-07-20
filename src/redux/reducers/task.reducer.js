import * as ACTIONS from "../actions/task.actions";

const initialState = {
  filter: {
    status: "all",
    search: "",
  },
  renderCreateForm: true,
  renderForm: false,
  editJob: {},
  list: [],
  taskListLoading: false,
};
const taskReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case ACTIONS.Types.GET_TASK_LIST:
      return {
        state,
        taskListLoading: true,
      };
    case ACTIONS.Types.GET_TASK_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        taskListLoading: false,
      };
    case ACTIONS.Types.GET_TASK_LIST_FAIL:
      return {
        ...state,
        taskListLoading: false,
      };
    case ACTIONS.Types.ADD_TASK:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case ACTIONS.Types.DELETE_TASK:
      id = action.payload;
      const newTaskList = state.list.filter((item) => item.id !== id);
      return {
        ...state,
        list: [...newTaskList],
      };

    case ACTIONS.Types.EDIT_TASK:
      const newData = [...state.list].map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            name: action.payload.name,
            status: action.payload.status,
            date: new Date().toLocaleDateString(),
          };
        }
        return item;
      });
      return {
        ...state,
        editJob: { ...action.payload },
        list: newData,
      };
    case ACTIONS.Types.CHANGE_FORM_STATUS:
      return {
        ...state,
        renderForm: action.payload,
      };
    case ACTIONS.Types.SWITCH_CREATE_FORM_STATUS:
      return {
        ...state,
        renderCreateForm: action.payload,
      };
    case ACTIONS.Types.SEARCH_TASK:
      return {
        ...state,
        filter: { ...state.filter, search: action.payload },
      };
    case ACTIONS.Types.FILTER_TASK:
      return {
        ...state,
        filter: { ...state.filter, status: action.payload },
      };
    case ACTIONS.Types.SORT_TASK:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
export default taskReducer;
