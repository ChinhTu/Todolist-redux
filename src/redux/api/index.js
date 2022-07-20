import axios from "axios";
export const addTaskApi = (data) => {
  return axios.post("http://localhost:4000/taskLists", data);
};

export const getTaskListApi = () => {
  const data = axios.get("http://localhost:4000/taskLists");
  return data;
};
