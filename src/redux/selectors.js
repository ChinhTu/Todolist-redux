import { createSelector } from "reselect";

const taskList = (state) => state.task.list;
const filterStatus = (state) => state.task.filter.status;
const filterSearch = (state) => state.task.filter.search;

const taskListFilterStatus = createSelector(
  [taskList, filterStatus],
  (list, status) => {
    if (status === "all") {
      return list;
    }
    return list.filter((item) => item.status === status);
  }
);
const taskListFilterSearch = createSelector(
  [taskListFilterStatus, filterSearch],
  (list, search) => {
    return list.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
);
const usedVariant = createSelector(
  [filterStatus, filterSearch],
  (status, search) => {
    return {
      status,
      search,
    };
  }
);

export { taskListFilterSearch, usedVariant };
