import { put, takeEvery, call, takeLatest } from "redux-saga/effects";
import { Types } from "../actions/task.actions";
import { addTaskApi, getTaskListApi } from "../api";

function* addTaskSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(addTaskApi, payload);
    if (response.status === 201) {
      yield put({ type: Types.ADD_TASK_SUCCESS, payload: response.data });
    }
  } catch (error) {
    console.log("error in addTaskSaga", error);
  }
}

function* getTaskListSaga() {
  try {
    const response = yield call(getTaskListApi);
    console.log(response);
    if (response.status === 200) {
      yield put({ type: Types.GET_TASK_LIST_SUCCESS, payload: response.data });

      console.log(
        "🚀 ~ file: task.saga.js ~ line 23 ~ function*getTaskListSaga ~ response.data",
        response.data
      );
    }
  } catch (error) {
    console.log("error in getTaskListSaga", error);
  }
}

export default function* taskSaga() {
  yield takeEvery(Types.ADD_TASK, addTaskSaga);
  yield takeEvery(Types.GET_TASK_LIST, getTaskListSaga);
}
