import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  editTaskAction,
  switchCreateFormStatus,
  turnOnEditFormAction,
} from "../../redux/actions/task.actions";

interface DataArray {
  id: any;
  name: string;
  status: string;
  date: string;
}
interface Task {
  editJob: DataArray;
}
interface State {
  task: Task;
}

const EditTaskForm: React.FC = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("activated");
  const dispatch = useDispatch();
  const { editJob } = useSelector((state: State): Task => {
    return state.task;
  });

  const handleEditTask = () => {
    dispatch(editTaskAction({ id: editJob.id, name, status }));
  };
  useEffect(() => {
    setName(editJob.name);
    setStatus(editJob.status);
  }, [editJob]);

  const handleTurnOffEditForm = () => {
    dispatch(turnOnEditFormAction(false));
    dispatch(switchCreateFormStatus(false));
  };

  return (
    <div>
      <S.HeaderCustom>
        Sửa công việc
        <CancelIcon onClick={() => handleTurnOffEditForm()} />
      </S.HeaderCustom>
      <InputLabel
        id="demo-simple-select-label"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        Tên:
      </InputLabel>
      <TextField
        required
        id="outlined-required"
        value={name}
        size="small"
        style={{ display: "flex", justifyContent: "flex-start" }}
        onChange={(e) => setName(e.target.value)}
      />
      <InputLabel
        id="demo-simple-select-label"
        style={{ display: "flex", justifyContent: "flex-start", width: 230 }}
      >
        Trạng thái:
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        label="Status"
        size="small"
        style={{ display: "flex", justifyContent: "flex-start" }}
        onChange={(e) => setStatus(e.target.value)}
      >
        <MenuItem value="activated">Kích hoạt</MenuItem>
        <MenuItem value="hidden">Ẩn</MenuItem>
      </Select>
      <Stack
        spacing={2}
        direction="row"
        style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
      >
        <Button variant="contained" onClick={() => handleEditTask()}>
          Xác nhận
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleTurnOffEditForm()}
        >
          Hủy
        </Button>
      </Stack>
    </div>
  );
};

export default EditTaskForm;
